package com.thiagoamorimm.gestaoportaria.service;

import com.thiagoamorimm.gestaoportaria.model.ControleAcesso;
import com.thiagoamorimm.gestaoportaria.model.Morador;
import com.thiagoamorimm.gestaoportaria.exception.ControleAcessoException;
import com.thiagoamorimm.gestaoportaria.repository.ControleAcessoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ControleAcessoService {

    private final ControleAcessoRepository controleAcessoRepository;
    private final MoradorService moradorService;

    @Transactional
    public ControleAcesso registrarEntradaMorador(String placa) {
        System.out.println("Iniciando registro de entrada de morador com placa: " + placa);
        if (placa == null || placa.trim().isEmpty()) {
            throw new IllegalArgumentException("Placa não pode ser nula ou vazia");
        }

        return moradorService.buscarPorPlaca(placa)
                .map(veiculo -> {
                    if (veiculo.getMorador() == null) {
                        throw new RuntimeException("Veículo não está associado a nenhum morador");
                    }

                    System.out.println("Morador encontrado: " + veiculo.getMorador().getNome());
                    ControleAcesso acesso = new ControleAcesso(
                            placa,
                            ControleAcesso.TipoAcesso.MORADOR,
                            veiculo.getMorador());
                    acesso.setDataHoraEntrada(LocalDateTime.now());

                    try {
                        ControleAcesso saved = controleAcessoRepository.save(acesso);
                        System.out.println("Controle de acesso salvo com sucesso. ID=" + saved.getId());
                        return saved;
                    } catch (Exception e) {
                        System.err.println("Erro ao salvar controle de acesso: " + e.getMessage());
                        e.printStackTrace();
                        throw e;
                    }
                })
                .orElseThrow(() -> new ControleAcessoException("Nenhum veículo encontrado com a placa: " + placa));
    }

    @Transactional
    public ControleAcesso registrarEntradaVisitante(String placa, Long moradorId) {
        Morador morador = moradorService.buscarPorId(moradorId)
                .orElseThrow(() -> new RuntimeException("Morador não encontrado"));

        ControleAcesso acesso = new ControleAcesso(placa,
                ControleAcesso.TipoAcesso.VISITANTE, morador);
        acesso.setDataHoraEntrada(LocalDateTime.now());

        return controleAcessoRepository.save(acesso);
    }

    @Transactional
    public ControleAcesso registrarSaida(Long id) {
        ControleAcesso acesso = controleAcessoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registro de acesso não encontrado"));

        acesso.setDataHoraSaida(LocalDateTime.now());
        return controleAcessoRepository.save(acesso);
    }

    @Transactional
    public List<ControleAcesso> listarAcessosEmTransito() {
        return controleAcessoRepository.findByDataHoraSaidaIsNull();
    }

    @Transactional
    public List<ControleAcesso> listarHistoricoAcessos(String placa, Long moradorId) {
        if (placa != null) {
            return controleAcessoRepository.findByPlaca(placa);
        }
        if (moradorId != null) {
            return controleAcessoRepository.findByMoradorId(moradorId);
        }
        return controleAcessoRepository.findAll();
    }

    @Transactional
    public long countByTipoAcesso(ControleAcesso.TipoAcesso tipo) {
        return controleAcessoRepository.countByTipoAcesso(tipo);
    }

    @Transactional
    public long countByDataHoraEntradaBetween(LocalDateTime inicio, LocalDateTime fim) {
        return controleAcessoRepository.countByDataHoraEntradaBetween(inicio, fim);
    }

    @Transactional
    public List<ControleAcesso> findTop5ByOrderByDataHoraEntradaDesc() {
        return controleAcessoRepository.findTop5ByOrderByDataHoraEntradaDesc();
    }

    @Transactional
    public Map<String, Long> getRelatorioAcessos() {
        Map<String, Long> relatorio = new HashMap<>();
        relatorio.put("total", controleAcessoRepository.count());
        relatorio.put("moradores", countByTipoAcesso(ControleAcesso.TipoAcesso.MORADOR));
        relatorio.put("visitantes", countByTipoAcesso(ControleAcesso.TipoAcesso.VISITANTE));
        return relatorio;
    }
}
