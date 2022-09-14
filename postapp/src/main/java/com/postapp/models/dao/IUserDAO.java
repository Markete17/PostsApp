package com.postapp.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.postapp.models.entities.User;

public interface IUserDAO extends JpaRepository<User, Long> {
	User findByEmail(String email);
}