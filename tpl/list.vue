<template>
	<div>
		<div>
			<my-header :title = "title"></my-header>
		</div>
		<section class="shoplist">
			<article class="shopitem" v-for="item in items">
				<header class="thumb"><a href="javascript:;"><img :src="item.thumb" alt="" /></a></header>
				<section class="content"><h4><a href="javascript:;">{{item.title}}</a></h4></section>
				<footer class="operation"><a href="javascript:;"><i class="fa"></i></a></footer>
			</article>
		</section>
	</div>
</template>
<script type="text/javascript">
	var Header = require("./header.vue");
	module.exports = {
		data:function(){
			return {
				"title":"商品列表",
				"items":[
					{"title":"春秋季复古英伦风粗跟单鞋女中跟尖头女鞋OL学院风小皮鞋黑通勤鞋","thumb":"static/images/3.jpeg",},
					{"title":"秋冬英伦大头粗跟厚底松糕鞋日系原宿学生女鞋小皮鞋大码系带单鞋","thumb":"static/images/2.jpeg"},
					{"title":"布洛克女鞋平底单鞋复古小皮鞋学院风女英伦风小白鞋女牛津鞋","thumb":"static/images/1.jpeg"}
				]
			}
		},
		components:{
			'myHeader': Header
		},
		methods:{
			
		}
	}
</script>
<style scoped>
	.shoplist{
		background: #ebeced;
	}
	.shopitem{
		background: #fff;
		margin-bottom: 20px;
	}
	.thumb a{
		display: block;
		padding-bottom: 75%;
		height: 0;
		overflow: hidden;
	}
	.thumb a img{
		display: inline;
		width:100%;
		border: none;
	}
	.content h4{
		padding: 1em;
		font-size: 14px;
	}
	.operation{
		padding:0 1em 1em;
		text-align: right;
	}
	.fa{
	    display: inline-block;
	    font: normal normal normal 14px/1 FontAwesome;
	    font-size: inherit;
	    text-rendering: auto;
	}
	.fa:before {
		font-size: 24px;
	    content: "\f039";
	}
</style>