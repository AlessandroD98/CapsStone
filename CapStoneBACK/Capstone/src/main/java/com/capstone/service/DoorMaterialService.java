package com.capstone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.models.DoorMaterials;
import com.capstone.repository.DoorMaterialRepo;

@Service
public class DoorMaterialService {

	@Autowired DoorMaterialRepo dmrepo;
	
	public List<DoorMaterials> findAll() {
	return dmrepo.findAll();
	}
	
	public DoorMaterials findMaterial(String id) {
		DoorMaterials d = dmrepo.findById(id).get();
		return d;
		}
}
