<script setup lang="ts">
import Web3ConnectButton from '@/components/Web3ConnectButton.vue';
import ProtocolList from '@/components/ProtocolList.vue';

</script>

<template>
    <header class="border-b border-stone-300 bg-stone-50 flex justify-between items-center py-3 px-4 mb-12">
        <h1 class="text-xl font-semibold">ETH Gas Estimator</h1>
        <Web3ConnectButton />
    </header>

    <div class="container-xs mx-auto rounded-[0.5rem] border border-stone-300 py-4 px-4">


        <main>
           <ProtocolList />
        </main>
    </div>
</template>

<style scoped>

</style>
