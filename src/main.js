import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Vuex from 'vuex'
import VueRouter from "vue-router";
import Admin from './pages/Admin.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Indent from './pages/childrenList/inden-list.vue'
import Editor from './pages/childrenList/Editor.vue'
import GoodsList from './pages/goods/GoodsList.vue'
import Check from './pages/childrenList/check.vue'
import Login from './pages/Login.vue'
import store from './store';
import { emoji } from './utils/emoji.js'
import myemoji from './components/emoji.vue'
Vue.prototype.emoji = emoji
Vue.use(iView);
Vue.use(Vuex);
Vue.use(VueRouter);

// 2.把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;
// 给axios给次请求自动加上域名
axios.defaults.baseURL = 'http://localhost:8899';

const routes=[
  {path:"/login",component:Login},
  {path:"/",redirect:"/admin"},
    {path:"/admin",component:Admin,meta:"后台系统",children:[
    {path:"indent-list",meta:"订单详情",component:Indent},
    {path:"emoji",meta:"商品列表",component:myemoji},
    {path:"check",meta:"查看",component:Check},
    {path:"editor/:id",meta:"编辑",component:Editor}
  ]}
]
const router = new VueRouter({routes})

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
