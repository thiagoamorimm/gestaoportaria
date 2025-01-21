package com.thiagoamorimm.gestaoportaria.service;

import com.thiagoamorimm.gestaoportaria.exception.AcessoInvalidoException;
import com.thiagoamorimm.gestaoportaria.model.Acesso;
import com.thiagoamorimm.gestaoportaria.repository.AcessoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AcessoService {

    @Autowired
    private AcessoRepository acessoRepository;

    @Transactional(readOnly = true)
    public List<Acesso> findAll() {
        return acessoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Acesso> findById(Long id) {
        return acessoRepository.findById(id);
    }

    @Transactional
    public Acesso save(Acesso acesso) throws AcessoInvalidoException {
        validarAcesso(acesso);

        // Define a data atual se não fornecida
        if (acesso.getData() == null) {
            acesso.setData(LocalDateTime.now());
        }

        try {
            return acessoRepository.save(acesso);
        } catch (DataIntegrityViolationException e) {
            throw new AcessoInvalidoException("Erro ao salvar acesso - violação de integridade de dados");
        }
    }

    @Transactional
    public Acesso update(Long id, Acesso acesso) throws AcessoInvalidoException {
        if (!acessoRepository.existsById(id)) {
            throw new RuntimeException("Acesso não encontrado");
        }
        acesso.setId(id);
        validarAcesso(acesso);
        return acessoRepository.save(acesso);
    }

    @Transactional
    public void delete(Long id) {
        if (!acessoRepository.existsById(id)) {
            throw new RuntimeException("Acesso não encontrado");
        }
        acessoRepository.deleteById(id);
    }

    private void validarAcesso(Acesso acesso) throws AcessoInvalidoException {
        if (acesso.getMorador() == null) {
            throw new RuntimeException("Morador é obrigatório");
        }
        if (acesso.getTipo() == null) {
            throw new RuntimeException("Tipo de acesso é obrigatório");
        }
        if (acesso.getDestino() == null || acesso.getDestino().trim().isEmpty()) {
            throw new RuntimeException("Destino é obrigatório");
        }
        // Validar documento se for visitante ou prestador
        if (acesso.getTipo() != Acesso.TipoAcesso.MORADOR &&
                (acesso.getDocumento() == null || acesso.getDocumento().trim().isEmpty())) {
            throw new AcessoInvalidoException("Documento é obrigatório para visitantes e prestadores");
        }
    }

    public List<Acesso> findTop4ByOrderByDataDesc() {
        return acessoRepository.findTop4ByOrderByDataDesc();
    }

    public long countByDataBetween(LocalDateTime inicio, LocalDateTime fim) {
        return acessoRepository.countByDataBetween(inicio, fim);
    }
}