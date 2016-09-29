// src/main.js
var Vue = require("../static/js/vue.min.js");
var VueRouter = require("../static/js/vue-route.min.js");
var VueResource = require("../static/js/vue-resource.min.js");

// 注册插件
Vue.use(VueResource)
Vue.use(VueRouter)

// 开启路由，设置路由
var router = new VueRouter()
var App = require("./App.vue");

require("./route.js")(router);
router.redirect({
	'*': '/index'
})
router.start(App, '#app');
