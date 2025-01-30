<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {PROTOCOL_LIST} from '@/lib/protocols.ts';
import { simulateTransaction, simulateBundle, simulateBundleRpc } from '@/lib/api/tenderly.ts';
import { buildApproveTx } from '@/lib/web3-utils.ts';
import {extractAssetChanges} from '@/lib/utils/simulation-asset-change.ts'
import type {AssetChange} from '@/lib/utils/simulation-asset-change.ts';
import ProtocolPendle from '@/components/ProtocolPendle.vue';

const totalGasUsed = ref<number>();
const assetChanges = ref<Array<AssetChange>>([]);

async function simulate() {
    /*const action = PROTOCOL_LIST[1].actions[0].txs[1]
    const userAddress = '0x8bcf390296e830b637d76c3deaaf3d40a20e4b67'

    const result = await simulateBundleRpc([
        {
            from: userAddress,
            ...buildApproveTx('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', action.to, '1000000000'),
            // value: 0,
        },
        {
            from: userAddress,
            to: action.to,
            data: action.data,
            // value: 0,
        },
    ]);

    totalGasUsed.value = result.reduce((sum: number, tx: any) => {
        return sum + parseInt(tx.gasUsed, 16);
    }, 0);

    assetChanges.value = extractAssetChanges(result, userAddress);*/
}

</script>

<template>
    <div class="space-y-8">
        <div class="flex items-center" v-for="protocol in PROTOCOL_LIST" :key="protocol.name">
            <img role="img" :src="protocol.icon" class="shrink-0 h-9 w-9 rounded-full object-cover shadow-md" alt="" style="">
            <div class="ml-3 mr-2 space-y-1">
                <p class="font-medium leading-none">
                    {{ protocol.name }}
                </p>
                <p class="text-xs text-muted">
                    Approve Token
                    -> Deposit Token
                    -> Approve aToken
                    -> Withdraw Token
                </p>
            </div>
            <button type="button" class="button button--ghost button--medium ml-auto shrink-0" @click="simulate()">Simulate</button>
        </div>

        <ProtocolPendle/>

    </div>
</template>

<style scoped>

</style>
