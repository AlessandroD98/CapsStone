package com.capstone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.models.WindowMaterial;
import com.capstone.repository.WindowMaterilRepo;

@Service
public class WindowMaterialService {

	@Autowired WindowMaterilRepo wmrepo;
	
	public List<WindowMaterial> findAll() {
		return wmrepo.findAll();
	}
	
	public WindowMaterial findMaterial(String id) {
		WindowMaterial w = wmrepo.findById(id).get();
		return w;
		}
	
}
