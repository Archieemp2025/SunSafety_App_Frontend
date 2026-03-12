import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',

            name: 'login',
            component: Login,
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: { requiresAuth: true },
        },
    ],
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = sessionStorage.getItem('authenticated') === 'true'

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/')
    } else {
        next()
    }
})

export default router