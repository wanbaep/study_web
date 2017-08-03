define(function () {
    //Do setup work here
    var Cart = (function(){
	    var cart = {
	    	count: 0,
	    	item: []
	    }
	    function Cart(){

	    }
	    Cart.prototype.add = function(oneitem){
	    	console.log("one Item : ",oneitem);
	    	cart.count += 1;
	    	cart.item.push(oneitem);
	    };
		Cart.prototype.sub = function(){
	    	cart.count -= 1;
	    	var lastItem = this.cart.item.length;
	    	cart.item.splice(lastItem-1, 1);
	    };
	    Cart.prototype.getCart = function(){
	    	return cart;
	    };
	    
	    
    }());
    return Cart;
});