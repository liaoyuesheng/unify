<template>
    <u-date-picker
            v-model="date"
            @change="change"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"></u-date-picker>
    <router-view/>
</template>

<script>
export default {
  name: 'date-picker',
  data() {
    return {
      date: new Date(),
    };
  },
  methods: {
    change(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped>

</style>
