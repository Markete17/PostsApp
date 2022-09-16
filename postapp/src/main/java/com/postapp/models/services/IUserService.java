package com.postapp.models.services;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.postapp.models.entities.User;
import com.postapp.shared.dto.PostDto;

public interface IUserService extends UserDetailsService{
	
	public List<User> findAll();
	public User create(User user);
	public User getUser(String email);
	public List<PostDto> getUserPosts(String email);

}
