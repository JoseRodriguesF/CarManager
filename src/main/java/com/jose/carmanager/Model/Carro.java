package com.jose.carmanager.Model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import io.swagger.v3.oas.annotations.media.Schema;

@Data
@Document(collection = "carros")
public class Carro {

    @Id
    @Schema(description = "ID do carro", example = "1")
    private Long id;

    @NotNull(message = "O campo modelo é obrigatório")
    @NotBlank(message = "O campo modelo não pode ser vazio")
    @Schema(description = "Modelo do carro", example = "Corolla")
    private String modelo;

    @NotNull(message = "O campo marca é obrigatório")
    @NotBlank(message = "O campo marca não pode ser vazio")
    @Schema(description = "Marca do carro", example = "Toyota")
    private String marca;

    @NotNull(message = "O campo ano de fabricação é obrigatório")
    @Schema(description = "Ano de fabricação do carro", example = "2020")
    private int ano_fabricacao;

    @NotNull(message = "O campo quilometragem é obrigatório")
    @Schema(description = "Quilometragem do carro", example = "50000")
    private int quilometragem;

    @NotNull(message = "O campo valor é obrigatório")
    @Schema(description = "Valor do carro", example = "75000.00")
    private double valor;

    @NotNull(message = "O campo caminhoFoto é obrigatório")
    @NotBlank(message = "O campo caminhoFoto não pode ser vazio")
    @Schema(description = "Caminho ou URL da foto do carro", example = "https://exemplo.com/fotos/carro1.jpg")
    private String caminhoFoto;
}
