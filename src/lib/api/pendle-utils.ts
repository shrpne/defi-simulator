import { type Address, isAddress } from 'viem';
import { getAssetsPrices, getAssetsMetadata, getAssetsMetadataV1 } from './pendle.ts';
import type { TokenInfo } from '@/composables/use-tokens.ts';

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

export function pendleMetadataV1Extractor(
    response: Awaited<ReturnType<typeof getAssetsMetadataV1>>,
): Array<TokenInfo> {
    return response
        .map((item) => {
            return {
                contractAddress: item.address as Address,
                decimals: item.decimals,
                symbol: item.symbol,
                price: item.price?.usd || undefined,
                logo: item.simpleIcon,
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
