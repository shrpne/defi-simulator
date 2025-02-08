import { simulateBundleRpc,  } from './tenderly.ts';
import type { TokenInfo } from '@/composables/use-tokens.ts';

export function simulationBundleTokensExtractor(
    bundleResult: Awaited<ReturnType<typeof simulateBundleRpc>>,
): Array<TokenInfo> {
    let tokens: Array<TokenInfo> = [];
    for (const simulation of bundleResult) {
        const assets = simulation.assetChanges?.map((item) => item.assetInfo) || [];
        tokens = tokens.concat(assets.map((asset) => {
            return {
                contractAddress: asset.contractAddress,
                symbol: asset.symbol,
                name: asset.name,
                logo: asset.logo,
                decimals: asset.decimals,
            }
        }));
    }
    return tokens;
}
