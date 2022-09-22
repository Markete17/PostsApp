package com.postapp.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.postapp.models.entities.User;
import com.postapp.models.responses.PostRest;
import com.postapp.models.services.IUserService;
import com.postapp.shared.dto.PostDto;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private IUserService userService;
	
	@Autowired
	private ModelMapper mapper;

	//Para dar soporte a XML, se tiene que instalar la biblioteca en el POM Jackson Dataformat XML y poner esta notacion para soportar XML y JSON
	@GetMapping(path ="/users", produces = {MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<User>> getUsers() {
		return new ResponseEntity<List<User>>(this.userService.findAll(), HttpStatus.OK);
	}
	
	@GetMapping()
	public ResponseEntity<User> getUserAuthenticated(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getPrincipal().toString();
		User user = this.userService.getUser(email);
		if(user != null) {
		return new ResponseEntity<User>(user,HttpStatus.OK);
		} else {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping()
	public ResponseEntity<?> createUser(@RequestBody @Valid User user) {
		User u = this.userService.create(user);
		if (u != null) {
			return new ResponseEntity<User>(u, HttpStatus.CREATED);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This email already exists in the database");
		}

	}
	
	@GetMapping(path = "/posts")
	public List<PostRest> getPosts() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		String email = authentication.getPrincipal().toString();
		
		List<PostDto> posts = userService.getUserPosts(email);
		
		List<PostRest> postRests = new ArrayList<>();
		
		for(PostDto post : posts) {
			PostRest postRest = this.mapper.map(post,PostRest.class);
			if (postRest.getExpiresAt().compareTo(new Date(System.currentTimeMillis())) < 0) {
				postRest.setExpired(true);
			}
			postRests.add(postRest);
		}
		
		return postRests;
		
	}

}
