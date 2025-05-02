<script setup lang="ts" generic="Option extends string|object">
import { ref, computed, useAttrs } from 'vue';
import InputMaskedAmount from '@/components/ui/InputMaskedAmount.vue';
import FieldCombinedUseMax from '@/components/ui/FieldCombinedUseMax.vue';
import FieldCombinedBaseDropdown from '@/components/ui/FieldCombinedBaseDropdown.vue';

defineOptions({
    inheritAttrs: false,
});

type Props = {
    coin?: Option;
    v$coin?: {
        $touch: () => void;
        $error: boolean;
    };
    amount?: number | string | false;
    v$amount?: {
        $touch: () => void;
        $error: boolean;
    };
    options?: Array<Option>;
    getSuggestionValue?: (value: Option) => string;
    getSuggestionDisplay?: (value: Option) => string;
    maxValue?: string | number;
    isEstimation?: boolean;
    isDecimal?: boolean;
    label?: string;
}

const props = withDefaults(defineProps<Props>(), {
    coin: undefined,
    'v$coin': () => ({
        $touch: () => {},
        $error: false,
    }),
    amount: '',
    'v$amount': () => ({
        $touch: () => {},
        $error: false,
    }),
    options: () => [],
    getSuggestionValue: undefined,
    getSuggestionDisplay: undefined,
    maxValue: undefined,
    isEstimation: false,
    isDecimal: true,
    label: '',
});

const emit = defineEmits<{
    'update:coin': [value: Option];
    'update:amount': [value: string | number];
    'update:is-use-max': [value: boolean];
    'use-max': [];
}>();


const isSelectVisible = ref(false);

defineExpose({
    isSelectVisible,
});

// input attrs will go to input and other attrs will go to root
const _attrs = useAttrs();
const attrs = computed(() => {
    const {
        // FieldCombinedBaseAmount > InputMaskedAmount
        isPercent, ['is-percent']: isPercentSnake, scale,
        // FieldCombinedBaseAmount > InputMaskedAmount > input
        placeholder, type, inputmode,
        // FieldCombined
        ...other
    } = _attrs;

    return {
        input: {
            isPercent: (isPercent || isPercentSnake) as boolean | undefined,
            scale: scale as number | undefined,
            placeholder,
            type,
            inputmode,
        },
        other,
    };
});

const isSelectDisabled = computed(() => {
    if (props.options.length === 0) {
        return true;
    }
    // 0 and >1 are OK (enabled)
    return props.options.length === 1;
});

const openDropdown = () => {
    if (isSelectDisabled.value) {
        return;
    }
    isSelectVisible.value = true;
};

const handleSelect = (coin: Option) => {
    emit('update:coin', coin);
};

const handleUseMax = (value: boolean) => {
    emit('update:is-use-max', value);
    if (value) {
        emit('use-max');
    }
};
</script>

<template>
    <div class="h-field" :class="{ 'h-field--is-dashed': isEstimation }" v-bind="attrs.other">
        <!-- @TODO handle blur (amount blur fires and coin blur not) (maybe not fire blur at all?)-->
        <div class="h-field__content">
            <div class="h-field__title">{{ label }}</div>
            <button
                class="h-field__select-button u-semantic-button"
                type="button"
                @click="openDropdown()"
                :disabled="isSelectDisabled"
            >
                <slot name="value" :value="coin" :placeholder="'Select coin'">
                    {{ coin || 'Select coin' }}
                </slot>
                <!--<img class="h-field__select-icon" :src="iconUrl" width="24" height="24" alt="" role="presentation" v-if="coin" />-->
                <!--<div class="h-field__select-value">{{ displayValue || 'Select coin' }}</div>-->
                <img
                    v-if="!isSelectDisabled"
                    class="h-field__select-icon-arrow"
                    src="@/assets/img/icon-dropdown.svg"
                    alt=""
                    role="presentation"
                    width="24"
                    height="24"
                />
            </button>
        </div>
        <div
            v-if="amount !== false"
            class="h-field__aside"
            :class="{ 'is-error': v$amount.$error }"
        >
            <div class="h-field__aside-caption">
                <slot name="aside-caption">
                    <FieldCombinedUseMax
                        v-bind="attrs.input"
                        :value="amount"
                        :max-value="maxValue"
                        :is-decimal="isDecimal"
                        @update:value="$emit('update:amount', $event)"
                        @update:is-use-max="handleUseMax($event)"
                    />
                </slot>
            </div>
            <InputMaskedAmount
                class="h-field__input h-field__aside-input"
                v-bind="attrs.input"
                :placeholder="attrs.input.placeholder || (isDecimal ? '0.00' : '0')"
                :model-value="amount"
                @update:model-value="$emit('update:amount', $event)"
                @blur="v$amount.$touch()"
            />
        </div>

        <FieldCombinedBaseDropdown
            v-model:is-open="isSelectVisible"
            :options="options"
            :getSuggestionValue="getSuggestionValue"
            :getSuggestionDisplay="getSuggestionDisplay"
            @select="handleSelect($event)"
        >
            <template #option="{option}">
                <slot name="option" :option="option"></slot>
            </template>
        </FieldCombinedBaseDropdown>
    </div>
</template>
