import { getWalletTokenBalances, type Erc20Value } from './moralis.ts';
import type { TokenInfo } from '@/composables/use-tokens.ts';
import { omitNullish, type NonNullableFields } from '@/utils/structs.ts';

export function balanceTokensExtractor(
    balanceResponse: Awaited<ReturnType<typeof getWalletTokenBalances>>,
): Array<TokenInfo> {
    return balanceResponse
        // ensure '.token' property is present and narrow type to it
        .filter((item): item is NonNullableFields<Erc20Value, 'token'> => !!item.token)
        .map((item) => omitNullish({
            contractAddress: item.token.contractAddress.lowercase,
            symbol: item.token.symbol,
            name: item.token.name,
            logo: item.token.logo,
            decimals: item.token.decimals,
            value: item.amount.toBigInt(),
            amount: item.value,
        }));
}
