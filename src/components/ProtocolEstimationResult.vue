<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { type Address } from 'viem';
import { type SimulateBundleResult } from '@/lib/api/tenderly-simlate-bundle-models.ts';
import { pretty, prettyUsd } from '@/utils/pretty-num.ts';
import useTokens from '@/composables/use-tokens.ts';
import UiToken from '@/components/ui/Token.vue';

const props = defineProps<{
    simulation: SimulateBundleResult,
    userAddress: Address,
    spendAddress: Address,
    receiveAddress: Address,
}>();

const { tokens, fetchTokenInfo, prepareToken } = useTokens();

const gasPriceGwei = ref(10);

const totalGasUsed = computed(() => {
    return props.simulation.reduce((sum: number, tx) => {
        return sum + parseInt(tx.gasUsed, 16);
    }, 0);
});
const ethFees = computed(() => {
    return totalGasUsed.value * gasPriceGwei.value * 10 ** (9 - 18);
});
const usdFees = computed(() => {
    return totalGasUsed.value * gasPriceGwei.value * 10 ** (9 - 18) * 3000;
});

const spendAmount = computed(() => {
    let result = 0n;
    props.simulation.forEach((tx) => {
        tx.assetChanges?.forEach((change) => {
            if (change.from === props.userAddress && change.assetInfo.contractAddress === props.spendAddress) {
                result += BigInt(change.rawAmount)
            }
        });
    });
    return result;
});

const receiveAmount = computed(() => {
    let result = 0n;
    props.simulation.forEach((tx) => {
        tx.assetChanges?.forEach((change) => {
            if (change.to === props.userAddress && change.assetInfo.contractAddress === props.receiveAddress) {
                result += BigInt(change.rawAmount)
            }
        });
    });
    return result;
});

const spendTokenValue = computed(() => {
    return prepareToken(props.spendAddress, spendAmount.value);
});
const receiveTokenValue = computed(() => {
    return prepareToken(props.receiveAddress, receiveAmount.value);
});

const profit = computed(() => {
    // @TODO adjust receiveTokenValue on market maturity
    return (receiveTokenValue.value.usdValue || 0) - (spendTokenValue.value.usdValue || 0) - usdFees.value;
});
const profitPercent = computed(() => {
    if (!spendTokenValue.value.usdValue) {
        return 0;
    }
    return profit.value / spendTokenValue.value.usdValue * 100;
});

watch([() => props.spendAddress, () => props.receiveAddress], (addressList) => {
    addressList.forEach((contractAddress) => {
        if (!tokens[contractAddress] || tokens[contractAddress].decimals === undefined) {
            console.log('fetchTokenInfo');
            fetchTokenInfo(contractAddress);
        }
    });
}, {
    immediate: true,
});
</script>

<template>
    <div>

        <UiToken
            :token="spendTokenValue"
        />
        <UiToken
            :token="receiveTokenValue"
        />

        <div class="space-y-4">
            <div class="flex items-center rounded-md border px-3 py-2 text-sm">
                <span class="shrink-0">Gas price</span>
                <input
                    type="text"
                    inputmode="numeric"
                    class="h-10 w-full ml-auto ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                    placeholder="Enter gas price"
                />
                <span class="text-sm">gwei</span>
                <button type="button" class="button button--ghost button--small ml-1 shrink-0">Current</button>
            </div>

            <div class="rounded-lg border bg-card shadow-sm">
                <div class="p-6 space-y-4">
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-medium leading-none">Gas used:</span>
                        <span class="text-sm">{{ pretty(totalGasUsed, true) }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-medium leading-none">Fees:</span>
                        <span class="text-sm">
                            {{ pretty(ethFees) }} ETH
                            <span class="text-muted text-sm">${{ prettyUsd(usdFees) }}</span>
                        </span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-medium leading-none">Profit:</span>
                        <span class="text-sm">
                            {{ prettyUsd(profitPercent) }}%
                            <span class="text-muted text-sm">${{ prettyUsd(profit) }}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

