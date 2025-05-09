package com.jose.carmanager.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Mapeia o caminho "/images/**" para o diretório onde as imagens são salvas
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:caminho/para/salvar/imagens/");
    }
}

