import { type Address, isAddress } from 'viem';
import type { CoinGeckoCoinsDataBase} from './coingecko-models.d.ts';
import type { TokenInfo } from '@/composables/use-tokens.ts';
import { omitNullish } from '@/utils/structs.ts';




/**
 * Helper function to extract token information and calculate price if available
 */
export function parseCoinGeckoCoin(coin: CoinGeckoCoinsDataBase, platform = 'ethereum'): TokenInfo | undefined {
    if (!coin?.detailPlatforms?.[platform]) {
        return undefined
    }
    const platformDetail = coin.detailPlatforms[platform] as unknown as {
        contractAddress: `0x${string}`,
        decimalPlace: number,
    };
    if (!isAddress(platformDetail.contractAddress)) {
        return undefined;
    }

    return omitNullish({
        contractAddress: platformDetail.contractAddress,
        symbol: coin.symbol,
        name: coin.name,
        logo: coin.image.small,
        decimals: platformDetail.decimalPlace,
        price: Number(coin.marketData.currentPrice.usd),
    });
}

