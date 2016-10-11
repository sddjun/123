//提示框
function tips(t){
	var txt = t.txt;
	var Callback = t.Callback;
	var timer = null;
	document.body.innerHTML += '<div id="tips"><span>'+ txt +'</span></div>'
	timer = setTimeout(function(){
		clearTimeout(timer);
		document.getElementById("tips").remove();
		Callback && Callback();
	},800)
}

//提示带按钮
function prompt(txt,Callback){
	document.body.innerHTML+='<div class="pop-mask" id="popMask"><div class="pop-wrap"><div class="pop-text">'+ txt +'</div><div class="pop-btn"><a href="javascript:;" class="sure">确认</a><a href="javascript:;" class="cancel">取消</a></div></div></div>';
	var obj = document.getElementById('popMask');
	getClassName(obj,'cancel').onclick = function(){
		obj.remove();
	};
	getClassName(obj,'sure').onclick = function(){
		Callback && Callback();
		obj.remove();
	};
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
//获取class
function getClassName(obj,sName){
    if(document.getElementsByClassName){
        return obj.getElementsByClassName('sName');
    }else{      
        var aTmp = obj.getElementsByTagName('*');
        var aRes=[];
        var arr =[];
        for(var i=0;i<aTmp.length;i++){  
            arr = aTmp[i].className.split(' ');
            for (var j=0;j<arr.length;j++){
                if(arr[j] == sName){
                    aRes.push(aTmp[i]);
                }
            }
        }
        return aRes;
    }
}