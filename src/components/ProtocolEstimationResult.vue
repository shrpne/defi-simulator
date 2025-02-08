<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {formatUnits, hexToBigInt } from 'viem';
import { type SimulateBundleResult, type AssetChange} from '@/lib/api/tenderly-simlate-bundle-models.ts';
import { pretty, prettyUsd } from '@/utils/pretty-num.ts'
import useTokens from '@/composables/use-tokens.ts';
import UiToken from '@/components/ui/Token.vue';

const props = defineProps<{
    simulation: SimulateBundleResult,
    userAddress: string,
}>();

const {tokens, fetchTokenInfo} = useTokens();

const totalGasUsed = computed(() => {
    return props.simulation.reduce((sum: number, tx) => {
        return sum + parseInt(tx.gasUsed, 16);
    }, 0);
})

const _assetChanges = computed<Array<AssetChange>>(() => {
    const changes: AssetChange[] = [];

    props.simulation.forEach((tx) => {
        tx.assetChanges?.forEach((change) => {
            if (change.to === props.userAddress) {
                changes.push(change);
            }
        });
    });

    return changes;
});

watch(_assetChanges, () => {
    _assetChanges.value.forEach((change) => {
        if (change.assetInfo && change.assetInfo.decimals === undefined) {
            console.log('fetchTokenInfo');
            fetchTokenInfo(change.assetInfo.contractAddress);
        }
    });
}, {
    immediate: true,
});

const assetChanges = computed<Array<AssetChange>>(() => {
    return _assetChanges.value.map((change) => {
        if (!change.assetInfo) {
            return change
        }

        const token = tokens[change.assetInfo.contractAddress];
        return {
            ...change,
            assetInfo: {
                ...change.assetInfo,
                decimals: change.assetInfo.decimals ?? token.decimals,
                symbol: change.assetInfo.symbol ?? token.symbol,
            },
            amount: change.amount ?? (token.decimals ? formatUnits(hexToBigInt(change.rawAmount), token.decimals) : undefined)
        };
    });
});

</script>

<template>
    <div>

        <UiToken
            v-for="change in assetChanges"
            :key="change.assetInfo.contractAddress"
            :symbol="change.assetInfo.symbol"
            :logo="change.assetInfo.logo"
            :amount="change.amount"
        />

        <div class="space-y-4">
            <span class="inline-flex items-center bg-background text-muted-foreground border rounded-tremor-small gap-x-2.5 py-1 pl-2.5 pr-1">Sales volume<span class="h-4 w-px bg-border"></span><span class="font-medium text-foreground">$100K-5M</span><button type="button" class="-ml-1.5 flex size-5 items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground rounded" aria-label="Remove"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" aria-hidden="true" class="remixicon size-4 shrink-0"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg></button></span>
            <form class="flex items-center space-x-2">
                <label for="gasPrice" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Gas Price:</label>
                <div class="flex-grow relative">
                    <input type="number" id="gasPrice" name="gasPrice" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Enter gas price">
                    <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground text-sm">Gwei</span>
                </div>
                <button type="button" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Current</button>
            </form>

            <div class="rounded-lg border bg-card shadow-sm">

                <div class="p-6 space-y-4">
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-medium leading-none">Gas used:</span>
                        <span class="text-sm">{{ pretty(totalGasUsed, true) }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-medium leading-none">Fees:</span>
                        <span class="text-sm">
                            {{ pretty(totalGasUsed * 10 * 10 ** (9 - 18)) }} ETH
                            <span class="text-muted text-sm">${{ prettyUsd(totalGasUsed * 10 * 10 ** (9 - 18) * 3000) }}</span>
                        </span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-medium leading-none">Profit:</span>
                        <span class="text-sm">
                            {{ prettyUsd(15) }} %
                            <span class="text-muted text-sm">${{ prettyUsd(100) }}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
