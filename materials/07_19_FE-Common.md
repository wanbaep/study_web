## Front-End 공통

#### 1. Module Pattern
- 자바스크립트 코드를 글로벌로 함수나 변수를 만들게 되면 서로 겹쳐 문제가 날 확율이 높고, 이를 찾기란 정말 어렵다. 그래서 자바스크립트 코드를 모듈화 하여 외부에 private하게 함수나 변수를 사용한다. 이 영상은 이럴 때 사용하는 모듈 패턴에 대한 설명을 하는 클립입니다.

1. 즉시 실행함수(Immediately-invoked function expression)
	- 함수를 만든 후에 바로 실행하는 방법
	- 함수를 만들자 마자 바로 실행하라!
	```
	(function(){
		console.log("run");
	})();

	!function(){
		console.log("run");
	}();
	```
	- 즉시 실행 함수를 실행하는 이유
	- 함수 내부에 scope가 정해지기 때문에 외부에서 사용 할 수 없다.

2. Module 화
	```
	var Foo = (function(){
		var foo = 1;
	})();

	console.log(foo);	//즉시 실행함수의 foo variable에 접근 할 수 없다.
	```
	- 외부에 노출하고 싶은 경우 변수로 받아서 할당한다.
	- return 객체로 접근 할 수 있다.
		- 노출하고 싶은 `key/value`를 객체로 넘겨준다.
----

#### 2. Template pattern
- JS 개발에서 많이 사용하는 방법이 HTML문자를 데이터와 합쳐서 엘리먼트로 삽입하는 것이다. 이 때 대부분 HTML 문자를 따로 관리하거나 같이 JS파일을 관리하기도 하는데 HTML문자를 따로 관리해서 logic과 view부분을 분리 하는 방법을 살펴본다.
- logic과 View영역을 따로 관리하도록 하기위해서 사용한다.


1. 일반적인 방법
- template를 활용 함으로써 HTML 구조를 한눈에 볼 수 있도록 하기 위해서 template를 사용한다.
- HTML 가독성을 높이기 위해서 사용된다.	
	```
	var todoTemplate =
	"<li>"+
		"<input type=\"checkbox\"/><span> + todo.value + "</span>" + 
	"</li>";

	todolist.insertAjacentHTML("beforeend", todoTemplate);

	--
	... li만드는 과정

	todolist.appendChild(li);
	```

- insertAdjacentHtTML
	- HTML string을 element로 사용 할 수 있게 해주는 함수

- micro template과 handlebars는 목적이 다르다.
	- micro template
		- javascript 코드를 template에서 사용 할 수 있어서 자유도가 높다.
		- Simple하다

	- handlebars (library)
		- symantic한 template을 만들기 위해서 사용하는 방법이다.
		- 1. source를 compile 하면 method를 반환한다.
			- `var template = Handlebars.compile(source);`
			- `source`는 template을 의미한다.
		- 2. template method를 실행하면 html 코드를 반환한다.
			- `var html = template({
				"key": "value"
			});`
			- {{key}} 를 value로 변환해준다.
			- example
				```
				todolist.insertAdjacentHTML("beforeend", template({
					"todo": todoVal
				}));
				```

- Reference
	- [micro template](https://johnresig.com/blog/javascript-micro-templating/)
	- [handlebars](http://handlebarsjs.com/)
	- insertAdjacentHTML & createElement
		- 내부적인 logic이 위의 두개의 method로 구현되어 있다.
		- [insertAdjacentHTML](https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML)
		- [createElement](https://developer.mozilla.org/ko/docs/Web/API/Document/createElement)
----
#### 3. Event delegation
- 

1. 기존의 방식
	- 하나 하나의 event를 추가 혹은 삭제 할 때마다 bind, unbind를 해서 처리하는 방법

2. event delegation
	- 버블링을 통해서 event를 상위 element에서 받는다.
	- 하위 element에서 발생한 event를 부모 element에서 모두 받은다음에 filtering하는 작업을 거친다.
	- 별도로 하위 element에 event bind를 해줄 작업이 필요 없는 대신 매번 filtering하는 과정이 추가된다.
		- 따라서 body element에서 event를 잡아주도록 구현하는 경우 filtering이 빈번하게 일어나서 비효율 적이다.
		- 그러므로 특정 영역에 대해서 event delegation을 구현하는게 성능 측면에서 효율적이다.
	```
	todolist.addEventListener("click", function(e){
		if(e.target.tagName === "INPUT"){
			toggle(e);
		}
	})
	```
	- e.target을 통해서 발생시킨 element를 확인 할 수 있다.
	- 따라서 위에서 ul tag의 자식들이 발생시킨 event를 모두 ul에서 받고 INPUT element인 경우에만 처리를 해주기 때문에 이후에 생성된 element에 대해서도 동일하게 동작할 수 있다.

----
#### 4. Javascript 초기화
- 자바스크립트를 초기화하는 다양한 방법에 대한 설명을 하고, 초기화하는 방법에 대한 다양한 이슈를 확인한다.

1. script를 사용하는 element 뒤로 위치시키는 방법(제일 하단으로)

```
<초기화 하는 code>
function init(){
	var foo = document.getElementById('foo');
	foo.addEventListener("click", function(){
		console.log("click");
	})
}

init();

```
script 선언을 body 하단에 넣은 경우 초기화 코드를 위와 같이 작성을 주로 한다.


2. load 이벤트 활용

```
window.addEventListener("load", function(){
	init();
});
```
- 해당 방법을 사용하면 script tag를 어디에 위치 시켜도 된다.
- load 이벤트는 HTML의 모든 resource들이 load된 이후에 발생하는 이벤트
	- script tag, css file, image, iframe html 등이 download된 이후의 시점을 의미한다.
- 문제점
	- 서비스에서 download해야 하는 file들이 많은 경우 load 시점이 느려 질 수 있다.
	- 즉 javascript initialize하는 시점이 늦어짐으로써 사용자가 동작을 시킬 수가 없다.
		- 예로 download가 굉장히 오래 걸리는 image들이 여러개 있는 경우 서비스가 그동안 제공 될 수 없다.
- 이러한 문제점을 해결하기 위해서 Dom

3. Domcontentload 활용
```
document.addEventListener("DOMContentLoaded", function(){
	
});
```
- Dom이 load된 이후의 시점을 의미한다.
- image들이 load되기 전에 Dom이 완성되면 사용자들이 빠르게 interaction(접근) 할 수 있다.

**일반적으로는 Domcontentload를 사용하지만 loaded 된 resource의 정보에 접근하는 경우 load 된 이후에 접근 할 수 있기 때문에 이러한 경우 load를 사용된다.**

```

```