import axios from 'axios';
import type {
    PendleGetActiveMarketsResponse,
    PendleGetAssetPricesResponse,
    PendleGetAssetsResponse,
    PendleSdkControllerSwapParams,
    PendleSwapResponse,
} from './pendle-models.d.ts';
export type { PendleMarketData } from './pendle-models.d.ts';


const instance = axios.create({
    baseURL: 'https://api-v2.pendle.finance/core/',
});

export function getMarkets() {
    return instance
        .get<PendleGetActiveMarketsResponse>('v1/1/markets/active')
        .then((response) => response.data.markets);
}

export function getAssetsPrices() {
    return instance
        .get<PendleGetAssetPricesResponse>('v1/1/assets/prices')
        .then((response) => response.data.prices);
}

export function getAssetsMetadata() {
    return instance
        .get<PendleGetAssetsResponse>('v3/1/assets/all')
        .then((response) => response.data.assets);
}

// https://api-v2.pendle.finance/core/v1/sdk/1/markets/0xb451a36c8b6b2eac77ad0737ba732818143a0e25/swap?receiver=0x8Bcf390296E830B637D76c3Deaaf3d40a20e4B67&slippage=0.01&enableAggregator=true&tokenIn=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&tokenOut=0x8a47b431a7d947c6a3ed6e42d501803615a97eaa&amountIn=1000000000
export function prepareMarketSwapTx({
    market,
    receiver,
    tokenIn,
    tokenOut,
    amountIn,
}: Omit<PendleSdkControllerSwapParams, 'slippage' | 'enableAggregator' | 'chainId'>) {
    return instance
        .get<PendleSwapResponse>(`v1/sdk/1/markets/${market}/swap`, {
            params: {
                receiver,
                tokenIn,
                tokenOut,
                amountIn,
                enableAggregator: true,
                slippage: 0.01,
            },
        })
        .then((response) => response.data);
}
