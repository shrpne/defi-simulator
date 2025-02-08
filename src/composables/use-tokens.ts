import { ref, shallowReactive, computed } from 'vue';
import {type Address } from 'viem';
import { getTokenInfo } from '@/lib/api/web3.ts';

export type TokenInfo = {
    contractAddress: string;
    symbol?: string;
    name?: string;
    logo?: string;
    decimals?: number;

    // value?: bigint; // in wei
    // amount?: string;
    // dollarValue?: string;
    price?: number;
};

const tokens = shallowReactive<Record<string, TokenInfo>>({});

function updateTokens(list: Array<TokenInfo>) {
    list.forEach((token) => {
        tokens[token.contractAddress] = {
            ...tokens[token.contractAddress],
            ...token,
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

// function getTokenInfo(tokenAddress: string) {
//     return computed(() => tokenStore.value[tokenAddress] ?? null);
// }

export default function useTokens() {


    return {
        tokens,
        updateTokens,
        extractTokens,
        fetchTokenInfo,
    };
}
