package com.postapp.exceptions;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.postapp.models.responses.ValidationErrors;

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
	
	@ExceptionHandler(value = MethodArgumentNotValidException.class)
	public ResponseEntity<Object> handleException(MethodArgumentNotValidException ex, WebRequest webRequest){
		
		Map<String,String> errors = new HashMap<>();
		
		for(ObjectError error : ex.getBindingResult().getAllErrors()) {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName,errorMessage);
		}
		
		ValidationErrors validationErrors = new ValidationErrors(errors,new Date());
		
		return new ResponseEntity<>(validationErrors,new HttpHeaders(), HttpStatus.BAD_REQUEST);
	}

}
