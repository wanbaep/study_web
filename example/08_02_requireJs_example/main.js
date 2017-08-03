require.config({
	baseUrl:'js/',
	paths:{
        'jquery': '../../node_modules/jquery/dist/jquery.min',
        'egjs': '../../node_modules/@egjs/component/dist/component',
		'util': 'util',
        'ticket': 'ticketcount',
	},
	shim:{
		'ticket' : {
			deps:['jquery','egjs','util'],
			exports:'Ticket'
		}
	}
});

requirejs(['jquery','ticket'],function($,Ticket){
	console.log(Ticket);
	console.log($);
});


// requirejs(['jquery','egjs'], function($,egjs){
// 	console.log("jquery", $);
// 	console.log("egjs", egjs);

// 	requirejs(['util'], function(util){
// 		console.log("util",util);

// 		requirejs(['Ticket'],function(ticket){
// 			console.log("ticket",ticket);
// 		});

// 	});

// });