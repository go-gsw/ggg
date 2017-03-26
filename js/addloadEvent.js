
/*通用型函数  单独存放*/
function addloadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload !="function"){
		window.onload=func;
	}else{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}