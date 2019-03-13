import axios from "axios";
export default {
    // 使用命名空间
    namespaced: true,

    // 初始数据
    state: {
        uname: localStorage.getItem("uname") || "",
        realname: localStorage.getItem("realname") || "",
    },

    actions: {
        // 处理登录指令
        login(obj, data) {
            return new Promise((reslove, reject) => {
                axios({
                    method: "POST",
                    url: "/admin/account/login",
                    data,
                    withCredentials: true,
                }).then((res) => {
                    const { message, status } = res.data;
                    if (status === 0) {
                        localStorage.setItem("uname", message.uname);
                        localStorage.setItem("realname", message.realname);
                        reslove();
                    } else {
                        reject()
                    }

                })

            })
        },
        islogin(obj, fn) {
            axios({
                method: "Get",
                url: "/admin/account/islogin",
            }).then((res) => {
                const { code } = res.data;
                if (code == 'nologin') {                    
                    fn();
                }
            })

        },
        outLogin(obj,fn) {
            axios({
                method:"GET",
                url:"/admin/account/logout",
            }).then((res) => {
                const {status} = res.data;
                if(status === 0 ) {
                    localStorage.removeItem("uname");
                    localStorage.removeItem("realname");
                    fn();
                }
            })
        }
    }

}