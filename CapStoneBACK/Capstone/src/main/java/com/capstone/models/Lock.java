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
@Table(name="locks")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Lock extends Article {

//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long id;
//	@ManyToMany
//	@JoinTable(name = "lock_rel_materials",
//	joinColumns = @JoinColumn(name = "lock_id"),
//    inverseJoinColumns = @JoinColumn(name = "material_id"))
//private List<LockMaterial> materials;
	
	@OneToOne
    @JoinColumn(name = "material_id")
    private LockMaterial material;
}
