package com.capstone.repository;


import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.capstone.models.Cliente;



@Repository
public interface ClienteRepo extends JpaRepository<Cliente, Long>, PagingAndSortingRepository<Cliente, Long> {
	Optional<Cliente> findByEmail(String email);

    Optional<Cliente> findByUsernameOrEmail(String username, String email);

    Optional<Cliente> findByUsername(String username);

    Boolean existsByUsername(String username);
 
    Boolean existsByEmail(String email);
    
    public Page<Cliente> findAll(Pageable pag);

  
}
