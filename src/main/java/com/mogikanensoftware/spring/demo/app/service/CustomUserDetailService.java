package com.mogikanensoftware.spring.demo.app.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class CustomUserDetailService implements UserDetailsService {

	//Stub
	private final static Map<String, UserDetails> tempUserDetails = new HashMap<>();
	
	static {
		tempUserDetails.put("user1", new User("user1", "Welcome1", AuthorityUtils.createAuthorityList("VIEW")));
		tempUserDetails.put("user2", new User("2", "Welcome1", AuthorityUtils.createAuthorityList("VIEW","EDIT")));
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return tempUserDetails.get(username);
	}

}
