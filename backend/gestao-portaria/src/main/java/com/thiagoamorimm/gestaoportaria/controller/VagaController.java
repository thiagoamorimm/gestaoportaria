package com.thiagoamorimm.gestaoportaria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thiagoamorimm.gestaoportaria.model.Vaga;
import com.thiagoamorimm.gestaoportaria.service.VagaService;

@RestController
@RequestMapping("/api/vagas")
public class VagaController {

    @Autowired
    private VagaService vagaService;

    @GetMapping
    public ResponseEntity<List<Vaga>> listar() {
        List<Vaga> vagas = vagaService.listarTodas();
        return ResponseEntity.ok(vagas);
    }

    @PostMapping
    public ResponseEntity<Vaga> criar(@RequestBody Vaga vaga) {
        Vaga novaVaga = vagaService.salvar(vaga);
        return ResponseEntity.ok(novaVaga);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vaga> atualizar(@PathVariable Long id, @RequestBody Vaga vaga) {
        Vaga vagaAtualizada = vagaService.atualizar(id, vaga);
        return ResponseEntity.ok(vagaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        vagaService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
