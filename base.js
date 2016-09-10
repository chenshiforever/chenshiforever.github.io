var $ = function(args){ //前台使用$调用即可，与JQuery一样
	return new Base(args);
}
function Base(args) {
    this.elements = []; //保存得到的节点和节点数组
 
    if (typeof args == "string") {
        //css
        
        if (args.indexOf(' ') != -1) {
            var elements = args.split(' ');
            var childElements = [];
            var node = [];
            
            for (var i = 0; i < elements.length; i++) {
                if (node.length == 0) node.push(document);
                switch (elements[i].charAt(0)) {
                case '#':
                    childElements = [];
                    childElements.push(this.getId(elements[i].substring(1)));
                    node = childElements;
                    break;
                case '.':
                    childElements = [];
                    
                    for (var j = 0; j < node.length; j++) {
                        var temps = this.getClass(elements[i].substring(1), node[j]);
                        for (var k = 0; k < temps.length; k++) {
                            childElements.push(temps[k]);
                        }
                    }
                    node = childElements;
                    break;
                default:
                    childElements = [];
                    for (var j = 0; j < node.length; j++) {
                        var temps = this.getTagName(elements[i], node[j]);
                        for (var k = 0; k < temps.length; k++) {
                            childElements.push(temps[k]);
                        }
                    }
                    node = childElements;
                }
            }
            this.elements = childElements;
        } else {
            switch (args.charAt(0)) {
            case '#':
                this.elements.push(this.getId(args.substring(1)));
                break;
            case '.':
                this.elements = this.getClass(args.substring(1));
                break;
            default:
                this.elements = this.getTagName(args);
            }
        }
    } else if (typeof args == "object") {
        if (args != undefined) {
            this.elements[0] = args;
        }
    } else if(typeof args == 'function'){
    	this.ready(args);
    }
}
Base.prototype.ready = function(fn){
	addDomLoad(fn);
}
//find
Base.prototype.find=function(str){
	var childElements = [];
	for(var i = 0 ; i <this.elements.length; i++ ){
		switch(str.charAt(0)){
			case '#':childElements.push(this.getId(str.substring(1)));
			break;
			case '.':
				var temps = this.getClass(str.substring(1),this.elements[i]);
				for(var j = 0; j < temps.length; j ++){
					childElements.push(temps[i]);
				}
			break;
			default:
			var temps = this.getTagName(str,this.elements[i]);
				for(var j = 0; j < temps.length; j ++){
					childElements.push(temps[i]);
				}
		}
	}
	this.elements = childElements;
	return this;
}
//id
Base.prototype.getId = function(id){  
	return document.getElementById(id);
	
}

//获取class节点数组
Base.prototype.getClass = function(classname,parentname){
	var node = null; //得到父元素对象
	var temps = [];
	if(parentname != undefined){
		node = parentname;
	}else{
		node = document;
	}
	var all = node.getElementsByTagName('*');
	for (var i = 0; i < all.length; i ++ ){
		if(all[i].className == classname){
			temps.push(all[i]);
		}
	}
	return temps;
}
//添加class
Base.prototype.addClass =function(className){ 
	for(var i = 0; i < this.elements.length; i ++){
		if(!hasClass(this.elements[i],className)){
			this.elements[i].className +=" " + className; 
		}
	}
	return this;
}
//移除class
Base.prototype.removeClass =function(className){ 
	for(var i = 0; i < this.elements.length; i ++){
		if(hasClass(this.elements[i]),className){
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' +className+ '(\\s|$)')," ");  
		}
	}
	return this;
}
//name
Base.prototype.getName = function(name){
	var Names = document.getElementsByName(name);
	for(var i = 0; i < Names.length; i++){
		this.elements.push(Names[i]);
	}
	return this;
}
//tagname
Base.prototype.getTagName = function(tagname,parentname){
	var node = null; //得到父元素对象
	var temps = [];
	if(parentname != undefined){
		node = parentname;
	}else{
		node = document;
	}
	var tags = node.getElementsByTagName(tagname);//这是类数组nodelist
	for (var i = 0; i < tags.length; i ++ ){
		temps.push(tags[i]);
	}
	return temps;
}
//返回单个数组元素
Base.prototype.get = function(num){
	return this.elements[num];
}
//获取元素节点数组,就是得到elemetnts里面的第几个元素,返回base对象
Base.prototype.eq = function(num){
	var elements = this.elements[num];
	this.elements = [];
	this.elements.push(elements);
	return this;
}
//first
Base.prototype.first = function(id){  
	return this.elements[0];
	
}

//last
Base.prototype.last = function(id){  
	return this.elements[this.elements.length-1];
	
}

//获取某一个节点在整个节点组中是第几个索引
Base.prototype.index = function () {
	var children = this.elements[0].parentNode.children;
	for (var i = 0; i < children.length; i ++) {
		if (this.elements[0] == children[i]) return i;
	}
};
//获取某一个节点在整个节点组中的兄弟
Base.prototype.sibiling = function () {
	var children = this.elements[0].parentNode.children;
	var elements=[];
	for (var i = 0; i < children.length; i ++) {
		if (this.elements[0] !== children[i]) {
			elements.push(children[i]);
		}
	}
	this.elements=elements;
	return this;
};
//css
Base.prototype.css = function(attr,value){
	for(var i = 0; i < this.elements.length; i ++){
		if(arguments.length ==1){ //获取css
			return getStyle(this.elements[i],attr);
		}
		this.elements[i].style[attr] = value;
	}
	return this;
}
//添加css规则
Base.prototype.addRule = function(num,selectorText,cssText,position){ //num表示在第几个样式表里面添加
	var sheet = document.styleSheets[num];//样式表数组的顺序是按照html加载css的顺序得到的
	insertRule(sheet,selectorText,cssText,position);
	return this;
}
//移除css规则
Base.prototype.removeRule = function(num,index){ //num表示在第几个样式表里面添加
	var sheet = document.styleSheets[num];//样式表数组的顺序是按照html加载css的顺序得到的
	deleteRule(sheet,index);
	return this;
}
//innerHTML
Base.prototype.html = function(value){
	for(var i = 0;i < this.elements.length; i ++){
		if(argument.length == 0){
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = value;
	}
	return this;
}
//center
Base.prototype.center = function(width,height){
	var top =(getClientInner().height -height)/2;
	var left =(getClientInner().width -width)/2;
	for(var i = 0;i < this.elements.length; i ++){
		this.elements[i].style.position = "absolute"; 
		this.elements[i].style.top = top +"px";
		this.elements[i].style.left = left +"px";
	}
	return this;
}
//添加遮罩lock
Base.prototype.lock = function(){
	for(var i = 0; i < this.elements.length; i ++){
		this.elements[i].style.width = getClientInner().width +"px";
		this.elements[i].style.height = getClientInner().height + "px";
		this.elements[i].style.display = "block";
		document.documentElement.style.overflow = "hidden";
		addEvent(window,'scroll',scrollTop);
	}
	return this ;
}
//移除
Base.prototype.unlock = function(){
	for(var i = 0; i < this.elements.length; i ++){
		document.documentElement.style.overflow = "auto";
		this.elements[i].style.display = "none";
		removeEvent(window,'scroll',scrollTop);
	}
	return this ;
}


//hover
Base.prototype.hover = function(fn1,fn2){
	for(var i = 0; i < this.elements.length; i ++){
		addEvent(this.elements[i],'mouseover',fn1);
		addEvent(this.elements[i],'mouseout',fn2);
	}
	return this ;
}
//show
Base.prototype.show = function(){
	
	for(var i = 0; i < this.elements.length; i ++){
		this.elements[i].style.display = "block";
	}
	
	return this ;
}
//hide
Base.prototype.hide = function(){
	for(var i = 0; i < this.elements.length; i ++){
		this.elements[i].style.display = "none";
	}
	return this ;
}
//添加点击事件
Base.prototype.click = function(fn){
	for(var i = 0;i < this.elements.length; i ++){
		addEvent(this.elements[i],'click',fn);
	}
	return this;
}
//resize
Base.prototype.resize = function(fn){
	for(var i = 0; i < this.elements.length; i++){
		var element = this.elements[i];
		addEvent(window,"resize",function(){
			fn();
			if(element.offsetLeft > getClientInner().width - element.offsetWidth){
				element.offsetLeft = getClientInner().width - element.offsetWidth
			} 	
			if(element.offsetTop > getClientInner().height - element.offsetHeight){
				element.offsetTop = getClientInner().height - element.offsetHeight
			}
			if (element.offsetLeft < 0) {
				element.style.left = 0 + 'px';
			}
			if (element.offsetTop < 0) {
				element.style.top = 0 + 'px';
			}
		})
	}
	
	return this;
};



//下面是非Base库集成的
//检测浏览器ua
(function(){
	window.sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/msie([\d.]+)/)) ? sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? sys.ff = s[1]:
	(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1]:
	(s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1]:
	(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] :0;
	if (/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];
})()
//Dom加载
function addDomLoad(fn){
	var isReady = false;
	var timer = null;
	function doReady(){
		if(timer)clearInterval(timer);
		if(isReady) return;
		isReady = true;
		fn();
	}
	if((sys.opera && sys.opera <9) ||(sys.ff && sys.ff <3)|| (sys.webkit && sys.webkit <525)){
		timer = setInterval(function(){
			if (document && document.getElementById && document.getElementsByTagName && document.body) {
				doReady();
			}
		},1);
	}
	if(document.addEventListener){
		addEvent(document,'DOMContentLoaded',function(){
			fn();
			removeEvent(document,'DOMContentLoaded',arguments.callee);
		})
	}else if(sys.ie && sys.ie<9) {
		var timer = null;
		timer = setInterval(function(){
			try{
				document.documentElement.doScroll('left');//IE独有的方法
			}catch(e){
				
			}
		},1);
		
	}
}
//绑定事件
addEvent.id = 1;  //如果有很多不同的事件，他们的id是一直在递增的并不是从0开始的
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener != "undefined"){
		obj.addEventListener(type,fn,false);
	} else {
		if(!obj.events) obj.events = {};
		if(!obj.events[type]){
			obj.events[type] = [];
			if(obj["on"+type])obj[type][0] = fn;//???,根据返回的结果上面来看,数组obj.events[type]的第0个位置的并没有东西
		} else{
			if(addEvent.equal(obj.events[type],fn)){
				return false;
			}
		}
		obj.events[type][addEvent.id++] = fn;
		obj["on"+type] = addEvent.exec;  
		}
	}

//执行事件
addEvent.exec = function (event){  
	var e = event || addEvent.fixEvent(window.event);	
	var es = this.events[e.type]; //this是div对象
	for(var i in es){
		es[i].call(this,e);
	}
}
//判断相同的函数
addEvent.equal = function(es,fn){
	for( var i in es){
		if(es[i] == fn){
			return true;
		}
		return false;
	}
}

//把IE常用的Event对象配对到W3C中去
addEvent.fixEvent = function(event){
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	event.target = event.srcElement;
	return event;
}
addEvent.fixEvent.preventDefault = function(){
	this.returnValue =false;
}
addEvent.fixEvent.stopPropagation = function(){
	this.cancelBubble = true;
}
//移除事件
function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener != "undefined"){
		obj.removeEventListener(type,fn,false);
	} else {
		for(var i in obj[events][type]){
			if(obj.events[type][i] == fn){
				delete obj.events[type][i];
			}
		}
	}
}
//获取浏览器视窗
function getClientInner(){
	if(typeof window.innerWidth != "undefined"){
		return  {
			width: window.innerWidth,
			height:window.innerHeight
		}
	}else {
			return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}	
} 
//兼容获取style
function getStyle(element,attr){
	if(typeof window.getComputedStyle != "undefined"){
		return parseFloat(window.getComputedStyle(element,null).getPropertyValue(attr));
	} else if(typeof element.currentStyle != "undefined"){
		return parseFloat(element.currentStyle[attr]);
	}
}
//判断class是否存在
function hasClass(element,className){
	return element.className.match(new RegExp('(\\s|^)' +className +'(\\s|$)'));
}
//兼容添加css规则
function insertRule(sheet,selectorText,cssText,position){
	if(typeof sheet.insertRule != "undefined"){
		sheet.insertRule(selectorText + "{" + cssText + "}",position);
	} else if(typeof sheet.addRule != "undefined"){
		sheet.addRule(selectorText,cssText,position);
	}
}
//兼容移除css规则
function deleteRule(sheet,index){
	if(typeof sheet.deleteRule != "undefined"){
		sheet.deleteRule(index);
	} else if(typeof sheet.removeRule != "undefined"){
		sheet.removeRule(index);
	}
}
//events
function getEvent(event){
	return event || window.event
}
//阻止默认行为
function preDef(e){
	var e = getEvent(e);
	if(typeof e.preventDefault != "undefined"){
		e.preventDefault();
	} else {
		e.returnValue =false;
	}
}
//正则删除两端空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,"");
}
//滚动条回到顶部
function scrollTop(){
	document.documentElement.scrollTop = document.body.scrollTop = 0;
}
//获取滚动条
function getScroll(){
	return {
		top:document.documentElement.scrollTop || document.body.scrollTop,
		left:document.documentElement.scrollLeft || document.body.scrollLeft
	}
}
//功能,应该做成插件
//拖跩
//
Base.prototype.drag = function(){//传入可拖拽区域需要$("div")形式,必须传参
	var tags=arguments;
	for(var i = 0; i < this.elements.length; i ++){
		addEvent(this.elements[i],'mousedown', function(e){//这个this是base对象  这里表示在相应的div区域内能够点击下去
			$(this).css("position","absolute");
			if(trim(this.innerHTML).length == 0) e.preDef();
			var e = getEvent(e);
			var _this =this;	//这个this是this.elements[i]对象就是div对象，必须传递这个对象
			var diffX = e.clientX - _this.offsetLeft;
			var diffY = e.clientY - _this.offsetTop;
			//自定义拖拽区域
			var flag = false;
			
			for (var i = 0; i < tags.length; i ++) {
				if (e.target == tags[i]) {
					flag = true;					//只要有一个是true，就立刻返回
					break;
				}
			}
			if (flag) {
				addEvent(document, 'mousemove', move);
				addEvent(document, 'mouseup', up);
			} else {
				removeEvent(document, 'mousemove', move);
				removeEvent(document, 'mouseup', up);
			}
			function move(e){
				var left = e.clientX  - diffX;
				var top = e.clientY - diffY;
				
				if(left < 0){
					left = 0;
				} else if(left > getClientInner().width - _this.offsetWidth){
					left = getClientInner().width - _this.offsetWidth;
				}
				
				if(top < 0){
					top = 0;
				} else if(top > getClientInner().height - _this.offsetHeight){
					top = getClientInner().height - _this.offsetHeight;
				}
				
				_this.style.left = left+ "px";
				_this.style.top = top + "px";
				
				if (typeof _this.releaseCapture != 'undefined') {
					_this.releaseCapture();
				}
			}
			function up(){
				removeEvent(document,'mousemove',move);
				removeEvent(document,'mouseup',up);
				if (typeof _this.releaseCapture != 'undefined') {
					_this.releaseCapture();
				}
			}
		})
	
	}
	return this;
}
//动画
//参数
//attr x:左，y：上，w：宽，h：高，o：透明度，默认左
//start 开始动画的参数，透明度在0-1以内
//time 多久一次动画
//step 一次走多远
//alter 增量，如果没有target，taeget=start+alter
//target 目标，到哪里 alter与target必须有一个
//type 运动方式 匀速与缓冲
//speed 速度 默认6，主要用于设置缓冲时候
//mul  同步多个动画
//
Base.prototype.animate = function(obj){
	for(var i = 0; i < this.elements.length; i ++){
		var element = this.elements[i];
		var attr = obj["attr"] =="x" ? "left" : obj["attr"] == "y" ? "top" : obj["attr"] == "w" ? "width" : obj["attr"] == "h" ? "height" : obj["attr"] == "o" ? "opacity" : "left";
		var start = obj["start"] != undefined ? obj["start"]: attr == "opacity" ? parseFloat(getStyle(element,attr)) * 100 :parseInt(getStyle(element,attr));
		var time = obj["time"] != undefined ? obj["time"] : 10;
		var step = obj["step"] != undefined ? obj["step"] : 1;
		var alter = obj["alter"] ; //增量
		var target = obj["target"] ; //目标
		var type = obj["type"] == "constant" ? "constant" : "buffer";
		var speed = obj["speed"] != undefined ? obj["speed"] : 6;
		var mul = obj["mul"];
		if(alter != undefined && target == undefined){
			target = target + alter;
		}else if(alter == undefined && target == undefined && mul == undefined){
			throw new Error("alter以及target参数错误啦！");
		}
		
		if(start > target){
			step = -step;
		}
		if(attr == "opacity"){
			
			element.style.opacity = parseInt(start)/100;
			element.style.filter = "alpha(opacity ="+ parseInt(start) + ")";			
		} else {
			element.style[attr] = start + "px";
	
		}
		if(mul == undefined){
			mul = {};
			mul[attr] = target;
		}
		 clearInterval(element.timer);
		 element.timer = setInterval(function(){
			var flag=true;
			for(var i in mul){
				attr = i == "x"?"left":i == "y"?"top":i == "w"?"width":i=="h"?"height":i == "o" ? "opacity":i != undefined ? i : "left";
				target = mul[i];
			
				if(type == "buffer"){
					step = attr == "opacity" ? (target - parseFloat(getStyle(element,attr)) *100)/speed :(target - parseInt(getStyle(element,attr)))/speed;
					step = step > 0 ?Math.ceil(step) : Math.floor(step);
				}
				if(attr == "opacity"){//在透明度里面
					if(step == 0){ //这三个if是判断是不是快要到终点了
						setOpacity();
					}else if(step >0 && Math.abs(parseFloat(getStyle(element,attr))*100 - target) <= step){
						setOpacity();
					} else if(step <0 && Math.abs(parseFloat(getStyle(element,attr))*100 - target) <= Math.abs(step)){
						setOpacity();
					} else {
						
						//这里是执行的核心动画
						var temp =parseFloat(getStyle(element,attr))*100;
						element.style.opacity = parseInt(temp + step)/100;
						element.style.filter = "alpha=(opacity="+parseInt(temp+step) +")";
					}
					if(parseInt(target)!=parseInt(parseFloat(getStyle(element,attr))*100)) flag =false;
				} else{ //非透明度
					
					if(step == 0||(step > 0 && Math.abs(getStyle(element, attr) - target) <= step) || (step < 0 && (getStyle(element, attr) - target) <= Math.abs(step))){
						
						setTarget();
					} else {
						element.style[attr] = getStyle(element, attr) + step + 'px';
					}
					if(parseInt(target)!=parseInt(parseFloat(getStyle(element,attr)))) flag =false;
				}
			}
			if(flag){
				clearInterval(element.timer);
				if(obj.fn !=undefined)obj.fn();
			}
		},time);
		function setTarget() {
			
			element.style[attr] = target + 'px';
			//clearInterval(element.timer);
			if(obj.fn)obj.fn();
		}	
		function setOpacity() {
			element.style.opacity = parseInt(target) / 100;
			element.style.filter = 'alpha(opacity=' + parseInt(target) + ')';
			//clearInterval(element.timer);
			if(obj.fn)obj.fn();
		}	
	}
	return this;
}


/*//调用方法  
ajax({
	method : post,
	url : "demo.php",
	data:{
		year : 2016,
		name : name,
		age :18
	},
	async:false,
	sucess:function(data){
		//doSomething
	}
})*/
//参数
//method get/post
//url 服务器地址
//data 传入数据参数
//async true异步/false同步
//sucess 成功就回调
//
function ajax(obj){
	var xhr = (function(){
		if(typeof XMLHttpRequest != "undefined"){
			return new XMLHttpRequest();
		} else if(typeof ActiveXObject != "undefined"){
			var version = ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'];
			for(var i = 0; i < version.length; i++){
				try{
					return new ActiveXObject(version[i]);
				} catch(e){
					
				}
			}
		} else {
			throw("您的浏览器不支持XHR对象！");
		}
	})()
	obj.url = obj.url +"?rand="+ Math.random();
	obj.data = (function(data){   //传入数据json格式
		var arr = [];
		for(var i in data){
			arr.push(encodeURIComponent(i)+ "=" +encodeURIComponent(data[i]));
		}
		return arr.join("&");
	})(obj.data)
	if(obj.method === "get") obj.url += obj.url.indexOf("?") == -1 ? "?"+ obj.data : "&" + obj.data;
	if(obj.async === true){
		xhr.onreadystatechange =function(){
			if(xhr.readyState == 4){
				callback();
			}
		}
	}
	xhr.open(obj.method,obj.url,obj.async);
	if(obj.method === "post"){
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencode");
		xhr.send(obj.data);
	}else{
		xhr.send(null);
	}
	if(obj.async === false){
		callback();
	}
	function callback(){
		if(xhr.status == 200){
			obj.success(xhr.responseText);
		}else{
			console.log('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
		}
	}

}





function runer(x){   //settimeout模拟setInterval
	var timer = setTimeout(function(){
		x--;
		if(x > 0){
			runer(x);
		}
		clearTimeout(timer);
	},1000)	
}


//插件入口
Base.prototype.extend = function (name, fn) {
	Base.prototype[name] = fn;
};