package com.capstone.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.Enums.Preventive_State;
import com.capstone.models.Article;
import com.capstone.models.Cliente;
import com.capstone.models.Door;
import com.capstone.models.Lock;
import com.capstone.models.Preventive;
import com.capstone.models.Window;
import com.capstone.payLoad.PreventivoDto;
import com.capstone.repository.ClienteRepo;
import com.capstone.repository.PreventiveRepo;

@Service
public class PreventiveService {

	@Autowired PreventiveRepo repo;
	@Autowired ClienteRepo crepo;
	@Autowired LockService lservice;
	@Autowired WindowService wservice;
	@Autowired DoorService dservice;
	
	public String createPreventive (PreventivoDto prev, Long id) {
		Cliente c = crepo.findById(id).get();
		Preventive p = new Preventive();
		p.setDataRichiesta(dateToLocalDate(new Date()));
		p.setInspectionDate(prev.getInspectionDate());
		p.setInspectionHour(prev.getInspectionHour().getHour());
		p.setDescription(prev.getDescription());
		p.setTotal(null);
		p.setState(Preventive_State.SUBMITTED);
		p.setNumeropreventivo(setNum());
		p.setCliente(c);
		repo.save(p);
		return "Preventivo creato con successo!";
	}
	
	public String createNoRegPreventive (PreventivoDto prev) {
		Preventive p = new Preventive();
		p.setNumeropreventivo(setNum());
		p.setCliente(prev.getCliente());
		p.setState(Preventive_State.SUBMITTED);
		p.setDataRichiesta(dateToLocalDate(new Date()));
		p.setTotal(null); //stream per calcolare il totale
		p.setDescription(prev.getDescription());
		p.setInspectionDate(prev.getInspectionDate());
		p.setInspectionHour(prev.getInspectionHour().getHour());
		
		//Riceve la lista degli articoli
		
		List<Article> savedArticles = new ArrayList<>();
		
		//Loop sulla lista e per ogni elemento si salva il type con il corrispettivo service
		
		for(Article article : prev.getArticles()) {
			String type = article.getType();
			if(type.equalsIgnoreCase("door")) {
				Door door = (Door) article;
				dservice.saveDoor(door);
				door.setPreventive(p);
				savedArticles.add(door);
				
			} else if(type.equalsIgnoreCase("window")){
				Window window = (Window) article;
				wservice.saveWindow(window);
				window.setPreventive(p);
				savedArticles.add(window);
				
			} else if(type.equalsIgnoreCase("lock")) {
				Lock lock = (Lock) article;
				lservice.saveLock(lock);
				lock.setPreventive(p);
				savedArticles.add(lock);
			}
		}
		
		//Dopo si aggiunge la lista di elementi salvati al preventivo
		
		p.setArticles(savedArticles);
		repo.save(p);
		return "Preventivo creato con successo!";
	}
	
	public Long setNum () {
        long num = System.currentTimeMillis();
        Random rnum = new Random(num);
        long isbn = Math.abs(rnum.nextLong()) % 9000000000000L + 1000000000000L;
        return isbn *= 10L;
    }
	
	public LocalDate dateToLocalDate (Date input) {
		LocalDate date = input.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		return date;
	}
	
}
