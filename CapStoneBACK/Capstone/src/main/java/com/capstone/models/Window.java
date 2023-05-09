package com.capstone.models;

import com.capstone.Enums.Window_Materials;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "windows")
@AllArgsConstructor
@NoArgsConstructor
public class Window extends Article {

	@Enumerated(EnumType.STRING)
	private Window_Materials windowMaterial;
	
}
