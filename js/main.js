//向下闪烁的箭头
function moreee(){
		var m=document.getElementById("more-img");
		if(m.style.visibility=="visible"){
			m.style.visibility="hidden";
		}else{
			m.style.visibility="visible";
		}
	}
setInterval(moreee,800);

//改变背景图片
function prepareGallery(){
	var gallery =document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			return showPic(this)? false:true;
		}
	}
}

function showPic(whichpic){
	var source=whichpic.getAttribute("href");
	console.log(source);
	var placeholder=document.getElementById("main-wrapper");
	/*DOM style属性不能用来检测外部CSS文件里的样式*/
	placeholder.style.backgroundImage='url('+source+')';
	// placeholder.setAttribute("background-image",source);
	return true;
}
addloadEvent(prepareGallery);
addloadEvent(setInterval);




/*把一个节点插入到另一个节点之后的通用函数*/
/*insterAfter()*/
/*function insertAfter(newElement,targetElement){
	var parent =targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChlid(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}*/
	
