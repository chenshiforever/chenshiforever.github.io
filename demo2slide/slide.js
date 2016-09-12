//原生的写法
window.onload = function(){
	//common
	var commonTab = document.getElementsByClassName('common-tab')[0];
	var commonTabLi = commonTab.getElementsByTagName('li');
	var commonTabContent = document.getElementsByClassName('common-tab-content')[0];
	var commonTabContentLi=commonTabContent.getElementsByTagName('li');
	for(var i=0;i<commonTabLi.length;i++){
		commonTabLi[i].i = i;
		commonTabLi[i].onclick = function(i){
			for(var i=0;i<commonTabLi.length;i++){
				commonTabLi[i].className = '';
				commonTabContentLi[i].style.display = 'none';
			}
			this.className = 'actived';
			commonTabContentLi[this.i].style.display = 'block';
		};
	}
	
	//hover
	var hoverTab = document.getElementsByClassName('hover-tab')[0];
	var hoverTabLi = hoverTab.getElementsByTagName('li');
	var hoverTabContent = document.getElementsByClassName('hover-tab-content')[0];
	var hoverTabContentLi=hoverTabContent.getElementsByTagName('li');
	for(var i=0;i<hoverTabLi.length;i++){
		hoverTabLi[i].i = i;
		hoverTabLi[i].onmouseover = function(i){
			for(var i=0;i<hoverTabLi.length;i++){
				hoverTabLi[i].className = '';
				hoverTabContentLi[i].style.display = 'none';
			}
			this.className = 'actived';
			hoverTabContentLi[this.i].style.display = 'block';
		};
	}
	//animate
	// var animateTab = document.getElementsByClassName('animate-tab')[0];
	// var animateTabLi = animateTab.getElementsByTagName('li');
	// var animateTabContent = document.getElementsByClassName('animate-tab-content')[0];
	// var animateTabContentLi = animateTabContent.getElementsByTagName('li');
	// animateTabContent.style.left = animateTabContent.offsetLeft+"px";
	// animateTabContent.style.position="absolute";
	// for(var i=0;i<animateTabLi.length;i++){
	// 	animateTabLi[i].i = i;
	// 	animateTabLi[i].onclick = function(i){
	// 		for(var i=0;i<animateTabLi.length;i++){
	// 			animateTabLi[i].className = '';
	// 			animateTabContentLi[i].style.display = 'none';
	// 		}
	// 		this.className = 'actived';
	// 		animateTabContentLi[this.i].style.display = 'block';
	// 	};
	// }
};
//封装了库的写法
$(function(){
	$("#tabpan-1 .common-tab li").on("click",function(){
		var tabLi=$(this).addClass("actived");
		$("#tabpan-1 .common-tab-content li").eq(tabLi.index()).show().sibiling().hide();
		tabLi.sibiling().removeClass("actived");
	})
	$("#tabpan-2 .hover-tab li").on("mouseover",function(){
		var tabLi=$(this).addClass("actived");
		$("#tabpan-2 .hover-tab-content li").eq(tabLi.index()).show().sibiling().hide();
		tabLi.sibiling().removeClass("actived");
	})
	$("#tabpan-3 .animate-tab li").on("click",function(){
		var tabLi=$(this).addClass("actived");
		var tabContent=$("#tabpan-3 .animate-tab-content-inner li").eq(tabLi.index());
		$("#tabpan-3 .animate-tab-content-inner").css("position","relative").animate({
			attr:"left",
			target:-tabContent.offset().left
		})
		tabLi.sibiling().removeClass("actived");
	})
	$("#tabpan-4 .autoplay-tab li").on("mouseover",function(e){
		var tabLi=$(this).addClass("actived");
		var tabContent=$("#tabpan-4 .autoplay-tab-content-inner li").eq(tabLi.index());
		clearInterval(timer1);
		var timer=setTimeout(function(){
			if(hasClass(e.target,"actived")){
					$("#tabpan-4 .autoplay-tab-content-inner").css("position","relative").animate({
						attr:"left",
						target:-tabContent.offset().left
					})
			}else{
				clearTimeout(timer);
			}
		},500)
		tabLi.sibiling().removeClass("actived");
		
	}).on("mouseout",function(){
		timer1=setInterval(autoplay,1000);
	})
	function autoplay(){
		var tabLiIndex=$("#tabpan-4 .actived").index();
			tabLiIndex = ++tabLiIndex%3;
			console.log(tabLiIndex);
		$("#tabpan-4 .autoplay-tab li").eq(tabLiIndex).addClass("actived");
		var tabContent=$("#tabpan-4 .autoplay-tab-content-inner li").eq(tabLiIndex);
		$("#tabpan-4 .autoplay-tab-content-inner").css("position","relative").animate({
			attr:"left",
			target:-tabContent.offset().left
		})
		$("#tabpan-4 .autoplay-tab li").eq(tabLiIndex).sibiling().removeClass("actived");
	}
	var timer1=setInterval(autoplay,1000);
})