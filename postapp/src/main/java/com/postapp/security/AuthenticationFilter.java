package com.postapp.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.postapp.SpringApplicationContext;
import com.postapp.models.entities.User;
import com.postapp.models.services.IUserService;
import com.postapp.models.services.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	
	private final AuthenticationManager authenticationManager;

	public AuthenticationFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}
	
	//Override de este método para iniciar sesion
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
				try {
					User user = new ObjectMapper().readValue(request.getInputStream(), User.class);
					return authenticationManager
							.authenticate(new UsernamePasswordAuthenticationToken(
									user.getEmail(), 
									user.getPassword(),
									new ArrayList<>()));
				} catch (Exception e) {
					throw new RuntimeException(e);
				}
	}
	
	// Es necesario poner este método para añadir el token generado en la response del login
	@Override
	public void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException,ServletException{
		String email = ((org.springframework.security.core.userdetails.User) authentication.getPrincipal()).getUsername();
		
		String token = 
				Jwts.builder().setSubject(email).setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_DATE))
				.signWith(SignatureAlgorithm.HS512, SecurityConstants.getTokenSecret()).compact();
		//El token tendra el email y la fecha de expiracion
		
		// Para añadir el userId, como esta clase no es un Bean, se necesita crear la clase
		// SpringApplicationContext para obtener el Bean que queramos, en este caso, 
		// se quiere obtener el userService para hacer llamada a la base de datos y recuperar el User a partir del email.
		IUserService userService = (IUserService) SpringApplicationContext.getBean("userService");
		User user = userService.getUser(email);
		
		if (user!=null) {
			response.addHeader("Access-Control-Expose-Headers", "Authorization");
			response.addHeader("Access-Control-Expose-Headers", "UserId");
			response.addHeader("UserId", user.getUserId());
		}
		response.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX+token);
		
	}

}
