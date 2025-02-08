import { createPublicClient, http, erc20Abi } from 'viem';
import { mainnet } from 'viem/chains';
import type { Hex, Address } from 'viem';

const client = createPublicClient({
    chain: mainnet,
    transport: http(),
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
