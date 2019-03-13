import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
// 引入用户模块
import user from "./modules/user"
import order from "./modules/order";

// 创建一个仓库 然后去main.js引入仓库
export default new Vuex.Store({
    // 导入用户模块数据
    modules:{
        user,
        order
    }
})