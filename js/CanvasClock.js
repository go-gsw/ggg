var doc=document.getElementById('clock');
var ctx=doc.getContext('2d');
var width=ctx.canvas.width;
var height=ctx.canvas.height;
var r=width/2;
//定义倍数
var ren=width/300;


function DrawBackground(){
	//保存当前环境状态
	ctx.save();
	ctx.translate(r,r);
	ctx.beginPath();
	ctx.lineWidth=10*ren;
	ctx.arc(0,0,r-ctx.lineWidth/2,0,2*Math.PI,false);
	ctx.stroke();

	// 写数字
	var hourNumbers=[3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.font=15*ren+'px Arial';
	//居中对齐显示数字
	ctx.textAlign='center';
	ctx.textBaseline='middle';
	hourNumbers.forEach(function(number,i){
		var rad=2*Math.PI/12*i;
		var x=Math.cos(rad)*(r-30*ren);
		var y=Math.sin(rad)*(r-30*ren);
		ctx.fillText(number,x,y);
	});
	//画点
	for(var i=0;i<60;i++){
		var rad=2*Math.PI/60*i;
		var x=Math.cos(rad)*(r-16*ren);
		var y=Math.sin(rad)*(r-16*ren);
		ctx.beginPath();
		if(i%5===0){
			ctx.fillStyle='#000';
			ctx.arc(x,y,2*ren,0,2*Math.PI,false);
		}else{
			ctx.fillStyle='#ccc';
			ctx.arc(x,y,2*ren,0,2*Math.PI,false);
		}
		ctx.fill();
	}
}


function Drawhour(hour,minute){
	ctx.save();
	ctx.beginPath();
	var rad=2*Math.PI/12*hour;
	var min=2*Math.PI/12/60*minute;
	ctx.rotate(rad+min);
	ctx.lineCap='round';
	ctx.lineWidth=6*ren;
	ctx.moveTo(0,10*ren);
	ctx.lineTo(0,-(r/2));
	ctx.stroke();
	ctx.restore();
}
function Drawminute(minute){
	ctx.save();
	ctx.beginPath();
	var min=2*Math.PI/60*minute;
	ctx.rotate(min);
	ctx.lineCap='round';
	ctx.lineWidth=4*ren;
	ctx.moveTo(0,10*ren);
	ctx.lineTo(0,-(r/2+12*ren));
	ctx.stroke();
	ctx.restore();
}
function Drawsecond(second){
	ctx.save();
	ctx.strokeStyle='red';
	ctx.beginPath();
	var sec=2*Math.PI/60*second;
	ctx.rotate(sec);
	ctx.lineCap='round';
	ctx.lineWidth=2*ren;
	ctx.moveTo(0,10*ren);
	ctx.lineTo(0,-(r/2+28*ren));
	ctx.stroke();
	ctx.restore();
}

function DrawDot(){
	ctx.beginPath();
	ctx.fillStyle='#ccc';
	ctx.arc(0,0,2*ren,0,2*Math.PI,false);
	ctx.fill();
}


function draw(){
	ctx.clearRect(0,0,width,height);
	var now=new Date();
	var hour=now.getHours();
	var minute=now.getMinutes();
	var second=now.getSeconds();
	DrawBackground();
	Drawhour(hour,minute);
	Drawminute(minute);
	Drawsecond(second);
	DrawDot();
	ctx.restore();
}
draw();
setInterval(draw,1000);
