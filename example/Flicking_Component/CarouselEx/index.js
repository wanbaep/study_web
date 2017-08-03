var carouselModule = (function(){
	function init(){
		var childWidth = 0;
		var rootElement = null;
		var defaultDuration = 500;

		function ready(param){
			rootElement = param;
			childWidth = rootElement.find("li:last").width();	//414
			var clonedChildElement = rootElement.find("li:last").clone();
			rootElement.prepend(clonedChildElement);
			rootElement.css({left:-childWidth});
		}
		function duplicatedRootReady(param){
			rootElement = param;
			childWidth = rootElement.find("li:last").width();	//414
		}
		function movePrev(){
			if(rootElement !== null){
				rootElement.stop(true,true).animate({left:0},{
					duration : defaultDuration,
					complete : function(){
						rootElement.find("li:last").remove();
						var clonedChildElement = rootElement.find("li:last").clone();
						rootElement.prepend(clonedChildElement);
						rootElement.css({left:-childWidth});
					}
				});
			}
		}
		function moveNext(){
			if(rootElement !== null){
				rootElement.stop(true,true).animate({left:-childWidth*2},{
					duration : defaultDuration,
					complete : function(){
						rootElement.find("li:first").remove();
						var clonedChildElement = rootElement.find("li:first").clone();
						rootElement.append(clonedChildElement);
						rootElement.css({left:-childWidth});

					}
				});
			}
		}
		function getRootElement(){
			return rootElement;
		}
		function getChildWidth(){
			return childWidth;
		}

		return {
			ready : ready,
			movePrev : movePrev,
			moveNext : moveNext,
			getRootElement : getRootElement,
			duplicatedRootReady : duplicatedRootReady,
			getChildWidth : getChildWidth
		};
	}
	return {
		getInstance : function(){
			return init();
		}
	}

})();

var touchModule = (function(){
	var carouselInstance = null;
	var touchStartY = 0;
	var touchStartX = 0;
	var moveDistanceX = 0;

	function initTouchModule(option, carousel, root){
		carouselInstance = carousel;//carouselModule.getInstance();
		if(option === 0){
			carouselInstance.ready(root);
		} else if(option === 1){
			carouselInstance.duplicatedRootReady(root);
		}
	}
	function touchInit(e){
		touchStartX = e.touches[0].pageX;
		touchStartY = e.touches[0].pageY;
	}

	function touchService(e){
		var dragDistance = 0;
		var scrollDistance = 0;
		var fakeMove = 0;
		var width = carouselInstance.getChildWidth();

		//음수 양수에 따라서
		dragDistance = e.touches[0].pageX - touchStartX;
		scrollDistance = e.touches[0].pageY - touchStartY;
		moveDistanceX = (dragDistance/width) * 100;

		if(Math.abs(dragDistance) > width){
			dragDistance = (dragDistance < 0) ? -width : width;
		}
		if(dragDistance > 0){
			fakeMove = dragDistance - width;
		} else{
			fakeMove = dragDistance -width;
		}

		if(Math.abs(dragDistance) > Math.abs(scrollDistance)){
			carouselInstance.getRootElement().stop(true,true).animate({left: fakeMove},500);
		}
	}

	function touchDestroy(e){
		var width = carouselInstance.getChildWidth();
		if(Math.abs(moveDistanceX) > 53){
			if(moveDistanceX < 0){
				carouselInstance.moveNext();
			}
			else {
				carouselInstance.movePrev();
			}
		} else{
			carouselInstance.getRootElement().stop(true,true).animate({left:-width},500);
		}

		touchStartX = 0;
		touchStartY = 0;
		moveDistanceX = 0;
		e.preventDefault();
	}

	return {
		initTouchModule : initTouchModule,
		touchInit : touchInit,
		touchService : touchService,
		touchDestroy : touchDestroy
	}

})();

$(window).on("load",function(){

	var clickInstance = carouselModule.getInstance();
	clickInstance.ready($(".visual_img"));
	$(".prev_inn").on("click", clickInstance.movePrev.bind(this,$(".visual_img")));
	$(".nxt_inn").on("click", clickInstance.moveNext.bind(this,$(".visual_img")));
	
	var initTouchModuleOption = 1;
	touchModule.initTouchModule(1, carouselModule.getInstance(),$(".visual_img"));
	$(".visual_img").bind("touchstart", touchModule.touchInit);
	$(".visual_img").bind("touchmove", touchModule.touchService);
	$(".visual_img").bind("touchend", touchModule.touchDestroy);
});