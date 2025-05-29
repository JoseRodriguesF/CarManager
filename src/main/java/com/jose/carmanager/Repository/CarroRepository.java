package com.jose.carmanager.Repository;

import com.jose.carmanager.Model.Carro;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CarroRepository extends MongoRepository<Carro, String> {
}