<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: "app",
  mounted() {
    // 写拦截 因为每个组件都有一个公共的根实例
    this.$axios({
      url: "/admin/account/islogin",
      withCredentials: true
    }).then(res => {
      if (res.data.code === "nologin") {
        this.$router.push("/login");
      }
    });
  }

}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
