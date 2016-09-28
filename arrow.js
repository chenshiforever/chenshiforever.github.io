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
		conetxt.fill();
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








