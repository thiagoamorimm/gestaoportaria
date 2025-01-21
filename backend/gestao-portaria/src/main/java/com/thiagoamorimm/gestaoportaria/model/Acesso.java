package com.thiagoamorimm.gestaoportaria.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
public class Acesso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime data;

    @Enumerated(EnumType.STRING)
    private TipoAcesso tipo;

    @Enumerated(EnumType.STRING)
    private TipoMovimento tipoMovimento;

    @ManyToOne
    private Morador morador;

    private String documento;

    private String destino;

    public enum TipoAcesso {
        MORADOR, VISITANTE, PRESTADOR
    }

    public enum TipoMovimento {
        ENTRADA, SAIDA
    }
}
