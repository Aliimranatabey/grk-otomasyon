import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { layout: 'DefaultLayout' }
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { guest: true, layout: 'BlankLayout' }
        },
        {
            path: '/modul1',
            name: 'modul1',
            component: () => import('../views/Modul1View.vue'),
            meta: { requiresAuth: true, layout: 'DefaultLayout' }
        },
        // Placeholder Routes
        {
            path: '/ping',
            name: 'ping',
            component: () => import('../views/Modul1View.vue'), // Temporary
            meta: { requiresAuth: true, layout: 'DefaultLayout' }
        },
        {
            path: '/wifi',
            name: 'wifi',
            component: () => import('../views/Modul1View.vue'), // Temporary
            meta: { requiresAuth: true, layout: 'DefaultLayout' }
        },
        {
            path: '/cpe',
            name: 'cpe',
            component: () => import('../views/Modul1View.vue'), // Temporary
            meta: { requiresAuth: true, layout: 'DefaultLayout' }
        },
        {
            path: '/pc',
            name: 'pc',
            component: () => import('../views/Modul1View.vue'), // Temporary
            meta: { requiresAuth: true, layout: 'DefaultLayout' }
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('../views/Modul1View.vue'), // Temporary
            meta: { requiresAuth: true, layout: 'DefaultLayout' }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login')
    } else if (to.meta.guest && authStore.isAuthenticated) {
        next('/modul1')
    } else {
        next()
    }
})

export default router
