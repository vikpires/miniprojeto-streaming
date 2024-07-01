import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import './assets/tailwind.css';


import 'primevue/resources/themes/saga-blue/theme.css';       // Theme
import 'primevue/resources/primevue.min.css';                 // Core CSS
import 'primeicons/primeicons.css';  
import ToastService from "primevue/toastservice"
//import { setComponent } from './modules/component.module';
import { setPrimeVueComponents } from './modules/primevue.module';

const app = createApp(App);
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
//setComponent(app)
setPrimeVueComponents(app)
app.mount('#app')