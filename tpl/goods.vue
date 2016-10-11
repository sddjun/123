<template>
	<div class="body-main bg-grey">
		<div>
			<my-header :title = "title"></my-header>
		</div>
		<div class="goods-img"><img :src="data.thumb" alt="" /></div>
		<div class="goods-info">
			<h2 class="goods-info-title">{{data.title}}</h2>
			<p class="goods-info-desc">{{data.sub_title}}</p>
			<div class="goods-price">
				<span class="goods-price-now">优惠价：<b>{{data.price}}</b></span>
				<span class="goods-price-original">原价：{{data.originalprice}}</span>
			</div>
			<div class="goods-buy"><a @click="buy" class="btn btn-block btn-primary">立即购买</a></div>
		</div>
		<div class="goods-detail">
			<div class="goods-detail-t"><span>商品介绍</span></div>
			<div class="goods-detail-con" v-html="data.content"></div>
		</div>
		<div class="fixed" :class="{hide:!pop,show:pop}">
			<div class="goods-pop">
				<div class="goods-pop-img"><img :src="data.thumb"/></div>
				<a href="javascript:;" class="close" @click="buy" style=" position: absolute; right: 8px; top: 8px;"></a>
				<dl class="goods-pop-chioce" v-for="(v, i) in size">
					<dt>{{v.name}}：</dt>
					<dd class="size">
						<span v-for="(s, j) in v.value" @click="chiocesize(i,j)" :class="{active:s==sub.size[i].size}">{{s}}</span>
					</dd>
				</dl>
				<dl class="goods-pop-chioce">
					<dt>数量：</dt>
					<dd class="chioce-num">
						<input type="button" @click="minus" value="-" />
						<input type="text" :value="sub.num" readonly="readonly" />
						<input type="button" @click="add" value="+" />
					</dd>
				</dl>
				<div class="goods-buy"><a @click="buysub" class="btn btn-block btn-primary">立即购买</a></div>
			</div>
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
				"title":"",
				"data":{},
				"size":{},
				"apiUrl":"api/goods.php",
				"apiSubmit":"api/order.php",
				"pop":0,
				"sub":{
					"num":1,
					"size":[]
				}
			}
		},
		mounted: function(){
			var goodid = this.$route.query.gid;
			this.sub.id = goodid;
			this.$http.get(this.apiUrl,{"params":{"id":goodid}}).then(function(response){
				var objs = JSON.parse(response.data);
				if(!objs.error){
					this.data = objs.datas;
					this.size = objs.datas.size;
					for(var i=0;i<this.size.length;i++){
						var size = {"name":this.size[i]["name"],"size":""}
						this.sub.size.push(size);
					}
				} else {
					tips({txt:"找不到该信息！"})
				}
			},function(response){
				tips({txt:"获取失败,请稍候再试！"})
			})
		},
		methods: {
			buy:function(){
				this.pop==0?this.pop=1:this.pop=0;
			},
			add:function(){
				this.sub.num = this.sub.num *1 + 1;
			},
			minus:function(){
				if(this.sub.num>1){
					this.sub.num = this.sub.num *1 - 1;
				}
			},
			chiocesize:function(i,j){
				var size = this.size[i]['value'][j];
				this.sub.size[i]['size'] = size;
			},
			buysub:function(){
				//验证信息
				for(var i=0;i<this.sub.size.length;i++){
					if(this.sub.size[i].size==''){
						tips({txt:'请选择'+this.sub.size[i].name});
						return false;
					}
				}
				this.$http.post(this.apiSubmit,this.sub).then(function(response){
					//提交再次验证信息
					
					//跳转到订单
					location.href = '/order';
				},function(response){
					tips({txt:'网络繁忙，请稍候再试！'});
				})
			}
		}
	}
</script>
<style>
.goods-img,.goods-img img{
	width: 100%;
}
.goods-info{
	background: #fff;
	border-bottom: 1px solid #eee;
	padding: 5px 4%;
	margin-bottom: 8px;
}
.goods-info-title{
	line-height: 1.5em;
	font-size: 1.1rem;
	margin-bottom: 8px;
}
.goods-info-desc{
	color: #999;
	font-size: .8rem;
	margin-bottom: 8px;
}
.goods-price{
	font-size: .8rem;
	margin-bottom: 10px;
}
.goods-price-now{
	margin-right: 10px;
}
.goods-price-now b{
	font-size: 1.2em;
	color: orangered;
}
.goods-price-original{
	text-decoration: line-through;
}
.goods-buy{
	border-top: 1px solid #eee;
	padding-top: 10px;
}
.goods-detail{
	background: #fff;
	padding: 5px 4%;
}
.goods-detail-t{
	border-bottom: 1px solid #eee;
	padding: 0 5px 5px;
}
.goods-detail-t span{
	border-left: 3px solid #2BACC9;
	padding-left: 8px;
}
.goods-detail-con{
	padding: 5px 0;
}
.fixed{
	position: fixed;
	width: 100%; height: 100%;
	background: rgba(0,0,0,.5);
	left: 0;
	top: 0;
}
.goods-pop{
	position: absolute;
	background: #fff;
	width: 100%;
	left: 0;
	bottom: 0;
	padding: 50px 5% 10px;
	box-sizing: border-box;
}
.goods-pop-img{
	position: absolute;
	width: 60px;
	height: 60px;
	padding: 5px;
	left: 5%;
	top: -30px;
	background: #fff;
}
.goods-pop-img img{
	width: 100%;
	height: 100%;
}
.goods-pop-chioce{
	font-size: .8rem;
}
.goods-pop-chioce dt{
	float: left;
	width: 3em;
	text-align: right;
}
.goods-pop-chioce dd{
	margin-left:3em;
	margin-bottom: 10px;
}
.size{}
.size span{
	border: 1px solid #ccc;
	padding: 5px 12px;
	display: inline-block;
	margin-bottom: 5px;
	margin-right: 5px;
}
.size span.active{
	border: 1px solid #42b8d3;
	color: #42b8d3;
}
.chioce-num{ font-size: 0;}
.chioce-num input[type=button]{
	width: 2em;
	height: 2em;
	font-size: .8rem;
	border: 1px solid #ccc;
	background: #e5e5e5;
}
.chioce-num input[type=text]{
	width: 3em;
	height: 2em;
	font-size: .8rem;
	border: none;
	border-top: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
	background: #fff;
	text-align: center;
	box-sizing: border-box;
}

</style>