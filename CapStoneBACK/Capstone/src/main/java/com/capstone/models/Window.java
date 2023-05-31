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
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@ToString
@Entity
@Table(name = "windows")
@AllArgsConstructor
@NoArgsConstructor
public class Window extends Article {

//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long id;
//	@ManyToMany
//	@JoinTable(name = "window_rel_materials",
//	joinColumns = @JoinColumn(name = "window_id"),
//    inverseJoinColumns = @JoinColumn(name = "material_id"))
//	private List<WindowMaterial> materials;
	
	@OneToOne
	@JoinColumn(name="material_id")
	private WindowMaterial material;
}
