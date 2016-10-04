//事件封装
//动画
if(!window.requestAnimationFrame){
	window.requestAnimationFrame = window.webkitRequestAnimationFrame || 
								   window.mozRequestAnimationFrame || 
								   window.oRequestAnimationFrame || 
								   window.msRequestAnimationFrame || 
								   function(callback){
										return window.setTimeout(callback,1000/60)
									}
								}

if(!window.cancelAnimationFrame){
	window.cancelAnimationFrame = window.webkitCancelAnimationFrame || 
								  window.mozCancelAnimationFrame || 
								  window.oCancelAnimationFrame || 
								  window.msCancelAnimationFrame ||
								  window.webkitCancelRequestAnimationFrame || 
								  window.mozCancelRequestAnimationFrame || 
								  window.oCancelRequestAnimationFrame || 
								  window.msCancelRequestAnimationFrame ||  
								  window.clearTimeout;
								}
//鼠标旋转角度
//mx，my：鼠标位置
//ox，oy：对象位置
function RotationToMouse(mx,my,ox,oy){
	var dx = mx - ox,
		dy = my - oy,
		angle = Math.atan2(dy,dx);
	return angle;
}
window.utils ={};
//鼠标在element内部的相对坐标
window.utils.captureMouse = function(element){
	var mouse = {x:0,y:0};
	element.addEventListener("mousemove",function(event){
		var event = event || window.event,
			x,
			y;
		if(event.pageX || event.pageY){
			x = event.pageX;
			y = event.pageY;
			
		}else {
			x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		mouse.x = x - element.offsetLeft;
		mouse.y = y - element.offsetTop;
		
	},false)
	return mouse;
}
window.utils.parseColor = function(color,toNumber){
	if(toNumber === true){
		if(typeof color === "number"){
			return (color | 0);
		}
		if(typeof color === "string" && color[0] === "#"){
			color = color.slice(1);
		}
		return window.parseInt(color,16);
	}else {
		if(typeof color === "number"){
			color = "#" + ("00000" + (color | 0).toString(16)).sunstr(-6);
		}
		return color;
	}
	
}
//将16进制颜色转换成rgb
window.utils.colorToRGB = function(color,alpha){
    //如果是字符串格式，转换为数字
    if(typeof color === "string" && color[0] === "#"){
        
        //parseInt(('#ffffff').slice(1),16) 为 16777215
        color = window.parseInt(color.slice(1), 16);

    }
    alpha = (alpha === undefined)? 1 : alpha;
    
    //将color转换成r,g,b值，>>右移  <<左移
    var r = color >> 16 & 0xff; //例如：16777215 >> 16 变成 255， 255 & 0xff为255
    var g = color >>8 & 0xff;
    var b = color & 0xff;
    a = (alpha<0)? 0 : ((alpha>1)? 1 : alpha);
    
    if(a===1){
        return "rgb("+r+","+g+","+b+")";
    }else{
        return "rgba("+r+","+g+","+b+","+a+")";
    }
};
window.utils.containsPoint = function(rect,x,y){
	return !(x < rect.x || 
			 x > rect.x + rect.width || 
			 y < rect.y || 
			 y > rect.y + rect.y + rect.width);
}
window.utils.intersects = function(rectA, rectB){
    return !(rectA.x + rectA.width < rectB.x ||
             rectB.x + rectB.width < rectA.x ||
             rectA.y + rectA.height < rectB.y ||
             rectB.y + rectB.height < rectA.y);
}