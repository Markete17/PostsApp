package com.postapp;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.postapp.models.responses.UserRest;
import com.postapp.security.AppProperties;
import com.postapp.shared.dto.UserDto;



@SpringBootApplication
@EnableJpaAuditing //Para permitir que se creen las fechas automáticas de la entity POST con la antoacion @CreatedDate
public class PostappApplication {

	public static void main(String[] args) {
		SpringApplication.run(PostappApplication.class, args);
	}
	
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public SpringApplicationContext springApplicationContext() {
		return new SpringApplicationContext();
	}
	
	@Bean(name = "AppProperties")
	public AppProperties appProperties() {
		return new AppProperties();
	}
	
	@Bean
	public ModelMapper modelMapper () {
		
		ModelMapper mapper = new ModelMapper();
		
		//Para que no haya recursividad
		mapper.typeMap(UserDto.class, UserRest.class).addMappings(m -> m.skip(UserRest::setPosts));
		return mapper;
	}
}
