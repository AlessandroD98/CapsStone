package com.capstone.models;

import java.time.LocalDate;
import java.util.List;

import com.capstone.Enums.Preventive_State;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

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
//@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
//@JsonSubTypes({
//        @JsonSubTypes.Type(value = Door.class, name = "door"),
//        @JsonSubTypes.Type(value = Window.class, name = "window"),
//        @JsonSubTypes.Type(value = Lock.class, name = "lock")
//})
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
	private String inspectionHour;
	private String inspectionDate;
	@ManyToOne
	@JsonBackReference
	private Cliente cliente;
	private String description;
	@Enumerated(EnumType.STRING)
	private Preventive_State state;
	private Double total;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "preventive")
	private List<Article> articles;
}
