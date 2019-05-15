<template>
  <div>
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="layout-logo"></div>
      <div class="layout-nav">
        <MenuItem name="1">
          <Icon type="md-contact"/>
          {{username}}
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-hand"/>
          {{identity}}
        </MenuItem>
        <MenuItem name="3">
          <div @click="out">
            <Icon type="md-close"/>退出
          </div>
        </MenuItem>
      </div>
    </Menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    // ... {}
    ...mapState("user", {
      // 下面两种写法都可以获取store的值
      username: "username",
      identity: "identity" //state => state.identity
    })
  },
  methods: {
    out() {
      // console.log(2323)
      this.$Message.success("注销成功");

      setTimeout(() => {
        localStorage.removeItem("username");
        localStorage.removeItem("identity");
        this.$router.push("/login");
      }, 1000);
    }
  }
};
</script>

<style>
</style>
