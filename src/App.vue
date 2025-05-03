<script setup lang="ts">
import Web3ConnectButton from '@/components/Web3ConnectButton.vue';
import ProtocolList from '@/components/ProtocolList.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
</script>

<template>
    <header
        class="border-b border-border flex justify-between items-center py-3 px-4 mb-12"
    >
        <h1 class="text-xl font-semibold">DeFi Simulator</h1>
        <div class="flex items-center gap-4">
            <Web3ConnectButton />
            <ThemeToggle />
        </div>
    </header>

    <div
        class="container-xs mx-auto card card-border card-body"
    >
        <main>
            <ProtocolList />
        </main>
    </div>
</template>

<style scoped></style>
