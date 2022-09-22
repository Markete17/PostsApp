package com.postapp.models.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Range;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "users", indexes = { @Index(columnList = "userId", name = "index_userid", unique = true),
		@Index(columnList = "email", name = "index_email", unique = true) })
public class User implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "id", unique = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(nullable = false)
	private String userId;

	@Column(nullable = false, length = 50)
	@NotEmpty(message = "First name is mandatory")
	private String firstName;

	@Column(nullable = false, length = 50)
	@NotEmpty(message = "Last name is mandatory")
	private String lastName;

	@Column(nullable = false, length = 255)
	@NotEmpty(message = "Email is mandatory")
	@Pattern(regexp = "^[\\w-+]+(\\.[\\w-]{1,62}){0,126}@[\\w-]{1,63}(\\.[\\w-]{1,62})+/[\\w-]+$",message = "invalid email format")
	private String email;

	@Column(nullable = false)
	@NotEmpty(message = "Password is mandatory")
	@Size(min = 8, max = 30, message = "Password must have between 8 and 30 characters")
	private String password;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
	@JsonIgnoreProperties("user")
	private List<Post> posts = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Post> getPosts() {
		return posts;
	}

	public void setPosts(List<Post> posts) {
		this.posts = posts;
	}

}
