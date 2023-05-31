package com.capstone.payLoad;

import java.util.List;


import com.capstone.models.Article;
import com.capstone.models.Cliente;
import com.capstone.models.Hour;

import lombok.Getter;


@Getter
public class PreventivoDto {

	private String inspectionDate;
	private Hour inspectionHour;
	private String description;
	private List<Article> articles;
	private Cliente cliente;
}
