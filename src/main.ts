// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Импортируем стили Bootstrap
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')