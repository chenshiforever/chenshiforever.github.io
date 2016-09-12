// var canvas=document.getElementById('canvas');
// var ctx=canvas.getContext('2d');
// ctx.moveTo(100,100);
// ctx.lineTo(200,100);
// ctx.lineTo(100,200); 
// ctx.closePath();
// ctx.strokeStyle="red";
// ctx.lineWidth="2";
// ctx.fillStyle="yellow";
// ctx.fill();

// ctx.stroke();
// 
// 
var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');
var rectH=rectW=10;
for(var i=0,len=canvas.height/rectH;i<len;i++){
	ctx.moveTo(0,i*rectH);
	ctx.lineTo(canvas.width+10,i*rectH);
	ctx.moveTo(i*rectW,0);
	ctx.lineTo(i*rectW,canvas.height+10);
}
ctx.stroke();
