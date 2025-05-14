package com.jose.carmanager.Model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Data
@Document(collection = "carros")
public class Carro {

    @Id
    private Long id;

    @NotNull(message = "O campo modelo é obrigatório")
    @NotBlank(message = "O campo modelo não pode ser vazio")
    private String modelo;
    @NotNull(message = "O campo marca é obrigatório")
    @NotBlank(message = "O campo marca não pode ser vazio")
    private String marca;
    @NotNull(message = "O campo ano de fabricação é obrigatório")
    @NotBlank(message = "O campo ano de fabricação não pode ser vazio")
    private int ano_fabricacao;
    @NotNull(message = "O campo quilometragem é obrigatório")
    @NotBlank(message = "O campo quilometragem não pode ser vazio")
    private int quilometragem;
    @NotNull(message = "O campo valor é obrigatório")
    @NotBlank(message = "O campo valor não pode ser vazio")
    private double valor;

}
