package com.capstone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.models.Cliente;
import com.capstone.payLoad.UpdateClienteDto;
import com.capstone.repository.ClienteRepo;

@Service
public class ClienteService {

	@Autowired ClienteRepo repo;
	
	public String removeUser(Long id) {
		Cliente c = repo.findById(id).get();
		repo.delete(c);
		return "Cliente eliminato";
	}
	
	public Cliente updateCliente(UpdateClienteDto c) {
		Cliente cl = repo.findById(c.getId()).get();
		cl.setName(c.getName());
		cl.setLastname(c.getLastname());
		cl.setTelefono(c.getTelefono());
		repo.save(cl);
		return cl;
	}
	
}
