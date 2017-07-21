- Java로 구현한 상태 토큰 생성 코드

```
public String generateState()
{
    SecureRandom random = new SecureRandom();
    return new BigInteger(130, random).toString(32);
}

// 상태 토큰으로 사용할 랜덤 문자열 생성
String state = generateState();
// 세션 또는 별도의 저장 공간에 상태 토큰을 저장
request.session().attribute("state", state);
return state;
```

1. 로그인 화면 띄우기

2. 로그인 id, passwd입력

3. callback 실행
	- token 가져오기
```
{
    "access_token":"AAAAQosjWDJieBiQZc3to9YQp6HDLvrmyKC+6+iZ3gq7qrkqf50ljZC+Lgoqrg",
    "refresh_token":"c8ceMEJisO4Se7uGisHoX0f5JEii7JnipglQipkOn5Zp3tyP7dHQoP0zNKHUq2gY",
    "token_type":"bearer",
    "expires_in":"3600"
}
```

4. token을 이용해서 사용자 정보 가져오기
- 접근 토큰 발급 요청 후 response 정보
```
{
  "resultcode": "00",
  "message": "success",
  "response": {
    "email": "openapi@naver.com",
    "nickname": "OpenAPI",
    "profile_image": "https://ssl.pstatic.net/static/pwe/address/nodata_33x33.gif",
    "age": "40-49",
    "gender": "F",
    "id": "32742776",
    "name": "오픈 API",
    "birthday": "10-01"
  }
}
```

- field which insert into `user` table 
	- username -> name
	- email -> email
	- tel -> ?
	- nickname -> nickname
	- sns_id -> id
	- sns_type -> "naver"
	- sns_profile -> profile_image
	- admin_flag -> 'wanbaep'만 1 else 0
	- create_date -> now()
	- modify_date -> now()


- **Reference**
	- Java String to Map, Map to String, JSON to String, String to JSON
	- https://www.mkyong.com/java/how-to-convert-java-map-to-from-json-jackson/