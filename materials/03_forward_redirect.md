## Forward & Redirect

**현재 작업중인 페이지에서 다른 페이지로 이동하는 페이지 전환 방식**

#### 1. Forward
- Web Container 차원에서 페이지 이동이 일어난다. 웹 브라우저에서는 다른 페이지로 이동했는지 확인 할 수 없다. 웹 브라우저에는 최초에 호출한 URL이 표시되고 이동된 페이지의 URL정보를 확인 할 수 없다. 또한, 동일한 웹 컨테이너에 있는 페이지로만 이동 가능하다.
-	최초 호출한 URL에 대한 request와 response객체는 이동된 페이지에서의 request, response와 공유한다.
-	Forward할 URL로 요청정보를 말 그대로 forward(건네주기), 그대로 전달한다. 따라서, 사용자가 최초로 요청한 요청정보가 다음 URL에서도 유효하다.

#### 2. Redirect
-	Web Container 는 Redirect 명령을 받으면 웹 브라우저를 다른 페이지로 이동시킨다. 웹 브라우저는 지시된 URL주소로 요청을 해서 페이지를 이동한다. 또한, Forward와 다르게 다른 웹 컨테이너에 있는 주소로 이동이 가능하다.
-	Forward와 다르게 Redirect에서는 새로운 페이지로 이동하면서 `request와 response객체를 새롭게 생성`한다.
-	최초 요청을 받은 URL1 에서 클라이언트로 redirect할 URL2를 리턴하고, 클라이언트는 이를 받아서 새로운 요청을 생성해서 URL2로 요청을 한다. 따라서, 최초로 요청한 요청정보는 더 이상 유효하지 않는다.

#### 3. Forward와 Redirect 사용
-	Forward
    - 단순 조회 요청(글 목록 보기, 검색 등)에 사용하는 것이 바람직하다.
-	Redirect
    - 시스템(Session, Database)에 변화가 생기는 요청(로그인, 회원가입, 글쓰기)에 사용하는 것이 바람직하다.
-	예를 들어 게시판에 글을 작성하고 ‘작성을 완료했습니다.’ 라는 응답 페이지에서 새로 고침을 할 수 있는데 이 때, Forward로 구현되어 있는 경우 이전의 request와 response를 공유하기 때문에 중복된 글이 작성 될 수 있다. 따라서 이러한 경우에는 Redirect를 해야 한다.
