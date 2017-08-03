function Ticket(id,option){
	option = option||{};	//하나의 함수의 코드가 길어진다.
	this.option = {
		"price" : 1000
	};
	if(option.price !== undefined){
		this.option.price = option.price;
	}

	this.countEle = $(id + " .count");
	$(id).on("click","plus",this.plus.bind(this));
	$(id).on("click","minus",this.minus.bind(this));
}

TIcket.prototype = new eg.Component();
Ticket.prototype.constructor = Ticket;
Ticket.prototype.plus = function(e){
	var count = parseInt(this.countEle.text(),10);	//뒤에 진법 (10진법)
	this.countEle.text(count+1);
}
Ticket.prototype.minus = function(e){
	var count = parseInt(this.countEle.text());
	this.countEle.text(count-1);
	console.log("minus");
}

// Ticket 생성
var TicketController = (function(){
	$("div").each(function(index, value){
		new Ticket("#"$(value).attr("id"));
	});	
})();

	// ["a","b","c"].forEach(function(value, index){
	// 	//배열의 경우 value가 1번째, 2번째가 index
	// });

	// $.forEach(["a","b","c"],function(value, index){

	// })

	// var ticekt = new Ticket("#ticket1");
	// var ticekt = new Ticket("#ticket2");
	// var ticekt = new Ticket("#ticket3");


function Ticket(id,option){
	this.defaultOption(option);
	this.countEle = $(id + " .count");
	$(id).on("click","plus",this.plus.bind(this));
	$(id).on("click","minus",this.minus.bind(this));
}

TIcket.prototype = new eg.Component();
Ticket.prototype.constructor = Ticket;
Ticket.prototype.defaultOption = function(option){
	option = option||{};
	this.option = {
		"price" : 1000
	};
	if(option.price !== undefined){
		this.option.price = option.price;
	}
}
Ticket.prototype.plus = function(e){
	var count = parseInt(this.countEle.text(),10);	//뒤에 진법 (10진법)
	this.countEle.text(count+1);
}
Ticket.prototype.minus = function(e){
	var count = parseInt(this.countEle.text());
	this.countEle.text(count-1);
	console.log("minus");
}

// Ticket 생성
var TicketController = (function(){
	var tickets = [];
	$("div").each(function(index, value){
		var ticket = new Ticket("#"$(value).attr("id"), {
			price: $(value).data("price");
		});
		tickets.push(ticket);
		ticket.on("change",function(e){
			var totalPrice = 0;
			tickets.forEach(function(ticket){
				totalPrice += ticket.getTotalPrice();
			});
			$("#total").text(totalPrice);
		})
	});	
})();
