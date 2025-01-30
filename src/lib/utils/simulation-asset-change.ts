import type { SimulationResponse } from '@/types/simulation.ts';
import type { SimulateBundleResult, AssetChange } from '@/lib/api/tenderly.ts';
export type { AssetChange };

// export type AssetChange = {
//     token: {
//         address: string;
//         symbol?: string;
//         name?: string;
//         decimals: number;
//     };
//     amount: string;
//     dollarValue?: string;
//     from?: string;
//     to: string;
//     spender?: string;
// };

export function extractAssetChanges(
    result: SimulateBundleResult,
    userAddress: string,
): AssetChange[] {
    const changes: AssetChange[] = [];

    result.forEach((tx) => {
        tx.assetChanges?.forEach((change) => {
            if (change.to === userAddress) {
                changes.push(change);
                // changes.push({
                //     token: {
                //         address: change.assetInfo.contractAddress,
                //         symbol: change.assetInfo.symbol,
                //         name: change.assetInfo.name,
                //         decimals: change.assetInfo.decimals,
                //     },
                //     amount: BigInt(change.rawAmount).toString(),
                //     dollarValue: change.dollarValue,
                //     from: change.from,
                //     to: change.to,
                //     spender: change.spender,
                // });
            }
        });
    });

    return changes;
}
