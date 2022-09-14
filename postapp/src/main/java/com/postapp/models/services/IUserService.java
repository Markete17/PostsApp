package com.postapp.models.services;

import java.util.List;

import com.postapp.models.entities.User;

public interface IUserService {
	
	public List<User> findAll();
	public User create(User user);

}
