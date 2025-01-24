<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {PROTOCOL_LIST} from '@/lib/protocols.ts';
import { tenderly, simulateTransaction, simulateBundle, simulateBundleRpc } from '@/lib/api/tenderly.ts';
import { buildApproveTx } from '@/lib/web3-utils.ts';

function simulate() {
    const action = PROTOCOL_LIST[1].actions[0].txs[1]
    const userAddress = '0x8bcf390296e830b637d76c3deaaf3d40a20e4b67'
    // tenderly.simulator.simulateTransaction({
    //     transaction: {
    //         from: userAddress,
    //         to: action.to,
    //         input: action.data,
    //         value: 0,
    //         gas_price: '10000000000',
    //         gas: 5000000,
    //     },
    //     blockNumber: 21674740,
    //     overrides: {
    //         '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': {
    //             state: {
    //                 // [`_balances[${userAddress}]`]: '1000000000',
    //                 [`_allowances[${userAddress}][${action.to}]`]: '1000000000',
    //             },
    //         }
    //     }
    // })
    // simulateTransaction({
    //     from: '0xe2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2',
    //     to: action.to,
    //     data: action.data,
    //     value: 0,
    // });

    simulateBundle([
        {
            from: userAddress,
            ...buildApproveTx('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', action.to, '1000000000'),
            value: 0,
        },
        {
            from: userAddress,
            to: action.to,
            data: action.data,
            value: 0,
        },
    ])

    simulateBundleRpc([
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
    ])
}

</script>

<template>
    <div class="space-y-8">
        <div class="flex items-center" v-for="protocol in PROTOCOL_LIST">
            <img role="img" :src="protocol.icon" class="shrink-0 h-9 w-9 rounded-full object-cover border border-stone-300" alt="" style="">
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
    </div>
</template>

<style scoped>

</style>
