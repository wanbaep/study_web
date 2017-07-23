## 2017-07-22 Todo

#### 1. 이론
- animate & stop
- module instance
	- singleton instance를 보고 생각
- event emitter 공부

- http status 전송 방법
	- http://viralpatel.net/blogs/spring-4-mvc-rest-example-json/
	- example code for `ResponseEntity`
	```
	public ResponseEntity deleteCustomer(@PathVariable Long id) {

		if (null == customerDAO.delete(id)) {
			return new ResponseEntity("No Customer found for ID " + id, HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity(id, HttpStatus.OK);

	}
	```
	- ResponseEntity와 ResponseBody?
	![ResponseEntity_constructor](../images/ResponseEntity_constructor.PNG)
	- http://viralpatel.net/blogs/spring-4-mvc-rest-example-json/

- NamedParameterJdbcTemplate
	- update
		- public int update(String sql, Map<String,?> paramMap)
throws DataAccessException
		- Description copied from interface: NamedParameterJdbcOperations
			- Issue an update via a prepared statement, binding the given arguments.
		- Specified by:
			- update in interface NamedParameterJdbcOperations
		- Parameters:
			- sql - SQL containing named parameters
			- paramMap - map of parameters to bind to the query (leaving it to the PreparedStatement to guess the corresponding SQL type)
		- Returns:
			- the number of rows affected
		- Throws:
			- DataAccessException - if there is any problem issuing the update
	- update 실행으로 반환되는 결과는 update혹은 delete가 영향을 미친 row의 수를 return해준 다는 것을 spring 문서를 보고 확인하게 되었다.

- 외부 properties에 저장한 값을 pom.xml뿐만 아니라 java 파일에도 @Value 어노테이션을 이용해서 값을 가져올 수 있다.

- queryForObject() throws EmptyResultDataAccessException when record not found
	- https://www.mkyong.com/spring/queryforobject-throws-emptyresultdataaccessexception-when-record-not-found/

#### 2. Task
- ~Carousel에 대한 이해~
- 이전에 작업한 Task들 module pattern 적용
	- ~carousel module~
	- ~touch module~
- ~피드백 적용~
	- task 1
		- front, back
	- task 3
		- backend
- sql문 버그 수정

#### 3. 질문사항
- 학습일지 작성....................
