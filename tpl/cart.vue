<template>
	<div>
		<div>
			<my-header :title = "title"></my-header>
		</div>
		<div>
			<div class="cart_lists" id="cart">
				<ul v-if="data.length>0">
					<li v-for="v in data">
						<div class="cart_hd">
			                <img class="cart_appmsg_thumb" :src="v.img">
			            </div>
			            <div class="cart_bd">
			                <h4 class="cart_title">{{v.title}}</h4>
			                <p class="cart_desc">{{v.sub_title}}</p>
			                <p class="cart_price">
			                	<span>价格：￥<b>{{v.price}}</b>×<b>{{v.num}}</b></span>
			                	<span>合计：<font color="red">￥<b>{{v.price*v.num}}</b></font></span>
			                </p>
			                <p class="cart_handle">
			                	<span class="cart_num">
			                		<a @click="minus($index)">-</a>
			                		<input type="text" value="{{v.num}}" />
			                		<a @click="add($index)">+</a>
			                	</span>
			                	<span class="cart_del">
			                		<a @click="del($index)">删除</a>
			                	</span>
			                </p>
			            </div>
					</li>
				</ul>
				<div v-else class="cart-empty">还没有任何商品，<a class="btn btn-default btn-sm" v-link="{ path:'/' }">去购买</a></div>
			</div>
			<div class="cart_total">
				<div class="cart_total_p">
					<span>共<b>{{totalNum}}</b>件商品</span>
					<span>合计：<font color="red">{{totalPrice}}</font>元</span>
					<a v-link=" {path: buyurl} " :class="{'btn-disabled':totalPrice<=0,'btn-primary':totalPrice>0}" class="btn btn-sm fr">立即购买</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	var Header = require("./header.vue");
	module.exports = {
		components:{
			'myHeader': Header
		},
		data: function(){
	        return {
	        	"title":"购物车",
	        	"apiUrl":"api/forget.php",
	        	"buyurl":"",
	        	"data":[]
	        };
		},
		ready: function(){
			this.$http.get(this.apiUrl,{},).then(function(response){
				var objs = JSON.parse(response.data);
				this.$set('data',objs);
			},function(response){
				console.log('获取失败！');
			})
		},
		computed: {
			totalNum:function(){
				var num = 0;
				for(var i=0;i<this.data.length;i++){
					num += this.data[i]["num"]*1;
				}
				return num;
			},
			totalPrice:function(){
				var price = 0;
				for(var i=0;i<this.data.length;i++){
					price += this.data[i]["price"]*this.data[i]["num"];
				}
				if(price>0){
					this.buyurl = "/";
				}
				return price;
			}
		},
		methods: {
			minus: function(a){
				this.data[a]["num"]--;
				if(this.data[a]["num"]<=0){
					this.data[a]["num"] = 1;
				}
			},
			add: function(a){
				this.data[a]["num"]++;
			},
			del: function(a){
				var aData = this.data;
				prompt('确认删除该商品？',function(){
					aData.splice(a,1);
				})
			}
		}
	}
</script>
<style type="text/css">
.cart_lists{
	padding: 0 2%;
}
.cart_lists li{
	padding: 8px 0;
    border-bottom: 1px solid #eee;
    color: #333;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.cart_hd{
	margin-right: .8em;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
}
.cart_bd{
	-webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    min-width: 0;
}
.cart_desc{
	color: #999;
}
.cart_price{
	padding: 5px 0;
	color: #999;
}
.cart_price span{
	padding-right: 1rem;
}
.cart_price b{
	font-weight: normal;
}
.cart_num{
	font-size: 0;
}
.cart_num a{
	width: 25px;
	height: 25px;
	line-height: 25px;
	text-align: center;
	font-size: .8rem;
	background: #E5E5E5;
	border: 1px solid #bdbdbd;
	display: inline-block;
	color: #000;
}
.cart_num input{
	width: 30px;
	height: 25px;
	font-size: .8rem;
	text-align: center;
	border: none;
	border-top: 1px solid #bdbdbd;
	border-bottom: 1px solid #bdbdbd;
	background: #fff;
}
.cart_del{
	float: right;
}
.cart_del a{
	border: 1px solid #bdbdbd;
	background: #fff;
	border-radius: 5px;
	padding: 5px 12px;
	color: #000;
	display: inline-block;
}
.cart_total{
	height: 54px;
}
.cart_total b{
	font-weight: normal;
}
.cart_total_p{
	position: fixed;
	width: 90%;
	height: 34px;
	background: #fff;
	border-top: 1px solid #ddd;
	bottom: 0;
	left: 0;
	padding: 10px 5%;
}
.cart_total_p span{
	padding-right: 1rem;
	line-height: 34px;
}
.cart_total_btn:hover,.cart_total_btn:focus{
	color: #fff;
}
.cart-empty{
	text-align: center;
	padding: 5rem 5%;
}
</style>