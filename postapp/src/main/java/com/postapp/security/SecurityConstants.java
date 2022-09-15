package com.postapp.security;

import org.springframework.beans.factory.annotation.Autowired;

import com.postapp.SpringApplicationContext;

public class SecurityConstants {
	
	public static final long EXPIRATION_DATE = 864000000; //Tiempo en que el JWT es válido (10 dias en ms)
	public static final String TOKEN_PREFIX = "Bearer ";
	public static final String HEADER_STRING = "Authorization";
	public static final String SIGN_UP_URL = "/users";
	
	//Ahora el token secret está almancenada en el properties y leida por la clase AppProperties
	//public static final String TOKEN_SECRET = "E6s'}gRTv-31vB5<zjN:237*v+]8P6"; // ejemplo de https://randomkeygen.com/ 
	
	public static String getTokenSecret() {
		AppProperties appProperties = (AppProperties) SpringApplicationContext.getBean("AppProperties");
		return appProperties.getTokenSecret();
	}
}
