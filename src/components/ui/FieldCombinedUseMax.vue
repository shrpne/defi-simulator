<script lang="ts">
import stripZeros from 'pretty-num/src/strip-zeros.js';
import {pretty, prettyRound} from '@/utils/pretty-num.js';

export default {
    inheritAttrs: false,
    props: {
        value: {
            type: [String, Number],
            required: true,
        },
        maxValue: {
            type: [String, Number],
            default: undefined,
        },
        disableMaxValueWatch: {
            type: Boolean,
            default: false,
        },
        isDecimal: {
            type: Boolean,
            default: false,
        },
    },
    emits: [
        'update:is-use-max',
        'use-max',
        'update:value',
    ],
    data() {
        return {
            isUseMax: false,
        };
    },
    computed: {
        isMaxValueDefined() {
            return typeof this.maxValue !== 'undefined' && this.maxValue > 0;
        },
        isMaxValueUsed() {
            return this.isMaxValueDefined && (this.value || 0).toString() === this.maxValue.toString();
        },
        isMaxValueRounded() {
            return this.isMaxValueDefined && this.maxValue.toString() !== this.prettyFn(this.maxValue).replace(/\s/g, '');
        },
    },
    watch: {
        value(newVal) {
            if (!(this.value > 0)) {
                this.isUseMax = false;
                return;
            }
            if (!this.isMaxValueDefined) {
                this.isUseMax = false;
                return;
            }
            if (!new Big(this.value).eq(this.maxValue)) {
                this.isUseMax = false;
            }
        },
        maxValue(newVal) {
            if (this.disableMaxValueWatch) {
                return;
            }
            if (this.isMaxValueDefined && this.isUseMax) {
                this.useMax();
            }
        },
        isUseMax(newVal) {
            this.$emit('update:is-use-max', newVal);
            if (newVal) {
                this.$emit('use-max');
            }
        },
    },
    methods: {
        prettyFn(value) {
            return this.isDecimal ? pretty(value) : prettyRound(value);
        },
        useMax() {
            if (!this.isMaxValueDefined) {
                return false;
            }
            this.isUseMax = true;
            this.$emit('update:value', stripZeros(this.maxValue));
            this.v$value.$touch();
        },
    },
};
</script>

<template>
    <button
        class="h-field__aside-max u-link--main u-link--opacity u-semantic-button" type="button"
        v-if="isMaxValueDefined && !isMaxValueUsed"
        @click="useMax()"
    >
        Use max {{ isMaxValueRounded ? '≈' : '' }}{{ prettyFn(maxValue) }}
    </button>
</template>

