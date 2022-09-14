package com.postapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.postapp.models.entities.User;
import com.postapp.models.services.IUserService;

@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	private IUserService userService;
	
	@GetMapping()
	public ResponseEntity<List<User>> getUsers(){
		return new ResponseEntity<List<User>>(this.userService.findAll(),HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<?> createUser(@RequestBody User user){
		User u = this.userService.create(user);
		if(u!=null) {
			return new ResponseEntity<User>(u,HttpStatus.CREATED);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This email already exists in the database");
		}
		
	
	}

}
