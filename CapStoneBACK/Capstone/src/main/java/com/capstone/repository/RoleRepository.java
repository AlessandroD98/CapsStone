package com.capstone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.auth.entity.ERole;
import com.capstone.auth.entity.Role;


public interface RoleRepository extends JpaRepository<Role, Long>{
	Optional<Role> findByRoleName(ERole roleName);
}
