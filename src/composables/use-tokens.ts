import { ref, shallowReactive, computed } from 'vue';
import {type Address, formatUnits } from 'viem';
import { getTokenInfo } from '@/lib/api/web3.ts';

export type TokenInfo = {
    contractAddress: Address;
    symbol?: string;
    name?: string;
    logo?: string;
    decimals?: number;

    price?: number;
};

export type TokenValue = TokenInfo & {
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

function prepareToken(tokenAddress: Address, _value: bigint | string | number): TokenValue {
    const tokenInfo = tokens[tokenAddress];
    if (!tokenInfo || tokenInfo.decimals === undefined || tokenInfo.decimals === null) {
        throw new Error(`Token info not found for address: ${tokenAddress}`);
    }

    const value = BigInt(_value);
    const amount = formatUnits(value, tokenInfo.decimals)

    return {
        ...tokenInfo,
        value,
        amount,
        usdValue: typeof tokenInfo.price !== 'undefined' ? Number(amount) * tokenInfo.price : undefined,
    };
}

export type PrepareToken = typeof prepareToken;

// function getTokenInfo(tokenAddress: string) {
//     return computed(() => tokenStore.value[tokenAddress] ?? null);
// }

export default function useTokens() {


    return {
        tokens,
        updateTokens,
        extractTokens,
        fetchTokenInfo,
        prepareToken,
    };
}
