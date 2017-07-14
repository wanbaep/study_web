## Module pattern

- Module pattern을 사용하면 code를 분리 혹은 간결하게 만들 수 있다.
- Module 패턴은 원래 종래의 소프트웨어 엔지니어링에서 클래스에 대해 개인 및 공개 캡슐화를 제공하는 방법으로 정의되었습니다.
- 자바 스크립트에서 모듈 패턴은 공용 객체 / 개인 메소드와 변수를 단일 객체(`{}`) 안에 포함 할 수있는 방법으로 클래스의 개념을 추가로 모방하여 전역 범위에서 특정 부분을 보호합니다. 이 결과는 함수 이름이 페이지의 추가 스크립트에 정의 된 다른 함수와 충돌 할 가능성을 줄입니다.

In JavaScript, the Module pattern is used to further emulate the concept of classes in such a way that we're able to include both public/private methods and variables inside a single object, thus shielding particular parts from the global scope. What this results in is a reduction in the likelihood of our function names conflicting with other functions defined in additional scripts on the page.

- prototype inheritance
  - https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain

- prototype에 대한 이해
  - http://www.nextree.co.kr/p7323/

  #### Module pattern사용 이유
  - 추가적인 스크립트(외부 라이브러리든 다른 개발자에 의해) 가 있을 경우 이름이 충돌할 수 있습니다.

#### Object literal
- Object literal 표기법에서 object는 `name/value` set을 `,`를 기준으로 나눠서 표현되며 (`{}`)로 둘러싸여져 있다.


- In object literal notation, an object is described as a set of comma-separated name/value pairs enclosed in curly braces (`{}`). Names inside the object may be either strings or identifiers that are followed by a colon.

#### Module pattern의 종류
1. 기본 Module pattern
2. Import mixins
3. Exports
4. Dojo
5. ExtJS
6. YUI
7. jQuery

###### Tip
```
var url = somethingUrl || '/default/url'
```
- 위와 같이 객체 생성 시 기본 값을 설정을 한다.
`||` 연산자는 앞의 값이 있다면 `somethingUrl`을 반환하고 앞의 값이 없다면 뒤의 값인 `'/default/url'`값을 반환한다.

- `&&` 연산자는 반대로 앞의 표현식이 거짓으면 앞의 값을 리턴하고 참이면 뒤의 표현식을 리턴한다.

- **sublime text 단축키**
  - Ctrl + Shift + K 행 한줄 삭제

- **Event bind (등록)**
  ```
  //Mouse Event 등록
    /*$('.btn_pre_e').mouseenter(function() {
        timerModule.mouseEvent();
    });
    */
    //Event에 대한 callback 함수 등록
    // $('.btn_pre_e').mouseenter(timerModule.mouseEvent.bind(undefined));
    /*Evnet에 대한 callback 함수 등록의미가 아닌 함수를 한번 호출한다는 의미
    $('.btn_nxt_e').mouseenter(timerModule.mouseEvent());
    */
  ```
