<script>
const DEFAULT_MAX_OPTIONS = 6;

export default {
    inheritAttrs: false,
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        options: {
            type: Array,
            default: () => [],
        },
        maxOptions: {
            type: Number,
            default: DEFAULT_MAX_OPTIONS,
        },
        filter: {
            type: Function,
        },
        getDisplayValue: {
            type: Function,
            required: false,
        },
        placeholder: {
            type: String,
        },
    },
    emits: ['update:isOpen', 'select', 'blur', 'focus'],
    data() {
        return {
            inputValue: '',
            disableOutsideClick: false,
            focusedIndex: 0,
        };
    },
    computed: {
        optionsFiltered() {
            const suggestionFilter = typeof this.filter === 'function' ? this.filter : this.suggestionFilterDefault;

            return this.options
                .filter((item) => suggestionFilter(item, this.inputValue))
                .sort((a, b) => {
                    // set coin from query on first position
                    if (a === this.inputValue) {
                        return -1;
                    } else if (b === this.inputValue) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                .slice(0, this.maxOptions);
        },
    },
    watch: {
        isOpen(newVal) {
            if (newVal) {
                setTimeout(() => {
                    // depends on if $refs.input is VueComponent or HtmlElement
                    const inputEl = this.$refs.input.$el || this.$refs.input;
                    inputEl.focus();
                }, 50);
                // prevent immediate close after opening
                this.disableOutsideClick = true;
                setTimeout(() => {
                    this.disableOutsideClick = false;
                }, 500);
            }
        },
    },
    created() {
        window.document.documentElement.addEventListener('click', this.handleOutsideClick);
        window.document.documentElement.addEventListener('keydown', this.handleEscape);
        window.document.documentElement.addEventListener('keydown', this.handleKeyNavigation);
    },
    unmounted() {
        window.document.documentElement.removeEventListener('click', this.handleOutsideClick);
        window.document.documentElement.removeEventListener('keydown', this.handleEscape);
        window.document.documentElement.removeEventListener('keydown', this.handleKeyNavigation);
    },
    methods: {
        suggestionFilterDefault(item, query) {
            if (!query) {
                return true;
            }
            query = query.toLowerCase();
            const value = this.getDisplayValue(item).toLowerCase();
            // keep only values started with query (e.g. remove "WALLET" for "LET" query)
            return value.indexOf(query) === 0;
        },
        handleOptionClick(option) {
            this.$emit('select', option);
            this.close();
        },
        handleOutsideClick(e) {
            if (!this.isOpen) {
                return;
            }
            if (this.disableOutsideClick) {
                return;
            }
            // outside click
            if (this.$refs.suggestionPanel && e.target !== this.$refs.suggestionPanel && !this.$refs.suggestionPanel.contains(e.target)) {
                this.close();
            }
        },
        handleEscape(e) {
            if (!this.isOpen) {
                return;
            }
            if (e.code === 'Escape' || e.keyCode === 27) {
                e.preventDefault();
                this.close();
            }
        },
        close() {
            this.$emit('update:isOpen', false);
            this.inputValue = '';
            this.focusedIndex = 0;
        },
        handleKeyNavigation(e) {
            if (!this.isOpen || this.optionsFiltered.length === 0) {
                return;
            }

            // Arrow down
            if (e.code === 'ArrowDown' || e.keyCode === 40) {
                e.preventDefault();
                this.focusedIndex = (this.focusedIndex + 1) % this.optionsFiltered.length;
            }
            // Arrow up
            else if (e.code === 'ArrowUp' || e.keyCode === 38) {
                e.preventDefault();
                this.focusedIndex = (this.focusedIndex - 1 + this.optionsFiltered.length) % this.optionsFiltered.length;
            }
            // Enter key is handled in the input element
        },
    },
};
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
                :key="getDisplayValue(suggestion)"
                :class="{ 'is-focused': focusedIndex === optionsFiltered.indexOf(suggestion) }"
                @click="handleOptionClick(suggestion)"
            >
                <slot name="option" :option="suggestion">
                    <span>{{ getDisplayValue(suggestion) }}</span>
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
