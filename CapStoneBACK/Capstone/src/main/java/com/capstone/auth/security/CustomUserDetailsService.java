package com.capstone.auth.security;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.capstone.models.Cliente;
import com.capstone.repository.ClienteRepo;




@Service
public class CustomUserDetailsService  implements UserDetailsService{
	
	   private ClienteRepo userRepository;

	    public CustomUserDetailsService(ClienteRepo userRepository) {
	        this.userRepository = userRepository;
	    }

	    @Override
	    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
	          Cliente user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
	                 .orElseThrow(() ->
	                         new UsernameNotFoundException("User not found with username or email: "+ usernameOrEmail));

	        Set<GrantedAuthority> authorities = user
	                .getRoles()
	                .stream()
	                .map((role) -> new SimpleGrantedAuthority(role.getRoleName().toString())).collect(Collectors.toSet());

	        return new org.springframework.security.core.userdetails.User(user.getUsername(),
	                user.getPassword(),
	                authorities);
	    }
}
