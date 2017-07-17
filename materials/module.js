/*function add(){
	baz();
}

function destory(){

}

function baz(){

}

function init(){
	document.getElementById('foo').addEventListener("click",add);
	document.getElementById('bar').addEventListener("click",destory);
}

//Dom 이 완성된 이후에 event 등록
document.addEventListener("DOMContentLoaded", function(){
	init();
});*/

//만약 file마다 add라는 함수가 있다면 알아차리기 힘들다.

//아래로 변경

var Foo = (function(){
	function add(){
		baz();
	}

	function destory(){

	}

	function baz(){

	}

	function init(){
		document.getElementById('foo').addEventListener("click",add);
		document.getElementById('bar').addEventListener("click",destory);
	}

	var foo = 1;
	var bar = 1;

	return {
		init: init,
		bar: bar
	}

})();



//Dom 이 완성된 이후에 event 등록
document.addEventListener("DOMContentLoaded", function(){
	Foo.init();
	console.log(Foo.bar);
});
