package com.postapp.models.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.postapp.models.dao.IExposureDAO;
import com.postapp.models.dao.IPostDAO;
import com.postapp.models.dao.IUserDAO;
import com.postapp.models.entities.Exposure;
import com.postapp.models.entities.Post;
import com.postapp.models.entities.User;
import com.postapp.shared.dto.PostCreationDto;
import com.postapp.shared.dto.PostDto;
import com.postapp.utils.Exposures;

@Service
public class PostService implements IPostService {
	
	@Autowired
	private IPostDAO postDAO;
	
	@Autowired
	private IUserDAO userDAO;
	
	@Autowired
	private IExposureDAO exposureDAO;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public PostDto createPost(PostCreationDto postCreationDto) {
		User user = userDAO.findByEmail(postCreationDto.getUserEmail());
		Exposure exposure = exposureDAO.findById(postCreationDto.getExposureId()).orElseGet(null);
		
		
		Post post = new Post();
		post.setUser(user);
		post.setExposure(exposure);
		post.setTitle(postCreationDto.getTitle());
		post.setContent(postCreationDto.getContent());
		post.setPostId(UUID.randomUUID().toString());
		post.setExpiresAt(new Date(System.currentTimeMillis() + (postCreationDto.getExpirationTime() * 60000)));

		
		Post createdPost = this.postDAO.save(post);
		
		PostDto postDto = mapper.map(createdPost, PostDto.class);
		
		return postDto;
	}

	@Override
	public List<PostDto> getLastPosts() {
		
		List<Post> posts= this.postDAO.getLastPublicPosts(Exposures.PUBLIC, new Date(System.currentTimeMillis()));
		
		List<PostDto> postDtos = new ArrayList<>();
		
		for(Post post: posts) {
			PostDto postDto = mapper.map(post,PostDto.class);
			postDtos.add(postDto);
		}
		return postDtos;
	}

	@Override
	public PostDto getPost(String id) {
		Post post = this.postDAO.findByPostId(id);
		return this.mapper.map(post, PostDto.class);
	}

	@Override
	public void deletePost(String id, Long userId) {
		Post post = this.postDAO.findByPostId(id);
		if(post.getUser().getId()!=userId) {
			throw new RuntimeException("Not allowed.");
		}
		this.postDAO.delete(post);
	}

	@Override
	public PostDto updatePost(String postId, Long userId, PostCreationDto postUpdateDto) {
		Post post = this.postDAO.findByPostId(postId);
		if(post.getUser().getId()!=userId) {
			throw new RuntimeException("Not allowed.");
		}
		Exposure exposure = exposureDAO.findById(postUpdateDto.getExposureId()).orElseGet(null);
		post.setExposure(exposure);
		post.setTitle(postUpdateDto.getTitle());
		post.setContent(postUpdateDto.getContent());
		post.setExpiresAt(new Date(System.currentTimeMillis() + (postUpdateDto.getExpirationTime() * 60000)));
		
		Post postUpdated = postDAO.save(post);
		
		PostDto postDto = this.mapper.map(postUpdated,PostDto.class);
		return postDto;
	}
}
