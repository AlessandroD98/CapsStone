package com.capstone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.capstone.models.Lock;
import com.capstone.models.LockMaterial;
import com.capstone.repository.LockRepo;

@Service
public class LockService {

	@Autowired LockRepo lrepo;
	@Autowired LockMaterialService lmservice;
	
	public String saveLock(Lock l) {
		Lock lock = new Lock();
		lock.setHeight(l.getHeight());
		lock.setThickness(l.getThickness());
		lock.setWitdh(l.getWitdh());
		LockMaterial lm = lmservice.findMaterial(l.getMaterial().getMaterialCode());
		lock.setMaterial(lm);
		lrepo.save(lock);
		return "Lock salvata correttamente";
	}
	
}
