import { computed } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import { isAddress } from 'viem';
import { useAppKit, useDisconnect, useAppKitAccount, useAppKitNetwork,  } from "@reown/appkit/vue";
import { mainnet, type AppKitNetwork } from '@reown/appkit/networks';
import type { UseWallet } from './use-wallet-types.ts';




const _useWallet = function () {
    const { open, close } = useAppKit();
    const { disconnect } = useDisconnect();
    const account = useAppKitAccount();
    const network = useAppKitNetwork();

    const isConnected = computed(() => account.value.isConnected);
    const address = computed(() => {
        if (account.value.address && isAddress(account.value.address)) {
            return account.value.address;
        }
        return undefined;
    });
    const shortAddress = computed(() => {
        if (!address.value) {
            return '';
        }
        return address.value.slice(0, 6) + '...' + address.value.slice(-4);
    });

    const connectedChainId = computed(() => {
        return network.value.chainId;
    });

    function switchChain() {
        if (network.value.caipNetworkId !== 'eip155:1') {
            return network.value.switchNetwork(mainnet);
        }
    }


    return {
        isConnected,
        address,
        shortAddress,
        connectedChainId,
        connect: open,
        disconnect,
        switchChain,
    };
} satisfies () => UseWallet;

const useWallet = createSharedComposable(_useWallet);
export default useWallet;
