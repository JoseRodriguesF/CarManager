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

// Importações do Swagger
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

@RestController
@RequestMapping("api/carros")
public class CarroController {

    @Autowired
    CarroService carroService;

    @Operation(summary = "Lista todos os carros", description = "Retorna uma lista de todos os carros cadastrados.")
    @ApiResponse(responseCode = "200", description = "Lista de carros encontrada", content = @Content(schema = @Schema(implementation = Carro[].class)))
    @ApiResponse(responseCode = "204", description = "Nenhum carro encontrado")
    @ApiResponse(responseCode = "500", description = "Erro interno ao buscar carros")
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

    @Operation(summary = "Busca carros por modelo", description = "Retorna carros que correspondem ao modelo informado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Carros encontrados", content = @Content(schema = @Schema(implementation = Carro[].class))),
            @ApiResponse(responseCode = "204", description = "Nenhum carro encontrado para o modelo"),
            @ApiResponse(responseCode = "500", description = "Erro interno ao buscar carros por modelo")
    })
    @GetMapping("/modelo/{modelo}")
    public ResponseEntity<?> getCarrosByModelo(
            @Parameter(description = "Modelo do carro a ser pesquisado") @PathVariable String modelo) {
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

    @Operation(summary = "Salva um novo carro", description = "Cadastra um novo carro no sistema.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Carro salvo com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao salvar o carro")
    })
    @PostMapping
    public ResponseEntity<?> salvarCarro(
            @RequestBody(description = "Dados do carro a ser cadastrado") @Valid Carro carro) {
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

    @Operation(summary = "Deleta um carro pelo ID", description = "Remove um carro do sistema pelo seu ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Carro deletado com sucesso"),
            @ApiResponse(responseCode = "400", description = "ID inválido"),
            @ApiResponse(responseCode = "404", description = "Carro não encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro interno ao deletar o carro")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCarro(
            @Parameter(description = "ID do carro a ser deletado") @PathVariable Long id) {
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

    @Operation(summary = "Atualiza um carro pelo ID", description = "Atualiza os dados de um carro existente pelo seu ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Carro atualizado com sucesso"),
            @ApiResponse(responseCode = "400", description = "ID inválido"),
            @ApiResponse(responseCode = "404", description = "Carro não encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro interno ao atualizar o carro")
    })
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCarro(
            @Parameter(description = "ID do carro a ser atualizado") @PathVariable Long id,
            @RequestBody(description = "Dados atualizados do carro") @Valid Carro carroAtualizado) {
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
