import Vue from 'vue'
import App from './App.vue'
// 引入路由
import VueRouter from 'vue-router'
// 注册路由
Vue.use(VueRouter)
// 引入iview 和 样式
import iView from 'iview'
// 注册iview
import 'iview/dist/styles/iview.css';
Vue.use(iView);
// 引入axios 
import axios from "axios";
// 挂载实例
Vue.prototype.$axios = axios;
// 引入仓库,然后去根实例挂载仓库
import store from "./store/index.js"

axios.defaults.baseURL = 'http://localhost:8899';

// 引入页面组件
import Login from './pages/Login.vue';
import Admin from './pages/Admin.vue';
import Order from './pages/order/Order.vue';
import OrderEdit from "./pages/order/OrderEdit.vue";
import Main from "./components/Main.vue";
import Upload from "./pages/upload/Upload.vue"
// 配置路由
const routes = [
  { path: "/", redirect: "/admin/main" },
  { path: "/login", component: Login, meta: "登录页" },
  { path: "/admin", component: Admin, meta: "后台系统", redirect:"/admin/main",
    children: [
      { path:"main",component:Main,meta:"后台首页"},
      { path: "order", component: Order, meta: "订单页面" ,},
      { path:"order-edit/:id",component:OrderEdit,meta:"订单编辑" },
      { path:"upload",component:Upload,meta:"图片上传"},
    ]
  }
];

// 创建路由对象
const router = new VueRouter(({
  routes
}))



Vue.config.productionTip = false
new Vue({
  el: "#app",
  render: function (createElement) {
    return createElement(App);
  },
  // 挂载路由
  router,
  // 挂载仓库
  store
})
