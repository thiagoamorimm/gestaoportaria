# Sistema de Gestão de Portaria

Sistema para controle de acessos, moradores e veículos em condomínios residenciais.

## Tecnologias Utilizadas
- Java 17
- Spring Boot 3.2.4
- Spring Data JPA
- MySQL
- Swagger/OpenAPI 3.0

## Endpoints Principais

### Acessos
| Método | Endpoint               | Descrição                          |
|--------|------------------------|------------------------------------|
| POST   | /api/acessos           | Registrar novo acesso              |
| GET    | /api/acessos           | Listar todos os acessos            |
| GET    | /api/acessos/{id}      | Buscar acesso por ID               |
| PUT    | /api/acessos/{id}      | Atualizar acesso                   |
| DELETE | /api/acessos/{id}      | Excluir acesso                     |

### Moradores
| Método | Endpoint                  | Descrição                          |
|--------|---------------------------|------------------------------------|
| POST   | /api/moradores            | Cadastrar novo morador            |
| GET    | /api/moradores            | Listar todos os moradores         |
| GET    | /api/moradores/{id}       | Buscar morador por ID             |
| PUT    | /api/moradores/{id}       | Atualizar dados do morador        |
| DELETE | /api/moradores/{id}       | Remover morador                   |

### Veículos
| Método | Endpoint                     | Descrição                          |
|--------|------------------------------|------------------------------------|
| POST   | /api/veiculos                | Cadastrar novo veículo            |
| GET    | /api/veiculos                | Listar todos os veículos          |
| GET    | /api/veiculos/{id}           | Buscar veículo por ID             |
| PUT    | /api/veiculos/{id}           | Atualizar dados do veículo        |
| DELETE | /api/veiculos/{id}           | Remover veículo                   |

## Como Executar

Pré-requisitos:
- Java 17
- Maven 3.8+

```bash
# Clonar repositório
git clone https://github.com/thiagoamorimm/gestaoportaria.git

# Construir e executar
cd backend/gestao-portaria
mvn spring-boot:run
```

Acesse a documentação completa da API em:  
http://localhost:8080/swagger-ui.html

## Configuração

Arquivo de propriedades: `src/main/resources/application.properties`

```properties
# Configuração MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/gestao_portaria
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=suasenha

# Gerar schema automaticamente
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

![image](https://github.com/user-attachments/assets/1c33328b-9317-4815-8767-f91dc3395370)

