package com.thiagoamorimm.gestaoportaria.controller;

import com.thiagoamorimm.gestaoportaria.model.Morador;
import com.thiagoamorimm.gestaoportaria.service.MoradorService;
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
@RequestMapping("/api/moradores")
@RequiredArgsConstructor
@Tag(name = "Moradores", description = "Gerencia o cadastro de moradores do condomínio")
public class MoradorController {

    private final MoradorService moradorService;

    @PostMapping
    public ResponseEntity<Morador> cadastrarMorador(@RequestBody Morador morador) {
        try {
            System.out.println("Recebendo requisição para cadastrar morador: " + morador);
            Morador savedMorador = moradorService.save(morador);
            System.out.println("Morador cadastrado com sucesso: " + savedMorador);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(savedMorador);
        } catch (Exception e) {
            System.err.println("Erro ao cadastrar morador: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping
    public ResponseEntity<List<Morador>> listarMoradores() {
        try {
            System.out.println("Recebendo requisição para listar moradores");
            List<Morador> moradores = moradorService.findAll();
            System.out.println("Moradores encontrados: " + moradores.size());
            return ResponseEntity.ok(moradores);
        } catch (Exception e) {
            System.err.println("Erro ao listar moradores: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Morador> buscarMoradorPorId(@PathVariable Long id) {
        return moradorService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Morador> atualizarMorador(
            @PathVariable Long id, @RequestBody Morador morador) {
        return ResponseEntity.ok(moradorService.update(id, morador));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarMorador(@PathVariable Long id) {
        moradorService.deletarMorador(id);
        return ResponseEntity.noContent().build();
    }
}
