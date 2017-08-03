define(["./cart", "./people"], function(cart,people) {
        //return an object to define the "my/shirt" module.
        return {
            color: "blue",
            size: "large",
            addToCart: function() {
                console.log("this is this : ", this);
                cart.add(this);
                people.showCart(this);
            }
        }
    }
);