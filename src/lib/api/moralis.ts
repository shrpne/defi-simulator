import { ApiUtils } from '@moralisweb3/api-utils';
import { CommonEvmUtils } from '@moralisweb3/common-evm-utils';
import { EvmApi } from '@moralisweb3/evm-api';
import { Core, CoreProvider } from '@moralisweb3/common-core';
import type { EvmAddressInput } from '@moralisweb3/common-evm-utils';
export type { Erc20Value, EvmErc20TokenBalanceWithPrice } from '@moralisweb3/common-evm-utils';
import { MORALIS_API_KEY } from '@/config.ts';

// Core
const core = Core.create();
// Utility modules
const commonEvmUtils = CommonEvmUtils.create(core);
const apiUtils = ApiUtils.create(core);
// Feature modules
const evmApi = EvmApi.create(core);
// Register all Moralis modules to Core
core.registerModules([commonEvmUtils, apiUtils, evmApi]);
CoreProvider.setDefault(core);
core.start({
    apiKey: MORALIS_API_KEY,
    // evmApiBaseUrl: MORALIS_API_URL,
    // ...and any other configuration
}).then(() => {
    // console.log('moralis started');
});

export const Moralis = {
    Core: core,
    EvmApi: evmApi,
    EvmUtils: commonEvmUtils,
};

export function getWalletTokenBalances(address: EvmAddressInput) {
    // // const evmApi = core.getModule(MoralisEvmApi.moduleName);
    // const evmApi = Moralis.EvmApi;
    // return Moralis.EvmApi.token.getWalletTokenBalances({
    return Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
        address,
        chain: '0x1',
        excludeSpam: true,
        // minPairSideLiquidityUsd: 50000,
    })
        .then((response) => {
            return response?.result;
                // already sorted in correct order
                // .sort((a, b) => {
                //     if (b.nativeToken) {
                //         return -1;
                //     } else if (a.nativeToken) {
                //         return 1;
                //     }
                //     return Number(b.balanceFormatted) - Number(a.balanceFormatted);
                // });
        });
}
