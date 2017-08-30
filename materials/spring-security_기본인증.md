## Spring Security 기본 인증

### URL
- https://www.slideshare.net/madvirus/ss-36809454
- http://preludeb.egloos.com/v/4738521


### 보안관련 3요소
1. Principal (접근 주체)
- 보호된 대상에 접근하는 사용자
2. Authenticate (인증)
- 현재 사용자가 누구인지 확인/인증 하는 과정
- 기본적인 아이디/패스워드(로그인)을 이용한 인증 처리
3. Authorize (인가)
- 인증된 사용자가 특정 Resource(기능, URL)에 대한 접근 권한이 있는지 검사

### Spring Security 에서 보안관련 3요소 Mapping

1. Principal -> Authentication
2. Authenticate -> AuthenticationManager
3. Authorize -> SecurityInterceptor


### Authentication 의 용도
- **현재 접근주체의 정보**를 담는 목적
- 인증 요청 시, 요청 정보를 담는 목적

### SecurityContext
- Authentication을 저장
- Spring security에서 현재 사용자의 Authentication 정보를 가져올 때 SecurityContext 로 부터 가져온다

- SecurityContext는 SecurityContextHolder를 통해서 저장이 된다.
> `SecurityContextHolder.getContext().setAuthentication(Authentication)`
> SecurityContext에 저장된 Authentication 정보는 사용자의 인증정보이기 때문에 scope가 세션가 되어야 하며 기본적으로 SecurityContext는 ThreadLocal에 저장한다.

### Authentication정보를 가져오는 과정
- 기본 로그인 인증처리는 AuthenticationManager에 의해서 처리된다.


### 기본 인증 처리 과정
`UsernamePasswordAuthenticationProcessingFilter` 

AbstractAuthenticationProcessingFilter Class의 doFilter method
```java
public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
    HttpServletRequest request = (HttpServletRequest)req;
    HttpServletResponse response = (HttpServletResponse)res;
    if (!this.requiresAuthentication(request, response)) {
        chain.doFilter(request, response);
    } else {
        if (this.logger.isDebugEnabled()) {
            this.logger.debug("Request is to process authentication");
        }

        Authentication authResult;
        try {
            authResult = this.attemptAuthentication(request, response);
            if (authResult == null) {
                return;
            }

            this.sessionStrategy.onAuthentication(authResult, request, response);
        } catch (InternalAuthenticationServiceException var8) {
            this.logger.error("An internal error occurred while trying to authenticate the user.", var8);
            this.unsuccessfulAuthentication(request, response, var8);
            return;
        } catch (AuthenticationException var9) {
            this.unsuccessfulAuthentication(request, response, var9);
            return;
        }

        if (this.continueChainBeforeSuccessfulAuthentication) {
            chain.doFilter(request, response);
        }

        this.successfulAuthentication(request, response, chain, authResult);
    }
}
```

```java
protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
    if (this.logger.isDebugEnabled()) {
        this.logger.debug("Authentication success. Updating SecurityContextHolder to contain: " + authResult);
    }

    SecurityContextHolder.getContext().setAuthentication(authResult);
    this.rememberMeServices.loginSuccess(request, response, authResult);
    if (this.eventPublisher != null) {
        this.eventPublisher.publishEvent(new InteractiveAuthenticationSuccessEvent(authResult, this.getClass()));
    }

    this.successHandler.onAuthenticationSuccess(request, response, authResult);
}
```