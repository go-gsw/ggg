

    //控制重复点击的二维数组
	var chassBoard=[];
	for(var i =0;i<15;i++){
		chassBoard[i]=[];
		for(var j =0;j<15;j++){
			chassBoard[i][j]=0;
		}
	}
	var me=true;
	var over=false;

	//赢法数组(三维)
	var wins =[];
	for(var i =0;i<15;i++){
		wins[i]=[];
		for(var j =0;j<15;j++){
			wins[i][j]=[];
		}
	}
	//赢法种类的索引,记录赢法
	var count =0;
	//所有横线赢法
	for(var i =0;i<15;i++){
		for(var j =0;j<11;j++){
			/*
			k记五子连在一起
			第0种赢法
			wins[0][0][0]=true;
			wins[0][1][0]=true;
			wins[0][2][0]=true;
			wins[0][3][0]=true;
			wins[0][4][0]=true;

			第1种赢法
			wins[0][1][1]=true;
			wins[0][2][1]=true;
			wins[0][3][1]=true;
			wins[0][4][1]=true;
			wins[0][5][1]=true;

			*/
			for(var k =0;k<5;k++){
				wins[i][j+k][count]=true;
			}
			count++;
		}
	}
	//所有竖线的赢法
	for(var i =0;i<15;i++){
		for(var j =0;j<11;j++){
			for(var k =0;k<5;k++){
				wins[j+k][i][count]=true;
			}
			count++;
		}
	}
	//所有斜线的赢法
	for(var i =0;i<11;i++){
		for(var j =0;j<11;j++){
			for(var k =0;k<5;k++){
				wins[i+k][j+k][count]=true;
			}
			count++;
		}
	}
	//所有反斜线的赢法
	for(var i =0;i<11;i++){
		for(var j =14;j>3;j--){
			for(var k =0;k<5;k++){
				wins[i+k][j-k][count]=true;
			}
			count++;
		}
	}
	console.log(count);
	//打印所有赢法

	//赢法的统计数组(一维)
	var myWin =[];
	var computerWin =[];
	for(var i=0;i<count;i++){
		myWin[i]=0;
		computerWin[i]=0;
	}

	var c = document.getElementById('chass');
	var context = c.getContext('2d');
	/*改变画笔颜色*/
	context.strokeStyle="#bfbfbf";
	var logo =new Image();
		logo.src="img/11.jpg";
		logo.onload=function(){
			/*
			先绘背景再绘网格线
			drawImage(图片，左上角坐标，宽，高)
			*/
			context.drawImage(logo,0,0,450,450);
			drawchassB();

		}
	var drawchassB=function(){
	for (var i = 0; i < 15; i++) {
		context.moveTo(15+i*30,15);
		context.lineTo(15+i*30,435);
		context.stroke();
		context.moveTo(15,15+i*30);
		context.lineTo(435,15+i*30);
		context.stroke();
	}}
	/*me判断黑白棋*/
	var oneStep=function(i,j,me){
		context.beginPath();
		/*画圆arc(圆心，半径，开始弧度，结束弧度)*/
		context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
		context.closePath();
		/*createRadialGradient(外圆圆心，外圆半径，内圆圆心，内圆圆心)*/
		var gradient=context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,8);
		/*
		addColorStop(Stop,Color)
		Stop：介于 0.0 与 1.0 之间的值，表示渐变中开始与结束之间的位置。
		Color：在结束位置显示的 CSS 颜色值。
		*/
		if (me) {
		gradient.addColorStop(0,"#0a0a0a");
		gradient.addColorStop(1,"#636363");
		}else{
		gradient.addColorStop(0,"#d1d1d1");
		gradient.addColorStop(1,"#f9f9f9");
		}
		
		context.fillStyle=gradient;
		context.fill();
		/*
		addColorStop() 方法规定 gradient 对象中的颜色和位置。
		addColorStop() 方法与 createLinearGradient() 或 createRadialGradient() 一起使用。
		*/
	}

	//点击事件函数
	c.onclick=function(e){
		if(over){
			return;
		}
		if(!me){
			return;
		}
		var x=e.offsetX;
		var y=e.offsetY;
		var i=Math.floor(x/30);
		var j=Math.floor(y/30);
		if(chassBoard[i][j]==0){
			oneStep(i,j,me);
			//黑子。
			chassBoard[i][j]=1;
		for(var k=0;k<count;k++){
		//每下一个子都会遍历所有赢法
		if(chassBoard[i][j]==1){
		//判断是否是黑子
			if(wins[i][j][k]){
				//赢法统计数组加一
				myWin[k]++;
				computerWin[k]=6;
				if(myWin[k]==5){
					//存在一个K使得myWin[k]=5,说明第k种赢法被实现。
					window.alert("你赢了");
					over=true;
				}
			}
		}
	}if(!over){
		me=!me;
		computerAi();
	}
	}
	}
	
//实现电脑的落子
	var computerAi=function(){
		//两个二位数组计算我方和电脑的得分
		var myScore=[];
		var computerScore=[];
		//找到myScore和computerScore里的分数最高的点。
		//max保存最高分u,v保存点
		var max=0;
		var u=0,v=0;
		for(var i=0;i<15;i++){
			myScore[i]=[];
			computerScore[i]=[];
			for(var j=0;j<15;j++){
				myScore[i][j]=0;
				computerScore[i][j]=0;
			}
		}
		for(var i=0;i<15;i++){
			for(var j=0;j<15;j++){
				if(chassBoard[i][j]==0){
					for(var k=0;k<count;k++){
						if(wins[i][j][k]){
							if(myWin[k]==1){
								myScore[i][j]+=200;
							}else if(myWin[k]==2){
								myScore[i][j]+=400;
							}else if(myWin[k]==3){
								myScore[i][j]+=6000;
							}else if(myWin[k]==4){
								myScore[i][j]+=10000;
							}

							if(computerWin[k]==1){
								computerScore[i][j]+=220;
							}else if(computerWin[k]==2){
								computerScore[i][j]+=430;
							}else if(computerWin[k]==3){
								computerScore[i][j]+=6400;
							}else if(computerWin[k]==4){
								computerScore[i][j]+=20000;
							}
						}
					}
						if(myScore[i][j]>max){
							max=myScore[i][j];
							u=i;
							v=j;
						}else if(myScore[i][j]==max){
							if(computerScore[i][j]>computerScore[u][v]){
								u=i;
								v=j;
						}
					}

						if(computerScore[i][j]>max){
							max=computerScore[i][j];
							u=i;
							v=j;
						}else if(computerScore[i][j]==max){
							if(myScore[i][j]>myScore[u][v]){
								u=i;
								v=j;
						}
					}
				}
			}
		}
			oneStep(u,v,me);
			        chassBoard[u][v]=2;
			        for(var k=0;k<count;k++){
					//每下一个子都会遍历所有赢法
					if(chassBoard[u][v]==2){
					//判断是否是白子
						if(wins[u][v][k]){
							//赢法统计数组加一
							computerWin[k]++;
							myWin[k]=6;
							if(computerWin[k]==5){
								//存在一个K使得computerWin[k]=5,说明第k种赢法被实现。
								window.alert("电脑赢了");
								over=true;
							}
						}
					}
				}if(!over){
					me=!me;
				}
}


	
