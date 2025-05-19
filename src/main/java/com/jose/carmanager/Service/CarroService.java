package com.jose.carmanager.Service;

import com.jose.carmanager.Model.Carro;
import com.jose.carmanager.Repository.CarroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.NoSuchElementException;


import java.util.List;

@Service
public class CarroService {

    @Autowired
    private CarroRepository carroRepository;

    public List<Carro> getAllCarros() {
        try {
            return carroRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar a lista de carros. Tente novamente mais tarde.");
        }
    }

    public Carro saveCarro(Carro carro) {
        if (carro == null) {
            throw new IllegalArgumentException("O objeto carro não pode ser nulo.");
        }
        try {
            return carroRepository.save(carro);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar o carro. Tente novamente mais tarde.");
        }
    }

    public boolean deleteCarro(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID não pode ser nulo.");
        }

        try {
            if (!carroRepository.existsById(id)) {
                return false;
            }
            carroRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao acessar o banco de dados: " + e.getMessage());
        }
    }

    public Carro updateCarro(Long id, Carro novoCarro) {
        if (id == null) {
            throw new IllegalArgumentException("ID não pode ser nulo.");
        }
        if (novoCarro == null) {
            throw new IllegalArgumentException("O objeto carro para atualização não pode ser nulo.");
        }

        try {
            return carroRepository.findById(id)
                    .map(car -> {
                        novoCarro.setId(id);
                        return carroRepository.save(novoCarro);
                    })
                    .orElseThrow(() -> new NoSuchElementException("Carro com ID " + id + " não encontrado."));
        } catch (NoSuchElementException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar o carro: " + e.getMessage());
        }
    }

    public List<Carro> getCarrosByModelo(String modelo) {
        if (modelo == null || modelo.trim().isEmpty()) {
            throw new IllegalArgumentException("O parâmetro modelo não pode ser nulo ou vazio.");
        }
        try {
            return carroRepository.findByModeloIgnoreCaseContaining(modelo);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar carros pelo modelo: " + e.getMessage());
        }
    }
}

