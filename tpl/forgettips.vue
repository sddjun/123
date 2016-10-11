<template>
	<div class="body-main">
		<div>
			<my-header :title = "title"></my-header>
		</div>
		<div class="forgettips">
			<p>我们已将信息发生至您的邮箱，请点击邮箱中的链接地址重置密码</p>
			<p><a href="https://mail.qq.com" target="_blank" class="btn btn-primary btn-sm">去我的邮箱</a></p>
		</div>
	</div>
</template>
<script type="text/javascript">
	var Header = require("./header.vue");
	module.exports = {
		data:function(){
			return {
				"title":"找回密码",
				"apiUrl":'api/forget.php',
				"form":{
					"email":"",
					"code":"",
					"emailtips":"",
					"codetips":""
				}
			}
		},
		components:{
			'myHeader': Header
		}
	}
</script>
<style scoped>
	.forgettips{
		padding: 50px 10%;
	}
	.forgettips p{
		text-align: center;
		color: #666;
		padding: 5px 0;
		line-height: 1.5em;
	}
</style>