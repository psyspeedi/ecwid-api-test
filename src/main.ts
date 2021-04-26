import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import 'primevue/resources/themes/saga-blue/theme.css' //theme
import 'primevue/resources/primevue.min.css' //core css
import 'primeicons/primeicons.css' //icons

import currencyFilter from '@/filters/currencyFilter'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.config.globalProperties.$filters = { currencyFilter }

app.mount('#app')
