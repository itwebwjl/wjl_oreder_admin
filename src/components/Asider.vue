<template>
  <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
    <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']">
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-navigate"></Icon>Item 1
        </template>
        <MenuItem name="1-1">
          <router-link to="/admin/order">订单页面</router-link>
        </MenuItem>
        <MenuItem name="1-2">
          <router-link to="/admin/upload">图片上传</router-link>
        </MenuItem>
        <MenuItem name="1-3">Option 3</MenuItem>
      </Submenu>
    </Menu>
  </Sider>
</template>

<script>
export default {};
</script>

<style scoped>
a {
  color: #fff;
}
/* .ivu-menu-item-active {
  background: red !important;
} */

</style>
