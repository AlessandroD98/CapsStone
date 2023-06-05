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
import com.capstone.models.DoorMaterials;
import com.capstone.models.Lock;
import com.capstone.models.LockMaterial;
import com.capstone.models.Preventive;
import com.capstone.models.Window;
import com.capstone.models.WindowMaterial;
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
	@Autowired DoorMaterialService dmserive;
	@Autowired WindowMaterialService wmservice;
	@Autowired LockMaterialService lmservice;
	
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
		p.setArticles(saveArticles(prev.getArticles(),p));
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
		Cliente c = new Cliente();
		c.setName(prev.getCliente().getName());
		c.setLastname(prev.getCliente().getLastname());
		c.setEmail(prev.getCliente().getEmail());
		c.setAddress(prev.getCliente().getAddress());
		c.setCity(prev.getCliente().getCity());
		c.setZipCode(prev.getCliente().getZipCode());
		crepo.save(c);
		p.setCliente(c);
		repo.save(p);
		
		p.setArticles(saveArticles(prev.getArticles(),p));
		repo.save(p);
		return "Preventivo creato con successo!";
	}
	
	public List<Preventive> getAllPreventive () {
		return repo.findAll();
	}
	
	public List<Preventive> getAllSubmittedPrev() {
		return repo.findByState(Preventive_State.SUBMITTED);
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
	
	public List<Article> saveArticles(List<Article> articles, Preventive p) {
		
		//Riceve la lista degli articoli
		
				List<Article> savedArticles = new ArrayList<>();
				
				//Loop sulla lista e per ogni elemento si salva il type con il corrispettivo service
				
				for(Article article : articles) {
					String type = article.getType();
					if(type.equalsIgnoreCase("door")) {
						Door door = new Door();
						door.setHeight(article.getHeight());
						door.setThickness(article.getThickness());
						door.setWitdh(article.getWitdh());
						door.setType(article.getType());
						
						if(article.getMaterial() != "" && article.getMaterial() != null ) {
							
							DoorMaterials dmaterial = dmserive.findMaterial(article.getMaterial());
							if(dmaterial != null) {
								door.setDoormaterial(dmaterial);
							}
						}
						door.setPreventive(p);
						dservice.saveDoor(door);
						savedArticles.add(door);
						
					} else if(type.equalsIgnoreCase("window")){
						Window window = new Window();
						window.setHeight(article.getHeight());
						window.setThickness(article.getThickness());
						window.setWitdh(article.getWitdh());
						window.setType(article.getType());
						
						if(article.getMaterial() != "" && article.getMaterial() != null) {
							
							WindowMaterial wmateril = wmservice.findMaterial(article.getMaterial());
							if(wmateril != null) {
								window.setWindowmaterial(wmateril);
							}
						}
						
						window.setPreventive(p);
						wservice.saveWindow(window);
						savedArticles.add(window);
						
					} else if(type.equalsIgnoreCase("lock")) {
						Lock lock = new Lock();
						lock.setHeight(article.getHeight());
						lock.setThickness(article.getThickness());
						lock.setWitdh(article.getWitdh());
						lock.setType(article.getType());
						
						if(article.getMaterial() != "" && article.getMaterial() != null) {
							
							LockMaterial lmateril = lmservice.findMaterial(article.getMaterial());
							if(lmateril != null) {
								lock.setLockmaterial(null);
							}
						}
						
						lservice.saveLock(lock);
						lock.setPreventive(p);
						savedArticles.add(lock);
					}
				}
		
		return savedArticles;
	}
	
}
