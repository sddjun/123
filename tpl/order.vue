<template>
	<div class="body-main bg-grey">
		<div>
			<my-header :title = "title"></my-header>
		</div>
		<ul class="tab-t clearfix">
			<li :class="{active:tabnum.new==index}" @click="tab(index)" v-for="(v,index) in tabnav">{{v}}</li>
		</ul>
		<div class="tab-c">
			<transition v-for="(v,index) in tabnav" v-on:before-enter="beforeEnter"  v-on:before-leave="beforeLeave" mode="out-in">
				<div class="tab-con" v-if="tabnum.new==index">
					<div class="tab-con-w">{{tabnum.new}}<img src="/static/images/1.jpeg" alt="" /></div>
				</div>
			</transition>
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
	        	"tabnav":['全部','未付款','待收货','已收货'],
	        	"tabnum":{"new":0,"old":-1}
	        };
		},
		methods:{
			tab:function(i){
				this.tabnum.old = this.tabnum.new;
				this.tabnum.new= i;
			},
			beforeEnter: function (el) {
				if(this.tabnum.new>this.tabnum.old){
					el.className = 'tab-con animated fadeInRight';
				} else if(this.tabnum.new<this.tabnum.old){
					el.className = 'tab-con animated fadeInLeft';
				}
			},
			beforeLeave:function(el){
				if(this.tabnum.new>this.tabnum.old){
					el.className = 'tab-con animated fadeOutLeft';
				} else if(this.tabnum.new<this.tabnum.old){
					el.className = 'tab-con animated fadeOutRight';
				}
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
	position: relative;
	background: #fff;
}
.tab-con{
	background: #fff;
	width: 100%;
	padding: 5px;
	box-sizing: border-box;
	position: absolute;
	top: 0;
}
.tab-con-w img{
	width: 100%;
}
.animated {
	position: absolute;
	top: 0;
	-webkit-animation-duration: 1s;
	animation-duration: 1s;
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both
}
@-webkit-keyframes fadeInLeft {
	0% {
		opacity: 0;
		-webkit-transform: translateX(-100%);
		transform: translateX(-100%)
	}
	100% {
		opacity: 1;
		-webkit-transform: translateX(0);
		transform: translateX(0)
	}
}
@keyframes fadeInLeft {
	0% {
		opacity: 0;
		-webkit-transform: translateX(-100%);
		-ms-transform: translateX(-100%);
		transform: translateX(-100%)
	}
	100% {
		opacity: 1;
		-webkit-transform: translateX(0);
		-ms-transform: translateX(0);
		transform: translateX(0)
	}
}
.fadeInLeft {
	-webkit-animation-name: fadeInLeft;
	animation-name: fadeInLeft
}
@-webkit-keyframes fadeInRight {
	0% {
		opacity: 0;
		-webkit-transform: translateX(100%);
		transform: translateX(100%)
	}
	100% {
		opacity: 1;
		-webkit-transform: translateX(0);
		transform: translateX(0)
	}
}
@keyframes fadeInRight {
	0% {
		opacity: 0;
		-webkit-transform: translateX(100%);
		-ms-transform: translateX(100%);
		transform: translateX(100%)
	}
	100% {
		opacity: 1;
		-webkit-transform: translateX(0);
		-ms-transform: translateX(0);
		transform: translateX(0)
	}
}
.fadeInRight {
	-webkit-animation-name: fadeInRight;
	animation-name: fadeInRight
}
@-webkit-keyframes fadeOutRight {
	0% {
		opacity: 1;
		-webkit-transform: translateX(0);
		transform: translateX(0)
	}
	100% {
		opacity: 0;
		-webkit-transform: translateX(100%);
		transform: translateX(100%)
	}
}
@keyframes fadeOutRight {
	0% {
		opacity: 1;
		-webkit-transform: translateX(0);
		-ms-transform: translateX(0);
		transform: translateX(0)
	}
	100% {
		opacity: 0;
		-webkit-transform: translateX(100%);
		-ms-transform: translateX(100%);
		transform: translateX(100%)
	}
}
.fadeOutRight {
	-webkit-animation-name: fadeOutRight;
	animation-name: fadeOutRight
}
@-webkit-keyframes fadeOutLeft {
	0% {
		opacity: 1;
		-webkit-transform: translateX(0);
		transform: translateX(0)
	}
	100% {
		opacity: 0;
		-webkit-transform: translateX(-100%);
		transform: translateX(-100%)
	}
}
@keyframes fadeOutLeft {
	0% {
		opacity: 1;
		-webkit-transform: translateX(0);
		-ms-transform: translateX(0);
		transform: translateX(0)
	}
	100% {
		opacity: 0;
		-webkit-transform: translateX(-100%);
		-ms-transform: translateX(-100%);
		transform: translateX(-100%)
	}
}
.fadeOutLeft {
	-webkit-animation-name: fadeOutLeft;
	animation-name: fadeOutLeft
}
</style>