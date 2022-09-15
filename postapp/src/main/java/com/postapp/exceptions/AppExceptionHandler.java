package com.postapp.exceptions;

import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class AppExceptionHandler {
	
	@ExceptionHandler(value = EmailExistException.class)
	public ResponseEntity<Object> handleEmailExistException(EmailExistException ex, WebRequest webRequest){
		
		ErrorMessage errorMessage = new ErrorMessage(new Date(),ex.getMessage(),HttpStatus.BAD_REQUEST.toString());
		return new ResponseEntity<>(errorMessage,new HttpHeaders(), HttpStatus.BAD_REQUEST);
	}
	
	//Para las demás
	@ExceptionHandler(value = Exception.class)
	public ResponseEntity<Object> handleOtherException(EmailExistException ex, WebRequest webRequest){
		
		ErrorMessage errorMessage = new ErrorMessage(new Date(),ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR.toString());
		return new ResponseEntity<>(errorMessage,new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
