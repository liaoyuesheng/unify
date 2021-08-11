<template>
    <li class="u-submenu" :class="{'is-opened': opened, 'is-active': active}">
        <div class="u-submenu-title" @click="toggle">
            <span><slot name="title"></slot></span>
            <i class="u-submenu-arrow"></i>
        </div>
        <transition name="u-collapse"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @before-leave="beforeLeave"
                    @after-leave="afterLeave"
        >
            <ul class="u-menu-list" v-show="opened">
                <slot></slot>
            </ul>
        </transition>
    </li>
</template>

<script lang="ts">
/* eslint-disable no-param-reassign,@typescript-eslint/no-explicit-any */
import { ComponentInternalInstance, defineComponent, getCurrentInstance } from 'vue';
import menuCommon from '@/components/menu/menu-common';

export default defineComponent({
  name: 'USubmenu',
  props: {
    index: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      opened: false,
      children: {} as any,
    };
  },
  computed: {
    active(): boolean {
      return Object.keys(this.children).some((k) => this.children[k].active === true);
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
    toggle() {
      if (this.opened) {
        this.close();
      } else {
        this.open();
      }
    },

    open() {
      this.opened = true;
    },

    close() {
      this.opened = false;
    },

    enter(el: HTMLElement) {
      el.style.height = `${el.scrollHeight}px`;
    },

    afterEnter(el: HTMLElement) {
      el.style.height = '';
    },

    beforeLeave(el: HTMLElement) {
      el.style.height = `${el.scrollHeight}px`;
    },

    afterLeave(el: HTMLElement) {
      el.style.height = '';
    },

    addChild(item: any) {
      this.children[item.index] = item;
    },
  },
  mounted(this: any) {
    this.rootMenu.addSubmenu(this);
    if (this.parentMenu.$options.name === 'USubmenu') {
      this.parentMenu.addChild(this);
    }
  },
});
</script>
