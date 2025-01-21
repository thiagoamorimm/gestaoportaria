package com.thiagoamorimm.gestaoportaria.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
public class ControleAcesso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String placa;

    @Column(nullable = false)
    private LocalDateTime dataHoraEntrada;

    private LocalDateTime dataHoraSaida;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoAcesso tipoAcesso;

    @ManyToOne
    @JoinColumn(name = "morador_id")
    @JsonBackReference
    private Morador morador;

    public enum TipoAcesso {
        MORADOR, VISITANTE
    }

    public ControleAcesso(String placa, TipoAcesso tipoAcesso, Morador morador) {
        this.placa = placa;
        this.tipoAcesso = tipoAcesso;
        this.morador = morador;
        this.dataHoraEntrada = LocalDateTime.now();
    }
}
