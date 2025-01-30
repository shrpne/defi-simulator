import { ApiUtils } from '@moralisweb3/api-utils';
import { CommonEvmUtils } from '@moralisweb3/common-evm-utils';
import { EvmApi } from '@moralisweb3/evm-api';
import { Core, CoreProvider } from '@moralisweb3/common-core';
import type { EvmAddressInput } from '@moralisweb3/common-evm-utils';
export type { Erc20Value } from '@moralisweb3/common-evm-utils';
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
    return Moralis.EvmApi.token.getWalletTokenBalances({
            address,
            chain: '0x1',
            excludeSpam: true,
        })
        .then((response) => {
            return response?.result;
        });
}
