import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Menu from '../views/Menu.vue';
import DatePicker from '../views/DatePicker.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Menu',
    component: Menu,
  },
  {
    path: '/date-picker',
    name: 'DatePicker',
    component: DatePicker,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
