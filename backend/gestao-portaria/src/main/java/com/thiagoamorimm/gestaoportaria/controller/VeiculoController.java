package com.thiagoamorimm.gestaoportaria.controller;

import com.thiagoamorimm.gestaoportaria.model.Veiculo;
import com.thiagoamorimm.gestaoportaria.service.VeiculoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/veiculos")
@RequiredArgsConstructor
@Tag(name = "Veículos", description = "Gerencia o cadastro de veículos autorizados")
public class VeiculoController {

    private final VeiculoService veiculoService;

    @PostMapping
    @Operation(summary = "Cadastrar novo veículo", description = "Registra um novo veículo autorizado no sistema")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Veículo cadastrado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos ou placa já existente")
    })
    public ResponseEntity<Veiculo> cadastrarVeiculo(
            @Parameter(description = "Dados completos do veículo", required = true) @RequestBody Veiculo veiculo) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(veiculoService.save(veiculo));
    }

    @GetMapping
    public ResponseEntity<List<Veiculo>> listarVeiculos() {
        return ResponseEntity.ok(veiculoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veiculo> buscarVeiculoPorId(@PathVariable Long id) {
        return veiculoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Veiculo> atualizarVeiculo(
            @PathVariable Long id, @RequestBody Veiculo veiculo) {
        return ResponseEntity.ok(veiculoService.update(id, veiculo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVeiculo(@PathVariable Long id) {
        veiculoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/entrada-saida")
    public ResponseEntity<Veiculo> registrarEntradaSaida(@PathVariable Long id) {
        return ResponseEntity.ok(veiculoService.registrarEntradaSaida(id));
    }

    @GetMapping("/presentes")
    public ResponseEntity<Long> contarVeiculosPresentes() {
        return ResponseEntity.ok(veiculoService.countByPresente(true));
    }

    @GetMapping("/vagas")
    public ResponseEntity<Long> obterTotalVagas() {
        return ResponseEntity.ok(veiculoService.getTotalVagas());
    }
}
