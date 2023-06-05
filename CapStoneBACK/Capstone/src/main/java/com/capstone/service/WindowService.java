package com.capstone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.models.Window;
import com.capstone.models.WindowMaterial;
import com.capstone.repository.WindowRepo;

@Service
public class WindowService {

	@Autowired WindowRepo wrepo;
	@Autowired WindowMaterialService wmservice;
	
	public String saveWindow(Window w) {
//		Window window = new Window();
//		window.setHeight(w.getHeight());
//		window.setThickness(w.getThickness());
//		window.setWitdh(w.getWitdh());
//		WindowMaterial wm = wmservice.findMaterial(w.getWindowmaterial().getMaterialCode());
//		window.setWindowmaterial(wm);
		wrepo.save(w);
		return "Window salvata con successo";
	}
}
