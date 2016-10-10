<template>
	<div>
		<div class="i-header-h">
			<div class="i-header">
				<a class="i-header-login" v-link="{path:'/login'}"><span><b class="fa fa-user"></b></span></a>
				<div class="i-header-search"><a class="i-header-search-input" v-link="{path:'/search'}" >搜索感兴趣的东西</a></div>
			</div>
		</div>
		<div class="swiper-container">
	        <div class="swiper-wrapper">
	            <div class="swiper-slide" v-for="v in banner"><a v-link="{ path:v.url }"><img :src="v.img" alt="" /></a></div>
	        </div>
	        <div class="swiper-pagination"></div>
		</div>
		
	</div>
	
</template>
<script>
	var Swiper = require("../static/js/swiper.min.js.js");
	module.exports = {
		data:function(){
			return {
				"banner":[
					{"img":"/shopping/static/images/11.jpg","url":"/"},
					{"img":"/shopping/static/images/12.jpg","url":"/"},
				]
			}
		},
		ready: function(){
//			this.$http.get('api/banner.php',{}).then(function(response){
//				var objs = JSON.parse(response.data);
//				this.$set('banner',objs);
				setTimeout(function(){
					var swiper = new Swiper('.swiper-container', {
				    	autoplay : 3000,
				    	loop : true,
				        pagination: '.swiper-pagination',
				        paginationClickable: true
				    });
				},0);
//			},function(response){
//				console.log('获取失败！');
//			})
		}
	}
</script>
<style>
/*头部*/
.i-header{
	position: fixed;
	width: 100%;
	background: #42b8d3;
	line-height: 1rem;
	height: 3rem;
	font-size: 1rem;
	padding: .5rem 5%;
	color: #fff;
	max-width: 920px;
    box-sizing: border-box;
}
.i-header-h{
	height: 3rem;
}
.i-header-search{
	text-align: center;
	padding: 0 3rem;
}
.i-header-search-input{
	height: 2rem;
	line-height: 2rem;
	border: none;
	background: rgba(255,255,255,.3);
	color: #fff;
	font-size: .8rem;
	width: 100%;
	text-align: center;
	display: block;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
}
.i-header-search-input:focus{
	text-decoration: none;
	color: #fff;
}
.i-header-login{
	position: absolute;
	left: 0;
	top: 0;
	width: 1.6rem;
	height: 1.6rem;
	text-align: center;
	padding: .7rem .5em;
	display: block;
	color: #fff;
}
.i-header-login span{
	width: 1.6rem;
	height: 1.6rem;
	line-height: 1.4rem;
	border: 1px solid #fff;
	border-radius: 50%;
	display: block;
	box-sizing: border-box;
}

/*幻灯片*/
.swiper-container {
	margin: 0 auto;
	position: relative;
	overflow: hidden;
	z-index: 1;
}
.swiper-wrapper {
	position: relative;
	width: 100%;
	height: 100%;
	z-index: 1;
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	-webkit-transition-property: -webkit-transform;
	-moz-transition-property: -moz-transform;
	-o-transition-property: -o-transform;
	-ms-transition-property: -ms-transform;
	transition-property: transform;
	-webkit-box-sizing: content-box;
	-moz-box-sizing: content-box;
	box-sizing: content-box;
	-webkit-transform: translate3d(0, 0, 0);
	-moz-transform: translate3d(0, 0, 0);
	-o-transform: translate(0, 0);
	-ms-transform: translate3d(0, 0, 0);
	transform: translate3d(0, 0, 0);
}
.swiper-slide {
	-webkit-flex-shrink: 0;
	-ms-flex: 0 0 auto;
	flex-shrink: 0;
	width: 100%;
	height: 100%;
	position: relative;
}
.swiper-slide img{
	width: 100%;
}
.swiper-pagination {
	position: absolute;
	text-align: center;
	-webkit-transition: .3s;
	-moz-transition: .3s;
	-o-transition: .3s;
	transition: .3s;
	-webkit-transform: translate3d(0, 0, 0);
	-ms-transform: translate3d(0, 0, 0);
	-o-transform: translate3d(0, 0, 0);
	transform: translate3d(0, 0, 0);
	z-index: 10;
}
.swiper-container-horizontal>.swiper-pagination-bullets {
	bottom: 3px;
	left: 0;
	width: 100%;
}
.swiper-pagination-bullet {
	width: 6px;
	height: 6px;
	display: inline-block;
	border-radius: 100%;
	background: #fff;
	opacity: .5;
}
button.swiper-pagination-bullet {
	border: none;
	margin: 0;
	padding: 0;
	box-shadow: none;
	-moz-appearance: none;
	-ms-appearance: none;
	-webkit-appearance: none;
	appearance: none;
}
.swiper-pagination-clickable .swiper-pagination-bullet { cursor: pointer;}
.swiper-pagination-white .swiper-pagination-bullet { background: #fff}
.swiper-pagination-bullet-active {
	opacity: 1;
	background: #68e0de;
}
.swiper-pagination-white .swiper-pagination-bullet-active {	background: #fff;}
.swiper-pagination-black .swiper-pagination-bullet-active { background: #000;}
.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {	margin: 0 3px;}
</style>