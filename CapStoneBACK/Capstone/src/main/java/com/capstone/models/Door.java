package com.capstone.models;



import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "doors")
@AllArgsConstructor
@NoArgsConstructor
public class Door extends Article {

//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long id;
//	@ManyToMany
//	@JoinTable(name = "door_rel_materials",
//	joinColumns = @JoinColumn(name = "door_id"),
//    inverseJoinColumns = @JoinColumn(name = "material_id"))
//	private List <DoorMaterials> materials;
	
	@OneToOne
	@JoinColumn(name = "material_id")
	private DoorMaterials material;
	
}
