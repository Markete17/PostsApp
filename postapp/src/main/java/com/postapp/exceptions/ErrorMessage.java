package com.postapp.exceptions;

import java.util.Date;

public class ErrorMessage {

	private Date errorDate;
	private String errorMessage;
	private String errorCode;
	
	public ErrorMessage() {
	}
	
	public ErrorMessage(Date errorDate, String errorMessage, String errorCode) {
		super();
		this.errorDate = errorDate;
		this.errorMessage = errorMessage;
		this.errorCode = errorCode;
	}
	
	public Date getErrorDate() {
		return errorDate;
	}
	public void setErrorDate(Date errorDate) {
		this.errorDate = errorDate;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	public String getErrorCode() {
		return errorCode;
	}
	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}
	
	

	
}
