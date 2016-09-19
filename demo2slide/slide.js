//原生的写法
// window.onload = function(){
// 	//common
// 	var commonTab = document.getElementsByClassName('common-tab')[0];
// 	var commonTabLi = commonTab.getElementsByTagName('li');
// 	var commonTabContent = document.getElementsByClassName('common-tab-content')[0];
// 	var commonTabContentLi=commonTabContent.getElementsByTagName('li');
// 	for(var i=0;i<commonTabLi.length;i++){
// 		commonTabLi[i].i = i;
// 		commonTabLi[i].onclick = function(i){
// 			for(var i=0;i<commonTabLi.length;i++){
// 				commonTabLi[i].className = '';
// 				commonTabContentLi[i].style.display = 'none';
// 			}
// 			this.className = 'actived';
// 			commonTabContentLi[this.i].style.display = 'block';
// 		};
// 	}
	
// 	//hover
// 	var hoverTab = document.getElementsByClassName('hover-tab')[0];
// 	var hoverTabLi = hoverTab.getElementsByTagName('li');
// 	var hoverTabContent = document.getElementsByClassName('hover-tab-content')[0];
// 	var hoverTabContentLi=hoverTabContent.getElementsByTagName('li');
// 	for(var i=0;i<hoverTabLi.length;i++){
// 		hoverTabLi[i].i = i;
// 		hoverTabLi[i].onmouseover = function(i){
// 			for(var i=0;i<hoverTabLi.length;i++){
// 				hoverTabLi[i].className = '';
// 				hoverTabContentLi[i].style.display = 'none';
// 			}
// 			this.className = 'actived';
// 			hoverTabContentLi[this.i].style.display = 'block';
// 		};
// 	}
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
// };
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
	//
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
		var tabLiIndex = $("#tabpan-4 .actived").index();
			tabLiIndex = ++tabLiIndex%3;
		
		$("#tabpan-4 .autoplay-tab li").eq(tabLiIndex).addClass("actived");
		var tabContent=$("#tabpan-4 .autoplay-tab-content-inner li").eq(tabLiIndex);
		$("#tabpan-4 .autoplay-tab-content-inner").css("position","relative").animate({
			attr:"left",
			target:-tabContent.offset().left
		})
		$("#tabpan-4 .autoplay-tab li").eq(tabLiIndex).sibiling().removeClass("actived");
	}
	// var timer1 = setInterval(autoplay,1000);
	
	//
	//alert(document.getElementsByClassName("pos_0")[0].style.width);
	addEvent(window,"load",function(){ //必须等待css加载完毕
		var preBtn = $("#automatic .prev_div").get(0),
			nexBtn = $("#automatic .next_div").get(0),
			li=$("#automatic li"),
			img=$("#automatic li img"),
			arr=[];
		li.elements.forEach(function(val,i){
			arr.push({
				width:getStyle(img.get(i),"width"),
				left:getStyle(val,"left"),
				top:getStyle(val,"top"),
				"z-index":getStyle(val,"z-index"),
				opacity:getStyle(val,"opacity")
			})
		
		});
		
		addEvent(preBtn,"click",function(){
			arr.push(arr[0]);
			arr.shift();
			move();
		})	
		addEvent(nexBtn,"click",function(){
			arr.unshift(arr[arr.length-1]);
			arr.pop();
			move();
		})	
		function move(){
			li.elements.forEach(function(val,i){
				$(val).animate({
					step:10,
					
					mul:{
						opacity:parseFloat(arr[i].opacity),
						left:parseFloat(arr[i].left),
						top:parseFloat(arr[i].top),
						"z-index":parseFloat(arr[i]["z-index"])
					}
				});
				$(img.get(i)).animate({
					mul:{
						width:parseInt(arr[i].width)
					}
				})
			})
		}
	})
	/*fullCarousel*/
	addEvent(window,"load",function(){
		var fullCarousel = $("#fullCarousel"),
			fullCarouselUl = $("#fullCarousel ul"),
			fullCarouselLi = $("#fullCarousel ul li"),
			fullCarouselImg = $("#fullCarousel ul li img"),
			fullCarouselBtn = $("#fullCarouselBtn"),
			fullCarouselBtnA = $("#fullCarouselBtn a"),
			viewWidth = getClientInner().width,
			//imgWidth=getStyle(fullCarouselImg.get(0),"width")+"px",
			index=0,
			index2=0;
		fullCarouselImg.css("width",viewWidth+"px");
		//fullCarousel.css("width",imgWidth);
		fullCarouselUl.css("width",fullCarouselImg.len()*viewWidth+"px");
		addEvent(window,"resize",toResize)
		function toResize(){
			var i = 0;
			if(getClientInner().width > 1000){
				for(;i < fullCarouselImg.len(); i++){
					fullCarouselImg.eq(i).css("left",-(viewWidth - getClientInner().width)/2+"px");
				}
			}
		}
		fullCarouselBtnA.elements.forEach(function(val,index){
			addEvent(val,"click",function(){
				fullCarouselBtnA.removeClass("actived");
				$(val).addClass("actived");
				fullCarouselUl.animate({
					attr:"left",
					target:-$(val).index()*viewWidth
						
					
				})
			})
		})
		
		setInterval(move,3000);
		function move(){
			index =index2= $("#fullCarouselBtn .actived").index();//每次得到当前的actived
			index++;
			if(index == fullCarouselImg.len()){
				fullCarouselLi.eq(0).css("position","relative").css("left",3*viewWidth+"px")
				index%=fullCarouselImg.len();
			}
			index2++;
			$("#fullCarouselBtn a").removeClass("actived");
			$("#fullCarouselBtn a").eq(index).addClass("actived");
			fullCarouselUl.animate({
				attr:"left",
				target:-viewWidth*index2,
				fn:function(){
					if(index==0){
						fullCarouselLi.eq(0).css("position","static");
						fullCarouselUl.css("left",0);
						index2 =0;
					}
				}
			})
			
		}
			
	})

	
})
// $.ajax({
	
// })

window.onload = function(){
  var oInput = document.getElementById('input1');
  var oDiv = document.getElementById('div1');
  
  var timer = null;
  var iSpeed = 0;
  addEvent(oInput,"mouseover",function(){
  	$(oDiv).animate({
  		mul:{
  			//left:500,
  			width:500,
  			height:500,
  		
  		},
  		type:"flex"
  		
  	})
  })
    addEvent(oInput,"mouseout",function(){
  	$(oDiv).animate({
  		mul:{
  			//left:500,
  			width:0,
  			height:0,
  			"margin-left":0,
  			"margin-top":0
  		},
  		
  		
  	})
  })


}
























