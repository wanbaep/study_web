## fornt강의

#### 1. 
- arr.join() ?

'느리다'의 종류
- loading
	- 네트워크 (요청횟수가 많을 수록 느리다.)
	- 절대적으로 네트워크에 영향받는다.
- 인터렉션
	- 버그가 아닌 이상 DOM과 관련되어 있다.
	- DOM을 적게 touch해야 한다.

- Map method ?

```
for(var i = 0; i< data.length; i++){
	$list.append("<li>"+data[i].a+"</li>");
}

2.
//////////////////////////////////
var arr = [];
for(var i = 0; i< data.length; i++){
	arr.push("<li>"+data[i].a+"</li>");
}
$list.html(arr.join(""));

//////////////////////////////////
$list.html(data.map(function(v,i){
	return "<li>"+v.a+</li";
}).join(""));
//////////////////////////////////
3. map
data.map(function(v,i){
	return "<li>"+v.a+</li";
})
//반환값은 새로운 객체
var arr = ["a","b","c"];

var transformArray = arr.map(function(v,i){
	return v+i;
});

//transformArray
// ["a0","b1","c2"]
```

2. 표준 script 위치 => head!
//a.js
$("#test").on("click",function(){
	alert(1);
});

//a.html

<html>
	<head>
		<script src="jquery.js"></script>
		<script src="app.js"></script>
	</head>
	<body>
		<div id="test"></div>
	</body>
</html>


- 문제점
	1. 선택자가 없는 것이기 때문에 error는 발생하지 않는다. jQuery객체 반환(undefined)
	2. DOM이 구성되지 않은 시점에서 element를 찾기 때문이다.

----
3. object와 array 다른 자료구조이다.

for in 구조는 object 타입에 주로 사용한다.
for(var i in data){
	data[i]
}

- 좋은 컨벤션을 사용하는 것 보다 컨벤션을 지키는 것이 중요하다.

----
4.
// 1번
var Test = {
	some:function(ele){
		ele.on("click", this.hi);
	},
	hi:function(e){
		console.log("hi");
	}
}
Test.some($("#id"));

// 2번
var Test = {
	some:function(){
		var ele = $("#id");
		ele.on("click",this.hi);
	},
	hi:function(e){
		console.log("hi");
	}
}
Test.some();

- element를 파리미터로 넘겨주느냐 내부에 선언하느냐의 차이
- Test module이 한페이지에서 한번만 쓰이는 경우 2번 처럼 사용한다.
- element를 받는 경우 모든 element를 넣지 않고 base가 되는 element를 하나만 넣고 base를 기준으로 child들을 찾는 것이 일반적이다.
- 변하는 element들만 넣고 싶다는 니즈에서 출발해서 모든 element들을 넣어주게 될 수 있다.

----
5.
- compile을 여러번 할 필요가 없다.

----
6. 
- selector를 사용하는 code를 init function으로 만들어서 외부로 노출 시킨다.
- 이후, init함수를 DOMContentload된 시점에 호출하면 된다.
- 이로 인해서 다른 노출할 필요가 없는 함수는 노출하지 않는다.

```

var categorylist = (function(){
	var curruntCategoryId = 0;
	
	function init(){
		$('ul.event_tab_lst').on('click', 'li.item', viewProductByCategory);
		$('ul.event_tab_lst').on('click', 'li.item', updateCount);
		$('li.item:first-child').trigger('click');
		$('div.more > button.btn').on('click', viewMoreProductList);
		$(window).on("scroll", categorylist.scrollViewMoreProductList);
	}
	function ...(){

	}

	return {
		init : init,
		scrollViewMoreProductList: scrollViewMoreProductList
	}
})();
```
- Module을 하나 하나씩 나누어 지도록 하는게 좋다.

- Module 객체를 받는 변수명은 CamelCase(Class선언)할 때와 같이 사용한다.
----
7.
- hover
	- 가상선택자
- mouserover, out
	- element단위로 작동한다.
	- 거의 사용하지 않는다.
	- li(mouseover) -> a(mouserout) -> button

- mouseenter, leave
	- 영역 기준으로 enter, leave한다.

----
9.
- 'type="text/x-handlebars-template"' 를 사용하는 이유
	- x: 접미사 = extend의 줄임말
		- 일반적인게 아닌 확장되었다는 것을 의미
	- Browser에서 인식하지 못하는 타입인 경우 파싱 객체 생성등의 작업을 하지 않고 내려받기만 한다.
	- 사람이 보기 위해서 작성한다.

----
10.
- javascript에서는 brace를 해주는게 좋다.
- merge하는 경우 brace가 없으면 제대로 merge못해주는 tool이 있을 수 있다.
```
if(){
	...
}
```

----
11.
- Q2 performance 성능 이슈
	- js 파일 cache
	- html파일과 js파일을 나누어서 읽어들이지 않을까?
		- 
	- js파일 분리
		- caching
		- 일반적으로 사용
	- js파일 합치는 경우
		- 네트워크에 영향을 덜 받기 위해서 사용 (네트워크에 민감한 페이지)
		- javascript사용이 적은 경우
		- caching하는 비용보다 네트워크 비용이 적다고 판단하는 경우
- Q3 
	- library 배포는 npm으로 통합
	- pattern
		- CommonJS (동기)
			- module 방식
			- node js
			- require방식
				- 표준이 아니다.
		- AMD(Asynchronous)
			- module 방식
			- web은 동기 방식을 사용하면 main thread가 멈추기 때문에 비동기를 사용
			- required 파일 위치를 설정해주어야 한다.
				- 표준이 아니다.
		- UMD
			- 통합 (표준)
			- import
	- 목적에 맞게 사용을 한다.

```
import $ from jquery

$("#select")...
```

- Q4
	- 일관되게 사용한다.

----
12. 지난주
- package.json <-> pom.xml

- module pattern -> common js -> component
- npm
	- script를 작성해서 Makefile처럼 사용 할 수 있다.
	- grunt 빌드 도구
		- npm test
	- package.json
	- npm run fakeserver

----
13. event emitter
- Component
	- instance할 수 있는 class를 만드는 것으로 생각 할 수 있다.
	- 결합도를 낮춘다.

- 결합도와 응집도
	- 변화의 차이
	- 변하는 것은 빼고 변하지 않는 것은 안으로 둔다.
		- 이 2가지를 떨어뜨리는 것이 결합도를 낮추고 응집도를 높인다.
	- 결합도를 떨어트리는 방법
		- Hollywood Principle

- Observer Pattern
	- (Observable Pattern은 전혀 다른 pattern)
	- 

- Rectangle.prototype = new eg.Component();
	- 상속하는 구문

function	Rectangle(){		
}		
Rectangle.prototype = new	eg.Component();		
Rectangle.prototype.constructor =	Rectangle;	
this.trigger("checked");
세트

var Checkbox = extend(eq.Component, {
	init : function(a){
	},
	check:function(){
		this.trigger("checked");
	}
})


----
a.checked
a2.checked
trigger를 통해서 현재 상태를 알려 줄 수 있다.
trigger를 하면 binding된 이벤트가 실행된다.

================
## Tutoring
#### 1. Front-End
- 프로그래밍 오류 중 순서에 의한 오류가 가장 많다.
- setting과 doAjax와 같이 하나의 시점으로 묶여야 한다. (해결방법 2가지)
	- 하나로 묶어준다.
	- instance를 통해서 사용한다.

- 논리적으로 하나의 모듈만 존재해야 하지 않는 경우를 제외하고는 여러개의 module을 instance(같은 module 여러개 배치) 할 수 있도록 구현해야 한다.

- String 변수 초기화
	- var name = '';
	- var _name 도 사용

- Memory load 단위는 function
- scope chain으로 인해서 stack이 없다(javascript)

- 함수를 실행하면 memory에서 사라지지 않고 남아있는다.

```
var users = (function(){
	var userRegistry = {
		findByName: function(name){...}
	};
	return {
		registry: userRegistry,
		Person: Person
	};

	function Person(name, age){
		return {
			intro: function(){
				console.log(name, age);
			},
			addAge: function(count) {
				age += count;
			},
			register: function(){
				userRegistry.register(this);
			}
		};
	}
})();

var john = Person('john',99);
var pole = Person('pole',30);
```
+++++ 그림 추가

- api나 function 작성 시 팁
	- 시작 <-> 끝 매칭
	- 순서대로 진행되는 구조 1 -> 2 -> 3 -> 4
	- 순환구조
	- 확산구조
	- 수렴구조

- parsing 작업은 항상 비용이 수반된다.
- 매번 template을 만들때 parsing 과정이 발생한다.
```
<div class="name">{{user.name}}</div>

//compile 과정에서 수행하는 함수
function(data){
	return '<div class="name">'+data.user.name+'</div>';
}
```

- 현재 코드 작성의 중요성 -> diff에 중점을 둔다.
- for, foreach
	- 성능상 for문이 가장빠르다.
- map
```
var arr = [1, 2, 3, 4, 5];

var doubled = arr.map(function(v){
	return v * 2;
});

```
- filter

- 무엇을 하는지 함수의 이름으로 명시를 해주는 것이 좋다.
	- 의미단위로 작성하는게 좋다.

- module 작성 시 기준
	- 제어의 역전이 일어나면 안된다.
		- 순환 의존 (cycling dependency)
		- A 는 B가 필요
		- B 는 C가 필요
		- C 는 A가 필요
- module 관리
	- common JS, required JS

- Browser는 parsing을 하다가 script를 만나면 script를 다 loading한 후에 Dom 탐색을 다시 진행한다.

- code는 의미 단위로 나누는 것이 좋다.

- 문제해결을 위한 가설을 세우고 가장 빠른 검증 방법을 찾는 것도 좋다.

- 이벤트성 페이지 (한번 사용하고 처분할 페이지)
	- 하나의 html 파일 내에서 처리
- 오래 유지 관리 될 페이지
	- 따로 js파일을 관리 (caching 정책)

- Module 작성시 생각할 점
	- 이 Module을 다른페이지로 가져가면 어떨까?

- 배열은 for, foreach를 사용
- for - in 는 Object property를 순환하는 경우
- typeScript? javascript문법을 엄격하게 제한
- 함수의 이름은 하는일이 아닌 의미를 전달해야 한다.

- image content length를 알려주면 받을 크기를 기대하기 떄문에 mismatch가 발생 할 수 있다.

#### 2. Back-End
- domain과 DTO

- **Integer는 null값을 사용 할 수 있다.**
- **int는 반드시 값이 들어간다.**

- Rest API 설계 시 전체 집합에서 나누어 가는 방식으로 생각하는 것이 좋다.

- Collection
	- List 순서가 중요 중복 가능
	- Set 순서가 없고 중복 불가
		- 목적에 따라서 return을 결정하도록 한다.

- function overloading도 생각하면서 구현해보는 것도 좋다.

- keyword
	- @ControllerAdvice
		- 예외처리 하도록 설정하는 annotation

----------------------------------

- ajax Form
```
$.ajax({
	url:'https://openapi.map.naver.com/api/geocode',
	type : "GET",
	data: {
		encoding:'utf-8',
		coordType:'latlng',
		query: encodedAddress
	},
	contentType : "application/json; charset=UTF-8",
	headers : {
		"X-Naver-Client-Id" : "AiZisW993TeCGaS7Wq87",
		"X-Naver-Client-Secret" : "3oLOkvQf_Q"
	},
}).done(function(res, status){
	console.log(res);
}).fail(function(jQueryXhr, status){

});
```

- Spring에서 ajax로 open api가져오기
http://blog.naver.com/PostView.nhn?blogId=platinasnow&logNo=220732491939

- RestController에서 binary file 반환
http://www.technicalkeeda.com/spring-tutorials/download-pdf-file-using-spring-mvc-rest-controller

--------------
- todo
	- 예매자 한줄평
		- ~별점, 평점~
		- ~한줄평 내용, 별점, 생성일자~
			- **생성일자 YYYY.MM.DD 형식으로 변경**
		- 이미지
			- ~이미지 한장 삽입~
				- file table
					- id
					- file_name
					- save_file_name
					- file_length
					- content_type
			- ~이미지 개수 출력~
		- 이미지 팝업 레이어
			- 화면에 꽉찬 레이어 팝업
			- 터치를 이용하여 좌우로 이동
	- ~네이버 지도(api)~
	- 터치 이미지 슬라이드
		- 숫자 변경
		- 완벽한 터치
	- 상단 화면
		- ~전시 홈페이지로 이동~
		- ~전화걸기~
			- href="tel:010-..""
		- ~이메일 보내기~
			- href="mailto:wa...@naver.com"
		- ~가는길 찾기(네이버지도로 연결)~

- 수정 필요 사항
	- ProductList
		- SELECT_PRODUCT_LIST, SELECT_PRODUCT_LIST_CAT
		- JOIN해서 데이터를 가져오다보니 file이 여러개 있는 경우 file개수만큼 중복 상품을 가져온다.