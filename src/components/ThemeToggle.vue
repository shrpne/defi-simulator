<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

type Theme = 'light' | 'dark' | 'system';
const theme = ref<Theme>('system');
const themeClass = ref<Exclude<Theme, 'system'> | ''>('');

function updateThemeBasedOnSystem() {
    if (theme.value === 'system') {
        themeClass.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        // themeClass.value = '';
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
});

watch(theme, (newValue) => {
    localStorage.setItem('theme', newValue);
    if (theme.value === 'system') {
        updateThemeBasedOnSystem();
    } else {
        themeClass.value = theme.value;
    }
});

watch(themeClass, () => {
    document.documentElement.classList.toggle('dark', themeClass.value === 'dark');
    document.documentElement.classList.toggle('light', themeClass.value === 'light');
}, {
    immediate: true,
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
