function moreee(){
		var m=document.getElementById("more");
		if(m.style.visibility=="visible"){
			m.style.visibility="hidden";
		}else{
			m.style.visibility="visible";
		}
	}
setInterval(moreee,800);
/*通用型函数*/
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
	// var source=whichpic.getAttribute("href");
	// console.log(source);
	var placeholder=document.getElementById("main-wrapper");
	placeholder.style.backgroundImage="url(../img/13.jpg)";
	// placeholder.setAttribute("background-image",source);
	return true;
}
addloadEvent(prepareGallery);
addloadEvent(setInterval);




/*把一个节点插入到另一个节点之后的通用函数*/
/*function insertAfter(newElement,targetElement){
	var parent =targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChlid(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}*/
	
