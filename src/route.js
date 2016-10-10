// 模版组件
var Index = require("../tpl/index.vue");
var Search = require("../tpl/search.vue");
var List = require("../tpl/list.vue");
var Login = require("../tpl/login.vue");
var Register = require("../tpl/register.vue");
var Forget = require("../tpl/forget.vue");
var Forgettips = require("../tpl/forgettips.vue");
var Password = require("../tpl/password.vue");
var Cart = require("../tpl/cart.vue");

// 路由routes
module.exports = {
	path : '*',
	redirect : '/index',
  routes: [
    { path: '/', component: Index },
    { path: '/index', component: Index },
    { path: '/search', component: Search },
    { path: '/list', component: List },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/forget', component: Forget },
    { path: '/forgettips', component: Forgettips },
    { path: '/password', component: Password },
    { path: '/cart', component: Cart }
  ]
}
