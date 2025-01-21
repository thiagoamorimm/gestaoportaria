package com.thiagoamorimm.gestaoportaria.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;

@Entity
@Data
public class Morador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cpf;
    private String telefone;
    private String email;
    private String apartamento;
    private String bloco;

    @OneToMany(mappedBy = "morador")
    @JsonManagedReference(value = "morador-veiculos")
    private List<Veiculo> veiculos;

    @OneToMany(mappedBy = "morador")
    @JsonManagedReference(value = "morador-encomendas")
    private List<Encomenda> encomendas;
}
