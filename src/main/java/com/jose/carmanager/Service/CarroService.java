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
            e.printStackTrace();
            throw new RuntimeException("Erro ao salvar o carro. " + e.getMessage());
        }
    }

    public boolean deleteCarro(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("ID não pode ser nulo ou vazio.");
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

    public Carro updateCarro(String id, Carro novoCarro) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("ID não pode ser nulo ou vazio.");
        }
        if (novoCarro == null) {
            throw new IllegalArgumentException("O objeto carro para atualização não pode ser nulo.");
        }
        try {
            return carroRepository.findById(id)
                    .map(car -> {
                        car.setModelo(novoCarro.getModelo());
                        car.setMarca(novoCarro.getMarca());
                        car.setAno_fabricacao(novoCarro.getAno_fabricacao());
                        car.setQuilometragem(novoCarro.getQuilometragem());
                        car.setValor(novoCarro.getValor());
                        // Atualiza a foto somente se nova foto for enviada
                        if (novoCarro.getFoto() != null) {
                            car.setFoto(novoCarro.getFoto());
                        }
                        return carroRepository.save(car);
                    })
                    .orElseThrow(() -> new NoSuchElementException("Carro com ID " + id + " não encontrado."));
        } catch (NoSuchElementException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar o carro: " + e.getMessage());
        }
    }

    public List<Carro> getCarrosByMarca(String marca) {
        if (marca == null || marca.trim().isEmpty()) {
            throw new IllegalArgumentException("O parâmetro modelo não pode ser nulo ou vazio.");
        }
        try {
            return carroRepository.findByModeloIgnoreCaseContaining(marca);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar carros pelo modelo: " + e.getMessage());
        }
    }

    public Carro buscarPorId(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("ID não pode ser nulo ou vazio.");
        }
        try {
            return carroRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Carro com ID " + id + " não encontrado."));
        } catch (NoSuchElementException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar o carro pelo ID: " + e.getMessage(), e);
        }
    }
}