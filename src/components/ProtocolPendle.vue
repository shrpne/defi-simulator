<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import useAsyncAction from '@/composables/use-async-action.ts';
import { simulateBundleRpc } from '@/lib/api/tenderly.ts';
import type {SimulateBundleResult} from '@/lib/api/tenderly.ts';
import { getMarkets, prepareMarketSwapTx } from '@/lib/api/pendle.ts';
import type { PendleMarketData } from '@/lib/api/pendle.ts';
import { getWalletTokenBalances } from '@/lib/api/moralis.ts';
import type { Erc20Value } from '@/lib/api/moralis.ts';
import { useOnboard } from '@web3-onboard/vue';
import Select from 'primevue/select';
import { buildApproveTx, encodeApproveData } from '@/lib/web3-utils.ts';
import ProtocolEstimationResult from '@/components/ProtocolEstimationResult.vue';


const { connectedWallet } = useOnboard();

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
    data: tokens,
    status: tokensStatus,
    error: tokensError,
    execute: fetchTokens,
} = useAsyncAction(
    () => (walletAddress.value ? getWalletTokenBalances(walletAddress.value) : Promise.resolve([])),
    {
        watch: walletAddress,
        immediate: true,
    },
);

const selectedToken = ref<Erc20Value>();
const selectedMarket = ref<PendleMarketData>();
const simulationResult = ref<SimulateBundleResult>()

const isLoading = computed(
    () => marketsStatus.value === 'pending' || tokensStatus.value === 'pending',
);

async function handleSubmit() {
    console.log('Swap', selectedToken.value, 'to', selectedMarket.value);
    if (!selectedToken.value?.token || !selectedMarket.value) {
        return;
    }
    const tokenIn = selectedToken.value.token.contractAddress.lowercase as `0x${string}`;
    const amountIn = selectedToken.value.amount.toString();
    const tokenOut = selectedMarket.value.pt.split('-')[1];

    const { tx } = await prepareMarketSwapTx({
        market: selectedMarket.value.address,
        tokenOut,
        tokenIn,
        amountIn,
        receiver: walletAddress.value,
    });

    const result = await simulateBundleRpc([
        // approve tokenIn
        {
            from: walletAddress.value,
            to: tokenIn,
            data: encodeApproveData(tx.to, amountIn),
            // value: 0,
        },
        // swap
        {
            from: tx.from,
            to: tx.to,
            data: tx.data,
            // value: tx.value,
        },
    ]);
    console.log(result);
    simulationResult.value = result;
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
</script>

<template>
    <div>
        <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Enter Pendle Market</h2>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Select your token and the Pendle market you want to enter
            </p>
        </div>

        <div v-if="isLoading" class="flex justify-center items-center min-h-[200px]">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>

        <div
            v-else-if="tokensError || marketsError"
            class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-4"
        >
            <p class="text-red-600 dark:text-red-400">
                {{ tokensError?.message || marketsError?.message }}
            </p>
        </div>

        <form v-else @submit.prevent="handleSubmit()" class="space-y-4">
            <!-- Token Selection -->
            <div class="relative">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >You Pay</label
                >
                <Select
                    v-model="selectedToken"
                    :options="tokens"
                    optionLabel="token.symbol"
                    placeholder="Select a token"
                    class="w-full"
                >
                    <template #value="slotProps: { value: Erc20Value, placeholder: string }">
                        <div v-if="slotProps.value" class="flex items-center">
                            <img
                                :src="slotProps.value.token?.thumbnail || ''"
                                class="w-8.5 h-8.5 rounded-full mr-2"
                            />
                            <div>
                                <div class="font-medium leading-5">{{ slotProps.value.token?.symbol }}</div>
                                <div class="text-sm text-gray-500 leading-4.5">
                                    {{ slotProps.value.value }}
                                </div>
                            </div>
                        </div>
                        <span v-else class="text-gray-500">Select a token</span>
                    </template>
                    <template #option="slotProps: { option: Erc20Value }">
                        <div class="flex items-center p-2">
                            <img
                                :src="slotProps.option.token?.thumbnail || ''"
                                class="w-8.5 h-8.5 rounded-full mr-2"
                            />
                            <div>
                                <div class="font-medium leading-5">{{ slotProps.option.token?.symbol }}</div>
                                <div class="text-sm text-gray-500 leading-4.5">
                                    {{ slotProps.option.value }}
                                </div>
                            </div>
                        </div>
                    </template>
                </Select>
            </div>

            <!-- Market Selection -->
            <div class="relative">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >You Enter</label
                >
                <Select
                    v-model="selectedMarket"
                    :options="markets"
                    optionLabel="name"
                    placeholder="Select a market"
                    class="w-full"
                >
                    <template #value="slotProps: { value: PendleMarketData, placeholder: string }">
                        <div v-if="slotProps.value" class="flex items-center">
                            <div>
                                <div class="font-medium">{{ slotProps.value.name }}</div>
                                <div class="text-sm text-gray-500">
                                    {{ formatExpiry(slotProps.value.expiry) }}
                                </div>
                            </div>
                        </div>
                        <span v-else class="text-gray-500">Select a market</span>
                    </template>
                    <template #option="slotProps: { option: PendleMarketData }">
                        <div class="p-2">
                            <div class="font-medium">{{ slotProps.option.name }}</div>
                            <div class="text-sm text-gray-500">
                                {{ formatExpiry(slotProps.option.expiry) }}
                            </div>
                        </div>
                    </template>
                </Select>
            </div>

            <!-- Submit Button -->
            <button
                type="submit"
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!selectedToken || !selectedMarket"
            >
                Enter Market
            </button>
        </form>

        <ProtocolEstimationResult v-if="simulationResult" :simulation="simulationResult" :user-address="walletAddress"/>
    </div>
</template>
