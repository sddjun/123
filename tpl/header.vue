<template>
	<div class="header">
		<a class="header-back" href="javascript:;" onclick="window.history.go(-1)"><span class="fa fa-chevron-left"></span> 返回</a>
		<p class="header-title">{{title}}</p>
	</div>
	<div class="header-height"></div>
</template>
<script type="text/javascript">
	module.exports = {
		props:['title'],
		data: function(){
			return{
				"title":""
			}
		}
	}
</script>
<style scoped>
.header{
	position: fixed;
	width: 90%;
	background: #42b8d3;
	line-height: 1rem;
	height: 1rem;
	font-size: 1rem;
	padding: 1rem 5%;
	color: #fff;
}
.header-height{
	height: 3rem;
}
.header-title{
	text-align: center;
	padding: 0 3rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.header-back{
	position: absolute;
	left: 0;
	top: 0;
	height: 1rem;
	padding: 1rem .5em;
	display: block;
	color: #fff;
}
.header-back:hover,.header-back:focus{
	color: #fff;
}
</style>
