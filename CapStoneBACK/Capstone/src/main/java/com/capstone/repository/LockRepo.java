package com.capstone.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.capstone.models.Lock;
@Repository
public interface LockRepo extends JpaRepository<Lock, String>  {

	

}
