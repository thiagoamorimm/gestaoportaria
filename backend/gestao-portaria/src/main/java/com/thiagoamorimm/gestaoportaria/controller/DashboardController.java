package com.thiagoamorimm.gestaoportaria.controller;

import com.thiagoamorimm.gestaoportaria.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private MoradorService moradorService;

    @Autowired
    private VeiculoService veiculoService;

    @Autowired
    private EncomendaService encomendaService;

    @Autowired
    private AcessoService acessoService;

    @Autowired
    private OcorrenciaService ocorrenciaService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDashboardData() {
        Map<String, Object> dashboardData = new HashMap<>();
        LocalDateTime hoje = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);

        // Moradores
        long totalMoradores = moradorService.countTotal();
        long moradoresPresentes = moradorService.countPresentes();
        Map<String, Long> moradores = new HashMap<>();
        moradores.put("total", totalMoradores);
        moradores.put("presentes", moradoresPresentes);
        dashboardData.put("moradores", moradores);

        // Vagas
        long totalVagas = veiculoService.getTotalVagas(); // Configurado no application.properties
        long vagasOcupadas = veiculoService.countByPresente(true);
        Map<String, Long> vagas = new HashMap<>();
        vagas.put("total", totalVagas);
        vagas.put("ocupadas", vagasOcupadas);
        dashboardData.put("vagas", vagas);

        // Encomendas
        long encomendasPendentes = encomendaService.countByRetirada(false);
        dashboardData.put("encomendas", Map.of(
            "pendentes", encomendasPendentes,
            "ultimasEncomendas", encomendaService.findTop3ByOrderByDataRecebimentoDesc()
        ));

        // Acessos
        long acessosHoje = acessoService.countByDataBetween(hoje, LocalDateTime.now());
        dashboardData.put("acessos", Map.of(
            "hoje", acessosHoje,
            "ultimosAcessos", acessoService.findTop4ByOrderByDataDesc()
        ));

        // Ocorrências
        dashboardData.put("ocorrencias", ocorrenciaService.findTop3ByOrderByDataDesc());

        return ResponseEntity.ok(dashboardData);
    }
}
