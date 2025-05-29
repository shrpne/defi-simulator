<script setup lang="ts">
import useWallet from '@/composables/use-wallet-reown-appkit.ts';
import BaseDropdown from '@/components/ui/BaseDropdown.vue';

const {
    isConnected,
    address,
    shortAddress,
    connectedChainId,
    connect,
    disconnect,
    switchChain,
} = useWallet();
</script>

<template>
    <div>
        <button v-if="!isConnected" @click="connect()" class="btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet h-4 w-4">
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
            </svg>
            Connect Wallet
        </button>
        <BaseDropdown
            v-else
            :label="shortAddress"
            button-class="font-semibold!"
        >
            <button @click="disconnect()" class="btn btn-neutral w-full">Disconnect</button>
        </BaseDropdown>
        <button v-if="isConnected && Number(connectedChainId) !== 1" @click="switchChain" class="btn">Switch to Ethereum Mainnet</button>
        <!--<p v-if="settingChain">Switching Network...</p>-->
    </div>
</template>


<style scoped>

</style>
