import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/home',
            name: 'home',
            component: HomeView,
            meta: { layout: 'BlankLayout' }
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { guest: true, layout: 'BlankLayout' }
        },
        {
            path: '/dailyRoutineCheck',
            name: 'dailyRoutineCheck',
            component: () => import('../views/DailyRoutineCheck.vue'),
            meta: { requiresAuth: true, layout: 'DefaultLayout' }
        },
        // Placeholder Routes
        {
            path: '/ping',
            name: 'ping',
            component: () => import('../views/PingView.vue'),
            meta: { requiresAuth: true, layout: 'DefaultLayout' }
        },
        {
            path: '/wifi',
            name: 'wifi',
            component: () => import('../views/WifiView.vue'),
            meta: { requiresAuth: true, layout: 'DefaultLayout' }
        },
        {
            path: '/cpe',
            name: 'cpe',
            component: () => import('../views/CpeControlView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/pc',
            name: 'pc',
            component: () => import('../views/PcControlView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('../views/DailyRoutineCheck.vue'), // Temporary
            meta: { requiresAuth: true, layout: 'DefaultLayout' }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login')
    } else if (to.meta.guest && authStore.isAuthenticated) {
        next('/dailyRoutineCheck')
    } else {
        next()
    }
})

export default router
