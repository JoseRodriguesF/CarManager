package com.jose.carmanager.Controller;

import com.jose.carmanager.Model.Carro;
import com.jose.carmanager.Service.CarroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/carros")
public class CarroController {

    @Autowired
    CarroService carroService;

    @PostMapping
    public ResponseEntity<?> criarCarro(@RequestParam("modelo") String modelo,
                                        @RequestParam("marca") String marca,
                                        @RequestParam("ano_fabricacao") int anoFabricacao,
                                        @RequestParam("preco") double preco,
                                        @RequestParam("quilometragem") double quilometragem,
                                        @RequestParam("foto") MultipartFile foto) {
        try {
            // Criar um novo objeto Carro
            Carro carro = new Carro();
            carro.setModelo(modelo);
            carro.setMarca(marca);
            carro.setAno_fabricacao(anoFabricacao);
            carro.setPreco(preco);
            carro.setQuilometragem(quilometragem);

            // Chamar o serviço para salvar o carro com a imagem
            Carro carroSalvo = carroService.salvarCarroComImagem(carro, foto);

            return ResponseEntity.status(HttpStatus.CREATED).body(carroSalvo);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar a imagem");
        }
    }
}