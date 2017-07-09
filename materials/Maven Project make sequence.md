# Maven Project 생성부터 Spring Web MVC 작성

## 1.1 Maven Project 생성

##### 1. Maven - maven Project 생성
  - groupId
    - groupId는 package로 생각하면 된다.
    - ex) wanbaep
  - ArtifactId
    - 프로젝트 이름을 보통 소문자로 작성한다.
    - ex) todowb
  - packaging
    - war (웹 어플리케이션 프로젝트)
##### 2. Maven - update Project
  - 처음 프로젝트 생성시 오류표시가 나타나는데 이는 웹 어플리케이션에 필요한 파일이 존재하지 않기 때문이다. 그러므로 maven - update project를 실행한다.
##### 3. pom.xml 작성
  - properties작성
```
  <properties>
      <jdk-version>1.8</jdk-version>
      <source-encoding>UTF-8</source-encoding>
      <resource-encoding>UTF-8</resource-encoding>
      <deploy-path>deploy</deploy-path>

      <!-- spring framework -->
      <spring-framework.version>4.3.5.RELEASE</spring-framework.version>

      <logback.version>1.1.3</logback.version>
      <jcl.slf4j.version>1.7.12</jcl.slf4j.version>
      <failOnMissingWebXml>false</failOnMissingWebXml>
  </properties>
```

  - pom.xml에서 properties는 상수를 의미한다. 따라서 tag값을 이용해서 dependecies나 build에 상수로 정의한 properties를 사용 할 수 있다.
  - 상수를 사용할 때 `${spring-framework.version}` 와 같이 사용 할 수 있다.
  - `<failOnMissingWebXml>false</failOnMissingWebXml>` 에 해당하는 Tag를 false로 적용하면, web.xml을 사용하지 않겠다는 것을 의미한다.

```
<build>
		<plugins>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-compiler-plugin</artifactId>
				<version>3.3</version>
				<configuration>
					<source>${jdk-version}</source>
					<target>${jdk-version}</target>
					<encoding>${source-encoding}</encoding>
					<useIncrementalCompilation>false</useIncrementalCompilation>
				</configuration>
			</plugin>

			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-clean-plugin</artifactId>
				<version>2.6.1</version>
			</plugin>

			<plugin>
				<groupId>org.apache.tomcat.maven</groupId>
				<artifactId>tomcat7-maven-plugin</artifactId>
				<version>2.2</version>
				<configuration>
					<port>8080</port>
					<path>/</path>
				</configuration>
			</plugin>

		</plugins>
	</build>
```
- `tomcat7-maven-plugin` plugin 설정에서 포트번호와 path를 설정 해 줄 수 있는데, 이 때 path를 `/`로 해준 경우 `localhost:8080` 과 같이 URL에 프로젝트명을 포함하지 않고 접근 할 수 있다.

##### 4.web.xml 작성
```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xmlns:web="http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" id="WebApp_ID" version="2.5">
  <display-name>springMVCExam</display-name>

 <context-param>
 	<param-name>contextConfigLocation</param-name>
 	<param-value>classpath:/applicationContext.xml</param-value>
 </context-param>
  <listener>
  	<listener-class>
  		org.springframework.web.context.ContextLoaderListener
  	</listener-class>
  </listener>
  <filter>
		<filter-name>encodingFilter</filter-name>
		<filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
		<init-param>
			<param-name>encoding</param-name>
			<param-value>UTF-8</param-value>
		</init-param>
	</filter>
	<filter-mapping>
		<filter-name>encodingFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>

  <servlet>
  	<servlet-name>action</servlet-name>
  	<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
  	<init-param>
  		<param-name>contextConfigLocation</param-name>
  		<param-value>WEB-INF/config/spring-mvc-config.xml</param-value>
  	</init-param>
  </servlet>
  <servlet-mapping>
  	<servlet-name>action</servlet-name>
  	<url-pattern>*.sku</url-pattern>
  </servlet-mapping>



  <welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
    <welcome-file>default.html</welcome-file>
    <welcome-file>default.htm</welcome-file>
    <welcome-file>default.jsp</welcome-file>
  </welcome-file-list>
</web-app>
```
- spring-mvc-config.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
	http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
	http://www.springframework.org/schema/context
	http://www.springframework.org/schema/context/spring-context-3.0.xsd">

	<context:component-scan base-package="kr.ac.skuniv.controller" />

	<bean id="viewResolver"
      class="org.springframework.web.servlet.view.UrlBasedViewResolver">
   	 <property name="viewClass" value="org.springframework.web.servlet.view.JstlView"/>
   	 <property name="prefix" value="/jsp/"/>
   	 <property name="suffix" value=".jsp"/>

</bean>

</beans>
```
- web.xml을 java code로 대체 가능 `WebInitializer()`
```
public class WebInitializer implements WebApplicationInitializer {
    private static final String CONFIG_LOCATION = "carami.todo.config";
    private static final String MAPPING_URL = "/";

    public WebInitializer(){

    }

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        WebApplicationContext context = getContext();


        // encoding filter 설정
        EnumSet<DispatcherType> dispatcherTypes = EnumSet.of(DispatcherType.REQUEST, DispatcherType.FORWARD);

        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setEncoding("UTF-8");
        characterEncodingFilter.setForceEncoding(true);

        FilterRegistration.Dynamic characterEncoding = servletContext.addFilter("characterEncoding", characterEncodingFilter);
        characterEncoding.addMappingForUrlPatterns(dispatcherTypes, true, "/*");

        // dispatchder servlet 설정
        servletContext.addListener(new ContextLoaderListener(context));
        ServletRegistration.Dynamic dispatcher = servletContext.addServlet("DispatcherServlet", new DispatcherServlet(context));
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping(MAPPING_URL);
    }
    private AnnotationConfigWebApplicationContext getContext() {
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.setConfigLocation(CONFIG_LOCATION);
        return context;
    }
}
```
- filter 기능은 요청을 받을 때 작동된다. 위의 예제 코드에서는 Character Set을 Encoding으로 넣을 때 Filter를 이용해서 들어오는 요청을 UTF-8로 필터링 해서 받아 올 수 있다.
- listener 기능은 특정한 Event가 일어날 때 동작하도록 설정 한다. 등록시에 Event자체만 등록하고 URL에 대한 설정은 필요가 없다.
- Event는 Context, Request, Session에 변경이 생기는 경우를 생각 할 수 있다.
- Filter와 Listener 객체들은 웹 어플리케이션에서 사용되는데 이들은 Web Application Server가 Load될 때 생성 된다.
