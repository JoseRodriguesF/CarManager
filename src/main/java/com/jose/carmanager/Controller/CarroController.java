package com.jose.carmanager.Controller;

import java.util.HashMap;
import java.util.Map;
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
    public ResponseEntity<?> getAllCarros() {
        try {
            List<Carro> carros = carroService.getAllCarros();
            if (carros.isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("status", 204);
                response.put("message", "Nenhum carro encontrado.");
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
            }
            return ResponseEntity.status(HttpStatus.OK).body(carros);
        } catch (Exception ex) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", 500);
            response.put("message", "Erro interno ao buscar carros.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/modelo/{modelo}")
    public ResponseEntity<?> getCarrosByModelo(@PathVariable String modelo) {
        try {
            List<Carro> carros = carroService.getCarrosByModelo(modelo);
            if (carros.isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("status", 204);
                response.put("message", "Nenhum carro encontrado para o modelo: " + modelo);
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
            }
            return ResponseEntity.status(HttpStatus.OK).body(carros);
        } catch (Exception ex) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", 500);
            response.put("message", "Erro interno ao buscar carros por modelo.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping
    public ResponseEntity<?> salvarCarro(@RequestBody Carro carro) {
        try {
            Carro salvo = carroService.saveCarro(carro);
            Map<String, Object> response = new HashMap<>();
            response.put("status", 201);
            response.put("message", "Carro salvo com sucesso! ID: " + salvo.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", 500);
            response.put("message", "Erro ao salvar o carro. Tente novamente mais tarde.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCarro(@PathVariable Long id) {
        try {
            boolean deleted = carroService.deleteCarro(id);
            Map<String, Object> response = new HashMap<>();
            if (deleted) {
                response.put("status", 200);
                response.put("message", "Carro deletado com sucesso.");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                response.put("status", 404);
                response.put("message", "Carro com ID " + id + " não encontrado.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (IllegalArgumentException ex) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", 400);
            response.put("message", "ID inválido: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", 500);
            response.put("message", "Erro interno ao deletar o carro.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCarro(@PathVariable Long id, @RequestBody Carro carroAtualizado) {
        try {
            Carro carro = carroService.updateCarro(id, carroAtualizado);
            Map<String, Object> response = new HashMap<>();
            response.put("status", 200);
            response.put("message", "Carro atualizado com sucesso! ID: " + carro.getId());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (NoSuchElementException ex) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", 404);
            response.put("message", "Erro: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (IllegalArgumentException ex) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", 400);
            response.put("message", "Erro: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", 500);
            response.put("message", "Erro interno ao atualizar o carro.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}