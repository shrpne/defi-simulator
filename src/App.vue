<script setup lang="ts">
import ProtocolList from '@/components/ProtocolList.vue';
import LayoutHeader from '@/components/layout/LayoutHeader.vue';
</script>

<template>
    <LayoutHeader class="bg-background border-b border-border mb-12"/>

    <div class="container-xs mx-auto card card-border card-body bg-background shadow-2xl shadow-black/10">
        <main>
            <ProtocolList />
        </main>
    </div>
</template>

<style scoped></style>
