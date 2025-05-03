<script setup lang="ts">
import { useOnboard } from '@web3-onboard/vue';
import { computed, watch } from 'vue';

const {
    connectWallet,
    disconnectConnectedWallet,
    connectedWallet,
    connectedChain,
    setChain,
    settingChain,
} = useOnboard();

const address = computed(() => {
    const address = connectedWallet.value?.accounts[0]?.address;
    if (!address) {
        return '';
    }
    return address.slice(0, 6) + '...' + address.slice(-4);
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

watch(connectedChain, async (newChain) => {
    console.log(newChain);
    // if (connectedWallet.value && newChain && newChain.id !== '0x1') {
    //     await setChain({ wallet: connectedWallet.value.label, chainId: '0x1' });
    // }
});
</script>

<template>
    <div>
        <button v-if="!connectedWallet" @click="connect()" class="btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet h-4 w-4">
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
            </svg>
            Connect Wallet
        </button>
        <div v-else class="flex items-center gap-4">
            <p class="font-semibold">{{ address }}</p>
            <button @click="disconnect()" class="btn btn-neutral">Disconnect</button>
        </div>
        <button v-if="connectedWallet && connectedChain?.id !== '0x1'" @click="switchChain" class="btn">Switch to Ethereum Mainnet</button>
        <p v-if="settingChain">Switching Network...</p>
    </div>
</template>


<style scoped>

</style>
