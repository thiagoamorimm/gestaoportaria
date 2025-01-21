package com.thiagoamorimm.gestaoportaria.controller;

import com.thiagoamorimm.gestaoportaria.model.Ocorrencia;
import com.thiagoamorimm.gestaoportaria.service.OcorrenciaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ocorrencias")
@RequiredArgsConstructor
public class OcorrenciaController {

    private final OcorrenciaService ocorrenciaService;

    @PostMapping
    public ResponseEntity<Ocorrencia> cadastrarOcorrencia(@RequestBody Ocorrencia ocorrencia) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ocorrenciaService.save(ocorrencia));
    }

    @GetMapping
    public ResponseEntity<List<Ocorrencia>> listarOcorrencias() {
        return ResponseEntity.ok(ocorrenciaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ocorrencia> buscarOcorrenciaPorId(@PathVariable Long id) {
        return ocorrenciaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ocorrencia> atualizarOcorrencia(
            @PathVariable Long id, @RequestBody Ocorrencia ocorrencia) {
        return ResponseEntity.ok(ocorrenciaService.update(id, ocorrencia));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarOcorrencia(@PathVariable Long id) {
        ocorrenciaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/atualizar-status")
    public ResponseEntity<Ocorrencia> atualizarStatusOcorrencia(
            @PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(ocorrenciaService.atualizarStatus(id,
                Ocorrencia.StatusOcorrencia.valueOf(status.toUpperCase())));
    }

    @GetMapping("/recentes")
    public ResponseEntity<List<Ocorrencia>> listarOcorrenciasRecentes() {
        return ResponseEntity.ok(ocorrenciaService.findTop3ByOrderByDataDesc());
    }
}
