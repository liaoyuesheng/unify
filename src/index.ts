import { App } from 'vue';
import Menu from './components/menu/menu.vue';
import Submenu from './components/menu/submenu.vue';
import MenuItem from './components/menu/menu-item.vue';
import UDatePicker from './components/date-picker/date-picker.vue';

const components = [
  Menu,
  Submenu,
  MenuItem,
  UDatePicker,
];

function install(app: App) {
  components.forEach((component: any) => {
    app.component(component.name, component);
  });
}

export default {
  install,
};
