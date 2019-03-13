<template>
  <Breadcrumb :style="{margin: '16px 0'}" v-model="breadInfo">
    <BreadcrumbItem  v-for="(item,index) in breadInfo" :key="index" :to="item.src">{{item.title}}</BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    breadInfo: function() {
      let newArr = this.$route.matched.map(v => {
        return {
          src: v.path,
          title: v.meta
        };
      });
      return newArr;
    }
  }
};
</script>

<style>
</style>
