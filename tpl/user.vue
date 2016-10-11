<template>
	<div>
		<div>
			<my-header :title="title"></my-header>
		</div>
		<div class="user-top">
			<div class="user-wrap">
				<div class="user-headerimg"><img src="/static/images/22.jpg"/></div>
				<p class="user-username">我</p>
			</div>
		</div>
		<div class="single-lists">
			<ul>
				<li><router-link to="/info"><b style="color: #4783ce;" class="ico fa fa-user"></b><span class="single-lists-name">个人资料</span><i class="fa fa-chevron-right"></i></a></li>
				<li><router-link to="/cart"><b style="color: #31c9a3;" class="ico fa fa-shopping-cart"></b><span class="single-lists-name">购物车</span><i class="fa fa-chevron-right"></i></a></li>
				<li><router-link to="/order"><b style="color: #eb4e70;" class="ico fa fa-file-text"></b><span class="single-lists-name">我的订单</span><i class="fa fa-chevron-right"></i></a></li>
			</ul>
		</div>
	</div>
</template>
<script>
	var Header = require("./header.vue");
	module.exports = {
		data: function(){
			return {
				"title":"个人中心"
			}
		},
		components:{
			'myHeader':Header
		}
	}
</script>
<style>
.user-top{
	background: #4ec2dd;
}
.user-wrap{
	padding: 20px 0;
}
.user-headerimg{
	width: 100px;
	height: 100px;
	margin: 0 auto;
	border: 2px solid #fff;
	border-radius: 50%;
	overflow: hidden;
}
.user-headerimg img{
	border-radius: 50%;
}
.user-username{
	text-align: center;
	color: #fff;
	padding-top: 10px;
}
.single-lists{
	background: #fff;
}
.single-lists li{
	border-bottom: 1px solid #eee;
	
}
.single-lists a{
	display: block;
	color: #333;
	padding: 14px 5%;
	line-height: 20px;
}
.single-lists .fa-chevron-right{
	float: right;
	color: #ccc;
}
.single-lists .fa-chevron-right:before{
	line-height: 20px;
}
.single-lists .ico{
	font-size: 1.3em;
	width: 1.2em;
	text-align: center;
}
.single-lists-name{
	padding-left: 8px;
	font-size: .8em;
}
</style>