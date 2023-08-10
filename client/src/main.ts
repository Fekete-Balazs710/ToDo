import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import './assets/styles.css'
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import App from './App.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'

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

const app = createApp(App)

app.use(router)

app.mount('#app')

//createApp(App).mount('#app')
