package com.postapp.models.services;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.postapp.models.entities.User;

public interface IUserService extends UserDetailsService{
	
	public List<User> findAll();
	public User create(User user);
	public User getUser(String email);

}
