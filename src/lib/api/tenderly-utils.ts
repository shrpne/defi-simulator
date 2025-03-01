import { type Address } from 'viem';
import { simulateBundleRpc,  } from './tenderly.ts';
import type { TokenInfo } from '@/composables/use-tokens.ts';
import { omitNullish } from '@/utils/structs.ts';

export function simulationBundleTokensExtractor(
    bundleResult: Awaited<ReturnType<typeof simulateBundleRpc>>,
): Array<TokenInfo> {
    let tokens: Array<TokenInfo> = [];
    for (const simulation of bundleResult) {
        const assets = simulation.assetChanges?.map((item) => item.assetInfo) || [];
        tokens = tokens.concat(assets.map((asset) => {
            return omitNullish({
                contractAddress: asset.contractAddress,
                symbol: asset.symbol,
                name: asset.name,
                logo: asset.logo,
                decimals: asset.decimals,
                price: asset.dollarValue ? Number(asset.dollarValue) : undefined,
            });
        }));
    }
    return tokens;
}

export function getSpendAmountFromSimulationBundle(simulation: Awaited<ReturnType<typeof simulateBundleRpc>>, userAddress: Address, spendTokenAddress: Address) {
    let result = 0n;
    simulation.forEach((tx) => {
        tx.assetChanges?.forEach((change) => {
            if (change.from === userAddress && change.assetInfo.contractAddress === spendTokenAddress) {
                result += BigInt(change.rawAmount)
            }
        });
    });
    return result;
}

export function getReceiveAmountFromSimulationBundle(simulation: Awaited<ReturnType<typeof simulateBundleRpc>>, userAddress: Address, receiveTokenAddress: Address) {
    let result = 0n;
    simulation.forEach((tx) => {
        tx.assetChanges?.forEach((change) => {
            if (change.to === userAddress && change.assetInfo.contractAddress === receiveTokenAddress) {
                result += BigInt(change.rawAmount)
            }
        });
    });
    return result;
}

export function getGasUsedFromSimulationBundle(simulation: Awaited<ReturnType<typeof simulateBundleRpc>>) {
    return simulation.reduce((sum: number, tx) => {
        return sum + parseInt(tx.gasUsed, 16);
    }, 0);
}
