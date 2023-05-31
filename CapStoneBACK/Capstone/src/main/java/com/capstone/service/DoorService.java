package com.capstone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.models.Door;
import com.capstone.models.DoorMaterials;
import com.capstone.repository.DoorRepo;


@Service
public class DoorService {

	@Autowired DoorRepo drepo;
	@Autowired DoorMaterialService dmservice;
	
	public String saveDoor(Door d) {
		Door door = new Door();
		door.setHeight(d.getHeight());
		door.setWitdh(d.getWitdh());
		door.setThickness(d.getThickness());
		DoorMaterials dm = dmservice.findMaterial(d.getMaterial().getMaterialCode());
		door.setMaterial(dm);
		drepo.save(door);
		return "Door salvata correttamente";
	}
}
