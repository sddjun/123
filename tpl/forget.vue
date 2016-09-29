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
				</div>
				<div class="form-group">
					<label for="code">验证码：</label>
					<input type="text" v-model="form.code" debounce="500" name="code" id="code" value="" required="required" />
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
					"code":""
				}
			}
		},
		components:{
			'myHeader': Header
		},
		methods:{
			onSubmit: function(){
				this.$http.post(this.apiUrl,this.form).then(function(response){
					console.log('提交成功！');
					tips('提交成功',function(){
						location.href = '/';
					});
				},function(response){
					console.log('网络繁忙，请稍候再试！');
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
		width: 100%; box-sizing: border-box; border: 1px solid #ccc; padding: 9px 10px;
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