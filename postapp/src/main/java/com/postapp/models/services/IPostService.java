package com.postapp.models.services;

import java.util.List;

import com.postapp.models.entities.Post;
import com.postapp.models.entities.User;
import com.postapp.models.responses.PostRest;
import com.postapp.shared.dto.PostCreationDto;
import com.postapp.shared.dto.PostDto;

public interface IPostService {
	public PostDto createPost(PostCreationDto post);

	public List<PostDto> getLastPosts();

	public PostDto getPost(String id);

	public void deletePost(String id, Long userId);

	public PostDto updatePost(String postId, Long userId, PostCreationDto postCreationDto);

}
