package com.postapp.models.requests;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Range;

public class UserDetailsRequestModel {

	@NotEmpty(message = "First name is mandatory")
    private String firstName;

	@NotEmpty(message = "Last name is mandatory")
    private String lastName;

	@NotEmpty(message = "Email is mandatory")
	@Pattern(regexp = "^[\\w-+]+(\\.[\\w-]{1,62}){0,126}@[\\w-]{1,63}(\\.[\\w-]{1,62})+/[\\w-]+$",message = "invalid email format")
    private String email;

	@NotEmpty(message = "Password is mandatory")
	@Range(min = 8, max = 30, message = "Password must have between 8 and 30 characters")
    private String password;

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
