<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { formatUnits, hexToBigInt } from 'viem';
import { type SimulateBundleResult, type AssetChange } from '@/lib/api/tenderly-simlate-bundle-models.ts';
import { pretty, prettyUsd } from '@/utils/pretty-num.ts';
import useTokens, { type TokenValue } from '@/composables/use-tokens.ts';
import UiToken from '@/components/ui/Token.vue';

const props = defineProps<{
    simulation: SimulateBundleResult,
    userAddress: string,
}>();

const { tokens, fetchTokenInfo } = useTokens();

const totalGasUsed = computed(() => {
    return props.simulation.reduce((sum: number, tx) => {
        return sum + parseInt(tx.gasUsed, 16);
    }, 0);
});

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
            return change;
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

function formatChangeToToken(assetChange: AssetChange): Partial<TokenValue> {
    return {
        symbol: assetChange.assetInfo.symbol,
        amount: assetChange.amount,
        logo: assetChange.assetInfo.logo,
    };
}
</script>

<template>
    <div>

        <UiToken
            v-for="change in assetChanges"
            :key="change.assetInfo.contractAddress"
            :token="formatChangeToToken(change)"
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
