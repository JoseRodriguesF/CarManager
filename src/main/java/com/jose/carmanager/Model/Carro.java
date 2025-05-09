package com.jose.carmanager.Model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "carros")
public class Carro {
    @Id
    private String id;

    private String modelo;
    private String marca;
    private int ano_fabricacao;
    private double preco;
    private double quilometragem;

    private String foto;
}

