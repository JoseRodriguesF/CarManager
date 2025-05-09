package com.jose.carmanager.Service;

import com.jose.carmanager.Model.Carro;
import com.jose.carmanager.Repository.CarroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class CarroService {

    @Autowired
    CarroRepository carroRepository;

    private static final String IMAGEM_PATH = "caminho/para/salvar/imagens/";

    // Método para salvar o carro com a imagem
    public Carro salvarCarroComImagem(Carro carro, MultipartFile foto) throws IOException {
        String nomeArquivo = UUID.randomUUID() + "_" + foto.getOriginalFilename();
        Path caminho = Paths.get(IMAGEM_PATH, nomeArquivo);
        Files.copy(foto.getInputStream(), caminho);
        carro.setFoto("/images/carros/" + nomeArquivo); // Caminho acessível pela aplicação

        return carroRepository.save(carro);
    }
}
