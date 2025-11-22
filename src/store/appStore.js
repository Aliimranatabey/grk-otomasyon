import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
    // State
    const isDarkTheme = ref(false)
    const lastServerCheck = ref(null)
    const sampleData = ref([
        { id: 1, title: 'Project Alpha', status: 'Active', progress: 75 },
        { id: 2, title: 'Project Beta', status: 'Pending', progress: 30 },
        { id: 3, title: 'Project Gamma', status: 'Completed', progress: 100 },
    ])

    // Getters
    const currentTheme = computed(() => isDarkTheme.value ? 'dark' : 'light')

    // Actions
    function toggleTheme() {
        isDarkTheme.value = !isDarkTheme.value
        localStorage.setItem('theme_preference', currentTheme.value)
    }

    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme_preference')
        if (savedTheme) {
            isDarkTheme.value = savedTheme === 'dark'
        } else {
            // Default to system preference if no saved preference
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            isDarkTheme.value = systemDark
        }
    }

    return { 
        isDarkTheme, 
        lastServerCheck,
        currentTheme, 
        sampleData, 
        toggleTheme,
        initializeTheme
    }
})
