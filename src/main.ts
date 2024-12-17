import { createApp } from 'vue';
import { setComponents } from './modules/component.module';
import { setPrimeVueComponents } from './modules/primevue.module';
import App from './App.vue';

import './assets/tailwind.css';
import router from './router';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import ToastService from "primevue/toastservice";

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
setComponents(app);
setPrimeVueComponents(app);
app.mount('#app');

export default app;