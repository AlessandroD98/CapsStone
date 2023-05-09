package com.capstone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.repository.ClienteRepo;

@Service
public class ClienteService {

	@Autowired ClienteRepo repo;
	
}
