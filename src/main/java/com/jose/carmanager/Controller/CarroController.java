package com.jose.carmanager.Controller;

import java.util.NoSuchElementException;
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
    public ResponseEntity<?> salvarCarro( @RequestBody Carro carro) {
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
                return ResponseEntity.status(HttpStatus.OK).body("Carro deletado com sucesso.");
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

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCarro(@PathVariable Long id, @RequestBody Carro carroAtualizado) {
        try {
            Carro carro = carroService.updateCarro(id, carroAtualizado);
            return ResponseEntity.ok(carro); // 200 OK com o carro atualizado

        } catch (NoSuchElementException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Erro: " + ex.getMessage());

        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro: " + ex.getMessage());

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro interno ao atualizar o carro. Detalhes: " + ex.getMessage());
        }
    }

}



