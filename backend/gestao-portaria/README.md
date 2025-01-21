# API de Gestão de Portaria

API para gestão de acessos em condomínios residenciais desenvolvida com Spring Boot.

## 📋 Funcionalidades Principais
- Registro de acessos de moradores, visitantes e prestadores de serviço
- Controle de veículos autorizados
- Gerenciamento de moradores e unidades habitacionais
- Registro de ocorrências e encomendas
- Dashboard com métricas de acesso

## 🛠 Tecnologias Utilizadas
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- MySQL (produção)
- Maven
- Swagger (Documentação API)

## 🚀 Configuração do Ambiente

### Pré-requisitos
- JDK 17
- Maven 3.8+
- MySQL 8.0+

### Instalação
1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/gestao-portaria.git
```

2. Configure o banco de dados em `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/gestao_portaria
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

3. Construa o projeto:
```bash
mvn clean install
```

4. Execute a aplicação:
```bash
mvn spring-boot:run
```

## 📚 Documentação da API (Swagger UI)

Para acessar a documentação interativa da API:

1. Certifique-se que a aplicação está rodando
2. Acesse no navegador:
```bash
http://localhost:8080/swagger-ui.html
```

Configuração SpringDoc (opcional):
```java
// Adicione no pom.xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.1.0</version>
</dependency>

// Exemplo de documentação em um controller
@Operation(summary = "Registrar novo acesso")
@ApiResponses(value = {
    @ApiResponse(responseCode = "201", description = "Acesso registrado"),
    @ApiResponse(responseCode = "400", description = "Dados inválidos")
})
@PostMapping("/acessos")
public ResponseEntity<AcessoDTO> registrarAcesso(@RequestBody @Valid AcessoCreateDTO acessoDTO) {
    // implementação
}
```

### Endpoints Principais

#### Acessos
- `POST /api/acessos` - Registrar novo acesso
- `GET /api/acessos` - Listar todos os acessos

#### Moradores
- `POST /api/moradores` - Cadastrar novo morador
- `GET /api/moradores` - Listar todos os moradores

#### Veículos
- `POST /api/veiculos` - Registrar veículo
- `GET /api/veiculos/{placa}` - Buscar veículo por placa


## 📝 Padrões de Desenvolvimento
- Validação de dados com Bean Validation
- Tratamento centralizado de erros
- DTOs para transferência de dados
