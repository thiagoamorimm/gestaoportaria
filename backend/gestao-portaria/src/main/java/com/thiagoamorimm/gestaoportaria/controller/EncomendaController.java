package com.thiagoamorimm.gestaoportaria.controller;

import com.thiagoamorimm.gestaoportaria.model.Encomenda;
import com.thiagoamorimm.gestaoportaria.service.EncomendaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/encomendas")
@RequiredArgsConstructor
public class EncomendaController {

    private final EncomendaService encomendaService;

    @PostMapping
    public ResponseEntity<Encomenda> cadastrarEncomenda(@RequestBody Encomenda encomenda) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(encomendaService.save(encomenda));
    }

    @GetMapping
    public ResponseEntity<List<Encomenda>> listarEncomendas(
            @RequestParam(required = false) Boolean retirada) {
        if (retirada != null) {
            return ResponseEntity.ok(encomendaService.findByRetirada(retirada));
        }
        return ResponseEntity.ok(encomendaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Encomenda> buscarEncomendaPorId(@PathVariable Long id) {
        return encomendaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Encomenda> atualizarEncomenda(
            @PathVariable Long id, @RequestBody Encomenda encomenda) {
        return ResponseEntity.ok(encomendaService.update(id, encomenda));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEncomenda(@PathVariable Long id) {
        encomendaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/retirada")
    public ResponseEntity<Encomenda> registrarRetirada(@PathVariable Long id) {
        return ResponseEntity.ok(encomendaService.registrarRetirada(id));
    }

    @GetMapping("/pendentes")
    public ResponseEntity<List<Encomenda>> listarEncomendasPendentes() {
        return ResponseEntity.ok(encomendaService.findTop3ByOrderByDataRecebimentoDesc());
    }

    @GetMapping("/debug")
    public ResponseEntity<Map<String, Object>> debugInfo() {
        List<Encomenda> encomendas = encomendaService.findAll();
        Map<String, Object> debug = new HashMap<>();
        debug.put("totalEncomendas", encomendas.size());
        debug.put("encomendas", encomendas.stream().map(e -> Map.of(
            "id", e.getId(),
            "descricao", e.getDescricao(),
            "morador", e.getMorador() != null ? e.getMorador().getNome() : "Sem morador",
            "dataRecebimento", e.getDataRecebimento(),
            "retirada", e.isRetirada()
        )).collect(Collectors.toList()));
        return ResponseEntity.ok(debug);
    }
}
