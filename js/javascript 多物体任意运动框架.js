/*获取样式*/
/*多物体任意运动框架*/


function getStyle(obj,name)
{
    if(obj.currentStyle)
    {
        return obj.currentStyle[name];
        //针对IE浏览器
    }
    else
    {
        return getComputedStyle(obj,null)[name];
        //针对火狐浏览器
    }
}
window.onload=function(){
    var objs=document.getElementsByTagName('div');
    objs[1].onmouseover=function(){
        startMove(this,'width',400);
    };
    objs[1].onmouseout=function(){
        startMove(this,'width',200);
    };
    objs[0].onmouseover=function(){
        startMove(this,'height',400);
    };
    objs[0].onmouseout=function(){
        startMove(this,'height',200);
    };
    objs[2].onmouseover=function(){
        startMove(this,'opacity',100);
    };
    objs[2].onmouseout=function(){
        startMove(this,'opacity',30);
    };
};
 
function startMove(obj,atrr,itarget){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var nowValue;
        if(atrr=='opacity')
        {
            //透明度有特殊要求
            nowValue=Math.round(parseFloat(getStyle(obj,atrr))*100);//计算机运算会有错误，需要取约数
            document.title=nowValue;
        }
        else
        {
            nowValue=parseInt(getStyle(obj,atrr));  
        }
         
             
        var speed=(itarget-nowValue)/5;
        speed=speed>0?Math.ceil(speed):Math.floor(speed);
        if(nowValue==itarget)
        {
            clearInterval(obj.timer);
        }
        else
        {
            if(atrr=='opacity')
            {
                obj.style[atrr]=(nowValue+speed)/100;
                obj.style.filter='alpha(opacity:'+(nowValue+speed)+')';//IE低版本设置
            }
            else
            {
                obj.style[atrr]=nowValue+speed+'px';
            }
             
        }
         
    },30);
}