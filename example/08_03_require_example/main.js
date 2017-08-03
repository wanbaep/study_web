requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'my/',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        cart: 'cart',
        shirt: 'shirt',
        people: 'people'
    },
    shim:{
    	'shirt':{
	    	deps: ['cart', 'people'],
	    	export: 'shirt'
    	},
    	'people':{
    		dpes: ['cart'],
    		export: 'people'
    	}
    }
});

requirejs(['people'], function(people){
	console.log(people);
});

// Start the main app logic.
// requirejs(['shirt','people'],
// 	function(shirt, people) {
//     //jQuery, canvas and the app/sub module are all
//     //loaded and can be used here now.
//     	// $(function(){
//     		console.log(shirt);
//     		shirt.addToCart();
//     		people.showCart();
//     	// })
// 	}
// );