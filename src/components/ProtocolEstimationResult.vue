<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { type Address } from 'viem';
import type { EstimationStep, TokenValue } from '@/types.ts';
import { pretty, prettyUsd } from '@/utils/pretty-num.ts';
import useTokens from '@/composables/use-tokens.ts';
import UiToken from '@/components/ui/Token.vue';

const props = defineProps<{
    spendToken: TokenValue,
    steps: Array<EstimationStep>,
    userAddress: Address,
    spendAddress: Address,
    receiveAddress: Address,
    underlyingAddress?: Address,
    strategyDuration?: number,
}>();

const { tokens, fetchTokenInfo } = useTokens();

const gasPriceGwei = ref(10);

const totalGasUsed = computed(() => {
    return props.steps.reduce((sum, step) => {
        return sum + step.gas;
    }, 0);
});
const ethFees = computed(() => {
    return totalGasUsed.value * gasPriceGwei.value * 10 ** (9 - 18);
});
const usdFees = computed(() => {
    return totalGasUsed.value * gasPriceGwei.value * 10 ** (9 - 18) * 3000;
});

const profit = computed(() => {
    const finalTokenValue = props.steps.at(-1)?.receive;
    return (finalTokenValue?.usdValue || 0) - (props.spendToken.usdValue || 0) - usdFees.value;
});
const profitPercent = computed(() => {
    if (!props.spendToken.usdValue) {
        return 0;
    }
    return profit.value / props.spendToken.usdValue * 100;
});
const apy = computed(() => {
    if (!props.strategyDuration || props.strategyDuration < 0) {
        return 0;
    }
    return profitPercent.value / props.strategyDuration * 365;
})
</script>

<template>
    <div>

        <div v-for="(step, i) in steps" :key="i" class="mt-2">
            <div>{{ step.name }}</div>
            <UiToken
                :token="step.receive"
            />
        </div>


        <div class="space-y-4">
            <div class="flex items-center rounded-md border px-3 py-2 text-sm">
                <span class="shrink-0">Gas price</span>
                <input
                    v-model="gasPriceGwei"
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
                        <span class="text-sm font-medium leading-none">Gas fees:</span>
                        <span class="text-sm">
                            ${{ prettyUsd(usdFees) }}
                            <span class="text-muted text-sm">{{ pretty(ethFees) }} ETH</span>
                        </span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-medium leading-none">Profit:</span>
                        <span class="text-sm">
                            ${{ prettyUsd(profit) }}
                            <span class="text-muted text-sm">{{ prettyUsd(profitPercent) }}%</span>
                        </span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-medium leading-none">APY:</span>
                        <span class="text-sm">
                            {{ prettyUsd(apy) }}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

