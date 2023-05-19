package com.capstone.auth.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.auth.entity.ERole;
import com.capstone.auth.payload.JWTAuthResponse;
import com.capstone.auth.payload.LoginDto;
import com.capstone.auth.payload.RegisterDto;
import com.capstone.auth.service.AuthService;
import com.capstone.models.Cliente;
import com.capstone.repository.ClienteRepo;




@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 6000000, allowCredentials = "true")
public class AuthController {
@Autowired
	private ClienteRepo crepo;
    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Build Login REST API
    @PostMapping(value = {"/login", "/signin"})
    public ResponseEntity<JWTAuthResponse> login(@RequestBody LoginDto loginDto){
           	
    	String token = authService.login(loginDto);
    	Cliente user = crepo.findByUsername(loginDto.getUsername()).get();

        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        jwtAuthResponse.setEmail(loginDto.getUsername());
        jwtAuthResponse.setAccessToken(token);
        Set<ERole> list = jwtAuthResponse.getRoles();
        user.getRoles().forEach(r-> list.add(r.getRoleName()));
        jwtAuthResponse.setRoles(list);

        return ResponseEntity.ok(jwtAuthResponse);
    }

    // Build Register REST API
    @PostMapping(value = {"/register", "/signup"})
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        String response = authService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
