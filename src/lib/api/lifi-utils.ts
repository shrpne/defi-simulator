import { type Address, isAddress } from 'viem';
import { getSwapQuote } from './lifi.ts';
import { type Token as LiFiToken } from '@lifi/sdk';
import type { TokenInfo } from '@/composables/use-tokens.ts';
import { omitNullish } from '@/utils/structs.ts';


export function getSwapQuoteTokensExtractor(result: Awaited<ReturnType<typeof getSwapQuote>>): Array<TokenInfo> {
    const tokens: Array<TokenInfo | undefined> = [];

    // Extract fromToken information
    tokens.push(parseLiFiToken(result.action?.fromToken));

    // Extract toToken information
    tokens.push(parseLiFiToken(result.action?.toToken));

    // Extract tokens from included steps if available
    if (result.includedSteps?.length) {
        for (const step of result.includedSteps) {
            tokens.push(parseLiFiToken(step.action?.fromToken));
            tokens.push(parseLiFiToken(step.action?.toToken));
        }
    }

    // Extract gas token information if available
    if (result.estimate?.gasCosts?.length) {
        for (const gasCost of result.estimate.gasCosts) {
            tokens.push(parseLiFiToken(gasCost.token));
        }
    }

    // Extract fee token information if available
    if (result.estimate?.feeCosts?.length) {
        for (const feeCost of result.estimate.feeCosts) {
            tokens.push(parseLiFiToken(feeCost.token));
        }
    }

    return tokens.filter((item) => !!item);
}

/**
 * Helper function to extract token information and calculate price if available
 */
function parseLiFiToken(token: LiFiToken): TokenInfo | undefined {
    if (!token || !isAddress(token.address)) {
        return undefined;
    }

    return omitNullish({
        contractAddress: token.address,
        symbol: token.symbol,
        name: token.name,
        logo: token.logoURI,
        decimals: token.decimals,
        price: Number(token.priceUSD),
    });
}


export function getReceiveAmountFromSwapQuote(quote: Awaited<ReturnType<typeof getSwapQuote>>): bigint {
    return BigInt(quote.estimate.toAmount);
}

export function getGasUsedFromSwapQuote(quote: Awaited<ReturnType<typeof getSwapQuote>>) {
    let result = 0;
    if (quote.estimate.gasCosts?.length) {
        // @TODO multichain swaps may have different gas coins
        for (const gasCost of quote.estimate.gasCosts) {
            result += Number(gasCost.estimate);
        }
    }
    return result;
}
