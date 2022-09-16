package com.postapp.security;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.postapp.models.services.IUserService;

@SuppressWarnings("deprecation")
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {

    private final IUserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public WebSecurity(IUserService userService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	http.cors().and().csrf().disable().authorizeRequests().antMatchers(HttpMethod.POST, "/user").permitAll()
        .antMatchers(HttpMethod.GET, "/post/last").permitAll().antMatchers(HttpMethod.GET, "/post/{id}")
        .permitAll().anyRequest().authenticated().and().addFilter(getAuthenticationFilter())
        .addFilter(getAuthorizationFilter()).sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    	// STATELESS Para que no se creen sesiones (HttpSession) porque ya esta el token con temporizador
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder);
    }

    public AuthenticationFilter getAuthenticationFilter() throws Exception {
        final AuthenticationFilter filter = new AuthenticationFilter(authenticationManager());

        filter.setFilterProcessesUrl("/user/login");

        return filter;
    }
    
    public AuthorizationFilter getAuthorizationFilter() throws Exception {
    	return new AuthorizationFilter(authenticationManager());
    }

}
