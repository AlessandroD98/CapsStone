package com.capstone.auth.service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.capstone.auth.entity.ERole;
import com.capstone.auth.entity.Role;
import com.capstone.auth.exception.MyAPIException;
import com.capstone.auth.payload.LoginDto;
import com.capstone.auth.payload.RegisterDto;
import com.capstone.auth.security.JwtTokenProvider;
import com.capstone.models.Cliente;
import com.capstone.repository.ClienteRepo;
import com.capstone.repository.RoleRepository;



@Service
public class AuthServiceImpl implements AuthService{
    private AuthenticationManager authenticationManager;
    private ClienteRepo userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;



    public AuthServiceImpl(AuthenticationManager authenticationManager,
    		ClienteRepo userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder,
                           JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public String login(LoginDto loginDto) {
        
    	Authentication authentication = authenticationManager.authenticate(
        		new UsernamePasswordAuthenticationToken(
        				loginDto.getUsername(), loginDto.getPassword()
        		)
        ); 
    	
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        return token;
    }

    @Override
    public String register(RegisterDto registerDto) {

        // add check for username exists in database
        if(userRepository.existsByUsername(registerDto.getUsername())){
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Username is already exists!.");
        }

        // add check for email exists in database
//        if(userRepository.existsByEmail(registerDto.getUsername())){
//            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Email is already exists!.");
//        }

        Cliente user = new Cliente();        
        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setEmail(registerDto.getUsername());
       
       
        

        Set<Role> roles = new HashSet<>();
        
        //if(registerDto.getRoles() != null) {
	      //  registerDto.getRoles().forEach(role -> {
	      //  	Role userRole = roleRepository.findByRoleName(getRole(role)).get();
	     //   	roles.add(userRole);
	     //   });
      //  } else {
        	Role userRole = roleRepository.findByRoleName(ERole.ROLE_USER).get();
        	roles.add(userRole);
     //   }
        
        user.setRoles(roles);
        System.out.println(user);
        userRepository.save(user);

        return "User registered successfully!.";
    }
    
    public ERole getRole(String role) {
    	if(role.equals("ROLE_ADMIN")) return ERole.ROLE_ADMIN;
    	else if(role.equals("ROLE_MODERATOR")) return ERole.ROLE_MODERATOR;
    	else return ERole.ROLE_USER;
    }
    public void changePermissions(long id,ERole roles) {
        Set<Role> role = new HashSet<Role>();
        role.add(roleRepository.findByRoleName(roles).get());
       Cliente u = userRepository.findById(id).get();
        u.setRoles(role);
        userRepository.save(u);
    }
    public Cliente getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            Cliente user = userRepository.findByUsername(username).get();
            return user;
        } else {
            //user non autenicato 
            return null;
        }
    }
}
