define(['cart'],function (cart) {
    //Do setup work here
    var people = {
    	name: "jain",
    	age: 48
    }
    var cart = Cart();

    function showCart(){
        cart.forEach(function(v){
            console.log(v);
        });
    }
    
    return {
        showCart: showCart
    }
});