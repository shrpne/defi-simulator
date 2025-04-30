<script>
import InputMaskedAmount from '@/components/ui/InputMaskedAmount.vue';
import FieldCombinedUseMax from '@/components/ui/FieldCombinedUseMax.vue';
import FieldCombinedBaseDropdown from '@/components/ui/FieldCombinedBaseDropdown.vue';

export default {
    components: {
        InputMaskedAmount,
        FieldCombinedUseMax,
        FieldCombinedBaseDropdown,
    },
    inheritAttrs: false,
    props: {
        coin: {
            type: String,
            default: '',
        },
        v$coin: {
            type: Object,
            default: () => {
                return {$touch: () => {}};
            },
        },
        amount: {
            type: [Number, String, Boolean],
            default: '',
        },
        v$amount: {
            type: Object,
            default: () => {
                return {$touch: () => {}};
            },
        },
        /**
         * Flat array or array of balance items
         * @type Array
         */
        options: {
            type: Array,
            default: () => [],
        },
        getDisplayValue: {
            type: Function,
            required: false,
        },
        maxValue: {
            type: [String, Number],
            default: undefined,
        },
        isEstimation: {
            type: Boolean,
            default: false,
        },
        isDecimal: {
            type: Boolean,
            default: true,
        },
        label: {
            type: String,
            default: '',
        },
    },
    emits: [
        'update:coin',
        'update:amount',
        'update:is-use-max',
        'use-max',
    ],
    data() {
        return {
            isSelectVisible: false,
        };
    },
    computed: {
        // input attrs will go to input and other attrs will go to root
        attrs() {
            const {
                // FieldCombinedBaseAmount > InputMaskedAmount
                isPercent, ['is-percent']: isPercentSnake, scale,
                // FieldCombinedBaseAmount > InputMaskedAmount > input
                placeholder, type, inputmode,
                // FieldCombined
                ...other
            } = this.$attrs;

            return {
                input: {isPercent: isPercent || isPercentSnake, scale, placeholder, type, inputmode},
                other,
            };
        },
        isSelectDisabled() {
            if (this.options.length === 0) {
                return true;
            }
            // 0 and >1 are OK (enabled)
            return this.options.length === 1;
        },
    },
    methods: {
        openDropdown() {
            if (this.isSelectDisabled) {
                return;
            }
            this.isSelectVisible = true;
        },
        handleSelect(coin) {
            this.$emit('update:coin', coin);
        },
        handleUseMax(value) {
            this.$emit('update:is-use-max', value);
            if (value) {
                this.$emit('use-max');
            }
        },
    },
};
</script>

<template>
    <div class="h-field" :class="{ 'h-field--is-dashed': isEstimation }" v-bind="attrs.other">
        <!-- @TODO handle blur (amount blur fires and coin blur not) (maybe not fire blur at all?)-->
        <div class="h-field__content">
            <div class="h-field__title">{{ label }}</div>
            <button class="h-field__select-button u-semantic-button" type="button" @click="openDropdown()" :disabled="isSelectDisabled">
                <slot name="value" :value="coin" :placeholder="'Select coin'">
                    {{ coin }}
                </slot>
                <!--<img class="h-field__select-icon" :src="iconUrl" width="24" height="24" alt="" role="presentation" v-if="coin" />-->
                <!--<div class="h-field__select-value">{{ displayValue || 'Select coin' }}</div>-->
                <img
                    class="h-field__select-icon-arrow"
                    src="@/assets/img/icon-dropdown.svg"
                    alt=""
                    role="presentation"
                    width="24"
                    height="24"
                    v-if="!isSelectDisabled"
                />
            </button>
        </div>
        <div v-if="amount !== false" class="h-field__aside" :class="{ 'is-error': v$amount.$error }">
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
            ref="coinDropdown"
            v-model:is-open="isSelectVisible"
            :options="options"
            :getDisplayValue="getDisplayValue"
            @select="handleSelect($event)"
        >
            <template #option="{option}">
                <slot name="option" :option="option"></slot>
            </template>
        </FieldCombinedBaseDropdown>
    </div>
</template>
