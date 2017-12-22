package com.mogikanensoftware.spring.demo.app.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Profile(value= {"DEV","TEST","PROD"})
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	private static final Logger LOGGER = LoggerFactory.getLogger(SecurityConfiguration.class);
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication()
		.withUser("user").password("pwd").roles("VIEW","EDIT")
		.and().withUser("admin")
				.password("pwd").roles("VIEW","EDIT","DELETE");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		LOGGER.info("SecurityConfiguration.configure ...");
		http.authorizeRequests()
		.antMatchers("/welcome**","/api/v1/**")
			.hasAnyRole("VIEW","EDIT","DELETE").anyRequest().authenticated()
			.and()
				.formLogin()
				.loginPage("/login")
				.permitAll()
			.and()
				.logout()
				.logoutSuccessUrl("/")
				.invalidateHttpSession(true)
				.deleteCookies("JSESSIONID")
			.and()
			.csrf().disable();
	}
}
