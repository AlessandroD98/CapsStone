package com.capstone.models;

import com.capstone.Enums.Lock_Materilas;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

	@Enumerated(EnumType.STRING)
	Lock_Materilas lockMaterials;
	
}
