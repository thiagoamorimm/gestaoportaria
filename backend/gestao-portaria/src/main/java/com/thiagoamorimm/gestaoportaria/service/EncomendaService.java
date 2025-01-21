package com.thiagoamorimm.gestaoportaria.service;

import com.thiagoamorimm.gestaoportaria.model.Encomenda;
import com.thiagoamorimm.gestaoportaria.repository.EncomendaRepository;
import com.thiagoamorimm.gestaoportaria.repository.MoradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EncomendaService {

    @Autowired
    private EncomendaRepository encomendaRepository;

    @Autowired
    private MoradorRepository moradorRepository;

    @Transactional(readOnly = true)
    public List<Encomenda> findAll() {
        List<Encomenda> encomendas = encomendaRepository.findAll();
        System.out.println("Total de encomendas encontradas: " + encomendas.size());
        encomendas.forEach(e -> System.out.println("Encomenda: ID=" + e.getId() + 
            ", Descrição=" + e.getDescricao() + 
            ", Morador=" + (e.getMorador() != null ? e.getMorador().getNome() : "Sem morador") +
            ", Retirada=" + e.isRetirada()));
        return encomendas;
    }

    @Transactional(readOnly = true)
    public Optional<Encomenda> findById(Long id) {
        return encomendaRepository.findById(id);
    }

    @Transactional
    public Encomenda save(Encomenda encomenda) {
        System.out.println("Iniciando salvamento de encomenda");
        validarEncomenda(encomenda);
        if (encomenda.getDataRecebimento() == null) {
            encomenda.setDataRecebimento(LocalDateTime.now());
        }
        // Inicialmente não retirada
        encomenda.setRetirada(false);
        encomenda.setDataRetirada(null);
        
        try {
            System.out.println("Tentando salvar encomenda: " + 
                "Descrição=" + encomenda.getDescricao() + 
                ", Morador=" + (encomenda.getMorador() != null ? encomenda.getMorador().getNome() : "Sem morador"));
            Encomenda saved = encomendaRepository.save(encomenda);
            System.out.println("Encomenda salva com sucesso. ID=" + saved.getId());
            return saved;
        } catch (Exception e) {
            System.err.println("Erro ao salvar encomenda: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Transactional
    public Encomenda update(Long id, Encomenda encomenda) {
        if (!encomendaRepository.existsById(id)) {
            throw new RuntimeException("Encomenda não encontrada");
        }
        encomenda.setId(id);
        validarEncomenda(encomenda);
        return encomendaRepository.save(encomenda);
    }

    @Transactional
    public Encomenda registrarRetirada(Long id) {
        Encomenda encomenda = encomendaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Encomenda não encontrada"));

        if (encomenda.isRetirada()) {
            throw new RuntimeException("Encomenda já foi retirada");
        }

        encomenda.setRetirada(true);
        encomenda.setDataRetirada(LocalDateTime.now());
        return encomendaRepository.save(encomenda);
    }

    @Transactional
    public void delete(Long id) {
        if (!encomendaRepository.existsById(id)) {
            throw new RuntimeException("Encomenda não encontrada");
        }
        encomendaRepository.deleteById(id);
    }

    private void validarEncomenda(Encomenda encomenda) {
        if (encomenda.getMorador() == null || encomenda.getMorador().getId() == null) {
            throw new RuntimeException("Morador é obrigatório");
        }

        if (!moradorRepository.existsById(encomenda.getMorador().getId())) {
            throw new RuntimeException("Morador não encontrado");
        }

        if (encomenda.getDescricao() == null || encomenda.getDescricao().trim().isEmpty()) {
            throw new RuntimeException("Descrição é obrigatória");
        }
    }

    public List<Encomenda> findTop3ByOrderByDataRecebimentoDesc() {
        return encomendaRepository.findTop3ByOrderByDataRecebimentoDesc();
    }

    public long countByRetirada(boolean retirada) {
        return encomendaRepository.countByRetirada(retirada);
    }

    @Transactional(readOnly = true)
    public List<Encomenda> findByRetirada(boolean retirada) {
        return encomendaRepository.findByRetirada(retirada);
    }
}
