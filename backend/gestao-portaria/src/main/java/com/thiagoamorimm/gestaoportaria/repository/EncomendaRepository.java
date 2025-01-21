package com.thiagoamorimm.gestaoportaria.repository;

import com.thiagoamorimm.gestaoportaria.model.Encomenda;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EncomendaRepository extends JpaRepository<Encomenda, Long> {

    long countByRetirada(boolean retirada);

    List<Encomenda> findTop3ByOrderByDataRecebimentoDesc();

    List<Encomenda> findByRetirada(boolean retirada);
}
