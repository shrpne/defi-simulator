<script setup lang="ts" generic="Option">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

const DEFAULT_MAX_OPTIONS = 6;

defineOptions({
    inheritAttrs: false,
});

// Props definition
type Props = {
    isOpen: boolean,
    options?: Array<Option>,
    maxOptions?: number,
    filter?: (item: Option, query: string) => boolean,
    getDisplayValue?: (option: Option) => string,
    placeholder?: string,
}

const props = withDefaults(defineProps<Props>(), {
    options: () => [],
    maxOptions: DEFAULT_MAX_OPTIONS
});

// Emits
const emit = defineEmits<{
    'update:isOpen': [value: boolean]
    'select': [option: Option]
}>();

// Refs
const inputValue = ref('');
const disableOutsideClick = ref(false);
const focusedIndex = ref(0);
const suggestionPanel = ref<HTMLElement>();
const input = ref<HTMLElement>();

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
watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            // depends on if inputRef is VueComponent or HtmlElement
            const inputEl = input.value?.$el || input.value;
            inputEl?.focus();
        }, 50);
        // prevent immediate close after opening
        disableOutsideClick.value = true;
        setTimeout(() => {
            disableOutsideClick.value = false;
        }, 500);
    }
});

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
    const value = props.getDisplayValue!(item).toLowerCase();
    // keep only values started with the query (e.g., remove "WALLET" for "LET" query)
    return value.indexOf(query) === 0;
}

function handleOptionClick(option: Option) {
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
    focusedIndex.value = 0;
}

function handleKeyNavigation(e: KeyboardEvent) {
    if (!props.isOpen || optionsFiltered.value.length === 0) {
        return;
    }

    // Arrow down
    if (e.code === 'ArrowDown' || e.keyCode === 40) {
        e.preventDefault();
        focusedIndex.value = (focusedIndex.value + 1) % optionsFiltered.value.length;
    }
    // Arrow up
    else if (e.code === 'ArrowUp' || e.keyCode === 38) {
        e.preventDefault();
        focusedIndex.value = (focusedIndex.value - 1 + optionsFiltered.value.length) % optionsFiltered.value.length;
    }
    // Enter key is handled in the input element
}
</script>

<template>
    <div class="h-field__dropdown" ref="suggestionPanel" v-show="isOpen">
        <div class="h-field__dropdown-field">
            <input
                ref="input"
                class="h-field__dropdown-input"
                type="text"
                :placeholder="placeholder || 'Search…'"
                v-bind="$attrs"
                v-model="inputValue"
                @keyup.enter="optionsFiltered.length > 0 && handleOptionClick(optionsFiltered[focusedIndex])"
            />
            <img class="h-field__dropdown-field-icon" src="@/assets/img/icon-search.svg" alt="" role="presentation" />
        </div>

        <div class="h-field__suggestion-list">
            <button
                class="h-field__suggestion-item u-semantic-button"
                type="button"
                v-for="suggestion in optionsFiltered"
                :key="props.getDisplayValue!(suggestion)"
                :class="{ 'is-focused': focusedIndex === optionsFiltered.indexOf(suggestion) }"
                @click="handleOptionClick(suggestion)"
            >
                <slot name="option" :option="suggestion">
                    <span>{{ props.getDisplayValue!(suggestion) }}</span>
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
