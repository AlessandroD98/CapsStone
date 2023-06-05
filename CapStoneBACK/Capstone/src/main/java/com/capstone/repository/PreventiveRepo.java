package com.capstone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.Enums.Preventive_State;
import com.capstone.models.Preventive;

@Repository
public interface PreventiveRepo extends JpaRepository<Preventive, Long>{

	List<Preventive> findByState(Preventive_State state);
	
}
