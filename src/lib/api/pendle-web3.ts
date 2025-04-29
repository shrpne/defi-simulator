import { type Address, erc20Abi } from 'viem';
import { client } from '@/lib/api/web3.ts';
import pendleSyAbi from '@/lib/abi/pendle-sy.ts';

export function getPendleSyUnderlyingAsset(syAddress: Address) {
    return client.multicall({
            contracts: [
                // {
                //     address: tokenAddress,
                //     abi: erc20Abi,
                //     functionName: 'name',
                // },
                {
                    address: syAddress,
                    abi: pendleSyAbi,
                    functionName: 'assetInfo',
                },
                {
                    address: syAddress,
                    abi: pendleSyAbi,
                    functionName: 'exchangeRate',
                },
                // {
                //     address: syAddress,
                //     abi: pendleSyAbi,
                //     functionName: 'yieldToken',
                // },
            ],
            allowFailure: false,
        })
        .then((result) => {
            return {
                // type: result[0][0],
                contractAddress: result[0][1],
                decimals: result[0][2],
                exchangeRate: result[1],
            };
        });
}
