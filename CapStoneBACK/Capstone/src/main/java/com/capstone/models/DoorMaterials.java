package com.capstone.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name ="door_materials")
@Setter
@Getter
public class DoorMaterials {

	@Id
    private String materialCode;
	private String material;
	private Double priceMin;
	private Double priceMax;
	
}
