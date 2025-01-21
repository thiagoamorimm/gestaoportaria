package com.thiagoamorimm.gestaoportaria.repository;

import com.thiagoamorimm.gestaoportaria.model.Acesso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AcessoRepository extends JpaRepository<Acesso, Long> {
    long countByDataBetween(LocalDateTime inicio, LocalDateTime fim);
    List<Acesso> findTop4ByOrderByDataDesc();
}
