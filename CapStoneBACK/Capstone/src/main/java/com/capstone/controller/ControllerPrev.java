package com.capstone.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.models.Preventive;
import com.capstone.payLoad.PreventivoDto;
import com.capstone.service.PreventiveService;


@RestController
@RequestMapping("preventive/")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 6000000, allowCredentials = "true")
public class ControllerPrev {

	@Autowired PreventiveService pservice;
	
	@PostMapping("send/{id}")
	public ResponseEntity<String> savePreventive(@RequestBody PreventivoDto prev, @PathVariable Long id ) {
		return new ResponseEntity<>(pservice.createPreventive(prev, id), HttpStatus.CREATED);
	}
	
	@PostMapping("send")
	public ResponseEntity<String> savePreventive(@RequestBody PreventivoDto prev) {
		return new ResponseEntity<>(pservice.createNoRegPreventive(prev), HttpStatus.CREATED);
	}
	
	@GetMapping("all")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<Preventive>> findAllPreventive() {
	return new ResponseEntity<List<Preventive>>(pservice.getAllPreventive(),HttpStatus.OK);
}
	@GetMapping("submmitted")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<Preventive>> findSubmittedPreventive() {
		return new ResponseEntity<List<Preventive>>(pservice.getAllSubmittedPrev(),HttpStatus.OK);
	}

}
