package com.thiagoamorimm.gestaoportaria.config;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI gestaoPortariaOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Gestão Portaria API")
                        .description("API para gestão de acessos em condomínios")
                        .version("1.0.0"));
    }

    @Bean
    public GroupedOpenApi acessosApi() {
        return GroupedOpenApi.builder()
                .group("Acessos")
                .pathsToMatch("/api/acessos/**")
                .build();
    }

    @Bean
    public GroupedOpenApi moradoresApi() {
        return GroupedOpenApi.builder()
                .group("Moradores")
                .pathsToMatch("/api/moradores/**")
                .build();
    }

    @Bean
    public GroupedOpenApi veiculosApi() {
        return GroupedOpenApi.builder()
                .group("Veículos")
                .pathsToMatch("/api/veiculos/**")
                .build();
    }

    @Bean
    public GroupedOpenApi encomendasApi() {
        return GroupedOpenApi.builder()
                .group("Encomendas")
                .pathsToMatch("/api/encomendas/**")
                .build();
    }

    @Bean
    public GroupedOpenApi ocorrenciasApi() {
        return GroupedOpenApi.builder()
                .group("Ocorrências")
                .pathsToMatch("/api/ocorrencias/**")
                .build();
    }
}
