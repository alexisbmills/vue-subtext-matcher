import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import './style.css'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import router from './router'
import { highlightDirective } from './directives/highlight'

const app = createApp(App)

app.use(PrimeVue)
app.use(router)
app.directive('highlight', highlightDirective)

app.mount('#app')
