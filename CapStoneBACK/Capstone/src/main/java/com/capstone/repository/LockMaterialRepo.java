package com.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.models.LockMaterial;

public interface LockMaterialRepo extends JpaRepository<LockMaterial, String>{
	
}
