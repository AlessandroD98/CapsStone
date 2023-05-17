package com.capstone.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="lock_materials")
@Getter
@Setter
public class LockMaterial {
	
	@Id
    private String materialCode;
	private String lockType;
	private Double priceMin;
	private Double priceMax;
	
}
