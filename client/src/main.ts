import { createApp } from 'vue'
import './assets/styles.css'
import App from './App.vue'
import Router from './router/router'

const app = createApp(App)

app.use(Router);
app.mount('#app')
