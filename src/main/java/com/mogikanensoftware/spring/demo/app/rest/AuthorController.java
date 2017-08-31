package com.mogikanensoftware.spring.demo.app.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mogikanensoftware.spring.demo.app.entity.Author;
import com.mogikanensoftware.spring.demo.app.repo.AuthorRepository;

@RestController
public class AuthorController {

	private AuthorRepository authorRepository;

	@Autowired
	public AuthorController(AuthorRepository authorRepository) {
		super();
		this.authorRepository = authorRepository;
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/api/author/all")
	public Iterable<Author> listAll(){
		return this.authorRepository.findAll();
	}
	
}
