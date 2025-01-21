package com.thiagoamorimm.gestaoportaria.repository;

import com.thiagoamorimm.gestaoportaria.model.ControleAcesso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ControleAcessoRepository extends JpaRepository<ControleAcesso, Long> {
    List<ControleAcesso> findByDataHoraSaidaIsNull();

    List<ControleAcesso> findByPlaca(String placa);

    List<ControleAcesso> findByMoradorId(Long moradorId);

    long countByTipoAcesso(ControleAcesso.TipoAcesso tipoAcesso);

    long countByDataHoraEntradaBetween(LocalDateTime inicio, LocalDateTime fim);

    List<ControleAcesso> findTop5ByOrderByDataHoraEntradaDesc();
}
