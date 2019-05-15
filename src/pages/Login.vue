<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline" class="formup">
    <FormItem prop="user">
      <i-Input type="text" v-model="formInline.uname" placeholder="请输入用户名">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </i-Input>
    </FormItem>
    <FormItem prop="password">
      <i-Input type="password" v-model="formInline.upwd" placeholder="请输入密码">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </i-Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="submitForm('formInline')">登录</Button>
      <Button type="info" @click="resetFields('formInline')" class="reset">重置</Button>
    </FormItem>
  </Form>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        uname: "",
        upwd: ""
      },
      ruleInline: {
        uname: [
          {
            required: true,
            message: "请输入正确的用户名",
            trigger: "blur"
          }
        ],
        upwd: [
          {
            required: true,
            message: "请输入正确的密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不能少于6位数",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$store.dispatch("user/login", this.formInline).then(res => {
       this.$Message.success("登录成功,超级管理员");
        setTimeout(() => {
          this.$router.back();
        }, 1000);
      });
    },
    resetFields() {
      this.formInline = {
        user: "",
        password: ""
      };
    }
  }
};
</script>

<style>
.formup {
  /* align-content: center; */
  text-align: center;
  width: 350px;
  position: absolute;
  left: 35%;
  top: 32%;
}
.reset {
  margin-left: 50px;
}
</style>
