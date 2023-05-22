package com.capstone.auth.runner;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.capstone.auth.entity.ERole;
import com.capstone.auth.entity.Role;
import com.capstone.auth.service.AuthService;
import com.capstone.models.Cliente;
import com.capstone.repository.ClienteRepo;
import com.capstone.repository.RoleRepository;





@Component
public class AuthRunner implements ApplicationRunner{
	
	@Autowired RoleRepository roleRepository;
	@Autowired ClienteRepo userRepository;
	@Autowired PasswordEncoder passwordEncoder;
	@Autowired AuthService authService;
	
	private Set<Role> adminRole;
	private Set<Role> moderatorRole;
	private Set<Role> userRole;
	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("Run...");
//setRoleDefault();
//		Cliente c = userRepository.findById(7l).get();
//		Role r = roleRepository.findById(1l).get();
//		c.getRoles().add(r);
//		userRepository.save(c);
		

	}
	
	private void setRoleDefault() {
		Role admin = new Role();
		admin.setRoleName(ERole.ROLE_ADMIN);
		roleRepository.save(admin);
		
		Role user = new Role();
		user.setRoleName(ERole.ROLE_USER);
		roleRepository.save(user);
		
		Role moderator = new Role();
		moderator.setRoleName(ERole.ROLE_MODERATOR);
		roleRepository.save(moderator);
		
		adminRole = new HashSet<Role>();
		adminRole.add(admin);
		adminRole.add(moderator);
		adminRole.add(user);
		
		moderatorRole = new HashSet<Role>();
		moderatorRole.add(moderator);
		moderatorRole.add(user);
		
		userRole = new HashSet<Role>();
		userRole.add(user);
	}
}
