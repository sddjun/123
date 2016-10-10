// src/main.js
var Vue = require("../static/js/vue.js");
var VueRouter = require("../static/js/vue-router.js");
var VueResource = require("../static/js/vue-resource.min.js");

// 注册插件
Vue.use(VueResource)
Vue.use(VueRouter)

// 路由参数配置，以{}作为参数
var routes = require("./route.js"); 

// 开启路由，设置路由
var router = new VueRouter(routes)

new Vue({router}).$mount('#app');
