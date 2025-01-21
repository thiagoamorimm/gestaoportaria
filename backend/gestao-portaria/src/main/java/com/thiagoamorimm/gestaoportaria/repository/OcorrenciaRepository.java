package com.thiagoamorimm.gestaoportaria.repository;

import com.thiagoamorimm.gestaoportaria.model.Ocorrencia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OcorrenciaRepository extends JpaRepository<Ocorrencia, Long> {
    List<Ocorrencia> findTop3ByOrderByDataDesc();
}
