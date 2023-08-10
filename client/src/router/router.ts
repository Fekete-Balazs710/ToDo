import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

//Creating routes for multiple pages
const router = createRouter({
    history: createWebHistory(),
    routes:[
        { path: '/login', component: Login},
        { path: '/signup', component: Signup},
        { path: '/dashboard', component: Dashboard},
        { path: "/", component: Login}
    ]
});

export default router;