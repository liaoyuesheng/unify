<template>
    <div class="u-menu">
        <div class="u-menu-title">
            <slot name="title"></slot>
        </div>
        <ul class="u-menu-list">
            <slot></slot>
        </ul>
    </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UMenu',
  provide() {
    return {
      rootMenu: this,
    };
  },
  props: {
    defaultActive: {
      type: String,
      default: '',
    },
    router: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeIndex: this.defaultActive,
      submenus: {} as any,
    };
  },
  methods: {
    addSubmenu(sub: any): void {
      this.submenus[sub.index] = sub;
    },
    openMenuByActive() {
      Object.keys(this.submenus).forEach((k) => {
        const sub = this.submenus[k];
        sub.opened = sub.active;
      });
    },
    routeTo(path: string | object) {
      try {
        this.$router.push(path)
          .catch((e) => {
            console.error(e);
          });
      } catch (e) {
        console.error(e);
      }
    },
  },
  watch: {
    activeIndex(newValue) {
      if (this.router) {
        this.routeTo(newValue);
      }
    },
    defaultActive(newValue) {
      this.activeIndex = newValue;
    },
  },
  mounted() {
    this.openMenuByActive();
  },
});
</script>

<style lang="scss">
@import "menu";
</style>
