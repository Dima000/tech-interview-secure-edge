import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue';
import HelloWorld from './components/HelloWorld.vue';

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        name: 'home',
        component: HelloWorld
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router;
