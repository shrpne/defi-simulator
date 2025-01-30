<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type {SimulateBundleResult} from '@/lib/api/tenderly-simlate-bundle-models.ts';
import { extractAssetChanges } from '@/lib/utils/simulation-asset-change.ts';

const props = defineProps<{
    simulation: SimulateBundleResult,
    userAddress: string,
}>();

const totalGasUsed = computed(() => {
    return props.simulation.reduce((sum: number, tx) => {
        return sum + parseInt(tx.gasUsed, 16);
    }, 0);
})

const assetChanges = computed(() => {
    return extractAssetChanges(props.simulation, props.userAddress)
});

</script>

<template>
    <div>
        <div v-if="totalGasUsed">
            gasUsed: {{ totalGasUsed }} <br>
            price ETH (10gwei): {{ totalGasUsed * 10 * 10 ** (9 - 18) }} <br>
            price USD: {{ totalGasUsed * 10 * 10 ** (9 - 18) * 3000 }}
        </div>
        <div v-for="change in assetChanges">{{ change }}</div>
    </div>
</template>

<style scoped>

</style>
