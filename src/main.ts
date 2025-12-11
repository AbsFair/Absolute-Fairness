import './assets/css/main.css'
import App from './App.vue'
import router from '@/index.ts'
import { Buffer } from 'buffer'
import { createApp } from 'vue'

window.Buffer = Buffer

const app = createApp(App)

app.use(router)

app.mount('#app')
