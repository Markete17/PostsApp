package com.postapp.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.postapp.models.dao.IUserDAO;
import com.postapp.models.entities.Post;
import com.postapp.models.entities.User;
import com.postapp.models.requests.PostCreateRequestModel;
import com.postapp.models.responses.OperationStatusModel;
import com.postapp.models.responses.PostRest;
import com.postapp.models.services.IPostService;
import com.postapp.models.services.IUserService;
import com.postapp.models.services.UserService;
import com.postapp.shared.dto.PostCreationDto;
import com.postapp.shared.dto.PostDto;
import com.postapp.utils.Exposures;

@RestController
@RequestMapping(path = "/post")
public class PostController {
	
	@Autowired
	private IPostService postService;
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private ModelMapper mapper;
	
	@PostMapping
	public PostRest createPost(@RequestBody @Valid PostCreateRequestModel postCreateRequestModel) {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getPrincipal().toString();
		
		PostCreationDto postCreationDto = mapper.map(postCreateRequestModel, PostCreationDto.class);
		
		postCreationDto.setUserEmail(email);
		
		PostDto postDto = this.postService.createPost(postCreationDto);
		
		PostRest postRest = mapper.map(postDto,PostRest.class);
		
		if (postRest.getExpiresAt().compareTo(new Date(System.currentTimeMillis())) < 0) {
			postRest.setExpired(true);
		}
		
		return postRest;
	}
	
	@GetMapping(path = "/last")
	public List<PostRest> lastPosts(){
		List<PostDto> postsDtos = postService.getLastPosts();
		
		List<PostRest> postRests = new ArrayList<>();
		
		for(PostDto post : postsDtos) {
			postRests.add(this.mapper.map(post,PostRest.class));
		}
		return postRests;
	}
	
	@GetMapping(path = "/{id}")
	public PostRest getPost(@PathVariable String id){
		PostDto postDto = postService.getPost(id);
		
		PostRest postRest = this.mapper.map(postDto, PostRest.class);
		
		if (postRest.getExpiresAt().compareTo(new Date(System.currentTimeMillis())) < 0) {
			postRest.setExpired(true);
		}
		
		if(postRest.getExposure().getId() == Exposures.PRIVATE || postRest.getExpired()) {
			
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			
			User user = this.userService.getUser(authentication.getPrincipal().toString());
			
			if(user.getId() != postDto.getUser().getId()) {
				throw new RuntimeException("Not allowed to do this action.");
			}
		}
		return postRest;
	}
	
	@DeleteMapping(path = "/{id}")
	public OperationStatusModel deletePost(@PathVariable String id) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		User user = this.userService.getUser(authentication.getPrincipal().toString());
		
		postService.deletePost(id,user.getId());
		OperationStatusModel operationStatusModel = new OperationStatusModel();
		operationStatusModel.setName("DELETE");
		operationStatusModel.setResult("SUCCESS");
		return operationStatusModel;
	}
	
	@PutMapping(path = "/{id}")
	public PostRest updatePost(@RequestBody @Valid PostCreateRequestModel postCreateRequestModel, @PathVariable String id) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		User user = this.userService.getUser(authentication.getPrincipal().toString());
		
		PostCreationDto postUpdateDto = this.mapper.map(postCreateRequestModel, PostCreationDto.class);
		
		PostDto postDto = postService.updatePost(id, user.getId(), postUpdateDto);
		
		PostRest postRest = this.mapper.map(postDto, PostRest.class);
		return postRest;
	}

}
