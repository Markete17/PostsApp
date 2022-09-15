package com.postapp.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.postapp.models.entities.Post;

@RestController
@RequestMapping(path = "/post")
public class PostController {
	
	@PostMapping
	public ResponseEntity<?> createPost(@RequestBody Post post) {
		return new ResponseEntity<>(post,HttpStatus.CREATED);
		
	}

}
