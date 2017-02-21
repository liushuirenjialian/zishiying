$(function(){
	var gp = $(".game-info p");
	var arrow = gp.next();
	if (gp.height() > 48) {
		// gp.css({
		// 	"height" : "48px",
		// 	"-webkit-line-clamp" : "5"
		// });
		arrow.show();
	}
	var flag = true;
	arrow.click(function(){
		if (flag) {
			gp.attr("style","height: auto;")	
			arrow.addClass("active");
		}else{
			gp.attr("style","height: 48px;-webkit-line-clamp:5");
			arrow.removeClass("active");
		}
		flag = !flag;
	});
	$(".img-wrap>.img").click(function(){
		$(".swiper").show();
		var mySwiper = new Swiper('.swiper-container', {
		autoplay:3000,//可选选项，自动滑动
		pagination : '.swiper-pagination',
		loop : true,
		autoplayDisableOnInteraction: false,
	});
	});
	
	$(".swiper").click(function(){
		$(this).hide();
	});
	$(".swiper-container").click(function(e){
		e.stopPropagation();
	});
});
