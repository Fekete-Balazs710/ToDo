import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

// Creating routes for multiple pages
const router = createRouter({
    history: createWebHistory(),
    routes:[
        { 
            path: '/login', 
            name: 'login', 
            component: Login 
        },
        { 
            path: '/signup', 
            name: 'signup', 
            component: Signup 
        },
        { 
            path: '/dashboard/:userId', 
            name: 'dashboard', 
            component: Dashboard,
            meta: { requiresAuth: true } 
        },
        { 
            path: "/", 
            name: 'default', 
            redirect: "/login" 
        },
        {
            path: '/:catchAll(.*)',
            redirect: '/login'
        }
    ]
});

router.beforeEach((to, _, next) => {
    const authToken = document.cookie.split(';')
    .find(cookie => cookie.trim().startsWith('authToken='))
    ?.split('=')[1] || '';

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!authToken) {
            next({ name: 'login' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;