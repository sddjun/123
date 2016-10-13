// 模版组件
var Index = function(resolve){require(["../tpl/index.vue"],resolve)};
var Search = function(resolve){require(["../tpl/search.vue"],resolve)};
var List = function(resolve){require(["../tpl/list.vue"],resolve)};
var Goods = function(resolve){require(["../tpl/goods.vue"],resolve)};
var Login = function(resolve){require(["../tpl/login.vue"],resolve)};
var Register = function(resolve){require(["../tpl/register.vue"],resolve)};
var Forget = function(resolve){require(["../tpl/forget.vue"],resolve)};
var Forgettips = function(resolve){require(["../tpl/forgettips.vue"],resolve)};
var Password = function(resolve){require(["../tpl/password.vue"],resolve)};
var Cart = function(resolve){require(["../tpl/cart.vue"],resolve)};
var User = function(resolve){require(["../tpl/user.vue"],resolve)};
var Order = function(resolve){require(["../tpl/order.vue"],resolve)};
var Drag = function(resolve){require(["../tpl/drag.vue"],resolve)};

// 路由routes
module.exports = {
	mode: 'history',
	routes: [
	    { path: '/', component: Index },
	    { path: '/index', component: Index },
	    { path: '/search', component: Search },
	    { path: '/list', component: List },
	    { path: '/goods', component: Goods },
	    { path: '/login', component: Login },
	    { path: '/register', component: Register },
	    { path: '/forget', component: Forget },
	    { path: '/forgettips', component: Forgettips },
	    { path: '/password', component: Password },
	    { path: '/cart', component: Cart },
	    { path: '/user', component: User },
	    { path: '/order', component: Order },
	    { path: '/drag', component: Drag },
	    { path: '*', component: Index }
	]
}
