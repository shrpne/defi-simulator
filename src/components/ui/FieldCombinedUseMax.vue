<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import stripZeros from 'pretty-num/src/strip-zeros.js';
import { pretty, prettyRound } from '@/utils/pretty-num.js';

interface Props {
    value: string | number;
    maxValue?: string | number;
    watchMaxValue?: boolean;
    isDecimal?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    'update:value': [value: string];
    'update:is-use-max': [value: boolean];
    'use-max': [];
}>();

const isUseMax = ref(false);

const isMaxValueDefined = computed(() => {
    return typeof props.maxValue !== 'undefined' && Number(props.maxValue) > 0;
});

const isMaxValueUsed = computed(() => {
    return isMaxValueDefined.value && (props.value || 0).toString() === props.maxValue!.toString();
});

const isMaxValueRounded = computed(() => {
    return isMaxValueDefined.value && props.maxValue!.toString() !== prettyFn(props.maxValue!).replace(/\s/g, '');
});

watch(
    () => props.value,
    (newVal) => {
        if (!(Number(props.value) > 0)) {
            isUseMax.value = false;
            return;
        }
        if (!isMaxValueDefined.value) {
            isUseMax.value = false;
            return;
        }
        if (props.value.toString() !== props.maxValue?.toString()) {
            isUseMax.value = false;
        }
    },
);

watch(
    () => props.maxValue,
    (newVal) => {
        if (!props.watchMaxValue) {
            return;
        }
        if (isMaxValueDefined.value && isUseMax.value) {
            useMax();
        }
    },
);

watch(isUseMax, (newVal) => {
    emit('update:is-use-max', newVal);
    if (newVal) {
        emit('use-max');
    }
});

const prettyFn = (value: string | number) => {
    return props.isDecimal ? pretty(value) : prettyRound(value);
};

const useMax = () => {
    if (!props.maxValue || !isMaxValueDefined.value) {
        return false;
    }
    isUseMax.value = true;
    emit('update:value', stripZeros(props.maxValue.toString()));
    // v$value.$touch();
};
</script>

<template>
    <button
        class="h-field__aside-max u-link--main u-link--opacity u-semantic-button"
        type="button"
        v-if="isMaxValueDefined && !isMaxValueUsed"
        @click="useMax()"
    >
        Use max {{ isMaxValueRounded ? '≈' : '' }}{{ prettyFn(maxValue || '') }}
    </button>
</template>
