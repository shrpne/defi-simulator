<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Web3ConnectButton from '@/components/layout/Web3ConnectButton.vue';
import ThemeToggle from '@/components/layout/ThemeToggle.vue';


</script>

<template>
    <header
        class="flex justify-between items-center py-3 px-4"
    >
        <h1 class="text-xl font-semibold">DeFi Simulator</h1>
        <div class="flex items-center gap-4">
            <Web3ConnectButton />
            <ThemeToggle />
        </div>
    </header>
</template>

<style scoped>

</style>
