import { createApp } from 'vue'
import App from '../App.vue'
import '@/scss/style.scss'
import * as bootstrap from 'bootstrap'
import '@/app.css'
import router from '@/router/router.js'

createApp(App).use(router).mount('#app')
