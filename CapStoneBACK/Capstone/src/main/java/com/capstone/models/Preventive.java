package com.capstone.models;

import java.time.LocalDate;
import java.util.List;

import com.capstone.Enums.Preventive_State;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "preventives")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Preventive {
	
@Id
	private Long numeropreventivo;
	private LocalDate dataRichiesta;
	@ManyToOne
	private Cliente cliente;
	private String description;
	@Enumerated(EnumType.STRING)
	private Preventive_State state;
	private Double total;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "preventive")
	private List<Article> articles;
}
