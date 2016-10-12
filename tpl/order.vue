<template>
	<div class="body-main bg-grey">
		<div>
			<my-header :title = "title"></my-header>
		</div>
		<ul class="tab-t clearfix">
			<li :class="{active:tabnum==0}" @click="tab(0)">全部</li>
			<li :class="{active:tabnum==1}" @click="tab(1)">未付款</li>
			<li :class="{active:tabnum==2}" @click="tab(2)">待收货</li>
			<li :class="{active:tabnum==3}" @click="tab(3)">已完成</li>
		</ul>
		<div class="tab-c">
			<div class="tab-con" :class="{show:tabnum==0}">111</div>
			<div class="tab-con" :class="{show:tabnum==1}">222</div>
			<div class="tab-con" :class="{show:tabnum==2}">333</div>
			<div class="tab-con" :class="{show:tabnum==3}">444</div>
		</div>
	</div>
</template>
<script>
	var Header = require("./header.vue");
	module.exports = {
		components:{
			"myHeader": Header
		},
		data: function(){
	        return {
	        	"title":"我的订单",
	        	"tabnum":0
	        };
		},
		methods:{
			tab:function(i){
				this.tabnum = i;
			}
		}
	}
</script>
<style>
.tab-t{
	background: #fff;
}
.tab-t li{
	width: 25%;
	float: left;
	border-bottom: 1px solid #eee;
	text-align: center;
	padding: 8px 0;
}
.tab-t li.active{
	border-bottom: 1px solid #2BACC9;
}
.tab-c{
	background: #fff;
	padding: 5px;
}
.tab-con{
	display: none;
}
</style>