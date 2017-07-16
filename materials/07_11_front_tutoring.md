## Code Review
### 1. Front-End
#### 1.1
- 다른사람의 코드를 이해하는 것이 중요하다.
- 실무에서는 코드를 보는 일이 더 많다.

#### 1.2
  - script 삽입 시 https or http를 둘 다 지원하는 경우 빼는 것이 좋다.
    - `<script src="//www.google.com/app.js">`
    - 현재 서버의 프로토콜과 맞춰주는게 좋다.
  - tag를 하나 생성할 때 String형식으로 만들떄
    - text/template 형식으로 지정해서 코드를 써놓고 불러와서 사용하는 것이 유지보수에 좋다
    - <div> {Name} </div> 형태로 저장하고 `.replace('{NAME}','이름')` 으로 사용
    - `udacity -> helper.js 예제를 따라하려 했지만 잘 되지 않음`
  - code formatter 들여쓰기 맞출 것
  - live 메소드는 다음 코드와 동일하다.
  ```
  $(document).on('click','put',{....});
  ```
  - document는 문서의 처음부터 존재한다.
  - 실질적으로는 $(document).ready() 부분에 원하는 `rootElement.on(...)` 이벤트를 걸어준다.
  - tag에 attribute를 작성할 때 띄어쓰기를 하지 않는게 좋다.
  ```
  <input class = "classTag" /> (X)
  <input class="classTag" />   (O)
  ```
  - 전역적인 div에 css 설정을 하는 것을 권장하지 않는다.
  - Table형태의 표를 볼때만 table을 사용하고 나머지 부분을 사용할 때는 제외하고 생각하는게 좋다.
  - unique한 설정인 id를 하나만 사용한다기 보다는 class를 선언해서 다중적으로 처리하는게 grouping해서 관리하는게 좋다.
  - `#` 뒷부분은 server로 전송되지 않는다.
  - id는 숫자로 시작할 수 없다. 쓰려는 경우 prefix를 넣도록 한다.
  - html 파일은 cache되지 않고 새로 내려오지만, js파일은 cache처리 된다.
  - 웹팩으로 js파일을 합쳐서 사용하기도 한다.
  - 재사용을 어떻게 할 것인가에 따라서 .js파일을 나누기도 한다.
#### function declaration 과 function literal의 차이
  - ecms3?
  - 분명한 이유가 없는 경우 function declaration을 쓰는게 좋다.
  - 이유는 호이스팅 때문이다.
  - 순서 의존에 걸려있다면 코드가 위험한 상태라고 이야기 할 수 있다.

#### Dom구조에 영향받지 않는 selector를 사용하는 것이 좋다.
  - BEM
    - Block (블럭)
    - Element (요소) -> jQuery에서 찾는 단계
    - Method (상태)
  - css를 어떻게 구조화해서 사용할 것인가에 대한 이야기
  - [BEM introduction](getbem.com/introduction)
  - css 이름은 지역적이지 않고 전역적이기 때문에 이름을 설정하기 까다롭다.
  - 코드 작성 시, Element를 찾고 Block을 찾는 순서로 작성하는 것이 가장 안전한 방법이다.
  - Block의 id를 정할 때 id attribute가 아닌 새로운 `data-article_id=123` 과 같은 방법으로 식별하는게 좋다.
  - id는 페이지의 이름으로 사용되는 경우가 있다.
  - 한번 탐색한 Element를 이어서 계속 사용하는 것이 좋다.
  ```
  $('elementClass').focus().val(); ...
  ```
  - data attribute를 가져오려는 경우 attr 대신 data를 사용하는 것이 좋다.
  - attribute를 임의로 만드는 것을 자제하는게 좋다.
    - 표준이 생길 수 있다.
  - 따라서 마음대로 쓸 수 있는 스펙이 data attribute이다.
  ```
  <html>

  <div data-row-id="ff-1234">

  <script type="text/javascript">
    var rowId = document.querySelector('#sample').dataset.rowId;

    //앞에 것을 빼고 숫자만 얻고 싶은 경우
    var rowId = +$("#sample").data('row-id').substr(3);
  </script>
  ```
  - closest는 가장 가까운 부모를 찾는데 사용된다.
    - 선택자에 맞는 부모를 계속해서 찾아간다.
    - 웬만한 selector는 전부 class로 찾는게 좋다.
  - API 추상화(ryu)
  -
  ```
  $(document).ready(){

  }
  둘은 같다.
  $(function(){

  })
  ```

  - 비교 연산자는 `===`를 사용하는게 좋다.
  - Restful 하게 하려면 insert를 명시하는거 보단 URL을 일치시키고 Method를 다르게 하는게 좋다.
  - Delete는 Content body를 갖지 않는다. 따라서 Content-Type도 지정할 필요가 없다.
  - 언어의 일반적인 사용을 따라 가는게 좋다.
    - camelCase
  - location.reload를 하면 현재 페이지를 새로고침 해준다.
  - json파일은 `""`를 사용하도록 명시적으로 정해져 있다.

  - jQuery는 집합의 개념으로 보면 된다.
  ```
  $()
  ```

  ```
  $(document).on('click','.sel',function(){

    })

  $('.sel').on('click',function(){

    })
  ```
  - event를 거는 위치는 root (문서 전체)
  - 그 중에서 `.sel`을 찾으면 실행하라는 의미가 된다.
  - target : .sel, currenttarget : document
  ```
  $('.sel').on('click',function(){

    })
  ```

  - target / currenttarget이 다르다.


  - 순서가 무조건 정해지거나 완전히 별개의 code가 존재해야된다.
  - 원하는 값이 안나오면 code에 오류가 존재할 가능성이 크다.
  - reflow는 최대한 피해야 한다.
  - Dom을 조작하는 모든 동작은 동기적이다.
    - setTimeout을 사용할 필요가 없다.

### 2. Back-End
#### spring
- Service 에서 @Transactional annotation을 update, delete에는 @Transactional(readonly=false)를 붙여서 트랜잭션 관리를 해준다.
- `select * from table` 을 sql문 작성할때 사용하면 명시적이지 않기 때문에 오류를 야기 할 수 있다.
