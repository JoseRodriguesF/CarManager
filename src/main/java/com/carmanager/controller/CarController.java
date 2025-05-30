package com.carmanager.controller;

import com.carmanager.dto.CarDTO;
import com.carmanager.service.CarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
@Tag(name = "Car Management", description = "APIs for managing car inventory")
public class CarController {

    private final CarService carService;

    @PostMapping
    @Operation(
        summary = "Create a new car",
        description = "Creates a new car in the inventory with the provided details"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "201",
            description = "Car successfully created",
            content = @Content(schema = @Schema(implementation = CarDTO.class))
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Invalid input data"
        )
    })
    public ResponseEntity<CarDTO> createCar(
        @Parameter(description = "Car details", required = true)
        @Valid @RequestBody CarDTO carDTO
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(carService.createCar(carDTO));
    }

    @GetMapping
    @Operation(
        summary = "Get all cars",
        description = "Retrieves a list of all cars in the inventory"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Successfully retrieved all cars",
            content = @Content(schema = @Schema(implementation = CarDTO.class))
        )
    })
    public ResponseEntity<List<CarDTO>> getAllCars() {
        return ResponseEntity.ok(carService.getAllCars());
    }

    @GetMapping("/{id}")
    @Operation(
        summary = "Get car by ID",
        description = "Retrieves a specific car by its ID"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Successfully retrieved the car",
            content = @Content(schema = @Schema(implementation = CarDTO.class))
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Car not found"
        )
    })
    public ResponseEntity<CarDTO> getCarById(
        @Parameter(description = "ID of the car to retrieve", required = true)
        @PathVariable Long id
    ) {
        return ResponseEntity.ok(carService.getCarById(id));
    }

    @PutMapping("/{id}")
    @Operation(
        summary = "Update car",
        description = "Updates an existing car's information"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Car successfully updated",
            content = @Content(schema = @Schema(implementation = CarDTO.class))
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Invalid input data"
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Car not found"
        )
    })
    public ResponseEntity<CarDTO> updateCar(
        @Parameter(description = "ID of the car to update", required = true)
        @PathVariable Long id,
        @Parameter(description = "Updated car details", required = true)
        @Valid @RequestBody CarDTO carDTO
    ) {
        return ResponseEntity.ok(carService.updateCar(id, carDTO));
    }

    @DeleteMapping("/{id}")
    @Operation(
        summary = "Delete car",
        description = "Deletes a car from the inventory"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "204",
            description = "Car successfully deleted"
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Car not found"
        )
    })
    public ResponseEntity<Void> deleteCar(
        @Parameter(description = "ID of the car to delete", required = true)
        @PathVariable Long id
    ) {
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }
} 