import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import unify from '../src/index';

const app = createApp(App);
app.use(router).use(unify).mount('#app');
