<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps<{
    symbol?: string,
    logo?: string,
    amount?: string|number,
    text?: string,
}>();

const sub = computed(() => {
    if (typeof props.amount !== 'undefined') {
        return props.amount;
    }
    return props.text;
})
</script>

<template>
    <div class="flex items-center">
        <img :src="logo" class="w-8.5 h-8.5 rounded-full mr-2" alt="">
        <div>
            <div class="font-medium leading-5">{{ symbol }}</div>
            <div class="text-sm text-gray-500 leading-4.5" v-if="sub">{{ sub }}</div>
        </div>
    </div>
</template>

<style scoped>

</style>
