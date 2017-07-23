## jQuery 강의

#### 1. jQuery Basic
###### jQuery 기본 컨셉(query)
`$(선택자).메서드(값[..]);`

- `$: jQuery 객체`
- `선택자: css slector`
- `메서드: jQuery 메서드`
- `값[..]: 파라미터`

- Method 사용 패턴
  - setter/getter 구분
    - 파라미터 갯수(css, attr, prop, offset, data ...)
      - `key/value`를 통해서 set을 하므로 `key/value`가 파라미터로 들어가면 setter이고 `key`가 파라미터로 들어가면 getter이다.
    - 파라미터 여부(val, height, width...)
      - 파라미터가 있는 경우 setter, 파라미터가 없는 경우 getter이다.
    - 여러 li element가 있는 경우 동작
      - jQuery setter는 모든 `li` tag에 동작하지만 jQuery getter는 첫 번째 Element에만 동작한다.
      - setter method를 사용할 때, `key, value`에 대한 하나의 쌍을 넣을 수도 있고 object로 `key: value` 여러 쌍을 넣을 수 있다.
    - 반환값이 없는 method(setter)들은 chainning 해서 사용 할 수 있다.
    ```
    $('li').width(500).height(500);

    $('li').width(500);
    $('li').height(500);
    ```
- jQuery 객체 내부에 들어갈 수 있는 인자
  - css selector
  - object (Dom object)
  - html String
    - element를 생성
    ```
    var todo = document.getElementById('todo');

    $('li')
    $(todo)
    $('<div>foo</div>')
    ```

- Reference
  - https://oscarotero.com/jquery/
----

#### 2. on
###### .on() method
- .on() method를 사용해서 element의 event를 등록(bind) 할 수 있다.
- $(selector).on('eventType','handlerFunction');
- $(selector).off('eventType','handlerFunction');

- .off() method를 사용해서 element에 등록된 event를 detach할 수 있다.
- 이때 등록 해제하려는 selector, eventType, handlerFuntion이 모두 같아야 하는데, **익명의 함수를 사용해서 handler를 구현하는 경우 동일한 구현체를 사용하는 경우가 있다. 이는 handler로 등록된 구현이 같은 것이지 동일한 객체(함수)가 아니기 때문에 올바르게 동작하지 않는다. 따라서 함수를 정의하고 이를 사용해야 한다.**

*잘못된 event detach*
```
$('#add').on('click',function(e){
  console.log("click");
});

$('#detach').on('click',function(e){
  console.log("detach");
  $('#add').off('click',function(e){
    console.log("click");
  });
});
```
*올바른 event detach*
```
function click(e){
  console.log("click");
}

$('#add').on('click',click);

$('#detach').on('click',function(e){
  console.log("detach");
  $('#add').off('click',click);
});
```

###### load/DOMContLoaded
- load

```
$(window).on("load",function(){
  console.log("this is load");
});
```

- 많이 사용되는 event에 대해서는 on이 아닌 직접적으로 사용 할 수 있다.
```
$(window).load(function(){
  console.log("this is load");
});

$(window).click(function(){
  console.log("this for window click");
});
```

- DOMContLoaded
  - jQuery ready event 사용 방법
```
$(document).on("ready",function(){
  console.log("ready");
});
```
```
$(document).ready(function(){
  console.log("ready");
});
```
```
$(function(){
  console.log("ready");
});
```

###### event delegation
- 상위 element에서 하위 element들을 대표(delegation)해서 event handler를 등록 할 수 있다.
- input element에 event를 각각 설정하는 것이 아닌 상위 element에 걸어서 사용한다.

```
<ul id="todolist">
  <li><input type="checkbox"/><span>할 일 하기</span></li>
  <li><input type="checkbox"/><span>할 일 하기2</span></li>
</ul>

<script type="text/javascript" src=""></script>
<script type="text/javascript">
  ...
</script>
```

- javascript에서의 사용 방법
  ```
  $("#todolist").on("click",function(e){
    // e.target -> event가 발생하는 element
    if(e.target.tagName === "INPUT"){
      console.log("checkbox");
    }
  });
  ```

- jQuery에서 사용 방법
  ```
  $("#todolist").on("click","input",function(){
    console.log("checkbox");
  });
  ```
  - .on method의 2번째 파라미터로 `selector (input)`를 넣어서 세련되고 쉽게 on을 확장해서 사용 할 수 있다.

- Reference
  - http://api.jquery.com/category/events/
----

#### 3. val
- Attribute

- attr
  - HTML tag내의 속성을 가져오거나 변경 시킨다.
  - 등록
  - 삭제
    - removeAttr("property")

- prop
  - prop는 선택한 Dom element의 property를 가져온다. 객체의 속성 값을 가져오거나 변경 시킨다.
  - 등록
  - 삭제
    - removeProp("property")
대부분 prop를 쓴다고 생각하면 된다.

custom attribut를 사용할 때만 attribute를 사용한다고 생각한다.
```
ex)
<input type="checkbox" id="check" foo="bar">

$("#check").attr("foo");
```
- prop를 사용해서는 custom한 foo 속성을 가져 올 수 없다.

- class
  - 등록
    - addClass
  - 삭제
    - removeClass
  - 확인
    - hasClass -> true, false
  - 없는 경우 등록, 있는 경우 삭제
    - toggleClass

- data
  - HTML(element)에 data에 대한 정보를 저장하기 위해서 사용된다.
  - `data`라는 prefix를 붙여서 사용한다. **data**-id
  - Object형식으로 data를 넣을 수 있다.
  ```
  $("ul li:first").data("id", [1,2,3]);
  $("ul li:first").data("id");

  $("ul li:first").data({
    "id":1,
    "test":2
  })
  $("ul li:first").data("id");
  $("ul li:first").data("test");
  $("ul li:first").data();  //Object 형태로 반환해서 전부 가져 올 수 있다.
  ```
- Reference
  - http://api.jquery.com/category/attributes/
----
#### 4. Append

- append
  - 마지막 자식 노드에 붙인다.
- prepend
  - 첫번째 자식 노드에 붙인다.
- appendTo
  - append와 앞 뒤 파라미터의 위치가 바뀐다.
- prependTo
  - prepend와 앞 뒤 파라미터의 위치가 바뀐다.
- appendTo와 prependTo에 행위를 추가할 때 활용한다. sequantial하게 chaining해서 사용할 수 있다.
```
var html = element;

$("#todolist").prepend(html);
$("#foo").slideDown();
 '==='
$(html).prependTo("#todolist").slideDown();
```
- 붙이고 행위를 같이 해주는 경우 활용하기 좋다.

- html
  - html code자체를 변경하는 역할을 한다.(setter) Dom 영역을 지우고 새로 넣는다.
- text
  - text자체를 넣는 것으로 html로 해석되지 않는 값
- else
  - document.createElement("li");
- Reference
  - http://api.jquery.com/category/manipulation/dom-insertion-inside/
----

#### 5. Event
- event object
  - jQuery event객체로 일반 객체와는 다르다.


- which
  - jQuery에서 keyboard값의 표준 으로 사용
  - keyCode보다 which를 사용하면 된다.
- keyCode
- key event가 발생했을 때 발생한 key의 정보를 볼 때 사용한다.

```
$("li input").on("keydown", function(event){
  console.log(event.which);
  console.log(event.keyCode);
});
```

- target & currentTarget(this)
  - target
    - event가 실제 발생한 element
  - currentTarget
    - event를 바인드 한 element
  ```
  $("#todolist").on("click",function(event){
    console.log("target %o", event.target); //%o를 하면 객체를 template형식으로 표현
    console.log("currentTarget %o", event.currentTarget);
    console.log(this);  //this는 event의 currentTarget을 의미한다.
  });
  ```
- Reference
  - http://api.jquery.com/category/events/

  ```
      $("#todolist").on("click", function(event){
      console.log("target %o", event.target);
      console.log("currentTarget %o", event.currentTarget);
      console.log("this %o",this);
    });

    /*$("#todolist").on("click","li",function(event){
      console.log("target %o", event.target);
      console.log("currentTarget %o", event.currentTarget);
      console.log("this %o",this);
    });*/

  ```


----

#### 6. Traversing

- closest/parent/parents
  - parent
    - 바로 1단계 상위 부모를 기준으로 찾는다.
    - 부모 element에서 부터 찾기 시작
  - parents
    - Dom tree를 타고 root까지 올라가면서 모든 부모들
    - root부터 시작
  - **closest**
    - 자신을 기준으로 가까운 특정 부모를 찾을 때 사용
    - 비교적 가장많이 사용
    - 본인 element에서 부터 찾기 시작
- find
  - chaining해서 사용하기 좋다.
  - 앞의 selector를 기준으로 자식 node를 찾는다.
  - 자식은 복수가 될 수 있다.

- get/eq
  - 여러 li중에서 특정 li를 찾고 싶은 경우
  - native 접근 방식
  ```
  $("li")[0] -> native 이기 때문에 jQuery method사용불가
  '===' document.getElementByTagName("li")[0]
  ```
  - get 접근 방식
  ```
  $("li").get(0) -> native element
  $($("li").get(0)). -> jQuery instance
  ```
  - eq 접근 방식
  ```
  $("li").eq(0) -> jQuery instance
  $("li").eq(0).css("background-color","read"); //사용 가능
  ```
- Reference
  - http://api.jquery.com/category/traversing/

----
#### 7. Effect
- jQuery에서 Element에 효과를 쉽게 적용 할 수 있다.

1. hide

2. show
  - show(parameter)
    - 첫번째 인자로 effect의 duration을 줄 수 있다.

    ```
    $("#foo").show(600);
    $("#foo").hide(600);
    opacity=투명도
    ```
  - 두 번째 인자로 callBack function을 넣어줄 수 있다.
  ```
  $("#foo").show("slow", function(){
    console.log("done");
  });
  slow = 600ms
  fast = 200ms
  default = 400ms (인자가 없는 것)
  ```
3. toggle
  - 보이는 건 안보이는 걸로
  - 안보이는 건 보이는 걸로
4. slideup/down

클래스를 작성해서 동작시키는게 성능면에서 뛰어나다.

- Reference
  - http://api.jquery.com/category/effects/
  - [show/hide 성능이슈](https://github.com/jquery/jquery.com/issues/88#issuecomment-72400007)

----

#### 8. Ajax
ajax 기본 구조
```
$.ajax("url", {
  //parameter를 server에 전달
  "data" : {"param":1},
  "type" : "post",
  "async" : false //응답 값이 올 때 까지 main thread는 멈춰 있는다.
}).done(function(data, status){ //응답 값
  console.log(data, status);
}).fail(function(jQueryXhr, status){  //jQueryXhr 객체
  console.log(jQueryXhr, status);
});
```
1. Server에 파라미터 전달하기
  -
2. status에 따른 callback 처리
  - done
    - (200 >= statusCode and status > 300) or (status === 304)
    - 1 번째 parameter: data
  - fail
    - done 외의 상태
3. 응답과 자동 변환: Content-Type
  - jQuery에서 content-type에 json 스트링이 있으면 무조건 json 객체로 반환
  - text형식으로 보내면 스트링으로 받는다.
    - JSON.parse(data) 로 text를 감싸서 json으로 사용하는 불편함을 거쳐야 한다.
4. async의 문제점
  - async : false로 설정하면 main thread가 멈추기 때문에 사용자의 모든 행위(event)를 멈추기 때문에 반드시 Default값인 true로 사용해야 한다.
  - async는 반드시 true로 설정한다.
