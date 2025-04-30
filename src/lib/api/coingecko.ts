import axios from 'axios';
// import { cacheAdapterEnhancer, Cache } from 'axios-extensions';
import { getDefaultAdapter } from './utils/axios-default-adapter.js';
import addToCamelInterceptor from './utils/axios-to-camel.js';
import type { CoinGeckoCoinsContractAddress, CoinGeckoSimpleTokenPrice, CoinGeckoCoinsDataBase } from './coingecko-models.d.ts';
import { parseCoinGeckoCoin } from './coingecko-utils.ts';
import { mapValues } from '@/utils/structs.ts';
import type {TokenInfo} from '@/types.ts';

const instanceNotCamel = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/',
});

// https://docs.coingecko.com/v3.0.1/docs/useful-links
const instance = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/',
    // adapter: cacheAdapterEnhancer(getDefaultAdapter(), {
    //     enabledByDefault: false,
    //     // cacheKeyGenerator: authHeaderKeyGenerator,
    // }),
});
addToCamelInterceptor(instance);

export function getCoinPrices<K extends string>(idList: Array<K>) {
    return instance.get<Record<K, CoinGeckoSimpleTokenPrice>>('simple/price/?ids=gem-dex&vs_currencies=usd', {
            params: {
                ids: idList.join(','),
                vs_currencies: 'usd',
            },
        })
        .then((response) => {
            return mapValues(response.data, (item) => item.usd);
        });
}

// https://api.coingecko.com/api/v3/coins/ethereum/contract/0x4c9edd5852cd905f086c759e8383e09bff1e68b3
export function getTokenInfo(tokenAddress: string, platform = 'ethereum') {
    return instance.get<CoinGeckoCoinsContractAddress>(`coins/${platform}/contract/${tokenAddress}`)
        .then((response) => {
            return response.data;
        })
        .then((coin) => parseCoinGeckoCoin(coin, platform));
}
