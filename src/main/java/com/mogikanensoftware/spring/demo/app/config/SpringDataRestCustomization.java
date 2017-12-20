package com.mogikanensoftware.spring.demo.app.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
@Profile("LOCAL-DEV")
public class SpringDataRestCustomization extends RepositoryRestConfigurerAdapter {

	private static final Logger LOGGER = LoggerFactory.getLogger(SpringDataRestCustomization.class);
	
	@Value("${my.cross-origins.allowed}")
	private String allowedLocalOrigin;
	
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		LOGGER.info(String.format("WebConfig: allowedLocalOrigin->%s",allowedLocalOrigin));
		config.getCorsRegistry().addMapping("/api/v1/**").allowedOrigins(allowedLocalOrigin)
				.allowedMethods("PUT", "DELETE", "GET", "POST").maxAge(3600);
	}
}
