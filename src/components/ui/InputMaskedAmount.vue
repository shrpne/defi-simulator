<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { IMaskDirective as vImask } from 'vue-imask';
import type { InputMask, FactoryArg } from 'imask';

type DirectiveMaskElement<Opts extends FactoryArg> = HTMLInputElement & {
    maskRef?: InputMask<Opts>;
};

// Base imask configuration
const imaskAmount: FactoryArg = {
    mask: Number,
    scale: 18, // digits after point, 0 for integers
    min: 0, // disallow negative
    thousandsSeparator: '', // any single char
    padFractionalZeros: false, // if true, then pads zeros at end to the length of scale
    normalizeZeros: false, // appends or removes zeros at ends
    radix: '.', // fractional delimiter
    mapToRadix: [',', 'ю', 'Ю', 'б', 'Б'], // symbols to process as radix
};

interface Props {
    modelValue: string | number;
    scale?: number;
    isPercent?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    isPercent: false,
});

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

// inner value set by imask
const maskedValue = ref('');
const inputRef = ref<DirectiveMaskElement<typeof imaskOptions.value>>();

const imaskOptions = computed<FactoryArg>(() => {
    const amountOptions: FactoryArg = {
        ...imaskAmount,
        scale: props.scale ?? imaskAmount.scale,
    };

    if (props.isPercent) {
        return {
            mask: [
                // make lazy: falsy only for not empty inputs
                { mask: '' },
                {
                    mask: 'num`%',
                    lazy: false,
                    blocks: {
                        num: amountOptions,
                    },
                },
            ],
        };
    } else {
        return amountOptions;
    }
});

watch(
    () => props.modelValue,
    (newVal) => {
        // typed value has to be updated if prop value changed programmatically
        if (newVal !== maskedValue.value) {
            updateMaskState(newVal);
        }
    },
);

onMounted(() => {
    updateMaskState(props.modelValue);
});

const updateMaskState = (value: string | number) => {
    const input = inputRef.value;
    if (!input || !input.maskRef) {
        return;
    }

    // updating typed value not work anymore for some reason
    // input.maskRef.typedValue = value;
    input.value = String(value);
    input.maskRef._onChange();
    const maskedValue = input.maskRef._value;
    const cursorPos = maskedValue.length;
    input.maskRef._selection = { start: cursorPos, end: cursorPos };
};

const onAcceptInput = (e: CustomEvent) => {
    maskedValue.value = e.detail._unmaskedValue;
    emit('update:modelValue', e.detail._unmaskedValue);
};
</script>

<template>
    <input
        ref="inputRef"
        type="text"
        autocapitalize="off"
        inputmode="decimal"
        v-imask="imaskOptions"
        @accept="onAcceptInput($event)"
    />
</template>
