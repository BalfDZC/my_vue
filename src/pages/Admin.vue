
<template>
  <div class="layout">
    <Layout>
      <Sider hide-trigger class="aside">
        <app-menu></app-menu>
      </Sider>
      <Layout>
        <!-- <Header class="hearder">
          <app-hearder></app-hearder>
        </Header>-->
        <Header :style="{position: 'fixed', width: '100%',}" class="app-header">
            <app-header></app-header>
        </Header>
        <Content class="content">
          <app-breadcrumb></app-breadcrumb>
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import Menu from "../components/Menu";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
export default {
  components: {
    "app-menu": Menu,
    "app-breadcrumb": Breadcrumb,
    "app-header": Header
  }
};
</script>
<style scoped>
.layout {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
}
.ivu-layout {
  height: 100%;
}
.aside {
  padding-top: 64px;
}
.content {
  padding: 20px;
}
.app-header {
  z-index: 10;
}


</style>