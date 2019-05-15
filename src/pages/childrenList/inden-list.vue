<template>
  <div id="dabox">
    <div>
      <Drawer :closable="false" width="640" v-model="value4">
        <p :style="pStyle">订单详情</p>
        <div class="demo-drawer-profile">
          <Row>
            <Col span="12">订单ID : {{checkData.id}}</Col>
            <Col span="12">会员名称 : {{checkData.user_name}}</Col>
            <Col span="12">支付方式ID：{{checkData.payment_id}}</Col>
            <Col span="12">支付手续费：{{checkData.payment_fee}}</Col>
            <Col span="12">支付时间：{{checkData.payment_time}}</Col>

            <Col span="12">订单总金额 :{{checkData.order_amount}}</Col>
            <Col span="12">商品总金额 :{{checkData.real_amount}}</Col>
            <Col span="12">商品状态 :{{checkData.statue}}</Col>
            <Col span="12">下单时间 :{{checkData.add_time}}</Col>
            <Col span="12">订单完成时间 :{{checkData.complete_time}}</Col>
            <Col span="12">支付方式 :{{checkData.paymentTitle}}</Col>
          </Row>
        </div>
        <Divider/>
        <div class="demo-drawer-profile">
          <p :style="pStyle">物流详情</p>
          <Row>
            <Col span="12">物流方式ID：{{checkData.express_id}}</Col>
            <Col span="12">物流单号 : {{checkData.express_no}}</Col>
            <Col span="12">物流手续费 : {{checkData.express_fee}}</Col>
            <Col span="12">物流方式 :{{checkData.expressTitle}}</Col>
            <Col span="12">发货时间 :{{checkData.express_time}}</Col>
            <Col span="12">收货人 :{{checkData.accept_name}}</Col>
            <Col span="12">邮编 :{{checkData.post_code}}</Col>
            <Col span="12">收货人电话 :{{checkData.mobile}}</Col>
            <Col span="12">收货人邮箱 : {{checkData.email}}</Col>
            <Col span="12">收货地区 : {{checkData.area}}</Col>
            <Col span="12">收货地址 :{{checkData.address}}</Col>
            <Col span="12">订单备注 :{{checkData.message}}</Col>
          </Row>
        </div>
        <Divider/>

      </Drawer>
    </div>

    <div class="search-box">
      <Dropdown trigger="click" style="margin-left: 20px" @on-click="selectState">
        <a href="javascript:void(0)">
          {{MenuText}}
          <Icon type="ios-arrow-down" class="ifont"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="0">综合</DropdownItem>
          <DropdownItem name="1">待付款</DropdownItem>
          <DropdownItem name="2">待发货</DropdownItem>
          <DropdownItem name="3">已发货</DropdownItem>
          <DropdownItem name="4">已签收</DropdownItem>
          <DropdownItem name="5">已取消</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div class="ipt-indent">
        <Input v-model="resData.vip_name" @on-search="search" search placeholder="会员名称"/>
      </div>
    </div>
    <Table border :columns="columns12" :data="data6" class="table-indent">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(row.name)">编辑</Button>
        <Button type="error" size="small" @click="check(row)">查看</Button>
      </template>
    </Table>
    <Page
      :total="+allTotal"
      :page-size="3"
      :page-size-opts="[1,2,3,4]"
      @on-change="pages"
      @on-page-size-change="pageSize"
      show-elevator
      show-total
      show-sizer
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      //   indentData: [],
      columns12: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "订单ID",
          slot: "name",
          width: 120,
          align: "center"
        },
        {
          title: "会员名称",
          key: "age",
          align: "center"
        },
        {
          title: "地址",
          key: "Address"
        },
        {
          title: "快递",
          key: "date",
          align: "center"
        },
        {
          title: "状态",
          key: "address",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      data6: [],
      resData: {
        state: "",
        vip_name: "",
        pages: "1",
        pageSize: 3
      },
      MenuText: "请选择",
      allTotal: "",
      value4: false,
      pStyle: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.85)",
        lineHeight: "24px",
        display: "block",
        marginBottom: "16px"
      },
      checkData: ""
    };
  },
  mounted() {
    this.getIndentData();
  },

  methods: {
    getIndentData() {
      //admin/order/getorderlist?orderstatus=订单状态值&vipname=会员名称&pageIndex=页码&pageSize=每页显示条数
      const { state, vip_name, pages, pageSize } = this.resData;
      this.$axios
        .get(
          `/admin/order/getorderlist?orderstatus=${state ||
            0}&vipname=${vip_name || ""}&pageIndex=${pages ||
            1}&pageSize=${pageSize}`
        )
        .then(res => {
          const { status, message } = res.data;
          // console.log(res.data);
          if (status === 0) {
            const data = message.map(v => {
              return {
                name: v.id,
                age: v.user_name,
                address: v.statusName,
                Address: v.area,
                date: v.expressTitle
              };
            });
            // console.log(data)
            this.data6 = data;
            this.allTotal = res.data.totalcount;
            // console.log(this.allTotal)
          }
        });
    },
    show(id) {
      // console.log(id)
        this.$router.push(`/admin/editor/${id}`)
    },
    selectState(name) {
      console.log(name);
      if (name == 1) {
        this.MenuText = "待付款";
        this.resData.state = 1;
        this.resData.pages = 1;
        this.getIndentData();
      } else if (name == 2) {
        this.MenuText = "待发货";
        this.resData.pages = 1;
        this.resData.state = 2;
        this.getIndentData();
      } else if (name == 3) {
        this.MenuText = "已发货";
        this.resData.pages = 1;

        this.resData.state = 3;
        this.getIndentData();
      } else if (name == 4) {
        this.MenuText = "已签收";
        this.resData.pages = 1;

        this.resData.state = 4;
        this.getIndentData();
      } else if (name == 5) {
        this.MenuText = "已取消";
        this.resData.pages = 1;

        this.resData.state = 5;
        this.getIndentData();
      } else {
        this.MenuText = "请选择";
        this.resData.pages = 1;

        this.resData.state = 0;
        this.getIndentData();
      }
    },
    search(value) {
      console.log(value);
      if (value == "") {
        this.$Message.info("输入不能为空");
      } else {
        this.resData.vip_name = value;
        this.getIndentData();
      }
    },
    pages(num) {
      console.log(num);
      this.resData.pages = num;
      this.getIndentData();
    },
    pageSize(pageNum) {
      console.log(pageNum);
      this.resData.pageSize = pageNum;
      this.getIndentData();
    },
    check(row) {
      this.value4 = true;
      const id = row.name;
      this.$axios.get(`/admin/order/getorderdetial/${id}`).then(res => {
        const { message, status } = res.data;
        if (status == 0) {
          const arr = message.goodslist;
          const obj = message.orderinfo;
          let newObj = {};
          Object.assign(newObj, arr[0], obj);
          console.log(newObj);
          this.checkData = newObj;
        }
      });
    }
  }
};
</script>
<style>
#dabox {
  position: relative;
  margin-top: 60px;
}
.search-box {
  position: absolute;
  right: 20px;
  top: -52px;
  width: 450px;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  margin: 0;
}
.table-indent {
  margin-bottom: 20px;
  margin-top: 52px;
}
.ipt-indent {
  width: 200px;
  /* margin-bottom: 20px; */
  display: inline-block;
}
.ivu-dropdown {
  width: 200px;
  height: 32px;
  line-height: 31px;
  padding: 0 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  color: #eee;
  border-radius: 6px;
}
.ivu-dropdown a {
  display: block;
  width: 100%;
  height: 100%;
}
.ifont {
  float: right;
  line-height: 32px;
}
.demo-drawer-profile {
  font-size: 14px;
}
.demo-drawer-profile .ivu-col {
  margin-bottom: 12px;
}
</style>