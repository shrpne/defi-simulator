/*
import { computed, watch } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import { useOnboard } from '@web3-onboard/vue';
import type { UseWallet } from './use-wallet-types.ts';


const {
    connectWallet,
    disconnectConnectedWallet,
    connectedWallet,
    connectedChain,
    setChain,
    settingChain,
} = useOnboard();

const isConnected = computed(() => !!connectedWallet.value)

const address = computed(() => {
    return connectedWallet.value?.accounts[0]?.address;
});

const shortAddress = computed(() => {
    if (!address.value) {
        return '';
    }
    return address.value.slice(0, 6) + '...' + address.value.slice(-4);
});

const connectedChainId = computed(() => {
    return connectedChain.value?.id;
});

async function connect() {
    await connectWallet();
    if (connectedWallet.value && connectedChain.value?.id !== '0x1') {
        await setChain({ wallet: connectedWallet.value.label, chainId: '0x1' });
    }
}

async function disconnect() {
    await disconnectConnectedWallet();
}

async function switchChain() {
    if (connectedWallet.value && connectedChain.value?.id !== '0x1') {
        await setChain({ wallet: connectedWallet.value.label, chainId: '0x1' });
    }
}



const _useWallet = function() {
    watch(connectedChain, async (newChain) => {
        console.log(newChain);
        // if (connectedWallet.value && newChain && newChain.id !== '0x1') {
        //     await setChain({ wallet: connectedWallet.value.label, chainId: '0x1' });
        // }
    });

    return {
        isConnected,
        address,
        shortAddress,
        connectedChainId,
        connect,
        disconnect,
        switchChain,
        // connectedWallet,
        // settingChain,
    };
} satisfies () => UseWallet;

const useWallet = createSharedComposable(_useWallet);
export default useWallet;
*/
