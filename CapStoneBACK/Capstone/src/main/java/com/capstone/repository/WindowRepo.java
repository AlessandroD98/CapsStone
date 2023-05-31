package com.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.models.Window;
@Repository
public interface WindowRepo extends JpaRepository<Window, Long> {

}
