<template>
	<div>
		<div>
			<my-header :title = "title"></my-header>
		</div>
		<div class="form">
			<form @submit.prevent="onSubmit">
				<div class="form-group">
					<label for="password">输入新密码：</label>
					<input type="password" v-model="form.password" debounce="500" name="password" id="password" value="" required="required" />
					<span class="input-tips" v-show="form.passwordtips!=''"><font color="red">*{{form.passwordtips}}</font></span>
				</div>
				<div class="form-group">
					<label for="repassword">再次输入新密码：</label>
					<input type="password" v-model="form.repassword" debounce="500" name="repassword" id="repassword" value="" required="required" />
					<span class="input-tips" v-show="form.repasswordtips!=''"><font color="red">*{{form.repasswordtips}}</font></span>
				</div>
				<div class="form-btn">
					<input type="submit" value="提交" class="btn btn-primary" @keyup.enter="onSubmit" />
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
				"title":"找回密码",
				"apiUrl":'api/password.php',
				"form":{
					"password":"",
					"repassword":"",
					"passwordtips":"",
					"repasswordtips":""
				}
			}
		},
		components:{
			'myHeader': Header
		},
		methods:{
			onSubmit: function(){
				var _this = this.form;
				if(_this.repassword!=_this.password){
					_this.repasswordtips = "两次密码输入不一致";
					return false;
				} else {
					_this.repasswordtips = "";
				}
				this.$http.post(this.apiUrl,this.form).then(function(response){
					//验证信息
					
					
					tips('提交成功',function(){
						location.href = '/login';
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
	.form-btn input[type=submit]{
		width: 60%;
	}
</style>