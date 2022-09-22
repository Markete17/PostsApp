package com.postapp.models.requests;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Range;

public class PostCreateRequestModel {

	@NotEmpty(message = "Title is mandatory")
    private String title;

	@NotEmpty(message = "Content is mandatory")
    private String content;

	@NotNull(message = "Exposure is mandatory")
	@Range(min = 1, max = 2, message = "Invalid post id")
    private long exposureId;

	@NotNull(message = "Expiration time is mandatory")
	@Range(min = 0, max = 1440, message = "Invalid expiration time")
    private int expirationTime;

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public long getExposureId() {
        return this.exposureId;
    }

    public void setExposureId(long exposureId) {
        this.exposureId = exposureId;
    }

    public int getExpirationTime() {
        return this.expirationTime;
    }

    public void setExpirationTime(int expirationTime) {
        this.expirationTime = expirationTime;
    }
}
