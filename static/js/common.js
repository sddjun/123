//提示框
function tips(t){
	var txt = t.txt;
	var Callback = t.Callback;
	var timer = null;
	var obj = document.createElement('div');
	obj.id = "tips";
	obj.className = "tips";
	obj.innerHTML = '<span>'+ txt +'</span>';
	document.body.appendChild(obj);
	timer = setTimeout(function(){
		clearTimeout(timer);
		obj.remove();
		Callback && Callback();
	},800)
}

//提示带按钮
function prompt(txt,Callback){
	var obj = document.createElement('div');
	obj.id = "popMask";
	obj.className = "pop-mask";
	obj.innerHTML = '<div class="pop-wrap"><div class="pop-text">'+ txt +'</div><div class="pop-btn"><a href="javascript:;" class="sure">确认</a><a href="javascript:;" class="cancel">取消</a></div></div>';
	document.body.appendChild(obj);
	getClassName(obj,'cancel')[0].onclick = function(){
		obj.remove();
	};
	getClassName(obj,'sure')[0].onclick = function(){
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
        return obj.getElementsByClassName(sName);
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