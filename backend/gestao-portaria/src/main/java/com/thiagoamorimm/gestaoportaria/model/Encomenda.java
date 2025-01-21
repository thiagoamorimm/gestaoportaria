package com.thiagoamorimm.gestaoportaria.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "encomenda")
public class Encomenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo_rastreio")
    private String codigoRastreio;

    @Column(nullable = false)
    private String descricao;

    @Column(name = "data_recebimento", nullable = false)
    private LocalDateTime dataRecebimento;

    @Column(name = "data_retirada")
    private LocalDateTime dataRetirada;

    @Column(nullable = false)
    private boolean retirada;

    @ManyToOne
    @JoinColumn(name = "morador_id")
    @JsonBackReference(value = "morador-encomendas")
    private Morador morador;
}
