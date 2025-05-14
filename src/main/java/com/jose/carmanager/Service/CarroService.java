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
    CarroRepository carroRepository;

    public List<Carro> getAllCarros() {
        try {
            return carroRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar a lista de carros. Tente novamente mais tarde.");
        }
    }

    public Carro saveCarro(Carro carro) {
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
            if (carroRepository.existsById(id)) {
                carroRepository.deleteById(id);
                return true;
            } else {
                return false;
            }

        } catch (Exception e) {
            throw new RuntimeException("Erro ao acessar o banco de dados: " + e.getMessage());
        }
    }
    public Carro updateCarro(Long id, Carro novoCarro) {
        if (id == null) {
            throw new IllegalArgumentException("ID não pode ser nulo ou vazio.");
        }

        try {
            if (carroRepository.existsById(id)) {
                // Garante que o ID do objeto seja o mesmo
                novoCarro.setId(id);
                return carroRepository.save(novoCarro);
            } else {
                throw new NoSuchElementException("Carro com ID " + id + " não encontrado.");
            }

        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar o carro: " + e.getMessage());
        }
    }


}


