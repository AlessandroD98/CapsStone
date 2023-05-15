package com.capstone.models;

import com.capstone.Enums.Door_Materials;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Setter
@ToString
@Table(name = "doors")
@AllArgsConstructor
@NoArgsConstructor
public class Door extends Article {

	
	
}
