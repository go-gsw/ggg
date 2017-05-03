var canvasWidth= Math.min(800,$(window).width()-10);
var canvasHeight=canvasWidth;

var storkeColor="";
var ismousedown=false;
var lasloc={x:0,y:0};
var LastTimeTamp=0;
var LastLineWidth=0;

var can=document.getElementById("canvas");
var ctx=can.getContext("2d");

can.width=canvasWidth;
can.height=canvasHeight;


DrawGrid();
$("#canvas").css('border-radius',canvasWidth/200+'px');
$("#container").css('width',canvasWidth+"px");
$("#clear").click(
	function(event){
		ctx.clearRect(0,0,canvasWidth,canvasHeight);
		DrawGrid();
	}
)
$(".color").click(
	function(e){
		$(".color").removeClass('btn_selected');
		$(this).addClass('btn_selected');
		storkeColor=$(this).css("background-color");
	}
)

//把点击事件提取出来
function beginStroke(point){
	ismousedown=true;
	lasloc=windowToCanvas(point.x,point.y);
	LastTimeTamp=new Date().getTime();
}
function endStroke(){
	ismousedown=false;
}
function moveStroke(point){
		var curloc=windowToCanvas(point.x,point.y);
		var s=calDistance(lasloc,curloc);
		var curTimeTamp=new Date().getTime();
		var t=curTimeTamp-LastTimeTamp;
		var linewidth=calLineWidth(s,t);
	
		ctx.beginPath();
		ctx.strokeStyle=storkeColor;
		ctx.moveTo(lasloc.x,lasloc.y);
		ctx.lineTo(curloc.x,curloc.y);
		//使笔画粗细过度平滑
		ctx.lineWidth=(LastLineWidth==0)?linewidth:LastLineWidth*2/3+linewidth*1/3;

		//设置结束线冒
		ctx.lineCap="round";
		//设置或返回两条线相交时，所创建的拐角类型
		ctx.lineJoin="round";
		ctx.closePath();
		ctx.stroke();

		//维护变量
		lasloc=curloc;
		LastTimeTamp=curTimeTamp;
		LastLineWidth=linewidth;
}


can.onmousedown=function(event){
	//阻止默认动作
	event.preventDefault();
	beginStroke({x:event.clientX,y:event.clientY});
	//ismousedown=true;
	// alert(event.clientX+','+event.clientY);
	// alert(event.type);
	// console.log(e);
	//lasloc=windowToCanvas(event.clientX,event.clientY);
	//LastTimeTamp=new Date().getTime();
	// alert(lasloc.x+','+lasloc.y);
};
can.onmouseup=function(event){
	event.preventDefault();
	endStroke();
};
can.onmouseout=function(event){
	event.preventDefault();
	endStroke();
};
can.onmousemove=function(event){
	event.preventDefault();
	if(ismousedown){
		/*var curloc=windowToCanvas(event.clientX,event.clientY);
		var s=calDistance(lasloc,curloc);
		var curTimeTamp=new Date().getTime();
		var t=curTimeTamp-LastTimeTamp;
		var linewidth=calLineWidth(s,t);
	
		ctx.beginPath();
		ctx.strokeStyle=storkeColor;
		ctx.moveTo(lasloc.x,lasloc.y);
		ctx.lineTo(curloc.x,curloc.y);
		//使笔画粗细过度平滑
		ctx.lineWidth=(LastLineWidth==0)?linewidth:LastLineWidth*2/3+linewidth*1/3;

		//设置结束线冒
		ctx.lineCap="round";
		//设置或返回两条线相交时，所创建的拐角类型
		ctx.lineJoin="round";
		ctx.closePath();
		ctx.stroke();

		//维护变量
		lasloc=curloc;
		LastTimeTamp=curTimeTamp;
		LastLineWidth=linewidth;*/
		moveStroke({x:event.clientX,y:event.clientY});
	}
};
can.addEventListener('touchstart',function(e){
	e.preventDefault();
	//多点触控只识别第一个手指
	touch=e.touches[0];
	beginStroke({x:touch.pageX,y:touch.pageY});
})
can.addEventListener('touchend',function(e){
	e.preventDefault();
	ismousedown=false;
})
can.addEventListener('touchmove',function(e){
	e.preventDefault();
	if(ismousedown){
		touch=e.touches[0];
		moveStroke({x:touch.pageX,y:touch.pageY});
	}
})

//计算笔画的宽度
var maxLinewidth=canvasWidth/22;
var minLinewidth=maxLinewidth/15;
var maxStrokeV=8;
var minStrokeV=maxStrokeV/100;


function calLineWidth(s,t){
	var v=s/t;
	if(v<minStrokeV){
		return maxLinewidth;
	}else if(v>=maxStrokeV){
		return minLinewidth+(v-maxStrokeV)/(maxStrokeV-minStrokeV)*(maxLinewidth-minLinewidth);
	}else return maxLinewidth-(v-minStrokeV)/(maxStrokeV-minStrokeV)*(maxLinewidth-minLinewidth);

}


//计算距离
function calDistance(loc1,loc2){
	//距离公式(X1-X2)^2+(Y1-Y2)^2开根号，平方和开根号   Math.sqrt(Math.pow(X1-X2,2)+Math.pow(Y1-Y2,2))
	return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y));
}

//传入的x,y参数是当前相对屏幕的坐标
function windowToCanvas(x,y){
	//getBoundingClientRect获得canvas包围盒的信息
	var bbox=can.getBoundingClientRect();
	//返回值是相对于canvas的坐标
	return {x:Math.round(x-bbox.left),y:Math.round(y-bbox.top)}
}
function DrawGrid(){
	var drawGridLineWidth=canvasWidth/100;
	ctx.save();
	ctx.strokeStyle='gray';
	ctx.lineWidth=drawGridLineWidth;
	ctx.beginPath();
	ctx.moveTo(drawGridLineWidth/2,drawGridLineWidth/2);
	ctx.lineTo(canvasWidth-drawGridLineWidth/2,drawGridLineWidth/2);
	ctx.lineTo(canvasWidth-drawGridLineWidth/2,canvasHeight-drawGridLineWidth/2);
	ctx.lineTo(drawGridLineWidth/2,canvasHeight-drawGridLineWidth/2);
	ctx.closePath();
	ctx.stroke();



	ctx.beginPath();
	/*ctx.moveTo(0,0);
	ctx.lineTo(canvasWidth,canvasHeight);

	ctx.moveTo(canvasWidth/2,0);
	ctx.lineTo(canvasWidth/2,canvasHeight);

	ctx.moveTo(canvasWidth,0);
	ctx.lineTo(0,canvasHeight);

	ctx.moveTo(canvasWidth,canvasHeight/2);
	ctx.lineTo(0,canvasHeight/2);*/

	// ctx.save();
	DrawDashedLine(ctx,{x:0,y:0},{x:canvasWidth,y:canvasHeight},drawGridLineWidth/4,8);
	// ctx.restore();
	ctx.closePath();
	// ctx.lineWidth=2;
	ctx.stroke();

	ctx.beginPath();
	// ctx.save();
	DrawDashedLine(ctx,{x:canvasWidth/2,y:0},{x:canvasWidth/2,y:canvasHeight},drawGridLineWidth/4,8);
	// ctx.restore();
	ctx.closePath();
	// ctx.lineWidth=2;
	ctx.stroke();

	ctx.beginPath();
	// ctx.save();
	DrawDashedLine(ctx,{x:canvasWidth,y:0},{x:0,y:canvasHeight},drawGridLineWidth/4,8);
	// ctx.restore();
	ctx.closePath();
	// ctx.lineWidth=2;
	ctx.stroke();

	ctx.beginPath();
	// ctx.save();
	DrawDashedLine(ctx,{x:canvasWidth,y:canvasHeight/2},{x:0,y:canvasHeight/2},drawGridLineWidth/4,8);
	// ctx.restore();
	ctx.closePath();


	// ctx.lineWidth=2;
	ctx.stroke();

	ctx.restore();
};
//绘制虚线
//绘图环境、点1、点2、颜色、虚线间隔
function DrawDashedLine(context,point1,point2,linewidth,dashline){
	var l=calDistance(point1,point2);
	var num=Math.round(l/dashline);
	// console.log(point2.x+','+point2.y);
	// context.save();
	// context.beginPath();
	for(var i=0;i<num;i++){
		var x=point1.x+(point2.x-point1.x)/num*i;
		var y=point1.y+(point2.y-point1.y)/num*i;
		context[i%2==0?'lineTo':'moveTo'](x,y);
		/*if(i%2==0){
			context.moveTo(x,y);
		}else{
			context.lineTo(x,y);
		}*/
	}
	context.lineWidth=linewidth;
	// context.strokeColor='red';
	// context.stroke();
	// context.closePath();

	// context.restore();
};

var cantest=document.getElementById("testCanvasDrawDashedLine");
var ctxtest=cantest.getContext("2d");
cantest.width=400;
cantest.height=400;
$("#testCanvasDrawDashedLine").css('background-color', 'white');
// drawdashedline();
function drawdashedline(){
	ctxtest.save();
	ctxtest.beginPath();
	ctxtest.strokeColor='red';
	DrawDashedLine(ctxtest,{x:0,y:0},{x:cantest.width,y:cantest.height},4,10);
	context.closePath();
	ctxtest.restore();
}