<template>
  <div class="editor-box">
    <Form :model="formItem" :label-width="80">
      <FormItem label="订单ID">
        <Input v-model="formItem.id" disabled placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="快递单号">
        <Input v-model="formItem.express_no" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="快递费用">
        <Input v-model="formItem.express_fee" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="收件人">
        <Input v-model="formItem.accept_name" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="收件人电话">
        <Input v-model="formItem.telphone" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="收件人手机">
        <Input v-model="formItem.mobile" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="收件人邮箱">
        <Input v-model="formItem.email" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="收件人地区">
        <Input v-model="formItem.area" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="收件人地址">
        <Input v-model="formItem.address" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="订单备注">
        <Input v-model="formItem.message" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="订单总金额">
        <Input v-model="formItem.order_amount" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="Select">
        <Select v-model="formItem.orderstatus">
          <Option value="1">待付款</Option>
          <Option value="2">待发货</Option>
          <Option value="3">已发货</Option>
          <Option value="4">已签收</Option>
          <Option value="5">已取消</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="save">保存</Button>
        <Button style="margin-left: 8px" @click="cancel">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
// console.log(2323)
export default {
  data() {
    return {
      formItem: {
        id: "",
        express_no: "",
        express_fee: "",
        accept_name: "",
        telphone: "",
        mobile: "",
        email: "",
        area: "",
        address: "",
        message: "",
        order_amount: "",
        orderstatus: ""
      }
    };
  },
  mounted() {
    const id = this.$route.params.id;
    //   console.log(id)
    this.$axios.get(`/admin/order/getorderdetial/${id}`).then(res => {
      console.log(res.data.message);
      this.formItem = res.data.message.orderinfo;
    });
  },
  methods: {
    save() {
      this.$axios
        .post("/admin/order/updateorder", { orderinfo: this.formItem })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            //   consoel.log(233)
            this.$Message.success("编辑成功");
            setTimeout(() => {
              this.$router.back();
            }, 1000);
          } else {
            this.$Message.error("输入有误");
          }
        });
    },
    cancel() {
      this.$router.back();
    }
  }
};
</script>
<style>
.editor-box{
    margin: 0 auto;
    width: 1000px;
    margin-top: 40px;
}
</style>

<style>
</style>
