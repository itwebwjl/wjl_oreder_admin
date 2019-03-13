<template>
  <div class="layout">
      <!-- 侧边栏 -->
    <app-asider></app-asider>

    <Layout :style="{marginLeft: '200px'}">
        <!-- 头部 -->
      <app-header></app-header>

      <Content :style="{padding: '0 16px 16px'}">
          <!-- 面包削 -->
        <app-breadcrumb></app-breadcrumb>
        <Card>
          <div style="height: 720px">
              <router-view></router-view>
          </div>
        </Card>
      </Content>
    </Layout>
  </div>
</template>
<script>
// 引入后台首页公共组件
import Asider from "../components/Asider";
import Header from "../components/Header.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
import Main from "../components/Main.vue";
import Order from "../pages/order/Order"
export default {
  name: "admin",
  data: function() {
    return{

    }
  },
  components: {
    "app-asider": Asider,
    "app-main": Main,
    "app-header": Header,
    "app-breadcrumb": Breadcrumb,
  }
};
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
