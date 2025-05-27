import axios from 'axios';
import type {Hex, Address} from "viem";
import { TENDERLY_ACCOUNT_SLUG, TENDERLY_PROJECT_SLUG, TENDERLY_ACCESS_KEY, TENDERLY_RPC_ACCESS_KEY } from '@/config.ts';
import type { SimulateBundleResponse } from './tenderly-simlate-bundle-models.ts';
export type { SimulateBundleResult, SimulateTransactionResult, AssetChange } from './tenderly-simlate-bundle-models.ts';



type SimulateTxParams = {
    from: Address;
    to: Address;
    data: Hex;
    value: number;
    gasLimit?: number;
    gasPrice?: number;
}

export function simulateTransaction(tx: SimulateTxParams) {
    const {from, to,  data, value, gasPrice, gasLimit} = tx;
    return axios.post(
        `https://api.tenderly.co/api/v1/account/${TENDERLY_ACCOUNT_SLUG}/project/${TENDERLY_PROJECT_SLUG}/simulate`,
        {
            network_id: '1',
            // block_number: 16533883,
            from,
            to,
            gas: gasLimit,
            gas_price: gasPrice,
            value,
            input: data,
            simulation_type: 'quick',
            estimate_gas: true,
            state_objects: {
                '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': {
                    storage: {
                        // [`_balances[${userAddress}]`]: '1000000000',
                        [`_allowances[${from}][${to}]`]: '1000000000',
                    },
                }
            },
        },
        {
            headers: {
                'X-Access-Key': TENDERLY_ACCESS_KEY,
            },
        },
    );
}



export function simulateBundle(txList: Array<SimulateTxParams>) {
    return axios.post(
        `https://api.tenderly.co/api/v1/account/${TENDERLY_ACCOUNT_SLUG}/project/${TENDERLY_PROJECT_SLUG}/simulate-bundle`,
        {
            simulations: txList.map(({ from, to, data, value, gasPrice, gasLimit }) => {
                return {
                    network_id: '1',
                    // block_number: 16533883,
                    from,
                    to,
                    gas: gasLimit,
                    gas_price: gasPrice,
                    value,
                    input: data,
                    simulation_type: 'quick',
                    estimate_gas: true,
                    generate_access_list: false,
                    // save: true,
                };
            }),

            // state_objects: {
            //     '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': {
            //         storage: {
            //             // [`_balances[${userAddress}]`]: '1000000000',
            //             [`_allowances[${from}][${to}]`]: '1000000000',
            //         },
            //     }
            // },
        },
        {
            headers: {
                'X-Access-Key': TENDERLY_ACCESS_KEY,
            },
        },
    );
}

type SimulateRpcTxParams = {
    from: Address;
    to: Address;
    data: Hex;
    value?: Hex;
    gas?: Hex;
    gasPrice?: Hex;
}

export function simulateBundleRpc(txList: Array<SimulateRpcTxParams>) {
    return axios.post<SimulateBundleResponse>(`https://mainnet.gateway.tenderly.co/${TENDERLY_RPC_ACCESS_KEY}`, {
        "id": 0,
        "jsonrpc": "2.0",
        "method": "tenderly_simulateBundle",
        "params": [
            txList
            /*[
                {
                    "from": "0xe2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2",
                    "to": "0x6b175474e89094c44da98b954eedeac495271d0f",
                    "data": "0x40c10f19000000000000000000000000e58b9ee93700a616b50509c8292977fa7a0f8ce10000000000000000000000000000000000000000000000001bc16d674ec80000"
                },
                {
                    "from": "0xe58b9ee93700a616b50509c8292977fa7a0f8ce1",
                    "to": "0x6b175474e89094c44da98b954eedeac495271d0f",
                    "gas": "0x7a1200",
                    "data": "0x095ea7b3000000000000000000000000f7ddedc66b1d482e5c38e4730b3357d32411e5dd0000000000000000000000000000000000000000000000000de0b6b3a7640000"
                },
                {
                    "from": "0xf7ddedc66b1d482e5c38e4730b3357d32411e5dd",
                    "to": "0x6b175474e89094c44da98b954eedeac495271d0f",
                    "gas": "0x7a1200",
                    "data": "0x23b872dd000000000000000000000000e58b9ee93700a616b50509c8292977fa7a0f8ce1000000000000000000000000bd8daa414fda8a8a129f7035e7496759c5af8570000000000000000000000000000000000000000000000000006a94d74f430000"
                }
            ]*/,
            "latest",
            /*{
                "0x6b175474e89094c44da98b954eedeac495271d0f": {
                    "stateDiff": {
                        "0xedd7d04419e9c48ceb6055956cbb4e2091ae310313a4d1fa7cbcfe7561616e03": "0x0000000000000000000000000000000000000000000000000000000000000001"
                    }
                }
            }*/
        ],
    })
        .then((response) => response.data.result);
}

