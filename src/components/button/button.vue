<template>
  <div class="menu" @click="click()">menu</div>
</template>

<script>
export default {
  name: 'button',
  methods: {
    click() {
      console.log('menu clicked');
    },
  },
};
</script>

<style scoped>
.button {
  border: solid 1px red;
}
</style>
