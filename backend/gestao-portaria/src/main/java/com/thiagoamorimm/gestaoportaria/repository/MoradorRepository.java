package com.thiagoamorimm.gestaoportaria.repository;

import com.thiagoamorimm.gestaoportaria.model.Morador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MoradorRepository extends JpaRepository<Morador, Long> {
    Morador findByCpf(String cpf);

    Morador findByEmail(String email);

    Morador findByApartamentoAndBloco(String apartamento, String bloco);

    Optional<Morador> findByVeiculosPlaca(String placa);

    @Query("""
                SELECT COUNT(DISTINCT m.id) FROM Morador m
                INNER JOIN Acesso a ON a.morador.id = m.id
                WHERE a.tipo = 'MORADOR'
                AND a.id IN (
                    SELECT MAX(a2.id)
                    FROM Acesso a2
                    WHERE a2.morador.id = m.id
                    AND a2.data >= CURRENT_DATE
                    GROUP BY a2.morador.id
                )
                AND a.tipoMovimento = 'ENTRADA'
                AND a.data >= CURRENT_DATE
            """)
    long countMoradoresPresentes();
}
