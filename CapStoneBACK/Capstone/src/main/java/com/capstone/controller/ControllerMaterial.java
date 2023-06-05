package com.capstone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.models.DoorMaterials;
import com.capstone.models.LockMaterial;
import com.capstone.models.WindowMaterial;
import com.capstone.service.DoorMaterialService;
import com.capstone.service.LockMaterialService;
import com.capstone.service.WindowMaterialService;

@RestController
@RequestMapping("materials/")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 6000000, allowCredentials = "true")
public class ControllerMaterial {

	@Autowired DoorMaterialService dmservice ;
	@Autowired WindowMaterialService wmservice;
	@Autowired LockMaterialService lcservice;
	
	@GetMapping("doormaterial")
	public ResponseEntity<List<DoorMaterials>> getDoorMaterialType() {
		return new ResponseEntity<List<DoorMaterials>>(dmservice.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("windowmaterial")
	public ResponseEntity<List<WindowMaterial>> getWindowMaterialType() {
		return new ResponseEntity<List<WindowMaterial>>(wmservice.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("lockmaterial")
	public ResponseEntity<List<LockMaterial>> getLockType() {
		return new ResponseEntity<List<LockMaterial>>(lcservice.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("doormaterial/{material_id}")
	public ResponseEntity<DoorMaterials> getDoorMaterialById(@PathVariable String material_id){
		return new ResponseEntity<DoorMaterials>(dmservice.findMaterial(material_id), HttpStatus.OK);
	}
	
	@GetMapping("windowmaterial/{material_id}")
	public ResponseEntity<WindowMaterial> getWindowMaterialById(@PathVariable String material_id){
		return new ResponseEntity<WindowMaterial>(wmservice.findMaterial(material_id), HttpStatus.OK);
	}
	
	@GetMapping("lockmaterial/{material_id}")
	public ResponseEntity<LockMaterial> getLockMaterialById(@PathVariable String material_id){
		return new ResponseEntity<LockMaterial>(lcservice.findMaterial(material_id), HttpStatus.OK);
	}
}
