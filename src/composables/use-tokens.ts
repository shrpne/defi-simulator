import { ref, shallowReactive, computed } from 'vue';
import {type Address, formatUnits } from 'viem';
import { getTokenInfo } from '@/lib/api/web3.ts';
import { type NonNullableFields } from '@/utils/structs.ts';

export type TokenInfo = {
    contractAddress: Address;
    symbol?: string;
    name?: string;
    logo?: string;
    decimals?: number;

    price?: number;
};
export type TokenInfoValid = NonNullableFields<TokenInfo, 'decimals'>

export type TokenValue = TokenInfoValid & {
    value: bigint;
    amount: string;
    usdValue?: number;
}

const tokens = shallowReactive<Record<Address, TokenInfo>>({});

function updateTokens(list: Array<TokenInfo>) {
    list.forEach((token) => {
        tokens[token.contractAddress] = {
            ...token,
            ...tokens[token.contractAddress],
            // only overwrite price
            ...(token.price && { price: token.price }),
        };
    });
}

function extractTokens<T>(promise: Promise<T>, parserFn: (data: T) => Array<TokenInfo>): Promise<T> {
    return promise.then((data) => {
        const tokens = parserFn(data);
        updateTokens(tokens);
        return data;
    });
}

function fetchTokenInfo(tokenAddress: Address) {
    return getTokenInfo(tokenAddress)
        .then((token) => {
            console.log('fetched token', token);
            updateTokens([token]);
        });
}

async function ensureTokenInfo(tokenAddress: Address): Promise<TokenInfoValid> {
    if (!isValidTokenInfo(tokens[tokenAddress])) {
        await fetchTokenInfo(tokenAddress);
    }
    const tokenInfo = tokens[tokenAddress];
    if (!isValidTokenInfo(tokenInfo)) {
        throw new Error(`Token info not found for address: ${tokenAddress}`);
    }
    return tokenInfo;
}

function isValidTokenInfo(tokenInfo: TokenInfo): tokenInfo is TokenInfoValid {
    if (!tokenInfo || tokenInfo.decimals === undefined || tokenInfo.decimals === null) {
        return false;
    }
    return true;
}

function getTokenValue(tokenAddress: Address, weiValue: bigint | string | number): TokenValue {
    const tokenInfo = tokens[tokenAddress];
    if (!isValidTokenInfo(tokenInfo)) {
        throw new Error(`Token info not found for address: ${tokenAddress}`);
    }

    const value = BigInt(weiValue);
    const amount = formatUnits(value, tokenInfo.decimals)

    return {
        ...tokenInfo,
        value,
        amount,
        usdValue: typeof tokenInfo.price !== 'undefined' ? Number(amount) * tokenInfo.price : undefined,
    };
}

export type GetTokenValue = typeof getTokenValue;

export async function prepareToken(...args: Parameters<GetTokenValue>): Promise<ReturnType<GetTokenValue>> {
    const [tokenAddress, value] = args;
    await ensureTokenInfo(tokenAddress);
    return getTokenValue(tokenAddress, value);
}

// function getTokenInfo(tokenAddress: string) {
//     return computed(() => tokenStore.value[tokenAddress] ?? null);
// }

export default function useTokens() {


    return {
        tokens,
        updateTokens,
        extractTokens,
        fetchTokenInfo,
        ensureTokenInfo,
        getTokenValue,
        prepareToken,
    };
}
