<script setup lang="ts">
import Web3ConnectButton from '@/components/Web3ConnectButton.vue';
import ProtocolList from '@/components/ProtocolList.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
</script>

<template>
    <header
        class="border-b border-stone-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 flex justify-between items-center py-3 px-4 mb-12"
    >
        <h1 class="text-xl font-semibold">ETH Gas Estimator</h1>
        <div class="flex items-center gap-4">
            <Web3ConnectButton />
            <ThemeToggle />
        </div>
    </header>

    <div
        class="container-xs mx-auto rounded-[0.5rem] border border-stone-300 dark:border-stone-700 py-4 px-4"
    >
        <main>
            <ProtocolList />
        </main>
    </div>
</template>

<style scoped></style>
