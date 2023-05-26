package com.capstone.payLoad;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UpdateClienteDto {

private Long id;
private String name;
private String lastname;
private Long telefono;
private String city;
private String address;
private String zipCode;
}
