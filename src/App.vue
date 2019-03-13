<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  mounted(){
    // dispatch可以穿两个参数，第一个为模块名字/指令，第二个为对象
    this.$store.dispatch("user/islogin",() => {
      this.$Message.warning('你还未登录，请先登录');
      setTimeout(() => {
         this.$router.push("/login");
      },500);
    })
  }
};
</script>


<style>
.mg20 {
  margin: 20px 0;
}
</style>
