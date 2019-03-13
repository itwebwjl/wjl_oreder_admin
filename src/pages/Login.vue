<template>
  <div class="login">
    <Form ref="formCustom" :model="formCustom" :label-width="80">
      <FormItem label="账号">
        <Input type="text" v-model="formCustom.uname"></Input>
      </FormItem>
      <FormItem label="密码">
        <Input type="password" v-model="formCustom.upwd"></Input>
      </FormItem>
      <FormItem class="login_btn">
        <Button type="primary" @click="handleSubmit()">登录</Button>
        <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formCustom: {
        passwd: "",
        upwd: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$store
        .dispatch("user/login", this.formCustom)
        .then(() => {
          this.$Message.success("登录成功");
          this.$router.back();
        })
        .catch(() => {
          this.$Message.error("登录失败，用户名或密码错误");
        });
    },
    handleReset(name) {
      this.formCustom = {
        passwd: "",
        upwd: ""
      };
    }
  }
};
</script>
<style scoped>
.login {
  width: 600px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_btn {
  text-align: center;
}
</style>

