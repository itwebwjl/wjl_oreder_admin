<template>
  <div>
    <div class="mg20">
      <Row type="flex" justify="space-between">
        <Col span="6">
          <Input
            search
            enter-button
            placeholder="输入会员名字查询"
            v-model="order.vipname"
            @on-search="serOrdByName"
          />
        </Col>
        <Col span="6">
          <Select style="width:200px" v-model="order.order_status" @on-change="changeOrderStatus">
            <Option
              v-for="(item,index) in cityList"
              :value="item.value"
              :key="index"
            >{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
    </div>
    <Table :columns="columns" :data="orderList">
      <template slot-scope="{ row, index }" slot="action">
        <Button @click="check(row)" size="small" type="primary">查看</Button>
        <Button type="default" size="small" @click="toEditPag(row.id)" style="margin-left:5px">编辑</Button>
      </template>
    </Table>

    <div class="mg20">
      <Page
        :total="pageTotal"
        :page-size-opts="[4,6,8,10]"
        :page-size=8
        @on-change="changePage"
        @on-page-size-change="changePageSize"
        show-total
        show-sizer
        show-elevator
      />
    </div>
  </div>
</template>

<script>
// 引入仓库数据
import { mapState } from "vuex";
export default {
  data() {
    return {
      order: {
        pageIndex: 1,
        pageSize: 8,
        orderstatus: "",
        vipname: "",
        order_status: ""
      },
      columns: [
        {
          title: "订单号",
          key: "id",
          width: 100
        },
        {
          title: "会员名称",
          key: "user_name",
          width: 100
        },
        {
          title: "地址",
          key: "address_area"
        },
        {
          title: "快递",
          key: "expressTitle"
        },
        {
          title: "状态",
          key: "statusName"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      cityList: [
        {
          value: "1",
          label: "待付款"
        },
        {
          value: "2",
          label: "已付款等待发货"
        },
        {
          value: "3",
          label: "已发货"
        },
        {
          value: "4",
          label: "已签收"
        },
        {
          value: "5",
          label: "已取消"
        },
        {
          value: "",
          label: "取消"
        }
      ],
      // 如果为true查看窗口打开
      modal1: false
    };
  },
  computed: {
    ...mapState("order", {
      // orderList为订单的全部数据
      orderList: "orderInfo",
      pageTotal: "totalcount"
    })
  },

  mounted() {
    this.$store.dispatch("order/getOrder", this.order).then(() => {
      // console.log("加载页面获取数据");
    });
  },
  methods: {
    changeOrderStatus() {
      this.$store.dispatch("order/getOrder", this.order).then(() => {});
    },
    serOrdByName() {
      this.$store.dispatch("order/getOrder", this.order).then(() => {});
    },
    changePage(page) {
      this.order.pageIndex = page;
      this.$store.dispatch("order/getOrder", this.order).then(() => {});
    },
    changePageSize(pageSize) {
      this.order.pageSize = pageSize;
      this.$store.dispatch("order/getOrder", this.order).then(() => {});
    },
    toEditPag(id) {
      this.$router.push(`/admin/order-edit/${id}`);
    },
    check(data) {
      this.$axios({
        method: "get",
        url: `/admin/order/getorderdetial/${data.id}`
      }).then(res => {
        console.log(res);
        if (res.data.status === 0) {
          let infoObj = res.data.message.orderinfo;
          const title = "订单信息";
          const content = `
          <p>订单id:${infoObj.id}</p>
          <p>订单号：${infoObj.order_no}</p>
          <p>收件人:${infoObj.accept_name}</pp>
          <p>收货地址:${infoObj.area}${infoObj.address}</p>
          <p>mobile:${infoObj.mobile}</p>
          <p>支付方式：${infoObj.paymentTitle}</p>
          <p>邮箱编码：${infoObj.post_code}</p>
          <p>支付金额：${infoObj.real_amount}</p>
          <p>卖家姓名：${infoObj.user_name}</p>
          `;
          this.$Modal.info({
            title: title,
            content: content
          });
        }
      });
    }
  }
};
</script>


<style>
</style>
