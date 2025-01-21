package com.thiagoamorimm.gestaoportaria.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
public class Ocorrencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo;
    private String descricao;
    private String local;
    private LocalDateTime data;

    @ManyToOne
    private Morador morador;

    @Enumerated(EnumType.STRING)
    private StatusOcorrencia status;

    public enum StatusOcorrencia {
        PENDENTE,
        EM_ANDAMENTO,
        CONCLUIDO,
        CANCELADO
    }
}
