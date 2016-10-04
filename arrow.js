function Arrow(option){
	this.init(option);
}
Arrow.prototype = {
	constructor:Arrow, 
	init:function(option){
		option = option || {};
		this.x = option.x || 0;
		this.y = option.y || 0;
		this.rotation = option.rotation || 0;
		this.color = option.color || "#ff0";
	},
	draw:function(context){
		context.save();
		context.translate(this.x,this.y);
		context.rotate(this.rotation);
		context.lineWidth = 5;
		context.fillStyle = this.color;
		context.beginPath();    //这里画一个箭头
		context.moveTo(-50,-25);
	    context.lineTo(0,-25);
	    context.lineTo(0,-50);
	    context.lineTo(50,0);
	    context.lineTo(0,50);
	    context.lineTo(0,25);
	    context.lineTo(-50,25);
		context.closePath();
		context.stroke();
		context.fill();
		context.restore();
	}
}

function Ball(option){
	this.init(option);
}
Ball.prototype = {
	constructor:Ball,
	init:function(option){
		option = option || {};
		this.x = option.x || 0;
		this.y = option.y || 0;
		this.vx = option.vx ||0;
		this.vy = option.vy ||0;
		this.mass = option.mass ||1;
		this.scaleX = option.scaleX ||1;
		this.scaleY = option.scaleY ||1;
		this.name = option.name ||"";
		this.lineWidth = option.lineWidth ||1;
		this.color = option.color || "#ff0";
		this.rotation = option.rotation || 0;
		this.radius = option.radius || 30;
	},
	draw:function(context){
		context.save();
		context.translate(this.x,this.y);
		context.rotate(this.rotation);
		context.scale(this.scaleX,this.scaleY);
		context.fillStyle = this.color;
		context.lineWidth = this.lineWidth;
		context.strokeStyle = this.color;
		context.beginPath();
		context.arc(0,0,this.radius,0,Math.PI*2,false);
		context.closePath();
		context.fill();
		context.stroke();
		context.restore();
	},
	getBounds:function(){
		return {
			x:this.x - this.radius,
			y:this.y - this.radius,
			width:this.radius*2,
			height:this.radius*2
		}
	}
}
function Coordinate(option){
	this.init(option);
};
Coordinate.prototype = {
	constructor:Coordinate,
	init:function(option){
		option = option || {};
		this.x = option.x || 200;
		this.y = option.y || 200;
		this.vx = option.x || 10;
		this.vy = option.y || 80;
		this.width = option.width ||200;
		this.lineWidth = option.lineWidth || 5;
		this.color = option.color || "#000";
		this.rotation = option.rotation || 0;
		
	},
	draw:function(context){
		context.save();
		context.translate(this.x,this.y);
		context.rotate(this.rotation);
		context.fillStyle = this.color;
		context.lineWidth = this.lineWidth;
		context.strokeStyle = this.color;
		context.lineJoin="round";
		context.beginPath();
		context.moveTo(this.vx,this.vy);
		context.lineTo(this.vx+this.width,this.vy);
		context.lineTo(this.vx+this.width-20,this.vy+20);
		context.moveTo(this.vx+this.width,this.vy);
		context.lineTo(this.vx+this.width-20,this.vy-20);
		context.lineTo(this.vx+this.width,this.vy);
		context.lineTo(this.vx,this.vy);
		context.lineTo(this.vx,this.vy-this.width);
		context.lineTo(this.vx-20,this.vy-this.width+20);
		context.moveTo(this.vx,this.vy-this.width);
		context.lineTo(this.vx+20,this.vy-this.width+20);
		context.closePath();
		context.stroke();
		context.restore();
	},
	drawPoint:function(context,x,y){
		context.save();
		context.translate(this.x+this.vx,this.y+this.vy);
		context.rotate(this.rotation);
		context.fillStyle = this.color;
		context.lineWidth = 3;
		context.strokeStyle = "yellow";
		context.lineJoin="round";
		context.beginPath();
		context.lineTo(x-10,-y+10);
		context.lineTo(x,-y);
		context.closePath();
		context.stroke();
		context.restore();
	}
}





// Object.prototype.x = 10;
// var w = 20;
// var y = 30;
// (function foo() {
//   var w = 40;
//   var x = 100;
//   with ({z: 50}) {
//     console.log(w, x, y , z); 
//   }
 
 
// })();



/*//无聊的代码
  var arr = [12,23,45,56,78],
          arrList = [],
         
          str="";
        for(var i = 0; i < arr.length; i ++){
           arrList.push(String.prototype.split.call(arr[i],""));
        }
        for(i = 0; i< arrList.length ; i++){
          var  tempList = [];
          if(i + 1 < arrList.length){
            
            for(var j = 0; j < arrList[i].length; j++){
              
              for(var k = 0; k < arrList[i+1].length;k ++){
                tempList.push("" + arrList[i][j] + arrList[i+1][k]);
              }
            }
            arrList[i+1] = tempList;
          }
          
        }
        console.log(arrList[arrList.length-1]);v


 */ 