package com.thiagoamorimm.gestaoportaria.service;

import com.thiagoamorimm.gestaoportaria.model.Ocorrencia;
import com.thiagoamorimm.gestaoportaria.repository.OcorrenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OcorrenciaService {

    @Autowired
    private OcorrenciaRepository ocorrenciaRepository;

    @Transactional(readOnly = true)
    public List<Ocorrencia> findAll() {
        return ocorrenciaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Ocorrencia> findById(Long id) {
        return ocorrenciaRepository.findById(id);
    }

    @Transactional
    public Ocorrencia save(Ocorrencia ocorrencia) {
        validarOcorrencia(ocorrencia);
        if (ocorrencia.getData() == null) {
            ocorrencia.setData(LocalDateTime.now());
        }
        // Status inicial é sempre pendente
        if (ocorrencia.getStatus() == null) {
            ocorrencia.setStatus(Ocorrencia.StatusOcorrencia.PENDENTE);
        }
        return ocorrenciaRepository.save(ocorrencia);
    }

    @Transactional
    public Ocorrencia update(Long id, Ocorrencia ocorrencia) {
        if (!ocorrenciaRepository.existsById(id)) {
            throw new RuntimeException("Ocorrência não encontrada");
        }
        ocorrencia.setId(id);
        validarOcorrencia(ocorrencia);
        return ocorrenciaRepository.save(ocorrencia);
    }

    @Transactional
    public Ocorrencia atualizarStatus(Long id, Ocorrencia.StatusOcorrencia novoStatus) {
        Ocorrencia ocorrencia = ocorrenciaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Ocorrência não encontrada"));
        
        ocorrencia.setStatus(novoStatus);
        return ocorrenciaRepository.save(ocorrencia);
    }

    @Transactional
    public void delete(Long id) {
        if (!ocorrenciaRepository.existsById(id)) {
            throw new RuntimeException("Ocorrência não encontrada");
        }
        ocorrenciaRepository.deleteById(id);
    }

    private void validarOcorrencia(Ocorrencia ocorrencia) {
        if (ocorrencia.getTipo() == null || ocorrencia.getTipo().trim().isEmpty()) {
            throw new RuntimeException("Tipo da ocorrência é obrigatório");
        }
        if (ocorrencia.getLocal() == null || ocorrencia.getLocal().trim().isEmpty()) {
            throw new RuntimeException("Local é obrigatório");
        }
        if (ocorrencia.getDescricao() == null || ocorrencia.getDescricao().trim().isEmpty()) {
            throw new RuntimeException("Descrição é obrigatória");
        }
    }

    public List<Ocorrencia> findTop3ByOrderByDataDesc() {
        return ocorrenciaRepository.findTop3ByOrderByDataDesc();
    }
}
