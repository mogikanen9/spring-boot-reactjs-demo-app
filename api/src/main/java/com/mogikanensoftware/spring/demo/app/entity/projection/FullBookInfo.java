package com.mogikanensoftware.spring.demo.app.entity.projection;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.mogikanensoftware.spring.demo.app.entity.Book;

@Projection(name="bookInfo", types = Book.class)
public interface FullBookInfo {

	Long getId();
	String getName();
	String getIsbn();
	Date getPublished();
	String getDescription();
	
	@Value("#{target.author.printName()}")
	String getAuthorInfo();
}
