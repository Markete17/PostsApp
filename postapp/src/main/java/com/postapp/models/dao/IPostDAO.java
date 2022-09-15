package com.postapp.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.postapp.models.entities.Post;

public interface IPostDAO extends JpaRepository<Post, Long> {

}
