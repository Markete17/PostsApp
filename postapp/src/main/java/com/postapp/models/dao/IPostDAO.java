package com.postapp.models.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.postapp.models.entities.Post;

public interface IPostDAO extends PagingAndSortingRepository<Post, Long> {
	List<Post> getByUserIdOrderByCreatedAtDesc (Long userId);
	


    @Query(value = "SELECT * FROM posts p WHERE p.exposure_id = :exposure and p.expires_at > :now ORDER BY created_at DESC LIMIT 20", nativeQuery = true)
    List<Post> getLastPublicPosts(@Param("exposure") long exposureId, @Param("now") Date now);
    
    Post findByPostId(String id);
    
    
}
