package com.thiagoamorimm.gestaoportaria.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Data
public class Veiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String placa;
    private String modelo;
    private String cor;
    private String vaga;

    private boolean presente;

    @ManyToOne
    @JoinColumn(name = "morador_id")
    @JsonBackReference(value = "morador-veiculos")
    private Morador morador;
}
