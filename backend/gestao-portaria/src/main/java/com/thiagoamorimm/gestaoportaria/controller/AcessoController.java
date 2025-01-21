package com.thiagoamorimm.gestaoportaria.controller;

import com.thiagoamorimm.gestaoportaria.exception.AcessoInvalidoException;
import com.thiagoamorimm.gestaoportaria.model.Acesso;
import com.thiagoamorimm.gestaoportaria.service.AcessoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/acessos")
@RequiredArgsConstructor
@Tag(name = "Acessos", description = "Gerencia o registro e consulta de acessos")
public class AcessoController {

    private final AcessoService acessoService;

    @PostMapping
    @Operation(summary = "Registrar novo acesso", description = "Cria um novo registro de acesso com validação de dados")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Acesso registrado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos ou incompletos")
    })
    public ResponseEntity<Acesso> cadastrarAcesso(
            @Parameter(description = "Objeto Acesso com dados para registro", required = true) @RequestBody Acesso acesso) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(acessoService.save(acesso));
        } catch (AcessoInvalidoException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Acesso>> listarAcessos() {
        return ResponseEntity.ok(acessoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Acesso> buscarAcessoPorId(@PathVariable Long id) {
        return acessoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Acesso> atualizarAcesso(
            @PathVariable Long id, @RequestBody Acesso acesso) {
        try {
            return ResponseEntity.ok(acessoService.update(id, acesso));
        } catch (AcessoInvalidoException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAcesso(@PathVariable Long id) {
        acessoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/recentes")
    public ResponseEntity<List<Acesso>> listarAcessosRecentes() {
        return ResponseEntity.ok(acessoService.findTop4ByOrderByDataDesc());
    }

    @GetMapping("/contagem")
    public ResponseEntity<Long> contarAcessosPorPeriodo(
            @RequestParam String inicio, @RequestParam String fim) {
        return ResponseEntity.ok(acessoService.countByDataBetween(
                LocalDateTime.parse(inicio), LocalDateTime.parse(fim)));
    }
}
