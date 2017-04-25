var canvaswidth=window.innerWidth;
var canvasheight=window.innerHeight;

var can=document.getElementById("canvas");
var ctx=can.getContext('2d');

can.width=canvaswidth;
can.height=canvasheight;

var leftmargin=0,topmargin=0;
var radius=50;
var image=new Image();
// var clipping={ x:400,y:200,r:50};
image.src="../img/14.jpg";
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
};


function initcanvas(){
	clipping={ x:Math.random()*(can.width-2*radius)+radius,
		       y:Math.random()*(can.height-2*radius)+radius,r:radius};
	draw(image,clipping)
}

function setclipping(clipping){
	ctx.beginPath();
	ctx.arc(clipping.x,clipping.y,clipping.r,0,2*Math.PI,false);
	ctx.clip();
}

function draw(image,clipping){
	ctx.clearRect(0,0,can.width,can.height);
	ctx.save();
	setclipping(clipping);
	ctx.drawImage(image,leftmargin,topmargin,can.width,can.height,0,0,can.width,can.height);
	ctx.restore();
}


function reset(){
	initcanvas();
}

function show(){
	var theanimation=setInterval(function(){
		clipping.r+=30;
		var maxR=2*can.width/Math.cos(2*Math.PI/12);
		if(clipping.r>maxR){
			clearInterval(theanimation);
		}else{
		draw(image,clipping);
		}
	},20)
}