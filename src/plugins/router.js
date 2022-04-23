import { createRouter, createWebHistory } from 'vue-router'
import Login from '../modules/auth/Login.vue';
import Dashboard from '../modules/dashboard/Dashboard.vue';
import AuthService from '../modules/auth/auth-service';

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        name: 'dashboard',
        meta: {
            needsAuth: true,
        },
        component: Dashboard
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})


router.beforeEach(async (to, from) => {
    if (to.meta.needsAuth) {
        try {
            await AuthService.verifyAuth();
        } catch {
            return { name: 'login' };
        }
    }
})

export default router;
