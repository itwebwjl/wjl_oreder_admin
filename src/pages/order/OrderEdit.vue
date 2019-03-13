<template>
  <div>
    <div class="form">
      <Form ref="formValidate" :model="formValidate" :label-width="80">
        <FormItem label="订单id号" prop="id">
          <Input v-model="formValidate.id" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="快递单号" prop="order_no">
          <Input v-model="formValidate.order_no" placeholder="Enter "></Input>
        </FormItem>
        <FormItem label="收货地址" prop="address_area">
          <Input v-model="formValidate.address_area" placeholder="Enter "></Input>
        </FormItem>
        <FormItem label="发票抬头" prop="invoice_title">
          <Input v-model="formValidate.invoice_title" placeholder="Enter "></Input>
        </FormItem>
        <FormItem label="收件人" prop="accept_name">
          <Input v-model="formValidate.accept_name" placeholder="Enter "></Input>
        </FormItem>
        <FormItem label="支付方式" prop="paymentTitle">
          <Input v-model="formValidate.paymentTitle" placeholder="Enter "></Input>
        </FormItem>
        <FormItem label="收货电话" prop="mobile">
          <Input v-model="formValidate.mobile" placeholder="Enter "></Input>
        </FormItem>
        <FormItem label="快递品牌" prop="expressTitle">
          <Input v-model="formValidate.expressTitle" placeholder="Enter "></Input>
        </FormItem>
        <FormItem label="总金额" prop="real_amount">
          <Input v-model="formValidate.real_amount" placeholder="Enter "></Input>
        </FormItem>
        <FormItem label="状态value" prop="orderstatus">
          <Input v-model="formValidate.orderstatus" placeholder="Enter "></Input>
        </FormItem>
        <FormItem label="订单状态" prop="orderstatus">
          <Select
            v-model="formValidate.orderstatus"
            :value="formValidate.orderstatus"
            placeholder="Select your status"
          >
            <Option value="1">订单生成，待付款</Option>
            <Option value="2">已付款等待发货</Option>
            <Option value="3">已发货，待完成</Option>
            <Option value="4">已签收，已完成</Option>
            <Option value="5">已取消</Option>
          </Select>
        </FormItem>
        <FormItem label="订单日期">
          <Row>
            <Col span="11">
              <FormItem prop="add_time">
                <DatePicker type="date" placeholder="Select date" v-model="formValidate.add_time"></DatePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit(id)">保存</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formValidate: {
      },
      id:'',
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.id = id ;
    this.$axios({
      method: "get",
      url: `/admin/order/getorderdetial/${id}`
    }).then(res => {
      const { status, message } = res.data;
      if (status === 0) {
        message.orderinfo.address_area = `${message.orderinfo.area}${
          message.orderinfo.address
        }`;
        this.formValidate = message.orderinfo;
      }
    });
  },
  methods: {
    handleSubmit(id) {
        this.$axios({
            method:"post",
            url:"/admin/order/updateorder",
            data:{
                orderinfo:{
                    id:this.formValidate.id,
                    express_no:this.formValidate.express_no,
                    express_fee:this.formValidate.express_fee,
                    accept_name:this.formValidate.accept_name,
                    telphone:this.formValidate.telphone,
                    mobile:this.formValidate.mobile,
                    email:this.formValidate.email,
                    area:this.formValidate.area,
                    address:this.formValidate.address,
                    message:this.formValidate.message,
                    order_amount:this.formValidate.order_amount,
                    orderstatus:this.formValidate.orderstatus,
                }
            }
        }).then((res) => {
            const {status, message} = res.data;
            if(status === 0) {
                this.$Message.success('编辑成功，跳转回订单页面');
                setTimeout(() => {
                this.$router.push('/admin/order');
                },500)
            }
        })
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style scoped>
.form {
  width: 50%;
}
</style>

