package com.jose.carmanager.Repository;

import com.jose.carmanager.Model.Carro;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface CarroRepository extends MongoRepository<Carro, Long> {
}