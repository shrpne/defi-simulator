import { ChainId, getQuote, type QuoteRequest } from '@lifi/sdk';

export function getSwapQuote({ fromAddress, fromToken, toToken, fromAmount }: Pick<QuoteRequest, 'fromAddress' | 'fromToken' | 'toToken' | 'fromAmount'>) {
    return getQuote({
        fromAddress,
        fromChain: ChainId.ETH,
        toChain: ChainId.ETH,
        fromToken,
        toToken,
        fromAmount,
    });
}
