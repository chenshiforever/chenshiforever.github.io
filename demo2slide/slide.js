//原生的写法
/*window.onload = function(){
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
	
};*/
//封装了库的写法
$(function(){
	$("#tabpan-1 .common-tab li").click(function(){
		var tabLi=$(this).addClass("actived");
		$("#tabpan-1 .common-tab-content li").eq(tabLi.index()).show().sibiling().hide();
		tabLi.sibiling().removeClass("actived");
	})
})