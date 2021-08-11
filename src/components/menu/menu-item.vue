<template>
    <li class="u-menu-item" :class="{'is-active': active}" @click="itemClick">
        <slot></slot>
    </li>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import menuCommon from '@/components/menu/menu-common';
import {
  getCurrentInstance,
  ComponentInternalInstance,
  defineComponent,
} from 'vue';

export default defineComponent({
  name: 'UMenuItem',
  props: {
    index: {
      type: String,
      default: null,
    },
    route: [String, Object],
  },
  data() {
    return {};
  },
  computed: {
    active(this: any): boolean {
      return this.index === this.rootMenu.activeIndex;
    },
  },
  setup() {
    const { parentMenu, rootMenu } = menuCommon(getCurrentInstance() as ComponentInternalInstance);

    return {
      rootMenu,
      parentMenu,
    };
  },
  methods: {
    itemClick(this: any) {
      this.rootMenu.activeIndex = this.index;
    },
  },
  mounted(this: any) {
    if (this.parentMenu.$options.name === 'USubmenu') {
      this.parentMenu.addChild(this);
    }
  },
});
</script>

<style lang="scss">
@import "menu";
</style>
