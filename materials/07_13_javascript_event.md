## Javascript event
#### 1. Javascript란
- 객체 기반의 스크립트 프로그래밍 언어
- Web Browser에서 주로 사용하며 다른 응용 프로그램의 내장 객체에도 접근 할 수 있다.
- `Node.js와 같은 런타임 환경`과 같이 서버 사이드 네트워크 프로그래밍에도 사용
###### 1.1 Javascript 역사
- 넷스케이프 커뮤니케이션즈 코퍼레이션의 브렌던 아이크가 처음 *모카(Mocha)* 라는 이름으로, 나중에는 *라이브스크립트(LiveScript)* 라는 이름으로 개발했으며, 최종적으로 자바스크립트가 되었다.

##### 1.2 Event
- 예제 code
```
<input class="selector" type="button" value="버튼">

...

$('.selector').on('click',function(){

  });
```

- Event Target
  - Target은 이벤트가 일어날 객체를 의미한다.
  - `input 태그`
- Event type
  - Click, Scroll, Mousemove 등 발생하는 이벤트의 종류를 의미한다.
  `click`
- Event handler
  - 이벤트가 발생했을 때 동작하는 코드를 의미한다.
  `function(anomyous)`

- bind?
  - bind method를 이용해서 이벤트를 등록
- unbind
  - unbind method를 이용해서 이벤트를 제거

###### 이벤트 흐름 및 차단
1. 이벤트 흐름
  - capture 단계: 부모 노드에서부터 target 노드 전까지를 의미한다.
  - target 단계: 현재 클릭한 마지막 자식 노드를 의미한다.
  - bubbling 단계: target 노드부터 조상 노드까지를 의미한다.
2. 이벤트 차단
  - 이벤트의 흐름을 막는 것으로 여러 개의 중첩 요소가 있는 구조에서 이벤트가 다른 곳으로 흐르는 현상을 차단하는 것이다.
  - stopPropagation() 메서드를 사용한다.



2017-07-13 참고
- mouseenter event
https://api.jquery.com/mouseenter/
- 자바스크립트 콜백함수 이해
http://yubylab.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-%EC%BD%9C%EB%B0%B1%ED%95%A8%EC%88%98-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0
- hover
http://findfun.tistory.com/281
- setTimeout, setInterval
http://bigphu.tistory.com/80
- 비동기 프로그래밍
http://webframeworks.kr/tutorials/translate/es6-async/


#### 수업
###### 1. Back-End 이미지 처리
- 이미지 업로드 파일은 WAS가 아닌 따른 Repository에서 관리한다.
- WAS에 존재하는 이미지는 페이지를 위한 이미지만을 저장해서 사용한다.
- `<img src="url">`의 값은 controller를 불러오는 url을 의미하게 된다. 따라서 서버에서는 image처리에 대한 url을 읽어서 맞는 Controller에게 보내주고 Controller가 파일을 불러온다.
- File/IO library 예제
    - commons-fileupload
      - 1.2.1
    - commons-io
      - 1.4
- download, upload하는 Controller가 각각 필요하다.
- database에 파일을 직접 저장하면 비용이 비싸다.
- multipart를 Spring에서 지원하는 기능이기 때문에 Spring에서 처리하는 작업에 도움을 받을 수 있다.
- `<tag의 name을 일치`시키면 request.getparamter에서 한번에 배열로 받아 올 수 있다.

###### RestApi Test도구
- Restlet Client (in chrome)

###### MockitoJUnitRunner
- Mock를 이용한 Test Unit

###### Modules
- The Module pattern
- Object literal noation
- AMD Modules
- CommonJS Modules
- ECMAScript Harmony Modules

**handlebar.js를 적용 할 때, 붙일 tag를 script 내에 넣으면 읽을 수가 없다.**
