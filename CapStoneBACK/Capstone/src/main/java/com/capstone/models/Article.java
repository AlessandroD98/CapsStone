package com.capstone.models;

import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@MappedSuperclass
public abstract class Article {

	private Long id;
	private String nomeArticolo;
	private Double price;
	private Double height;
	private Double witdh;
	private Double thickness;
	
}
