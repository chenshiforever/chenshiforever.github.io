javascript:setTimeout(function(){
	a = document.querySelectorAll("#paginationP .page a");
	a[0].click();
	setTimeout(function(){
		b = document.querySelectorAll(".fa-pencil");
		b[b.length-1].click();
		console.log(b[b.length-1].parentNode.parentNode.parentNode.parentNode.firstChild.innerHTML);
		setTimeout(function(){
			c = document.querySelectorAll(".item");
			c[c.length-2].querySelector("a").click();
			setTimeout(function(){
				a=document.querySelectorAll(".btn-default");
				a[a.length-2].click();
				setTimeout(function(){
					a=document.querySelectorAll(".btn-default");
					a[a.length-1].click();
				},500)
			},500)
		},500)
	},500)
},1000)


Function.prototype.bind = function bind(){
	if(arguments.length==0){
		return null;
	}
		var context = Array.prototype.shift.call(arguments),
			that=this,
			arg1 = arguments;
	return function(){
		that.apply(context,Array.prototype.concat.call(arg1,arguments));
}


var v1 = []
var v2 = {};
var v3 = {};
var v4 = 5;
function foo(v1, v2, v3,v4)
{
    v1 = [1];
    v2 = {a:2};
    v2.run = function(){
    	console.log("v2v2v2v2v2");
    };
    v2.get = 2;
 	v3.run = function(){
    	console.log("v3v3v3v3v");
    };
    v3.get = 3;
    v4 = 4;
       
}
foo(v1, v2, v3,v4);
console.log(v1);   //[]
console.log(v2,v2.get,v2.run); //Object {}    undefined    undefined
console.log(v3,v3.get,v3.run);  //Object {get: 3}   3     function(){console.log("v3v3v3v3v");}
console.log(v4);   //5
//前面我们让 v1、v2、v3作为参数进入函数后，就有了地址副本，
//这些地址副本的指向和外面的 v1、v2、v3 的地址指向是相同的。
//但我们为 v1、v2、v3 赋了值，也就是说我们把地址副本的指向改变了，
//指向了新的数组和对象。这样内部的 v1、v2、v3 和外部的 v1、v2、v3 就完全断了。
//如果我们不赋新值，而是直接操作它，那么，它操作到的，
//仍然是和外面的 v1、v2、v3 指向的同一块数组或对象。
//至于v4,v4就是直接的值传递 v4的可以重新写一个单独的栗子
var v4 = 4;
function bar(v){
	v=99999;
}
bar(v4);
console.log(v4);  //仍旧是4

var ticker = {
			target : "#fader",
			pos : {min: -215, max: -539, start:-485},
			interval : null,
			init : function(){
				$('#fader').css({'background-position-y':ticker.pos.start}).parent().css('position','relative');
				this.interval = setInterval(function(){
					$target = $(ticker.target);
					$target.animate({'background-position-y':'-=54'},1500,function(){
						if($target.css('background-position-y') == +ticker.pos.max+'px'){
							$target.css('background-position-y',ticker.pos.min);
						}
					});
				},4000)
			}
		};
		ticker.init();
		
		
		
		
		
		
function c(){
    var obj = {v:1};
    obj.func = function(obj){
        obj = {v:2};
    };
    
    return obj;
}

var c1 = c();
c1.func();
alert(c1.v); // 

var c2 = new c();
c2.func();
alert(c2.v); // 
