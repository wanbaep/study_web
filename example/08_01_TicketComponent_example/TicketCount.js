// +을 누르면
// 	숫자가 증가한다
// 	인원에 맞게 해당 금액이 하단에 표시된다.
// 	on_color 클래스를 제거한다.

// -을 누르면
// 	숫자가 감소한다
// 	인원에 맞게 해당 금액이 하단에 표시된다.
// 	0이면 -버튼, 인원 표시 영역이 disabled된다.
// 	on_color 클래스를 추가한다.

var Ticket = extend(eg.Component,{
	init : function(id, option){
		this.setDefaultOption(option);
		this.ticketEle = $(id);
		this.countEle = $(id + " .count");
		$(id).on("click",".plus", this.plus.bind(this));
		$(id).on("click",".minus", this.minus.bind(this));
	},
	plus : function(e){
		var amount = this.getAmount()+1;
		this.countEle.text(amount);
		this.trigger("change",{
			"amount" : amount
		})
	},
	minus : function(e){
		var amount = this.getAmount()-1;
		this.countEle.text(amount);
		this.trigger("change",{
			"amount" : amount
		})
	},
	getAmount : function(){
		return parseInt(this.countEle.text(),10);
	},
	setDefaultOption(option){
		option = option||{};
		this.option = {
			"price" : 1000
		}
		if(option.price !== undefined){
			this.option.price = option.price
		}
	},
	getTotalPrice(){
		return this.getAmount() * this.option.price;
	},
	getTicketInfo(){
		return {
			"ticketType" : this.ticketEle.attr("id"),
			"qty" : this.getAmount(),
			"price" : this.option.price
		}
	}
});

var TicketController = (function(){
	var tickets = [];
	var ticketCount = 0;
	$("div").each(function(i,v){
		var ticket = new Ticket("#"+$(v).attr("id"),{
			price: $(v).data("price")
		});
		tickets.push(ticket);
		ticket.on("change",function(e){
			console.log(e);
			var totalPrice  = 0;
			tickets.forEach(function(ticket){
				totalPrice += ticket.getTotalPrice();
			});
			$("#total").text(totalPrice);
		});
	});

	$("#buy").on("click",function(){
		tickets.forEach(function(v,i){
			if(v.getTicketInfo().qty === 0){
				console.log("판매불가!");
			}
			console.log("v : ", v.getTicketInfo());
			console.log("i : ", i);
		});
	});


})();

$(function(){
	
})