package com.thiagoamorimm.gestaoportaria.repository;

import com.thiagoamorimm.gestaoportaria.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    long countByPresente(boolean presente);

    Optional<Veiculo> findById(Long id);

    Optional<Veiculo> findByPlaca(String placa);
}
