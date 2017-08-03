var Test = extend(eg.Component,{
	init : function(){
	},
	some : function(){
		this.trigger("hi",{"a":1})
	}
});

var test = new Test();
function callback(e){
	console.log("hi", e);
	test.off(callback);
}
test.on("hi",callback);
// test.trigger("hi");

//Observer Component
var Observer = extend(eg.Component,{
	handler : [],
	register : function(){
		handler.push()
	},
	unregister : function(){

	},
	notify : function(eventName){
		console.log("Observer %o",eventName);
	}
});

var param = "hello";
var observer = new Observer();




// observer.trigger

var Star = extend(eg.Component,{
	starLocation : '',
	action : function(event,param){
		console.log(param);
		observer.trigger("rating",event,param);
	},
	turnOnOffStar : function(event,param){
		console.log("this is turnOnOffStar");
		console.log(event);
		console.log(param);
	}
});

var star = new Star();
var star2 = new Star();

// Star.action = function(param){
// 	observer.trigger("rating",observer.notify,param)
// }


// observer.on("rating",star.turnOnOffStar.bind(this), "star Event!");
observer.on("rating",star2.turnOnOffStar);



// star2.action("hello");

//별점 (.rating)

//review 입력

//리뷰 사진 upload

//리뷰 등록

//document
$(function(){
	$(".rating").on("click",".rating_rdo",function(e){
		console.log(e.currentTarget.value);
		star2.action(e.currentTarget,"hello");
	});
	// star.action("wow");
	
});