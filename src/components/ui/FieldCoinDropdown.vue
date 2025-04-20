<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ComboboxAnchor, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxRoot, ComboboxViewport } from 'reka-ui';
import type { ComboboxInputProps } from 'reka-ui';

const props = defineProps<{
    modelValue?: KetuCity,
    options: Array,
    placeholder?: string,
    getDisplayValue: ComboboxInputProps['displayValue']
}>();

const emit = defineEmits<{
    'update:modelValue': [value: KetuCity]
}>();


</script>

<template>
    <ComboboxRoot
        :model-value="props.modelValue"
        @update:model-value="emit('update:modelValue', $event)"
    >
        <ComboboxInput :display-value="props.getDisplayValue" />
        <ComboboxContent class="absolute z-10 w-full mt-1 min-w-[160px] bg-base-200 text-base-content overflow-hidden rounded-lg border border-base-300 data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade">
            <ComboboxItem
                v-for="option in options"
                :key="props.getDisplayValue(option)"
                :value="option"
            >
                <slot name="option" :option="option">
                    {{ getDisplayValue(option) }}
                </slot>
            </ComboboxItem>
        </ComboboxContent>
    </ComboboxRoot>
</template>

<style scoped>

</style>
