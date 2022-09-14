package com.postapp.models.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.postapp.models.dao.IUserDAO;
import com.postapp.models.entities.User;

@Service
public class UserService implements IUserService {
	
	@Autowired
	private IUserDAO userDAO;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public List<User> findAll() {
		return userDAO.findAll();
	}

	@Override
	public User create(User user) {
		user.setUserId(UUID.randomUUID().toString());
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
		if(this.userDAO.findByEmail(user.getEmail()) != null) {
			return null;
		}
		
		return this.userDAO.save(user);
	}
}
