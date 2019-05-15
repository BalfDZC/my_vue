<template>
  <div class="breadcrumb">
    <Breadcrumb>
      <BreadcrumbItem :to="`${item.src}`" v-for="(item,index) in getMeta">{{item.title}}</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script>
export default {
  computed: {
    getMeta: function() {
      // matched 返回的就是当前路由匹配到的组件类 里面有需要的meta信息 面包屑
      // 格式是数组里面是[{}...]
      const metas = this.$route.matched;
      // console.log(metas);
      // v代表每个对象 item的意思
      const metaArr = metas.map(v => {
        return {
          src: v.path,
          title: v.meta
        };
      });
      return metaArr;
      // console.log(metaArr);
    }
  }
};
</script>
<style>
.breadcrumb{
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  margin-top: 80px;
}
</style>