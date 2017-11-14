package com.mogikanensoftware.spring.demo.app.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "Book")
public class Book {

	private @Id @GeneratedValue Long id;

	@Column(name = "NAME", nullable = false, length = 100)
	private String name;

	@Column(name = "ISBN", nullable = false, length = 10)
	private String isbn;

	@Column(name = "PUBLISHED", nullable = false)
	@Temporal(TemporalType.DATE)
	private Date publsihed;

	@ManyToOne
	@JoinColumn(name = "AUTHOR_ID", nullable = false)
	private Author author;

	@Column(name = "DESCRIPTION", nullable = false, length = 255)
	private String description;

	public Book(Long id, String name, String isbn, Date publsihed, Author author, String description) {
		super();
		this.id = id;
		this.name = name;
		this.isbn = isbn;
		this.publsihed = publsihed;
		this.author = author;
		this.description = description;
	}

	public Book() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public Date getPublsihed() {
		return publsihed;
	}

	public void setPublsihed(Date publsihed) {
		this.publsihed = publsihed;
	}

	public Author getAuthor() {
		return author;
	}

	public void setAuthor(Author author) {
		this.author = author;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((author == null) ? 0 : author.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((isbn == null) ? 0 : isbn.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((publsihed == null) ? 0 : publsihed.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Book other = (Book) obj;
		if (author == null) {
			if (other.author != null)
				return false;
		} else if (!author.equals(other.author))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (isbn == null) {
			if (other.isbn != null)
				return false;
		} else if (!isbn.equals(other.isbn))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (publsihed == null) {
			if (other.publsihed != null)
				return false;
		} else if (!publsihed.equals(other.publsihed))
			return false;
		return true;
	}

}
