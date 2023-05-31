package com.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.models.WindowMaterial;
@Repository
public interface WindowMaterilRepo extends JpaRepository<WindowMaterial, String> {

}
