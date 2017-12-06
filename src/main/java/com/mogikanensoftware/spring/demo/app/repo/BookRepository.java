package com.mogikanensoftware.spring.demo.app.repo;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

import com.mogikanensoftware.spring.demo.app.entity.Book;
import com.mogikanensoftware.spring.demo.app.projections.FullBookInfo;

@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
		RequestMethod.DELETE }, maxAge = 3600)
@RepositoryRestResource(exported = true, excerptProjection=FullBookInfo.class)
@PreAuthorize("hasRole('VIEW')")
public interface BookRepository extends PagingAndSortingRepository<Book, Long> {

}
