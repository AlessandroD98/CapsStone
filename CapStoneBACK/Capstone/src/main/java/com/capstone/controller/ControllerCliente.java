package com.capstone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.models.Cliente;
import com.capstone.payLoad.UpdateClienteDto;
import com.capstone.repository.ClienteRepo;
import com.capstone.service.ClienteService;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 6000000, allowCredentials = "true")
public class ControllerCliente {

	@Autowired
	ClienteRepo crepo;
	@Autowired
	ClienteService cservice;
	
	@GetMapping("/me/{email}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<Cliente> findProfileByUsername(@PathVariable String email){
		return new ResponseEntity<Cliente>(crepo.findByUsername(email).get(), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<String> deleteUserById(@PathVariable Long id){
		return new ResponseEntity<String>(cservice.removeUser(id), HttpStatus.OK);
	}
	
	@PostMapping("/me/update")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<Cliente> updateClienteProfile(@RequestBody UpdateClienteDto c){
		return new ResponseEntity<Cliente>(cservice.updateCliente(c), HttpStatus.OK);
	}
	
	
	}
