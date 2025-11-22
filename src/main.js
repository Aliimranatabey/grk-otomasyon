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
        defaultTheme: 'dark',
        themes: {
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

// Initialize App Store
import { useAppStore } from './store/appStore'
const appStore = useAppStore()

app.mount('#app')
