package com.capstone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.models.DoorMaterials;
import com.capstone.models.LockMaterial;
import com.capstone.models.WindowMaterial;
import com.capstone.payLoad.PreventivoDto;
import com.capstone.service.DoorMaterialService;
import com.capstone.service.LockMaterialService;
import com.capstone.service.PreventiveService;
import com.capstone.service.WindowMaterialService;


@RestController
@RequestMapping("preventive/")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 6000000, allowCredentials = "true")
public class ControllerPrev {

	@Autowired PreventiveService pservice;
	@Autowired DoorMaterialService dmservice ;
	@Autowired WindowMaterialService wmservice;
	@Autowired LockMaterialService lcservice;
	
	@GetMapping("materials/doormaterial")
	public ResponseEntity<List<DoorMaterials>> getDoorMaterialType() {
		return new ResponseEntity<List<DoorMaterials>>(dmservice.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("materials/windowmaterial")
	public ResponseEntity<List<WindowMaterial>> getWindowMaterialType() {
		return new ResponseEntity<List<WindowMaterial>>(wmservice.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("materials/lockmaterial")
	public ResponseEntity<List<LockMaterial>> getLockType() {
		return new ResponseEntity<List<LockMaterial>>(lcservice.findAll(), HttpStatus.OK);
	}
	
	@PostMapping("send/{id}")
	public ResponseEntity<String> savePreventive(@RequestBody PreventivoDto prev, @PathVariable Long id ) {
		return new ResponseEntity<>(pservice.createPreventive(prev, id), HttpStatus.CREATED);
	}
	
	@PostMapping("send")
	public ResponseEntity<String> savePreventive(@RequestBody PreventivoDto prev) {
		return new ResponseEntity<>(pservice.createNoRegPreventive(prev), HttpStatus.CREATED);
	}
	
}
