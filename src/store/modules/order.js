import axios from "axios";
export default {
    namespaced: true,

    state: {
        orderInfo: [],
        totalcount: 0,
    },

    actions: {
        getOrder({ state }, data) {
            // 第二次刷新或者登陆页面首先获取本地存储数据判断时间是否超过10s
            console.log(data);
            let orderlocal = JSON.parse(localStorage.getItem("第六组") || "{}");
            if (JSON.stringify(orderlocal) == "{}") { console.log('数据存入本地'); orderlocal.time = 0; }
            console.log(orderlocal);
            if (data.pageSize!=orderlocal.pageSize||data.order_status != '' || data.pageSize !=8 || data.orderstatus != '' || data.pageIndex != 1 || data.vipname != ''||Date.now() - orderlocal.time > 1000 * 15) {
                axios({
                    methos: "get",
                    url: `/admin/order/getorderlist?orderstatus=${
                        data.order_status
                        }&vipname=${data.vipname}&pageIndex=${
                        data.pageIndex
                        }&pageSize=${data.pageSize}`
                }).then(res => {
                    console.log("第一次加载页面或者页面停留超过15s刷新页面或者重新登录页面,或者数据已经过期,重新发送请求渲染列表");
                    res.data.time = Date.now();
                    localStorage.setItem("第六组", JSON.stringify(res.data));


                    const { message, status, totalcount } = res.data;

                    message.forEach((v) => {
                        v.address_area = `${v.area}${v.address}`
                    });
                    // 根据id排序订单
                    message.sort((a, b) => {
                        return a.id - b.id
                    })
                    if (status === 0) {
                        state.orderInfo = message;
                        state.totalcount = totalcount;
                    }
                });
            } else {
                // 登录之后把第一次请求订单内容的数据存入本地存储，当10s之内刷新页面都是根据本地存储获取数据，减轻服务器压力
                console.log("页面停留少于15s刷新页面或者重新登录页面，根据本地存储数据渲染订单");

                // 利用本地存储数据渲染
                const { message, status, totalcount } = orderlocal;

                message.forEach((v) => {
                    v.address_area = `${v.area}${v.address}`
                });
                // 根据id排序订单
                message.sort((a, b) => {
                    return a.id - b.id
                })
                if (status === 0) {
                    state.orderInfo = message;
                    state.totalcount = totalcount;
                }

            }



        }
    }

}