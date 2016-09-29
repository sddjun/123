// 模版组件
var Index = require("../tpl/index.vue");
var Login = require("../tpl/login.vue");
var Register = require("../tpl/register.vue");
var Forget = require("../tpl/forget.vue");
var Forgettips = require("../tpl/forgettips.vue");
var Password = require("../tpl/password.vue");

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
	    }
	})
}
