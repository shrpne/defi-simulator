<script setup lang="ts" generic="Option extends string | object">
import { ref, computed, onMounted, onUnmounted, watch, nextTick, useTemplateRef } from 'vue';

const DEFAULT_MAX_OPTIONS = 6;

defineOptions({
    inheritAttrs: false,
});

// Props definition
type Props = {
    isOpen: boolean;
    options?: Array<Option>;
    maxOptions?: number;
    filter?: (item: Option, query: string) => boolean;
    getSuggestionValue?: (option: Option) => string;
    getSuggestionDisplay?: (option: Option) => string;
    placeholder?: string;
};

const props = withDefaults(defineProps<Props>(), {
    options: () => [],
    maxOptions: DEFAULT_MAX_OPTIONS,
    getSuggestionValue: (val: Option) => val.toString(),
});

// Emits
const emit = defineEmits<{
    'update:isOpen': [value: boolean];
    select: [option: Option];
}>();

// Refs
const inputValue = ref('');
const disableOutsideClick = ref(false);
const focusedIndex = ref(-1);
const suggestionPanel = ref<HTMLElement>();
const inputRef = ref<HTMLElement>();
const optionRef = useTemplateRef('optionRef');

// Computed
const optionsFiltered = computed(() => {
    const suggestionFilter = typeof props.filter === 'function' ? props.filter : suggestionFilterDefault;

    return props.options
        .filter((item) => suggestionFilter(item, inputValue.value))
        .sort((a, b) => {
            // set coin from the query on the first position
            if (a === inputValue.value) {
                return -1;
            } else if (b === inputValue.value) {
                return 1;
            } else {
                return 0;
            }
        })
        .slice(0, props.maxOptions);
});

// Watch effects
watch(
    () => props.isOpen,
    (newVal) => {
        if (newVal) {
            nextTick(() => {
                // depends on if inputRef is VueComponent or HtmlElement
                const inputEl = /*inputRef.value?.$el ||*/ inputRef.value;
                inputEl?.focus();
            });
            // prevent immediate close after opening
            disableOutsideClick.value = true;
            setTimeout(() => {
                disableOutsideClick.value = false;
            }, 300);
        }
    },
);

// Lifecycle hooks
onMounted(() => {
    window.document.documentElement.addEventListener('click', handleOutsideClick);
    window.document.documentElement.addEventListener('keydown', handleEscape);
    window.document.documentElement.addEventListener('keydown', handleKeyNavigation);
});

onUnmounted(() => {
    window.document.documentElement.removeEventListener('click', handleOutsideClick);
    window.document.documentElement.removeEventListener('keydown', handleEscape);
    window.document.documentElement.removeEventListener('keydown', handleKeyNavigation);
});

// Methods
function suggestionFilterDefault(item: Option, query: string) {
    if (!query) {
        return true;
    }
    query = query.toLowerCase();
    const value = props.getSuggestionValue(item).toLowerCase();
    const display = props.getSuggestionDisplay?.(item).toLowerCase() || '';
    // keep only values started with the query (e.g., remove "WALLET" for "LET" query)
    return value.indexOf(query) === 0 || display.indexOf(query) === 0;
}

function handleOptionClick(option: Option) {
    // maybe fired twice (e.g., enter fires onEnter and onClick) so checking isOpen
    if (!props.isOpen) {
        return;
    }
    emit('select', option);
    close();
}

function handleOutsideClick(e: MouseEvent) {
    if (!props.isOpen) {
        return;
    }
    if (disableOutsideClick.value) {
        return;
    }
    // outside click
    if (suggestionPanel.value && e.target !== suggestionPanel.value && !suggestionPanel.value.contains(e.target as Node)) {
        close();
    }
}

function handleEscape(e: KeyboardEvent) {
    if (!props.isOpen) {
        return;
    }
    if (e.code === 'Escape' || e.keyCode === 27) {
        e.preventDefault();
        close();
    }
}

function close() {
    emit('update:isOpen', false);
    inputValue.value = '';
    // onOpen focuses input and onFocus sets focusedIndex to -1
    // focusedIndex.value = -1;
}

function handleKeyNavigation(e: KeyboardEvent) {
    if (!props.isOpen || optionsFiltered.value.length === 0) {
        return;
    }

    // Arrow down
    if (e.code === 'ArrowDown' || e.keyCode === 40) {
        e.preventDefault();
        focusedIndex.value = Math.min(focusedIndex.value + 1, optionsFiltered.value.length - 1);
    }
    // Arrow up
    else if (e.code === 'ArrowUp' || e.keyCode === 38) {
        e.preventDefault();
        focusedIndex.value = Math.max(focusedIndex.value - 1, -1);
    }
    // Enter key is handled in the input element
}

watch(focusedIndex, (newVal) => {
    if (newVal === -1) {
        inputRef.value?.focus();
    } else {
        optionRef.value?.[newVal].focus();
    }
})

function handleEnter(e: KeyboardEvent) {
    if (optionsFiltered.value.length > 0) {
        handleOptionClick(optionsFiltered.value[focusedIndex.value]);
    }
}
</script>

<template>
    <div
        class="h-field__dropdown"
        ref="suggestionPanel"
        v-show="isOpen"
        @keydown.enter="handleEnter"
    >
        <div class="h-field__dropdown-field">
            <input
                ref="inputRef"
                class="h-field__dropdown-input"
                type="text"
                :placeholder="placeholder || 'Search…'"
                v-bind="$attrs"
                v-model="inputValue"
                @focus="focusedIndex = -1"
            />
            <img class="h-field__dropdown-field-icon" src="@/assets/img/icon-search.svg" alt="" role="presentation" />
        </div>

        <div class="h-field__suggestion-list">
            <button
                class="h-field__suggestion-item u-semantic-button"
                type="button"
                ref="optionRef"
                v-for="(suggestion, index) in optionsFiltered"
                :key="props.getSuggestionValue(suggestion)"
                :class="{ 'is-focused': focusedIndex === optionsFiltered.indexOf(suggestion) }"
                @click="handleOptionClick(suggestion)"
                @focus="focusedIndex = index"
            >
                <slot name="option" :option="suggestion">
                    <span>{{ props.getSuggestionDisplay?.(suggestion) || props.getSuggestionValue(suggestion) }}</span>
                </slot>
            </button>
        </div>
    </div>
</template>

<style scoped>
.h-field__suggestion-item.is-focused {
    background-color: rgba(0, 0, 0, 0.05);
}
</style>
