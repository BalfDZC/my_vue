<template>
    <Row >
        <Col class="menu">
            <Menu theme="dark">
                <Submenu :name="`${index}`" v-for="(item,index) in menus" >
                    <template slot="title">
                        <Icon type="ios-paper" />
                        {{item.title}}
                    </template>
                    <MenuItem :name="`${index}-${index1}`" v-for="(item1,index1) in item.group" :to="`${item1.src}`">
                    {{item1.title}}
                    </MenuItem>
                </Submenu>
            </Menu>
        </Col>
    </Row>
</template>
<script>
    export default {
  data() {
		return {
			
			// 当前菜单的数据
			menus: [
			{
				icon: "el-icon-menu",
                title: "购物商场",
                num:"1",
				group: [
					{ src: "/admin/emoji", title: "商品管理" }, 
					{ src: "/admin/category-list", title: "栏目管理" }
				]
			},
			{
				icon: "el-icon-service",
                title: "会员管理",
                num:"2",                
				group: [{ src: "#", title: "会员列表" }]
			},
			{
				icon: "el-icon-tickets",
                title: "订单管理",
                num:"3",                
				group: [{ src: "/admin/indent-list", title: "订单列表" }]
			}
			]
		};
	},
    }
</script>
<style>
.menu{
    width: 100%;
}
.ivu-menu {
    width: 100%!important;
}
</style>
