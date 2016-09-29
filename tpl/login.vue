<template>
	<div>
		<div>
			<my-header :title = "title"></my-header>
		</div>
		<div class="form">
			<form @submit.prevent="onSubmit">
				<div class="form-group">
					<label for="username">用户名/邮箱：</label>
					<input type="text" v-model="form.username" debounce="500" name="username" id="username" value="" required="required" />
					<span class="input-tips" v-show="form.usernametips!=''"><font color="red">*{{form.usernametips}}</font></span>
				</div>
				<div class="form-group">
					<label for="password">密码：</label>
					<input type="password" v-model="form.password" debounce="500" name="password" id="password" value="" required="required" />
					<span class="input-tips" v-show="form.passwordtips!=''"><font color="red">*{{form.passwordtips}}</font></span>
				</div>
				<div class="form-line">
					<label for="remember"><input type="checkbox" v-model="form.remember" name="remember" id="remember" /> 记住密码</label>
					<a v-link="path='/forget'" class="fr">忘记密码？</a>
				</div>
				<div class="form-btn">
					<input type="submit" value="登录" class="btn btn-primary" @keyup.enter="onSubmit" />
					<a v-link="path='/register'" class="btn btn-primary" >注册</a>
				</div>
			</form>
		</div>
	</div>
</template>
<script type="text/javascript">
	var Header = require("./header.vue");
	module.exports = {
		data:function(){
			return {
				"title":"登录",
				"apiUrl":'api/login.php',
				"form":{
					"username":"",
					"password":"",
					"remember":false,
					"usernametips":"",
					"passwordtips":""
				}
			}
		},
		components:{
			'myHeader': Header
		},
		methods:{
			onSubmit: function(){
				this.$http.post(this.apiUrl,this.form).then(function(response){
					//验证信息
					
					
					tips('登录成功',function(){
						location.href = '/';
					});
				},function(response){
					tips('网络繁忙，请稍候再试！');
				})
			}
		}
	}
</script>
<style scoped>
	.form{
		width: 90%; margin: 0 auto; padding: 20px 0; font-size: .9rem;
	}
	.form-group,.form-line{
		padding-bottom: 20px;
	}
	.form-group label{
		display: block; padding-bottom: 10px;
	}
	.form-group input[type=text],.form-group input[type=password]{
		width: 100%; height: 40px;  box-sizing: border-box; border: 1px solid #ccc; padding: 9px 10px;
	}
	.form-group .input-tips{
		background: #ffe5e5;
		display: block;
		margin-top: 5px;
		padding: 0 8px;
		line-height: 30px;
	}
	.form-btn{
		text-align: center;
		padding-top: 10px;
		border-top: 1px solid #eee;
	}
	.form-btn input[type=submit],.form-btn a{
		width: 45%;
		box-sizing: border-box;
	}
	.form-btn input[type=submit]{
		background: #999;
		border: 1px solid #999;
	}
</style>