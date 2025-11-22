import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

// Global Styles
import './assets/styles/main.scss'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    primary: '#007AFF', // Apple Blue
                    secondary: '#5856D6', // Apple Purple
                    accent: '#34C759', // Apple Green
                    background: '#F5F5F7', // Apple Light Gray
                    surface: '#FFFFFF',
                },
            },
            dark: {
                colors: {
                    primary: '#0A84FF',
                    secondary: '#5E5CE6',
                    accent: '#30D158',
                    background: '#000000',
                    surface: '#1C1C1E',
                },
            },
        },
    },
})

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

// Initialize Auth Store
import { useAuthStore } from './store/auth'
const authStore = useAuthStore()
authStore.loadTokenFromStorage()

// Initialize App Store & Theme
import { useAppStore } from './store/appStore'
import { watch } from 'vue'

const appStore = useAppStore()
appStore.initializeTheme()

// Set initial Vuetify theme
vuetify.theme.global.name.value = appStore.currentTheme

// Watch for theme changes in store and update Vuetify
watch(
    () => appStore.currentTheme,
    (newTheme) => {
        vuetify.theme.global.name.value = newTheme
    }
)

app.mount('#app')
