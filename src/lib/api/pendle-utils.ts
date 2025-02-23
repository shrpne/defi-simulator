import { type Address, isAddress } from 'viem';
import { getAssetsPrices, getAssetsMetadata } from './pendle.ts';
import type { TokenInfo, TokenValue, PrepareToken } from '@/composables/use-tokens.ts';

export function pendlePriceExtractor(
    response: Awaited<ReturnType<typeof getAssetsPrices>>,
): Array<TokenInfo> {
    return Object.entries(response)
        .map(([address, price]) => ({
            contractAddress: address as Address,
            price,
        }));
}

export function pendleMetadataExtractor(
    response: Awaited<ReturnType<typeof getAssetsMetadata>>,
): Array<TokenInfo> {
    return response
        .map((item) => {
            return {
                contractAddress: item.address as Address,
                decimals: item.decimals,
                symbol: item.symbol,
            }
        });
}

export function getContractAddressWithoutChain(address?: string): Address|undefined {
    if (!address) {
        return undefined;
    }
    const hex = address.includes('-') ? address.split('-')[1] : address;
    if (!isAddress(hex)) {
        return undefined;
    }
    return hex;
}
