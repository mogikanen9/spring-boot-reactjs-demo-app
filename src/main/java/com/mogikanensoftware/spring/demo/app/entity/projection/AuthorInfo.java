package com.mogikanensoftware.spring.demo.app.entity.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.mogikanensoftware.spring.demo.app.entity.Author;

@Projection(name = "authorInfo", types = Author.class)
public interface AuthorInfo {

	@Value("#{target.getId()}")
	Long getId();

	@Value("#{target.getFirstName()}")
	String getFirstName();

	@Value("#{target.getLastName()}")
	String getLastName();

	@Value("#{target.getFirstName()+' '+target.getLastName()}")
	String getFullName();
}
