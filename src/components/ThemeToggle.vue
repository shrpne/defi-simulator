<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

type Theme = 'light' | 'dark' | 'system';
const theme = ref<Theme>('system');
const isDark = ref(false);

function updateThemeBasedOnSystem() {
    if (theme.value === 'system') {
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
}

onMounted(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
        theme.value = savedTheme;
    }

    updateThemeBasedOnSystem();
    window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', updateThemeBasedOnSystem);

    if (savedTheme === 'dark') {
        isDark.value = true;
    }
});

watch(theme, (newValue) => {
    localStorage.setItem('theme', newValue);
    if (theme.value === 'dark') {
        isDark.value = true;
    } else if (theme.value === 'system') {
        updateThemeBasedOnSystem();
    } else if (theme.value === 'light') {
        isDark.value = false;
    }
});

watch(isDark, () => {
    document.documentElement.classList.toggle('dark', isDark.value);
});

function toggleTheme() {
    if (theme.value === 'light') {
        theme.value = 'system';
    } else if (theme.value === 'system') {
        theme.value = 'dark';
    } else {
        theme.value = 'light';
    }
}
</script>

<template>
    <button
        @click="toggleTheme"
        class="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-slate-800 transition-colors"
    >
        <svg v-if="theme === 'dark'" class="h-5 w-5">
            <use xlink:href="/img/icon-theme-dark.svg#icon-dark"></use>
        </svg>
        <svg v-else-if="theme === 'light'" class="h-5 w-5">
            <use xlink:href="/img/icon-theme-light.svg#icon-light"></use>
        </svg>
        <svg v-else class="h-5 w-5">
            <use xlink:href="/img/icon-theme-light-dark.svg#icon-light-dark" transform="translate(0.5 0.5) scale(0.95)" ></use>
        </svg>
    </button>
</template>
