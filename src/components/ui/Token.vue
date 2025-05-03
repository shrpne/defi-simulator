<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { pretty, prettyUsd } from '@/utils/pretty-num.ts';
import { type TokenValue } from '@/composables/use-tokens.ts';

const props = defineProps<{
    token: Partial<TokenValue>,
    text?: string,
    squared?: boolean,
}>();

const sub = computed(() => {
    if (typeof props.token.amount !== 'undefined') {
        return props.token.amount;
    }
    return props.text;
})
</script>

<template>
    <div class="flex items-center">
        <img
            :src="props.token.logo"
            class="w-8.5 h-8.5 mr-2"
            :class="props.squared ? '' : 'rounded-full'"
            alt=""
        >
        <div class="text-left">
            <div class="font-semibold leading-5">{{ props.token.symbol }}</div>
            <div class="text-sm text-gray-500 leading-4.5" v-if="props.text">{{ props.text }}</div>
        </div>
        <div v-if="props.token.amount" class="text-right ml-auto">
            <div class="font-semibold leading-5">{{ pretty(props.token.amount) }}</div>
            <div class="text-sm text-gray-500 leading-4.5" v-if="props.token.price">${{ prettyUsd(Number(props.token.amount) * Number(props.token.price)) }}</div>
        </div>
    </div>
</template>

<style scoped>

</style>
