package com.capstone.models;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.capstone.auth.entity.Role;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name="clienti")
public class Cliente {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id_cliente;
private String name;
private String lastname;
private String email;
private String username;
private String password;
private Long telefono;
@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
private Set<Role> roles = new HashSet<>();
@OneToMany(mappedBy = "cliente", fetch = FetchType.EAGER)
private List<Preventive> preventives;
private String address;
private String city;
private String zipCode;
}
