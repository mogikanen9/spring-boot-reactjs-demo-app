package com.mogikanensoftware.spring.demo.app.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

import com.mogikanensoftware.spring.demo.app.entity.Author;

@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE},maxAge = 3600)
@RepositoryRestResource(exported=true)
public interface AuthorRepository extends CrudRepository<Author, Long>{

}
