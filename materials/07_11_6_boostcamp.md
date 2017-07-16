var a = 10;

var Test = {
	a : 1
}

var Test2 = {
	a : 2
}

function test(){
	//a = 1, b = 2;
	console.log(this.a);
}

test.apply(Test, [1,2]);	//bind하는데 함수가 아닌 인자가 반환된다. parameter를 배열로 넘긴다.
->결과 1
test.call(Test,1,2);	//bind와 같이 parameter를 넣어 줄 수 있다.

test.apply(Test2);
-> 결과 2


test.bind(Test); // --> function return, jQuery의 proxy의 구현체

//bind 구현체
Function.prototype.bind = function(thisObj, param){
	return function(){
		this.apply(thisObj);
	}
}

----------------------------------------------------
var Test = {
	"a" : 1,
	"init" : function(){
		console.log(this.a);
	}
};

Test.init();
-> 1이 출력된다.

var init = Test.init;

console.log(init === Test.init);
-> true;

init();
-> 1이 아니다.
this는 호출하는 함수의 주체 => ex) Test.init() 에서 this 는 Test이다.
ex) init() 에서 주체는 window이다.
this는 한번 호출하면 변경되지 않는다.(함수내에서 변경 불가)

this
1. .앞이 주체
2. .앞이 없으면 window
3. 호출할 때 결정되고 함수가 끝날 때 까지 변경될 수 없다.

window가 주체
1. settimeout
2. setinterval

element 이벤트의 주체 -> element
-----------------------------------------------------

//잘못된 코드
var a = 10;
var Test = {
	"a" : 1,
	"init" : function(fp){
		fp(); //-> 함수가 호출하는 시점이 window이다.
	},
	"some" : function(){
		console.log(this.a);
	}
};

Test.init(Test.some);	// 결과 -> 10
----------------------------------------------------


//apply, call, bind, this 4가지

jQuery.prototype.on = function(event, fp){
	
}

//bind를 사용해서 고정적으로 사용해줄 수 있다.

var Test = {
	"a" : 1,
	"init" : function(){
		//this -> Test
		$("#test").on("click",this.click); // this를 고정하고 싶을때

		//$("#test").on("click",this.click.bind(this,1, 2));	//bind 안의 this는 click Test를 가리킨다.
	},
	"click":function(event, a, b){
		//a -> 1
		//b -> 2
		//this -> Test
		console.log(this.a);
	}
};

Test.init();
-> this.a가 출력된다.

<div id="test"></div>
-----------------------------------------------------

function deleteCategoryRequest(categoryId){
	$.ajax({
		url:'/api/delete/'+categoryId,
		method:"delete",
		processData:true,
		contentType : "application/json; charset=UTF-8",
		success: deleteList.bind(this, categoryId)
	})
}
function deleteList(res, categoryId){
	$('.category#'+categoryId).remove();	
}

//bind의도
1. this를 고정하고 싶다.
2. Parameter를 넘겨주고 싶다.
//bind 반환 값 함수 
======================================================
# 2 번
code의 가독성을 위해서 통일하는게 좋다.
product의 안정성 혹은 개발 속도를 위해서 library를 사용하는게 더 유용하다.

제일 worst는 섞어서 사용하는 것

native하게 javascript로 짜면 browser가 업데이트 되었을 때 실행되지 않을 수 있다.

1.기능구현 50%
2.디버깅 50%
======================================================
# 3 번
1. style이 먼저 보이고 기능들을 load하려면
css -> javascript
2. 신기술들은 javascript로 화면을 그려주기 때문에
javascript -> css

최근 javascript는 thread로 처리하기 때문에 특정 browser 에선 먼저 load하기도 한다.
======================================================
# 4 번
ContentType

application/x-www-form-urlencoded -> default값
주로 Get method할 때 사용
browser -> server에게 보낼때 urlencoded된 데이터 인지 알려준다.
ex) .../a=1&b=2...

spring에선 application/json 타입만 객체로 인식하기 때문에 설정
======================================================
# 5 번
UI 테스트보다는 input으로 부터 Back-End 를 거쳐서 output이 제대로 나오는지를 주로 test한다.
======================================================
# 6 번
Rest API의 원칙
Delete, Put 인 경우, url은 동일하게 맞추고 method를 다르게 하는 것이 좋다.
url : /api/category/+id
======================================================
# 7 번
show나 hide하지 않고 클래스를 만들고 addClass, removeClass를 통해서 설정한다.
- 장점
	- 관리하기 좋고 성능에도 좋다.
	- 유지보수 하는데 유용하다.
	- 추가적인 기능을 추가하기 쉽다.

show(), hide()
구현체 -> size를 먼저 확인한다. 굉장히 복잡하게 구현되어 있다. 따라서 성능상 악영향을 끼칠 수 있다.

<ul id="test">
	<li>1</li>
	<li>1</li>
	<li class="complete">1</li>
	<li>1</li>
	<li class="complete">1</li>
	<li>1</li>
	<li class="complete">1</li>
	<li>1</li>
	<li>1</li>
	<li>1</li>
</ul>

<style>
#test li {
	display:none;
}
#test li.complete {
	display:block;
}

#test.check li{
	display : block;
}
#test.check li.complete {
	display : none;
}

</style>
통째로 처리한다. Groupping해서 처리한다.
<script>
	$('#test').addClass('check');
	$('#test').removeClass('check');
</script>

-------------------------------------------------------
<script>
	.addClass() -> loop를 돌면서 실행해서 개수가 많아지면 느려진다.
	.removeClass() -> 
</script>

======================================================
# 9 번 호이스팅(위로 떠오르다)

ecm script를 언어 스펙을 구현한 구현체 -> javascript

///function 선언 방법 2가지

test();
some();	------------>error 발생
function test(){
	
}

var some = function(){
	
}
test();
some();
----------------------------------
//함수 선언부와 변수 선언부가 위로 올라간듯 동작한다고 해서 호이스팅 용어를 사용한다.
function test(){
	//어디서든 사용하려고 한다는 느낌
}
var some;

test();
some();

var some = function(){
	//호출하는 시점이 정해져 있다.
}
test();
some();
---------------------
var some = function a(){
	a(); ---------->내부에서만 사용 할 수 있다.
}

$('test').on('click',function(){
	
})

//on -> bind
//off -> unbind
$('test').on('click',function click(){	//호이스팅 안된다.
	$(this).off(click);	//하는 경우 이렇게 사용
})

a() -> 호출불가능
=========================================================
# Event Loop
	- 목표
		- 비동기 코드에 대한 순차의 이해
		- 
비동기 함수
	- click, mouse
	- ajax
	- setTimeout, setInterval

ex)

//setTimeout함수 자체는 call stack으로 들어간다.

console.log(0);

setTimeout(function(){
	console.log(1);
},10);

setTimeout(function(){
	console.log(2);
},20);

$.ajax("url").then(function(){
	console.log(3);
})

console.log(4);

0 -> 4
		1 -> 2 -> 3
		3 -> 1 -> 2
		1 -> 3 -> 2