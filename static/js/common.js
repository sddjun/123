//提示框
function tips(txt,Callback){
	$("body").append('<div class="tips"><span>'+ txt +'</span></div>');
	setInterval(function(){
		$(".tips").remove();
		Callback && Callback();
	},800)
}
//提示带按钮
function prompt(txt,Callback){
	$("body").append('<div class="pop-mask"><div class="pop-wrap"><div class="pop-text">'+ txt +'</div><div class="pop-btn"><a href="javascript:;" class="sure">确认</a><a href="javascript:;" class="cancel">取消</a></div></div></div>');
	$(".pop-mask .cancel").click(function(){
		$(".pop-mask").remove();
	});
	$(".pop-mask .sure").click(function(){
		Callback && Callback();
		$(".pop-mask").remove();
	});
}
//返回顶部
function goTopEx() {  
    var obj = document.getElementById("goTopBtn");
    function getScrollTop() {  
        return document.documentElement.scrollTop + document.body.scrollTop;  
    }  
    function setScrollTop(value) {  
        if (document.documentElement.scrollTop) {  
            document.documentElement.scrollTop = value;  
        } else {  
            document.body.scrollTop = value;
        } 
    }
    window.onscroll = function() {
        getScrollTop() > 0 ? obj.style.display = "": obj.style.display = "none";
    }
    obj.onclick = function() {
        var goTop = setInterval(scrollMove, 10);
        function scrollMove() {
            setScrollTop(getScrollTop() / 1.1);
            if (getScrollTop() < 1) clearInterval(goTop);
        }  
    }  
} 