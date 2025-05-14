package com.jose.carmanager.Controller;

import com.jose.carmanager.Model.Carro;
import com.jose.carmanager.Service.CarroService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/carros")
public class CarroController {

    @Autowired
    CarroService carroService;

    @GetMapping
    public ResponseEntity<List<Carro>> getAllCarros() {
        try {
            List<Carro> carros = carroService.getAllCarros();
            if (carros.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(carros);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }


    // Endpoint para salvar um novo carro
    @PostMapping
    public ResponseEntity<?> salvarCarro(@Valid @RequestBody Carro carro) {
        try {
            Carro salvo = carroService.saveCarro(carro);
            return ResponseEntity.status(HttpStatus.CREATED).body(salvo);

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao salvar o carro. Tente novamente mais tarde."); // HTTP 500
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCarro(@PathVariable Long id) {
        try {
            boolean deleted = carroService.deleteCarro(id);

            if (deleted) {
                return ResponseEntity.noContent().build(); // 204 - sucesso, sem corpo
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Erro: carro com ID " + id + " não encontrado.");
            }

        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("ID inválido: " + ex.getMessage());

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro interno ao deletar o carro. Detalhes: " + ex.getMessage());
        }
    }


}



