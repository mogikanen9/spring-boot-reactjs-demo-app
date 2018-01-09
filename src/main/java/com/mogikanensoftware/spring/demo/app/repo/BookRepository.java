package com.mogikanensoftware.spring.demo.app.repo;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import com.mogikanensoftware.spring.demo.app.entity.Book;
import com.mogikanensoftware.spring.demo.app.entity.projection.FullBookInfo;

@RepositoryRestResource(exported = true, excerptProjection=FullBookInfo.class)
@PreAuthorize("hasRole('VIEW')")
public interface BookRepository extends PagingAndSortingRepository<Book, Long> {

}
