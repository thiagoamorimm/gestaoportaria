package com.thiagoamorimm.gestaoportaria.controller;

import com.thiagoamorimm.gestaoportaria.exception.ControleAcessoException;
import com.thiagoamorimm.gestaoportaria.model.ControleAcesso;
import com.thiagoamorimm.gestaoportaria.service.ControleAcessoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/controle-acessos")
@RequiredArgsConstructor
public class ControleAcessoController {

    @ExceptionHandler(ControleAcessoException.class)
    public ResponseEntity<Map<String, String>> handleControleAcessoException(ControleAcessoException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", ex.getMessage()));
    }

    private final ControleAcessoService controleAcessoService;

    @GetMapping
    public ResponseEntity<List<ControleAcesso>> listarTodosAcessos() {
        return ResponseEntity.ok(controleAcessoService.listarHistoricoAcessos(null, null));
    }

    @GetMapping("/em-transito")
    public ResponseEntity<List<ControleAcesso>> listarAcessosEmTransito() {
        return ResponseEntity.ok(controleAcessoService.listarAcessosEmTransito());
    }

    @PostMapping("/entrada-morador")
    public ResponseEntity<ControleAcesso> registrarEntradaMorador(@RequestParam String placa) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(controleAcessoService.registrarEntradaMorador(placa));
        } catch (IllegalArgumentException e) {
            throw new ControleAcessoException(e.getMessage());
        }
    }

    @PostMapping("/entrada-visitante")
    public ResponseEntity<ControleAcesso> registrarEntradaVisitante(
            @RequestParam String placa, @RequestParam Long moradorId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(controleAcessoService.registrarEntradaVisitante(placa, moradorId));
    }

    @PostMapping("/{id}/saida")
    public ResponseEntity<ControleAcesso> registrarSaida(@PathVariable Long id) {
        return ResponseEntity.ok(controleAcessoService.registrarSaida(id));
    }

    @GetMapping("/historico")
    public ResponseEntity<List<ControleAcesso>> listarHistoricoAcessos(
            @RequestParam(required = false) String placa,
            @RequestParam(required = false) Long moradorId) {
        return ResponseEntity.ok(controleAcessoService.listarHistoricoAcessos(placa, moradorId));
    }

    @GetMapping(value = "/relatorio-csv", produces = "text/csv")
    public ResponseEntity<byte[]> gerarRelatorioCsv() throws IOException {
        List<ControleAcesso> acessos = controleAcessoService.listarHistoricoAcessos(null, null);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PrintWriter writer = new PrintWriter(outputStream);

        // Escrever cabeçalho
        writer.println("ID,Placa,Tipo,Morador,Data Entrada,Data Saida");

        // Escrever dados
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        for (ControleAcesso acesso : acessos) {
            writer.println(String.join(",",
                    acesso.getId().toString(),
                    acesso.getPlaca(),
                    acesso.getTipoAcesso().toString(),
                    acesso.getMorador().getNome(),
                    acesso.getDataHoraEntrada().format(formatter),
                    acesso.getDataHoraSaida() != null ? acesso.getDataHoraSaida().format(formatter) : ""));
        }

        writer.flush();
        byte[] csvBytes = outputStream.toByteArray();
        writer.close();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/csv"));
        headers.setContentDispositionFormData("attachment", "relatorio_acessos.csv");
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

        return new ResponseEntity<>(csvBytes, headers, HttpStatus.OK);
    }
}
