<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { formatUnits, parseUnits } from 'viem';
import { type EstimationStep } from '@/types.ts';
import { simulateBundleRpc, type SimulateBundleResult } from '@/lib/api/tenderly.ts';
import { simulationBundleTokensExtractor, getReceiveAmountFromSimulationBundle, getGasUsedFromSimulationBundle } from '@/lib/api/tenderly-utils.ts';
import { getMarkets, getAssetsPrices, getAssetsMetadata, getAssetsMetadataV1, prepareMarketSwapTx, type PendleMarketData } from '@/lib/api/pendle.ts';
import { getPendleSyUnderlyingAsset } from '@/lib/api/pendle-web3.ts';
import { pendlePriceExtractor, pendleMetadataExtractor, pendleMetadataV1Extractor, getContractAddressWithoutChain } from '@/lib/api/pendle-utils.ts';
import { getWalletTokenBalances, type Erc20Value, type EvmErc20TokenBalanceWithPrice } from '@/lib/api/moralis.ts';
import { balancePriceTokensExtractor, balancePriceTokensFormatter } from '@/lib/api/moralis-utils.ts';
import { getSwapQuote } from '@/lib/api/lifi.ts';
import { getSwapQuoteTokensExtractor, getGasUsedFromSwapQuote, getReceiveAmountFromSwapQuote } from '@/lib/api/lifi-utils.ts';
import { buildApproveTx, encodeApproveData } from '@/lib/web3-utils.ts';
import {pretty} from '@/utils/pretty-num.ts';

import { useOnboard } from '@web3-onboard/vue';
import useAsyncAction from '@/composables/use-async-action.ts';
import useTokens, { type TokenValue } from '@/composables/use-tokens.ts';

import FieldCoin from '@/components/ui/FieldCoin.vue';
import UiToken from '@/components/ui/Token.vue';
import ProtocolEstimationResult from '@/components/ProtocolEstimationResult.vue';


const { connectedWallet } = useOnboard();
const { tokens, extractTokens, getTokenValue, prepareToken } = useTokens();

extractTokens(getAssetsPrices(), pendlePriceExtractor);
// doesn't have icons
// extractTokens(getAssetsMetadata(), pendleMetadataExtractor);
// use legacy api instead to extract icons
extractTokens(getAssetsMetadataV1(), pendleMetadataV1Extractor);

const {
    data: markets,
    status: marketsStatus,
    error: marketsError,
    execute: fetchMarkets,
} = useAsyncAction(getMarkets, {
    immediate: true,
});

const walletAddress = computed(() => connectedWallet.value?.accounts[0]?.address);

const {
    data: _balance,
    status: balanceStatus,
    error: balanceError,
} = useAsyncAction(() => {
    if (!walletAddress.value) {
        return Promise.resolve([]);
    }
    return extractTokens(getWalletTokenBalances(walletAddress.value), balancePriceTokensExtractor);
}, {
    watch: walletAddress,
    immediate: true,
});

const balance = computed(() => {
    return balancePriceTokensFormatter(_balance.value || [], getTokenValue);
});

const selectedToken = ref<TokenValue>();
const selectedAmount = ref<string>('');
const selectedMarket = ref<PendleMarketData>();
const simulationResult = ref<SimulateBundleResult>();
const simulationSteps = ref<Array<EstimationStep>>([]);

const spendTokenValue = computed(() => {
    if (!selectedToken.value || !selectedAmount.value) {
        return;
    }
    return getTokenValue(
        selectedToken.value.contractAddress,
        parseUnits(selectedAmount.value, selectedToken.value.decimals),
    );
})

const selectedMarketPt = computed(() => {
    return getContractAddressWithoutChain(selectedMarket.value?.pt)
});
const selectedMarketSy = computed(() => {
    return getContractAddressWithoutChain(selectedMarket.value?.sy)
});
const selectedMarketUnderlying = computed(() => {
    return getContractAddressWithoutChain(selectedMarket.value?.underlyingAsset)
});

const {
    data: syUnderlyingInfo,
    status: syUnderlyingInfoStatus,
    error: syUnderlyingInfoError,
    ensure: syUnderlyingInfoEnsure,
} = useAsyncAction(() => {
    if (!selectedMarketSy.value) {
        return Promise.resolve(undefined);
    }
    return getPendleSyUnderlyingAsset(selectedMarketSy.value);
}, {
    watch: selectedMarketSy,
    // immediate: true,
});

const isLoading = computed(() => {
    return marketsStatus.value === 'pending' || balanceStatus.value === 'pending';
});

async function handleSubmit() {
    console.log('Swap', spendTokenValue.value, 'to', spendTokenValue.value);
    // STEP #1
    if (!spendTokenValue.value?.contractAddress || !selectedMarket.value || !selectedMarketPt.value || !walletAddress.value) {
        return;
    }
    const tokenIn = spendTokenValue.value.contractAddress;
    const amountIn = spendTokenValue.value.value.toString();
    const tokenOut = selectedMarketPt.value;

    const { tx } = await prepareMarketSwapTx({
        market: selectedMarket.value.address,
        tokenOut,
        tokenIn,
        amountIn,
        receiver: walletAddress.value,
    });

    const simulation = await extractTokens(simulateBundleRpc([
        // approve tokenIn
        {
            from: walletAddress.value,
            to: tokenIn,
            data: encodeApproveData(tx.to, amountIn),
            // value: 0,
        },
        // zap into market
        {
            from: tx.from,
            to: tx.to,
            data: tx.data,
            // value: tx.value,
        },
    ]), simulationBundleTokensExtractor);
    console.log('simulation', simulation);
    simulationSteps.value[0] = {
        name: 'Enter market',
        gas: getGasUsedFromSimulationBundle(simulation),
        receive: await prepareToken(tokenOut, getReceiveAmountFromSimulationBundle(simulation, walletAddress.value, tokenOut)),
    };
    simulationResult.value = simulation;

    // STEP #2
    if (!selectedMarketUnderlying.value) {
        return;
    }
    await syUnderlyingInfoEnsure();
    if (!syUnderlyingInfo.value) {
        return;
    }

    // for example, PT-sUSDe will have sUSDe as underlying asset, but amount will be equal to SY-sUSDe's underlying USDe
    let underlyingAmount = simulationSteps.value[0].receive.value;
    if (syUnderlyingInfo.value.contractAddress !== selectedMarketUnderlying.value) {
        underlyingAmount = underlyingAmount * BigInt(10 ** syUnderlyingInfo.value.decimals) / syUnderlyingInfo.value.exchangeRate;
    }
    simulationSteps.value[1] = {
        name: 'Redeem matured PT into underlying',
        gas: 300_000,
        receive: await prepareToken(selectedMarketUnderlying.value, underlyingAmount),
    };

    // STEP #3
    const quote = await extractTokens(getSwapQuote({
        fromAddress: walletAddress.value,
        fromToken: simulationSteps.value[1].receive.contractAddress,
        toToken: tokenIn,
        fromAmount: simulationSteps.value[1].receive.value.toString(),
    }), getSwapQuoteTokensExtractor)
    console.log('quote', quote);

    simulationSteps.value[2] = {
        name: 'Swap',
        gas: getGasUsedFromSwapQuote(quote),
        receive: await prepareToken(tokenIn, getReceiveAmountFromSwapQuote(quote)),
    };
}

const formatExpiry = (expiry: string) => {
    const expiryDate = new Date(expiry);
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const formattedDate = expiryDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
    return `${formattedDate} (${diffDays} days)`;
};

function formatPercent(value: number) {
    return `${pretty(value * 100)}%`;
}

function getMarketLogo(market: PendleMarketData) {
    const assetAddress = getContractAddressWithoutChain(market.underlyingAsset);
    if (!assetAddress) {
        return undefined;
    }
    return tokens[assetAddress]?.logo;
}
</script>

<template>
    <div>
        <div class="mb-4">
            <h2 class="text-2xl font-bold">Enter Pendle Market</h2>
            <p class="mt-2 text-sm text-muted">
                Select your token and the Pendle market you want to enter
            </p>
        </div>

        <div v-if="isLoading" class="flex justify-center items-center min-h-[200px]">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>

        <div
            v-else-if="balanceError || marketsError"
            class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-4"
        >
            <p class="text-red-600 dark:text-red-400">
                {{ balanceError?.message || marketsError?.message }}
            </p>
        </div>

        <form v-else @submit.prevent="handleSubmit()" class="space-y-4">
            <!-- Token Selection -->
            <div class="relative">
                <!--<label class="block text-sm font-medium mb-2">You Pay</label>-->
                <!--<Select
                    v-model="selectedToken"
                    :options="balance"
                    optionLabel="token.symbol"
                    placeholder="Select a token"
                    class="w-full"
                >
                    <template #value="slotProps: { value: TokenValue, placeholder: string }">
                        <UiToken
                            v-if="slotProps.value"
                            :token="slotProps.value"
                        />
                        <span v-else class="text-muted">Select a token</span>
                    </template>
                    <template #option="slotProps: { option: TokenValue }">
                        <UiToken
                            class="grow"
                            :token="slotProps.option"
                        />
                    </template>
                </Select>-->
                <!--<FieldCoinDropdown
                    v-model="selectedToken"
                    :options="balance"
                    :get-display-value="(val) => val?.contractAddress || ''"
                >
                    <template #option="{option}: { option: TokenValue }">
                        <UiToken
                            class="grow"
                            :token="option"
                        />
                    </template>
                </FieldCoinDropdown>-->
                <FieldCoin
                    v-model:coin="selectedToken"
                    v-model:amount="selectedAmount"
                    :options="balance"
                    :get-suggestion-value="(val) => val.contractAddress"
                    :get-suggestion-display="(val) => val.symbol || ''"
                    :max-value="selectedToken?.amount"
                    label="You Pay"
                    placeholder="0.00"
                >
                    <template #value="slotProps: { value: TokenValue, placeholder: string }">
                        <UiToken
                            v-if="slotProps.value"
                            :token="slotProps.value"
                        />
                        <span v-else class="text-muted">Select a token</span>
                    </template>
                    <template #option="{option}: { option: TokenValue }">
                        <UiToken
                            class="grow"
                            :token="option"
                        />
                    </template>
                </FieldCoin>
            </div>

            <!-- Market Selection -->
            <div class="relative">
                <!--<label class="block text-sm font-medium  mb-2">You Enter</label>-->
                <FieldCoin
                    v-model:coin="selectedMarket"
                    :amount="false"
                    :options="markets"
                    :get-suggestion-value="(val) => val.name"
                    placeholder="Select a market"
                    label="You Enter"
                    class="w-full"
                >
                    <template #value="slotProps: { value: PendleMarketData, placeholder: string }">
                        <UiToken
                            v-if="slotProps.value"
                            class="grow"
                            :token="{
                                symbol: slotProps.value.name,
                                amount: formatPercent(slotProps.value.details.impliedApy),
                                logo: getMarketLogo(slotProps.value),
                            }"
                            :text="formatExpiry(slotProps.value.expiry)"
                            squared
                        />
                        <span v-else class="text-muted">Select a market</span>
                    </template>
                    <template #option="slotProps: { option: PendleMarketData }">
                        <UiToken
                            class="p-2 grow"
                            :token="{
                                symbol: slotProps.option.name,
                                amount: formatPercent(slotProps.option.details.impliedApy),
                                logo: getMarketLogo(slotProps.option),
                            }"
                            :text="formatExpiry(slotProps.option.expiry)"
                            squared
                        />
                    </template>
                </FieldCoin>
            </div>

            <!-- Submit Button -->
            <button
                type="submit"
                class="btn btn-primary btn-lg w-full"
                :disabled="!spendTokenValue || !selectedMarket"
            >
                Enter Market
            </button>
        </form>

        <ProtocolEstimationResult
            v-if="simulationResult && spendTokenValue && selectedMarketPt && walletAddress"
            :spend-token="spendTokenValue"
            :steps="simulationSteps"
            :user-address="walletAddress"
            :spend-address="walletAddress"
            :receive-address="selectedMarketPt"
            :underlying-address="selectedMarketUnderlying"
        />

        <pre>
            {{ tokens['0x4c9edd5852cd905f086c759e8383e09bff1e68b3'] }}
        </pre>
    </div>
</template>
