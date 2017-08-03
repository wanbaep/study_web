//Display Component
function Display(){

}
Display.prototype = new eg.Component();
Display.prototype.constructor = Display;
Display.prototype.update = function(e, qty, totalQty){

	$(e.target).siblings(".count_control_input").val(qty);

	var price = $(e.target).closest(".qty").find(".product_price").data("price");

	var result = price*qty;
	$(e.target).closest(".qty").find(".total_price").text(result.toLocaleString());
	this.displayTotalQty(totalQty);
};
Display.prototype.displayTotalQty = function(totalQty){
	var inlineTxtFront = $(".inline_txt").text().split(",")[0];
	var inlineTxtBehind = ", 총 " + totalQty +"매";
	$(".inline_txt").text(inlineTxtFront+inlineTxtBehind);
}

//Subject Component
function Subject(){

}
Subject.prototype = new eg.Component();
Subject.prototype.constructor = Subject;
Subject.prototype.totalCount = 0;
Subject.prototype.display = new Display();
Subject.prototype.setplus = function(e){
	var qty = $(e.target).siblings(".count_control_input").val();
	qty++;
	this.totalCount++;
	this.notify(e, qty, this.totalCount);
};
Subject.prototype.setminus = function(e){
	var qty = $(e.target).siblings(".count_control_input").val();
	if(qty !== "0"){
		qty--;
		this.totalCount--;
		this.notify(e, qty, this.totalCount);
	}
};
Subject.prototype.registerPlusObserver = function(){
	this.on("plus", this.setplus);
};
Subject.prototype.registerMinusObserver = function(){
	this.on("minus", this.setminus);
};
Subject.prototype.unRegisterPlusObserver = function(){
	this.off("plus", this.setplus);
};
Subject.prototype.unRegisterMinusObserver = function(){
	this.off("minus", this.setminus);
};
Subject.prototype.init = function(){
	this.display.on("update",this.display.update);
}
Subject.prototype.notify = function(e, qty, totalQty){
	this.display.trigger("update",e, qty, totalQty);
};

var subject = new Subject();
subject.init();
subject.registerPlusObserver();
subject.registerMinusObserver();

$(function(){
	
});
