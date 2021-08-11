<template>
    <u-menu default-active="1.3.2">
        <template v-slot:title>标题</template>
        <u-submenu index="1">
            <template v-slot:title>选项一</template>
            <u-menu-item index="1.1">选项1.1</u-menu-item>
            <u-menu-item index="1.2">选项1.2</u-menu-item>
            <u-submenu index="1.3">
                <template v-slot:title>选项1.3</template>
                <u-menu-item index="1.3.1">选项1.3.1</u-menu-item>
                <u-menu-item index="1.3.2">选项1.3.2</u-menu-item>
            </u-submenu>
            <u-menu-item index="1.24">选项1.4</u-menu-item>
        </u-submenu>
        <u-menu-item index="2">选项二</u-menu-item>
        <u-menu-item index="3">选项三</u-menu-item>
    </u-menu>
</template>

<script>
export default {
  name: 'menu',
};
</script>

<style scoped>

</style>
