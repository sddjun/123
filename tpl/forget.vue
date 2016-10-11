<template>
	<div>
		<div>
			<my-header :title = "title"></my-header>
		</div>
		<div class="form">
			<form @submit.prevent="onSubmit">
				<div class="form-group">
					<label for="email">请输入邮箱：</label>
					<input type="email" v-model="form.email" debounce="500" name="email" id="email" value="" required="required" />
					<span class="input-tips" v-show="form.emailtips!=''"><font color="red">*{{form.emailtips}}</font></span>
				</div>
				<div class="form-group">
					<label for="code">请输入验证码：</label>
					<div class="input-code">
						<input type="text" v-model="form.code" debounce="500" name="code" id="code" value="" required="required" />
						<span class="code-img"><img src=""/></span>
					</div>
					<span class="input-tips" v-show="form.codetips!=''"><font color="red">*{{form.codetips}}</font></span>
				</div>
				<div class="form-btn">
					<input type="submit" value="下一步" class="btn btn-primary" @keyup.enter="onSubmit" />
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
				"title":"忘记密码",
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
		},
		methods:{
			onSubmit: function(){
				this.$http.post(this.apiUrl,this.form).then(function(response){
					//验证信息
					
					
					tips({
						txt:'提交成功',
						Callback:function(){
							location.href = '/forgettips';
						}
					});
				},function(response){
					tips({txt:'网络繁忙，请稍候再试！'});
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
	.form-group input[type=text],.form-group input[type=email]{
		width: 100%; height: 40px; box-sizing: border-box; border: 1px solid #ccc; padding: 9px 10px;
	}
	.form-group .input-tips{
		background: #ffe5e5;
		display: block;
		margin-top: 5px;
		padding: 0 8px;
		line-height: 30px;
	}
	.input-code{
		position: relative;
		padding-right: 95px;
	}
	.input-code .code-img{
		position: absolute;
		width: 95px;
		height: 40px;
		right: 0;
		top: 0;
		border: 1px solid #e5e5e5;
		box-sizing: border-box;
	}
	.input-code .code-img img{
		width: 100%;
		height: 100%;
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
		width: 60%;
	}
</style>