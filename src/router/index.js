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
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/DashboardView.vue'),
            meta: { requiresAuth: true, layout: 'DefaultLayout' }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login')
    } else if (to.meta.guest && authStore.isAuthenticated) {
        next('/dashboard')
    } else {
        next()
    }
})

export default router
