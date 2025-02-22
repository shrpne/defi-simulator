import { type Address, isAddress } from 'viem';
import { getWalletTokenBalances, type Erc20Value, type EvmErc20TokenBalanceWithPrice } from './moralis.ts';
import type { TokenInfo, TokenValue, PrepareToken } from '@/composables/use-tokens.ts';
import { omitNullish, type NonNullableFields } from '@/utils/structs.ts';

export function balanceTokensExtractor(
    balanceResponse: Array<Erc20Value>,
): Array<TokenInfo> {
    return balanceResponse
        .map((item) => item.token)
        // ensure '.token' property is present and narrow type to it
        .filter((item): item is { contractAddress: { lowercase: Address } } & NonNullable<Erc20Value['token']> => {
            return !!item && isAddress(item.contractAddress.lowercase)
        })
        .map((item) => omitNullish({
            contractAddress: item.contractAddress.lowercase,
            symbol: item.symbol,
            name: item.name,
            logo: item.logo,
            decimals: item.decimals,
        }));
}

export function balanceTokensPreparator(
    balanceResponse: Array<Erc20Value>,
    prepareToken: PrepareToken,
): Array<TokenValue> {
    return balanceResponse
        // ensure '.token' property is present and narrow type to it
        .filter((item): item is { token: { contractAddress: { lowercase: Address }} } & Erc20Value => {
            return !!item.token && isAddress(item.token.contractAddress.lowercase)
        })
        .map((item) => {
            const params: Parameters<PrepareToken> = [
                item.token.contractAddress.lowercase,
                item.amount.toBigInt(),
            ];
            return prepareToken(...params);
        });
}

export function balancePriceTokensExtractor(
    balanceResponse: Awaited<ReturnType<typeof getWalletTokenBalances>>,
): Array<TokenInfo> {
    return balanceResponse
        .filter((item): item is { tokenAddress: {lowercase: Address}} & EvmErc20TokenBalanceWithPrice => {
            return !!item.tokenAddress && isAddress(item.tokenAddress.lowercase);
        })
        .map((item) => omitNullish({
            contractAddress: item.tokenAddress.lowercase,
            symbol: item.symbol,
            name: item.name,
            logo: item.logo,
            decimals: item.decimals,
            price: item.usdPrice ? Number(item.usdPrice) : undefined,
        }));
}

export function balancePriceTokensPreparator(
    balanceResponse: Awaited<ReturnType<typeof getWalletTokenBalances>>,
    prepareToken: PrepareToken,
): Array<TokenValue> {
    return balanceResponse
        .filter((item): item is { tokenAddress: { lowercase: Address } } & EvmErc20TokenBalanceWithPrice => !!item.tokenAddress)
        .map((item) => {
            const params: Parameters<PrepareToken> = [
                item.tokenAddress.lowercase,
                item.balance.value.toBigInt(),
            ];
            try {
                return prepareToken(...params);
            } catch (error) {
                console.log('not prepared', item);
                throw error;
            }
        });

}
