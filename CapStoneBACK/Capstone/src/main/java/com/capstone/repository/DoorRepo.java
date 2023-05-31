package com.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.models.Door;

@Repository
public interface DoorRepo extends JpaRepository<Door, String> {

}
