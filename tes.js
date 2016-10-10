javascript:setTimeout(function(){
	a = document.querySelectorAll("#paginationP .page a");
	a[0].click();
	setTimeout(function(){
		b = document.querySelectorAll(".fa-pencil");
		b[b.length-1].click();
		console.log(b[b.length-1].parentNode.parentNode.parentNode.parentNode.firstChild.innerHTML);
		setTimeout(function(){
			c = document.querySelectorAll(".item");
			c[c.length-2].querySelector("a").click();
			setTimeout(function(){
				a=document.querySelectorAll(".btn-default");
				a[a.length-2].click();
				setTimeout(function(){
					a=document.querySelectorAll(".btn-default");
					a[a.length-1].click();
				},500)
			},500)
		},500)
	},500)
},1000)


