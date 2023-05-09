package com.capstone.payLoad;

import java.time.LocalDate;
import java.util.List;


import com.capstone.models.Article;

import lombok.Getter;


@Getter
public class PreventivoDto {

	private LocalDate dataRichiesta;
	private String description;
	private Double total;
	private List<Article> articles;
	
}
