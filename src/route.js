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

// 路由map
module.exports = function(router){
	router.map({
		'/': {
			name: 'index',
	        component: Index
	   },
	    '/index': {
			name: 'index',
	        component: Index
	    },
	    '/search': {
			name: 'search',
	        component: Search
	    },
	    '/list': {
			name: 'list',
	        component: List
	    },
	    '/login': {
			name: 'login',
	        component: Login
	    },
	    '/register': {
			name: 'register',
	        component: Register
	    },
	    '/forget': {
			name: 'forget',
	        component: Forget
	    },
	    '/forgettips': {
			name: 'forgettips',
	        component: Forgettips
	    },
	    '/password': {
			name: 'password',
	        component: Password
	    },
	    '/cart': {
			name: 'cart',
	        component: Cart
	    }
	})
}
