import { computed, inject, ComponentInternalInstance } from 'vue';

export default function menuCommon(instance: ComponentInternalInstance) {
  const rootMenu = inject('rootMenu');

  const parentMenu = computed(() => {
    let { parent } = instance;
    while (parent && ['UMenu', 'USubmenu'].indexOf(parent.type.name as string) === -1) {
      parent = parent.parent;
    }
    return parent && parent.proxy;
  });

  return {
    rootMenu,
    parentMenu,
  };
}
