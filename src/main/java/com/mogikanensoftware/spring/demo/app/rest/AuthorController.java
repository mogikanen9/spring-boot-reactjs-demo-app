package com.mogikanensoftware.spring.demo.app.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.mogikanensoftware.spring.demo.app.repo.AuthorRepository;

@RestController
public class AuthorController {

	private AuthorRepository authorRepository;

	@Autowired
	public AuthorController(AuthorRepository authorRepository) {
		super();
		this.authorRepository = authorRepository;
	}
	
}
