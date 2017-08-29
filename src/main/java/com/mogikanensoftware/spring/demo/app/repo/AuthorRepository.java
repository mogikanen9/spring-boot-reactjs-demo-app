package com.mogikanensoftware.spring.demo.app.repo;

import org.springframework.data.repository.CrudRepository;

import com.mogikanensoftware.spring.demo.app.entity.Author;

public interface AuthorRepository extends CrudRepository<Author, Long>{

}
