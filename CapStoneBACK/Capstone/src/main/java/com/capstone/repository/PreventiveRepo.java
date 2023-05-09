package com.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.models.Preventive;

@Repository
public interface PreventiveRepo extends JpaRepository<Preventive, Long>{

}
