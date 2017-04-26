var canvaswidth=window.innerWidth;
var canvasheight=window.innerHeight;

var can=document.getElementById("canvas");
var ctx=can.getContext('2d');

can.width=canvaswidth;
can.height=canvasheight;

var leftmargin=0;
var topmargin=0;
var radius=50;
var image=new Image();
// var clipping={ x:400,y:200,r:50};
// var clipping={ x:Math.random()*(can.width-2*radius)+radius,
// 		       y:Math.random()*(can.height-2*radius)+radius,
// 		       r:radius};
image.src="../img/12.jpg";
image.onload=function(){
	$('.drawImage').css("width",canvaswidth+'px');
	$('.drawImage').css("height",canvasheight+'px');

	$('#image').css("width",image.width+'px');
	$('#image').css("height",image.height+'px');

	leftmargin=(image.width-can.width)/2;
    topmargin=(image.height-can.height)/2;

	$('#image').css("left",'-'+leftmargin+'px');
    $('#image').css("top",'-'+topmargin+'px');

	initcanvas()
}


function initcanvas(){
	clipping={ x:Math.random()*(can.width-2*radius)+radius,
		       y:Math.random()*(can.height-2*radius)+radius,
		       r:radius,
		   	   reg:rad};
	draw(image,clipping)
}

//画剪辑的图像
var rad=0;
function setclipping(clipping){
	ctx.beginPath();
	//画圆形剪辑区域
	// ctx.arc(clipping.x,clipping.y,clipping.r,0,2*Math.PI,false);
	//画三角形
	/*ctx.moveTo(clipping.x,clipping.y-clipping.r);
	ctx.lineTo(clipping.x+clipping.r*Math.cos(2*Math.PI/12),
			   clipping.y+clipping.r*Math.sin(2*Math.PI/12));
	ctx.lineTo(clipping.x-clipping.r*Math.cos(2*Math.PI/12),
		       clipping.y+clipping.r*Math.sin(2*Math.PI/12));
	ctx.lineTo(clipping.x,clipping.y-clipping.r);*/
	//旋转三角形
	ctx.moveTo(clipping.x+clipping.r*Math.cos(Math.PI/2+clipping.reg),
		       clipping.y-clipping.r*Math.sin(Math.PI/2+clipping.reg));

	ctx.lineTo(clipping.x+clipping.r*Math.sin(8*Math.PI/12+clipping.reg),
			   clipping.y-clipping.r*Math.cos(8*Math.PI/12+clipping.reg));

	ctx.lineTo(clipping.x+clipping.r*Math.sin(16*Math.PI/12+clipping.reg),
		       clipping.y-clipping.r*Math.cos(16*Math.PI/12+clipping.reg));

	ctx.lineTo(clipping.x+clipping.r*Math.cos(Math.PI/2+clipping.reg),
		       clipping.y-clipping.r*Math.sin(Math.PI/2+clipping.reg));
	ctx.clip()
}

function draw(image,clipping){
	//每次重新随机选剪辑的图像区清除指定区像素
	ctx.clearRect(0,0,can.width,can.height);
	ctx.save();
	setclipping(clipping);
	ctx.drawImage(image,leftmargin,topmargin,
		          can.width,can.height,0,0,
		          can.width,can.height);
	ctx.restore()
}


function reset(){
	clearInterval();
	initcanvas()
}

function show(){
	clearInterval(theanimation);
	var theanimation=setInterval(function(){
		clipping.r+=30;
		// clipping.reg+=Math.PI/12;
		// var maxR=can.width/Math.cos(2*Math.PI/12);
		var maxR=2*can.width/Math.cos(2*Math.PI/12);
		if(clipping.r>maxR){
			clearInterval(theanimation);
		}else{
			draw(image,clipping);
		}
	},10)
}