package com.postapp.models.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.postapp.models.dao.IPostDAO;
import com.postapp.models.entities.Post;

@Service
public class PostService implements IPostService {
	
	@Autowired
	private IPostDAO postDAO;

	@Override
	public Post createPost(Post post) {
		// TODO Auto-generated method stub
		return null;
	}

}
