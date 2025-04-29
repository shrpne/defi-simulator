import { createPublicClient, http, fallback, erc20Abi } from 'viem';
import { mainnet } from 'viem/chains';
import type { Hex, Address } from 'viem';

export const client = createPublicClient({
    chain: mainnet,
    // chain: {
    //     ...mainnet,
    //     rpcUrls: {
    //         default: {
    //             http: ['https://eth.llamarpc.com'],
    //         }
    //     },
    // },
    transport: fallback([
        http('https://eth.llamarpc.com'),
        http('https://rpc.ankr.com/eth'),
        http('https://0xrpc.io/eth'), // anonymous provider
        // http('https://cloudflare-eth.com'), down
    ]),
    // batch: {
    //     multicall: {
    //         wait: 20,
    //     },
    // },
});

export function getTokenInfo(tokenAddress: Address) {
    return client.multicall({
        contracts: [
            // {
            //     address: tokenAddress,
            //     abi: erc20Abi,
            //     functionName: 'name',
            // },
            {
                address: tokenAddress,
                abi: erc20Abi,
                functionName: 'symbol',
            },
            {
                address: tokenAddress,
                abi: erc20Abi,
                functionName: 'decimals',
            },
        ],
        allowFailure: false,
    })
        .then((result) => {
            return {
                contractAddress: tokenAddress,
                symbol: result[0],
                decimals: result[1],
            };
        });
}

export function getGasPrice() {
    return client.getGasPrice();
}
