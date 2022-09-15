package com.postapp.exceptions;

public class EmailExistException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public EmailExistException() {
		super("This email is already registered.");
	}

}
