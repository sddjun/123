// 模版组件
var Index = require("../tpl/index.vue");
var List = require("../tpl/list.vue");
var Login = require("../tpl/login.vue");
var Register = require("../tpl/register.vue");
var Forget = require("../tpl/forget.vue");

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
	    }
	})
}
