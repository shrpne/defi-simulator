<script setup lang="ts">
import ProtocolList from '@/components/ProtocolList.vue';
import LayoutHeader from '@/components/layout/LayoutHeader.vue';
</script>

<template>
    <LayoutHeader/>

    <div
        class="container-xs mx-auto card card-border card-body"
    >
        <main>
            <ProtocolList />
        </main>
    </div>
</template>

<style scoped></style>
