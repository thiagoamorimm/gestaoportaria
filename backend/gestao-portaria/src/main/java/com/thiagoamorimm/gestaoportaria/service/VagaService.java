package com.thiagoamorimm.gestaoportaria.service;

import com.thiagoamorimm.gestaoportaria.model.Vaga;
import com.thiagoamorimm.gestaoportaria.repository.VagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VagaService {

    @Autowired
    private VagaRepository vagaRepository;

    public List<Vaga> listarTodas() {
        return vagaRepository.findAll();
    }

    public Vaga salvar(Vaga vaga) {
        return vagaRepository.save(vaga);
    }

    public Vaga atualizar(Long id, Vaga vaga) {
        vaga.setId(id);
        return vagaRepository.save(vaga);
    }

    public void excluir(Long id) {
        vagaRepository.deleteById(id);
    }
}
