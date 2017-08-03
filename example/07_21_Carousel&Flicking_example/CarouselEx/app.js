function carouselToLeft(rootElement, direction){
	if(direction === "left"){
		var childToMove = rootElement.find("li:first");
	} else if(direction === "right"){
		var childToMove = rootElement.find("li:last");
	}
	var childToMoveWidth = childToMove.width();
	var childToMoveClone = childToMove.clone();
	
	if(direction === "left"){
		rootElement.append(childToMoveClone);

		rootElement.stop(true,true).animate({left:- childToMoveWidth},{
			duration: 500,
			complete: function(){
				rootElement.css({left: 0});
				childToMove.remove();
			}
		});
	} else if(direction == "right"){
		rootElement.prepend(childToMoveClone);

		rootElement.css({left:-childToMoveWidth});
		rootElement.stop(true,true).animate({left: 0},{
			duration: 500,
			complete: function(){
				childToMove.remove();
			}
		});
	}
}

function carouselToRight(rootElement){
	var width = rootElement.find("li:last").width();
	var carouselFirstClone = rootElement.find("li:last").clone();
	// carouselFirstClone.css({left:-width});

	var carouselFirst = rootElement.find("li:last");
	rootElement.prepend(carouselFirstClone);

	rootElement.css({left:-width});
	rootElement.animate({left: 0},{
		duration: 500,
		complete: function(){
			carouselFirst.remove();
		}
	});
}

////////////////////
//Touch left case//
/////////
// var touch_start_y = 0;
// var touch_start_x = 0;
// var save_x = 0;
// var save_y = 0;
// var move_dx = 0;

// function touchInit(e){
// 	touch_start_x = e.touches[0].pageX;
// 	touch_start_y = e.touches[0].pageY;

// 	console.log("Touch Init");
// 	console.log("x : %o", touch_start_x);
// 	console.log("y : %o", touch_start_y);
// 	// $(".visual_img").prepend($(".visual_img li:last").clone());

// 	// 	$(".visual_img").css({left:-414});
// }

// function touchService(e){
// 	var drag_dist = 0;
// 	var scroll_dist = 0;
// 	var fakeMove = 0;
// 	var width = $(this).width();

// 	//음수 양수에 따라서
// 	drag_dist = e.touches[0].pageX - touch_start_x;
// 	scroll_dist = e.touches[0].pageY - touch_start_y;
// 	move_dx = (drag_dist/width) * 100;
// 	console.log("drag_dist : %o",drag_dist);
// 	console.log("width * 2 : %o",width*2);
// 	if(Math.abs(drag_dist) > width){
// 		fakeMove = (drag_dist < 0) ? -width : width;
// 	} else{
// 		fakeMove = drag_dist;
// 	}
// 	console.log(fakeMove);
	
// 	if(Math.abs(drag_dist) > Math.abs(scroll_dist)){
// 		console.log("hi!");
// 		// $(".visual_img").clearQueue();
// 		$(".visual_img").stop(true,true).animate({left: fakeMove},500);
// 		//이동된 값만큼 animate

// 	}
// }

// function touchDestroy(e){
// 	console.log("touch end! movedx : %o", move_dx);
// 	if(Math.abs(move_dx) > 53){
// 		if(move_dx < 0){
// 			carouselToLeft($(".visual_img"),"left");
// 		}
// 		else {
// 			$(".visual_img li:last").remove();
// 			carouselToLeft($(".visual_img"),"right");
// 		}

// 	} else{
// 		//저장된 save_x 혹은 save_y만큼 이동했다가 돌아올것
// 		//yo
		
// 		if(move_dx < 0){
// 			$(".visual_img").stop(true,true).animate({left:0},500);

// 		}
// 		else {
// 			$(".visual_img").stop(true,true).animate({left:0});
// 			$(".visual_img li:last").remove();
// 		}
		
// 	}

// 	touch_start_x = 0;
// 	touch_start_y = 0;
// 	move_x = 0;
// 	move_y =0;
// 	move_dx = 0;

// 	e.preventDefault();
// }

//////////////touch right case
var touch_start_y = 0;
var touch_start_x = 0;
var save_x = 0;
var save_y = 0;
var move_dx = 0;


function touchInit(e){
	touch_start_x = e.touches[0].pageX;
	touch_start_y = e.touches[0].pageY;

	console.log("Touch Init");
	console.log("x : %o", touch_start_x);
	console.log("y : %o", touch_start_y);
	//if Right
	$(".visual_img").prepend($(".visual_img li:last").clone());
	$(".visual_img").css({left:-414});
}

function touchService(e){
	var drag_dist = 0;
	var scroll_dist = 0;
	var fakeMove = 0;
	var width = $(this).width();

	//음수 양수에 따라서
	drag_dist = e.touches[0].pageX - touch_start_x;
	scroll_dist = e.touches[0].pageY - touch_start_y;
	move_dx = (drag_dist/width) * 100;
	console.log("drag_dist : %o",drag_dist);
	console.log("width * 2 : %o",width*2);
	if(Math.abs(drag_dist) > width){
		fakeMove = (drag_dist < 0) ? -width : width;
	} else{
		fakeMove = drag_dist;
	}

	if(drag_dist > 0){
		//move to right
		fakeMove += -414;
	}
	console.log(fakeMove);
	
	if(Math.abs(drag_dist) > Math.abs(scroll_dist)){
		console.log("hi!");
		// $(".visual_img").clearQueue();
		$(".visual_img").stop(true,true).animate({left: fakeMove},500);
		//이동된 값만큼 animate

	}
}

function touchDestroy(e){
	console.log("touch end! movedx : %o", move_dx);
	if(Math.abs(move_dx) > 53){
		if(move_dx < 0){
			carouselToLeft($(".visual_img"),"left");
		}
		else {
			// $(".visual_img li:last").remove();
			console.log("move to right!");
			carouselToLeft($(".visual_img"),"right");
		}

	} else{
		//저장된 save_x 혹은 save_y만큼 이동했다가 돌아올것
		//yo
		
		if(move_dx < 0){
			$(".visual_img").stop(true,true).animate({left:0},500);

		}
		else {
			console.log("here!");
			$(".visual_img").stop(true,true).animate({left:-414},{
				duration: 500,
				complete: function(){
					$(".visual_img li:first").remove();
					$(".visual_img").css({left: 0});
				}
			});
		}
		
	}

	touch_start_x = 0;
	touch_start_y = 0;
	move_x = 0;
	move_y =0;
	move_dx = 0;

	e.preventDefault();
}


$(window).on("load",function(){
	$(".nxt_inn").on("click", carouselToLeft.bind(this, $(".visual_img") ,"left"));
	$(".prev_inn").on("click", carouselToLeft.bind(this, $(".visual_img"), "right"));
	$(".visual_img").bind("touchstart", touchInit);
	$(".visual_img").bind("touchmove", touchService);
	$(".visual_img").bind("touchend", touchDestroy);
});



$(document).ready(function(){
});