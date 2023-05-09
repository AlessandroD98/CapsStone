package com.capstone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.payLoad.PreventivoDto;
import com.capstone.service.PreventiveService;

@RestController
@RequestMapping("api/")
public class Controller {

	@Autowired PreventiveService prepo;
	
	@PostMapping("send/preventive/{id}")
	public ResponseEntity<String> savePreventive(@RequestBody PreventivoDto prev, @PathVariable Long id ) {
		return new ResponseEntity<>(prepo.createPreventive(prev, id), HttpStatus.CREATED);
	}
	
}
