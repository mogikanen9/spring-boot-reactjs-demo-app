# spring-boot-reactjs-demo-app
Demo Web UI application with Spring Boot backend and React.js front-end. 

Initially based on Pivotal's ['React.js and Spring Data REST'](https://spring.io/guides/tutorials/react-and-spring-data-rest/) tutorial.

### Details regarding technology stack

 * Backend
   * [Spring DATA REST](https://projects.spring.io/spring-data-rest/)
   * [Spring Security](https://projects.spring.io/spring-security/)
 * Front-end
   * [React-bootstrap](https://github.com/react-bootstrap/react-bootstrap) UI library 
   * Fetch API security details from [React.js + Spring Security](http://juhahinkula.github.io/2016-12-05-reactsecurity/) post and [Fetch API - Sending cookies](https://github.com/github/fetch#sending-cookies) section
   * [Redux](https://redux.js.org/) for state management of book information
   * [Redux-thunk](https://github.com/gaearon/redux-thunk) to support async calls in middleware
   * [React-bootstrap-table](http://allenfang.github.io/react-bootstrap-table/) to display book information
   
### Details regarding implementation

  * Author functionality
    * React-bootstrap for UI
    * React component state for state management ("pure" React)
    * Fetch API for accessing REST API
    * Jest for Unit tests
  * Book functionality
    * React-bootstrap-table and React-bootstrap for UI
    * Redux for state management
    * Redux-thunk middleware
    * Fetch API for accessing REST API

### Build and run

 * Build client by running `npm run build` inside "client" folder 
 * Build api by running `gradlew clean build` inside "api" folder
 * Run full app (api + cleint) using `gradlew bootRun --args='--demoClientAppPath=<path_to_local_repo>\\client\build'` command.



 
