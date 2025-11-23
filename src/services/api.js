import axios from 'axios'
import { useAuthStore } from '../store/auth'

// Create Axios instance
const api = axios.create({
    baseURL: 'https://example.com/api', // Replace with your actual API base URL
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        // We need to access the store inside the interceptor to avoid circular dependency issues
        // if the store was imported at the top level before Pinia is active.
        // However, since we are inside a function call (the interceptor), 
        // Pinia should be active when requests are made (after app mount).
        const authStore = useAuthStore()
        
        if (authStore.token) {
            config.headers.Authorization = `Bearer ${authStore.token}`
        }
        
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const authStore = useAuthStore()
        
        if (error.response && error.response.status === 401) {
            // Unauthorized - clear auth and potentially redirect
            authStore.clearAuth()
            
            // Optional: Redirect to login if not already there
            // window.location.href = '/login' 
            // Or let the router guard handle it on next navigation
        }
        
        return Promise.reject(error)
    }
)

// Mock Services
export const getBrands = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { title: 'Brand A', value: 'Brand A', models: ['Model X', 'Model Y'] },
                { title: 'Brand B', value: 'Brand B', models: ['Model Z'] }
            ])
        }, 500)
    })
}

export const saveNewDevice = (brand, model) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Device Saved: ${brand} - ${model}`)
            resolve({ success: true })
        }, 500)
    })
}

export const startPingTest = (config) => {
    console.log('Starting Ping Test with config:', config)
    return Promise.resolve({ success: true })
}

export default api
