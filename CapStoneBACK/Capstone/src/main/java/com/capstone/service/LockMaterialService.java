package com.capstone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.models.LockMaterial;
import com.capstone.repository.LockMaterialRepo;
@Service
public class LockMaterialService {

	@Autowired LockMaterialRepo lcrepo;

	public List<LockMaterial> findAll() {
		return lcrepo.findAll();
	}
	
	public LockMaterial findMaterial(String id) {
	LockMaterial l = lcrepo.findById(id).get();
	return l;
	}
}
