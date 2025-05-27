<script setup lang="ts">
const props = defineProps<{
    type?: 'submit'|'button',
    loading?: boolean,
    contentClass?: string,
}>()
</script>

<template>
    <button :type="props.type || 'button'" class="btn relative">
        <span class="transition-opacity duration-200" :class="[contentClass, props.loading ? 'opacity-0' : '']"><slot/></span>
        <img
            src="@/assets/img/icon-loader.svg"
            alt="Loading…"
            class="absolute top-[50%] left-[50%] -mt-3 -ml-3 transition-opacity duration-200"
            :class="props.loading ? '' : 'opacity-0'"
            stroke="currentColor"
        />
    </button>
</template>
