package com.mogikanensoftware.spring.demo.app.repo;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import com.mogikanensoftware.spring.demo.app.entity.Author;
import com.mogikanensoftware.spring.demo.app.projections.AuthorInfo;

//@RepositoryRestResource(exported=true, excerptProjection = AuthorInfo.class)
@RepositoryRestResource(exported=true)
@PreAuthorize("hasRole('VIEW')")
public interface AuthorRepository extends PagingAndSortingRepository<Author, Long>{

	@PreAuthorize("hasRole('DELETE')")
	@Override
	void delete(Long id);

	@PreAuthorize("hasRole('DELETE')")
	@Override
	void delete(Author author);

}
