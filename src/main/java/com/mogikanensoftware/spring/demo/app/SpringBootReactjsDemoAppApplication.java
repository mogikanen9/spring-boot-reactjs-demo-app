package com.mogikanensoftware.spring.demo.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.rest.RepositoryRestMvcAutoConfiguration;

@SpringBootApplication
//@EnableAutoConfiguration(exclude=RepositoryRestMvcAutoConfiguration.class)
public class SpringBootReactjsDemoAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootReactjsDemoAppApplication.class, args);
	}
}
