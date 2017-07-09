## Cookie & Session
- Cookie와 Session이 필요한 이유
  - **Http connection 방식은 Client의 요청, 요청에 대한 응답을 한 후에 연결을 유지 하지 않고 끊기 때문에 상태 유지를 할 수 있는 기술이 필요하다.**
- Cookie와 Session이란
  - Http Protocol 자체가 상태 유지를 해주는 Protocol이 아니기 때문에 상태 유지를 할 수 있는 기술이 필요하다.
  - 즉, 요청이 바뀌어도 정보가 유지되기 원할 때 필요하다.

#### 1. Cookie
- Cookie는 Server에서 생성 되고 Client에서 보관 된다.
- Client는 처음 Server에게 Cookie를 요청하게 되면 Server에서는 Cookie의 Name과 Value에 값을 만들어서 응답으로 Client에게 보내준다. Cookie를 받은 Client는 유지 시간동안 Cookie를 파일로 저장해서 보관한다.
- Server에서 이미 생성된 Cookie를 삭제하는 경우 유지 시간을 '0'으로 만들어서 삭제를 할 수 있다.
- Cookie는 서버에서 기억할 수 있는 아이디를 사용해야 한다.
- Jsp/Servlet에서 Cookie 생성 예제 code
```
String cookieName = request.getParameter("cookieName");
String cookieValue = request.getParameter("cookieValue");

Cookie cookie = new Cookie(cookieName, cookieValue);
cookie.setPath("/");
cookie.setMaxAge(-1);

response.addCookie(cookie);
```
> `new Cookie(cookieName, cookieValue)` 로 Cookie객체에 String정보를 Name과 Value로 생성한다.
`cookie.setPath("유효 디렉토리")` Cookie가 유효한 디렉토리 정보를 설정한다. path가 '/'인 경우 해당 도메인의 모든 페이지에서 유효하다.
`cookie.setMaxAge(second)` Cookie의 유효시간을 설정한다. 초 단위로 인자 값을 받으며 위에서와 같이 '-1'을 인자로 넣어주는 경우 Browser가 유지되는 동안을 의미한다.
*ex) 1시간 동안 Cookie 유효시간을 설정하는 경우: `cookie.setMaxAge(60*60)`*

- Jsp/Servlet에서 Cookie 출력 예제 code
```
Cookie[] cookies = request.getCookies();

for(Cookie cookie : cookies){
  print(cookie.getName());
  print(cookie.getValue());
}
```
> Client의 모든 Cookie를 읽어와서 해당 페이지에 유효한 Cookie를 탐색 할 수있다.

- Jsp/Servlet에서 Cookie 삭제 예제 code
```
String cookieName = request.getParameter("cookieName");

Cookie cookie = new Cookie(cookieName,"");
cookie.setPath("/");
cookie.setMaxAge(0);

response.addCookie(cookie);
```
> `new Cookie(cookieName,"")`기존에 생성한 Cookie와 동일한 이름으로 새로운 Cookie를 생성한다. Value값은 필요하지 않다.
`cookie.setMaxAge(0)` Cookie의 유효시간을 0으로 만들어서 덮어씌우면 기존에 가지고 있던 Cookie가 삭제된다.
`response.addCookie(cookie)` 응답에 유효시간 0으로 생성한 Cookie를 넣어서 Client에 보내면 Cookie가 삭제된다.

#### 2. Session
- Session은 Jsp/Servlet에서 내장 객체로 존재하기 때문에 따로 생성해줄 필요는 없다.
- Session은 Cookie와는 다르게 Server에 상태 유지할 정보를 저장한다.
- Client를 식별하기 위해서 내부적으로는 Cookie를 사용해서 구현되어 있다.
  - getSession() method에서 Cookie를 생성하고 Response를 통해서 Browser에 전달한다.
  - 이때 Cookie에는 ID값만 저장된다.

- Jsp/Servlet에서 Session 설정 예제 code
```
String name = request.getParameter("name");

MemberDao dao = new MemberDao();
MemberDTO member = dao.getMember(name);

session.setAttribute("loginOk", member);
```
> Client의 요청(reqeust)에서 Session 설정에 필요한 정보를 받아온다.
위의 예제에서는 Member 정보를 저장하는 Java Bean 객체를 저장한다.
`session.setAttribute("loginOk", member)` 으로 'loginOk'라는 ID로 Client의 session 정보를 Server에 저장한다.

- Jsp/Servlet에서 Session 사용 예제 code
```
MemberDTO member = (MemberDTO)session.getAttribute("loginOk");

print(member.getName()+"님 안녕하세요");
```
> Session을 설정할 때, Member 정보를 저장하는 Java Bean 객체를 사용했기 때문에 `(MemberDTO)session.getAttribute("loginOk")` method에서 ID에 'loginOk'를 넣어서 정보를 가져와서 사용한다.

- Jsp/Servlet에서 Session 종료 예제 code
```
session.invalidate();
```
> 설정한 session을 종료 하기 위해서 사용한다.
