<template>
  <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
    <Row type="flex" justify="space-between">
      <i-col span="8">{{username}}</i-col>
      <i-col span="8">{{identity}}</i-col>
      <i-col span="8">
        <i-button type="primary" @click="outLogin">退出登录</i-button>
      </i-col>
    </Row>
  </Header>
</template>

<script>
  // 引入头部信息
import { mapState } from "vuex";
export default {

  data() {
    return {
    };
  },
  computed :{
    ...mapState("user",{
      username:"uname",
      identity:"realname",
    })
  },
  methods:{
    outLogin(){
      this.$store.dispatch("user/outLogin",() => {
         this.$Message.success('用户已注销');
         this.$router.push("/login");
      })
    },
  }
  
};
</script>

<style>
</style>
