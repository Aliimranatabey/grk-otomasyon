import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
    // State
    const lastServerCheck = ref(null)
    const sampleData = ref([
        { id: 1, title: 'Project Alpha', status: 'Active', progress: 75 },
        { id: 2, title: 'Project Beta', status: 'Pending', progress: 30 },
        { id: 3, title: 'Project Gamma', status: 'Completed', progress: 100 },
    ])

    return { 
        lastServerCheck,
        sampleData
    }
})
