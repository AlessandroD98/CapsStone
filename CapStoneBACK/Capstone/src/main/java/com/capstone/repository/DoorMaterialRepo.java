package com.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.models.DoorMaterials;

@Repository
public interface DoorMaterialRepo extends JpaRepository<DoorMaterials, String> {

	
	
}
