<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps<{
    label: string,
    buttonClass?: string,
    contentClass?: string,
}>();
</script>

<template>
    <div class="dropdown">
        <!-- why <div> https://daisyui.com/components/dropdown/#method-3-css-focus -->
        <div tabindex="0" role="button" class="btn" :class="props.buttonClass">
            {{ props.label }}

            <svg class="w-6 h-6 -mr-2 -ml-0.5">
                <use href="@/assets/img/icon-dropdown.svg#icon-dropdown"></use>
            </svg>
        </div>
        <ul tabindex="0" class="dropdown-content min-w-full mt-1" :class="props.contentClass">
            <slot></slot>
        </ul>
    </div>
</template>

