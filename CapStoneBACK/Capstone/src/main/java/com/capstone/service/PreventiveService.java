package com.capstone.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.Enums.Preventive_State;
import com.capstone.models.Cliente;
import com.capstone.models.Preventive;
import com.capstone.payLoad.PreventivoDto;
import com.capstone.repository.ClienteRepo;
import com.capstone.repository.PreventiveRepo;

@Service
public class PreventiveService {

	@Autowired PreventiveRepo repo;
	@Autowired ClienteRepo crepo;
	
	public String createPreventive (PreventivoDto prev, Long id) {
		Cliente c = crepo.findById(id).get();
		Preventive p = new Preventive();
		p.setDataRichiesta(prev.getDataRichiesta());
		p.setDescription(prev.getDescription());
		p.setTotal(prev.getTotal());
		p.setState(Preventive_State.SUBMITTED);
		p.setNumeropreventivo(setNum());
		p.setCliente(c);
		repo.save(p);
		return "Preventivo creato con successo!";
	}
	
	public Long setNum () {
        long num = System.currentTimeMillis();
        Random rnum = new Random(num);
        long isbn = Math.abs(rnum.nextLong()) % 9000000000000L + 1000000000000L;
        return isbn *= 10L;
    }
}
