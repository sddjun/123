<template>
	<div class="body-main">
	    <div class="search_bar" id="search_bar">
	        <form class="search_outer">
	            <div class="search_inner">
	                <i class="icon_search"></i>
	                <input type="search" class="search_input" id="search_input" placeholder="搜索" required="" @focus="searchBarFocus" @blur="searchBarBlur" @keyup="searchBarKeyup">
	                <a href="javascript:" class="icon_clear" id="search_clear" @click="searchClear()" ></a>
	            </div>
	            <label for="search_input" class="search_text" id="search_text">
	                <i class="icon_search"></i>
	                <span>搜索</span>
	            </label>
	        </form>
	        <a href="javascript:" class="search_cancel" id="search_cancel" @click="searchCancel()">取消</a>
	    </div>
	    <div class="cells cells_access search_show" id="search_show">
	        <div class="cell">
	            <div class="cell_bd cell_primary">
	                <p>实时搜索文本</p>
	            </div>
	        </div>
	        <div class="cell">
	            <div class="cell_bd cell_primary">
	                <p>实时搜索文本</p>
	            </div>
	        </div>
	        <div class="cell">
	            <div class="cell_bd cell_primary">
	                <p>实时搜索文本</p>
	            </div>
	        </div>
	    </div>
	</div>
</template>
<script type="text/javascript">
	module.exports = {
		methods: {
			searchClear: function(){
				$("#search_input").val('');
				$("#search_show").css("display","none");
				$("#search_text").css("display","");
			},
			searchBarFocus: function(){
				$("#search_bar").addClass("search_focusing");
			},
			searchBarBlur: function(){
				if($("#search_input").val()==''){
					$("#search_text").css("display","");
					$("#search_bar").removeClass("search_focusing");
				}
			},
			searchBarKeyup: function(){
				if($("#search_input").val()==''){
					$("#search_show").css("display","none");
				} else {
					$("#search_show").css("display","block");
					$("#search_text").css("display","none");
				}
			},
			searchCancel: function(){
				$("#search_text").css("display","");
				$("#search_bar").removeClass("search_focusing");
				$("#search_show").css("display","none");
				$("#search_input").val('');
			}
		}
	}
</script>
<style scoped>
.search_show{
	display: none;
    margin-top: 0;
    font-size: 14px;
}
.search_bar {
	position: relative;
	padding: 8px 10px;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	box-sizing: border-box;
	background-color: #efeff4;
}

.search_bar:before {
	top: 0;
	border-top: 1px solid #c7c7c7;
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
	-webkit-transform: scaleY(.5);
	transform: scaleY(.5);
}
.search_bar:after,
.search_bar:before {
	content: " ";
	position: absolute;
	left: 0;
	width: 100%;
	height: 1px;
	color: #c7c7c7;
}
.search_bar:after {
	bottom: 0;
	border-bottom: 1px solid #c7c7c7;
	-webkit-transform-origin: 0 100%;
	transform-origin: 0 100%;
	-webkit-transform: scaleY(.5);
	transform: scaleY(.5);
}
.search_bar.search_focusing .search_cancel {
	display: block;
}
.search_bar.search_focusing .search_text {
	display: none;
}
.search_outer {
	position: relative;
	-webkit-box-flex: 1;
	-webkit-flex: auto;
	flex: auto;
	background-color: #efeff4;
}
.search_outer:after {
	content: '';
	position: absolute;
	left: 0;
	top: 0;
	width: 200%;
	height: 200%;
	-webkit-transform: scale(.5);
	transform: scale(.5);
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
	border-radius: 10px;
	border: 1px solid #e6e6ea;
	box-sizing: border-box;
	background: #fff;
}
.search_inner {
	position: relative;
	padding-left: 30px;
	padding-right: 30px;
	height: 100%;
	width: 100%;
	box-sizing: border-box;
	z-index: 1;
}
.search_inner .search_input {
	padding: 4px 0;
	width: 100%;
	height: 1.42857143em;
	border: 0;
	font-size: 14px;
	line-height: 1.42857143em;
	box-sizing: content-box;
	background: transparent;
}
.search_inner .search_input:focus {
	outline: none;
}
.search_inner .icon_search {
	position: absolute;
	left: 10px;
	top: -2px;
	line-height: 28px;
}
.search_inner .icon_clear {
	position: absolute;
	top: -2px;
	right: 0;
	padding: 0 10px;
	line-height: 28px;
}
.search_text {
	position: absolute;
	top: 1px;
	right: 1px;
	bottom: 1px;
	left: 1px;
	z-index: 2;
	border-radius: 3px;
	text-align: center;
	color: #9b9b9b;
	background: #fff;
}
.search_text span {
	display: inline-block;
	font-size: 14px;
	vertical-align: middle;
}
.search_text .icon_search {
	margin-right: 5px;
}
.search_cancel {
	display: none;
	margin-left: 10px;
	line-height: 28px;
	white-space: nowrap;
	color: #42b8d3;
}
.search_input:not(:valid)~.icon_clear {
	display: none
}
input[type=search]::-webkit-search-cancel-button,
input[type=search]::-webkit-search-decoration,
input[type=search]::-webkit-search-results-button,
input[type=search]::-webkit-search-results-decoration {
	display: none;
}
.cell {
	position: relative
}
.cell:before {
	content: " ";
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 1px;
	border-top: 1px solid #d9d9d9;
	color: #d9d9d9;
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
	-webkit-transform: scaleY(.5);
	transform: scaleY(.5);
	left: 15px
}
.cell:first-child:before {
	display: none
}
.cells {
	background-color: #fff;
	line-height: 1.41176471;
	font-size: 1rem;
	overflow: hidden;
	position: relative
}
.cells:before {
	top: 0;
	border-top: 1px solid #d9d9d9;
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
	-webkit-transform: scaleY(.5);
	transform: scaleY(.5)
}
.cells:after,
.cells:before {
	content: " ";
	position: absolute;
	left: 0;
	width: 100%;
	height: 1px;
	color: #d9d9d9
}
.cells:after {
	bottom: 0;
	border-bottom: 1px solid #d9d9d9;
	-webkit-transform-origin: 0 100%;
	transform-origin: 0 100%;
	-webkit-transform: scaleY(.5);
	transform: scaleY(.5)
}
.cells_title {
	margin-top: .77em;
	margin-bottom: .3em;
	padding-left: 15px;
	padding-right: 15px;
	color: #888;
	font-size: 14px
}
.cells_title+.cells {
	margin-top: 0
}
.cells_tips {
	margin-top: .3em;
	color: #888;
	padding-left: 15px;
	padding-right: 15px;
	font-size: 14px
}
.cell {
	padding: 10px 15px;
	position: relative;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center
}
.cell_primary {
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	flex: 1
}
.cells_access .cell:not(.no_access) {
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0)
}
.cells_access .cell:not(.no_access):active {
	background-color: #ececec
}
.cells_access a.cell {
	color: inherit
}
</style>