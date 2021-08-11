<template>
    <u-menu class="menu" :router="true" :default-active="path">
      <template v-slot:title>Unify UI</template>
      <u-menu-item index="/">Menu 菜单</u-menu-item>
      <u-menu-item index="/date-picker">DatePicker 日期选择器</u-menu-item>
    </u-menu>
    <div class="content">
      <router-view/>
    </div>
</template>

<script type="ts">
import { useRoute } from 'vue-router';

export default {
  data() {
    return {
      path: '',
    };
  },
  setup() {
    const route = useRoute();
    console.log(route.path);
  },
  mounted() {
    setTimeout(() => {
      this.path = this.$route.path;
    }, 0);
  },
};
</script>

<style lang="scss">
  .menu {
    position: fixed;
    top: 0;
    left: 0;
  }

.content {
  padding-left: 280px;
}
</style>
