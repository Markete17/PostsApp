package com.postapp.models.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.postapp.exceptions.EmailExistException;
import com.postapp.models.dao.IUserDAO;
import com.postapp.models.entities.User;

@Service //beanName = userService
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
			// Para que se muestre, poner en el properties server.error.include-message=always
			// Todas estas excepciones especificas se manejan en la AppExceptionHandler.class
			throw new EmailExistException();
		}
		
		return this.userDAO.save(user);
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = this.userDAO.findByEmail(email);
		if (user == null) {
			throw new UsernameNotFoundException(email);
		}
		
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
	}

	@Override
	public User getUser(String email) {
		User user = this.userDAO.findByEmail(email);
		if (user == null) {
			throw new UsernameNotFoundException(email);
		}
		return user;
	}

}
