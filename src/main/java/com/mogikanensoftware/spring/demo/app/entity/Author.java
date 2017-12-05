package com.mogikanensoftware.spring.demo.app.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "AUTHOR")
public class Author {

	private @Id @GeneratedValue Long id;

	@Column(name = "FIRST_NAME", nullable = false, length = 25)
	private String firstName;

	@Column(name = "LAST_NAME", nullable = false, length = 25)
	private String lastName;

	public Author() {
		super();
	}

	public Author(Long id, String firstName, String lastName) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String printName() {
		return String.format("%s %s", this.firstName != null ? this.firstName : "",
				this.lastName != null ? this.lastName : "");
	}

	@Override
	public String toString() {
		return "Author [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + "]";
	}

}
