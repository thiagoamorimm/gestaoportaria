package com.thiagoamorimm.gestaoportaria.service;

import com.thiagoamorimm.gestaoportaria.model.Veiculo;
import com.thiagoamorimm.gestaoportaria.repository.VeiculoRepository;
import com.thiagoamorimm.gestaoportaria.repository.MoradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class VeiculoService {

    @Value("${portaria.vagas.total:50}")
    private long totalVagas;

    @Autowired
    private VeiculoRepository veiculoRepository;

    @Autowired
    private MoradorRepository moradorRepository;

    @Transactional(readOnly = true)
    public List<Veiculo> findAll() {
        return veiculoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Veiculo> findById(Long id) {
        return veiculoRepository.findById(id);
    }

    @Transactional
    public Veiculo save(Veiculo veiculo) {
        validarVeiculo(veiculo);
        // Por padrão, veículo está presente quando cadastrado
        veiculo.setPresente(true);
        return veiculoRepository.save(veiculo);
    }

    @Transactional
    public Veiculo update(Long id, Veiculo veiculo) {
        if (!veiculoRepository.existsById(id)) {
            throw new RuntimeException("Veículo não encontrado");
        }
        veiculo.setId(id);
        validarVeiculo(veiculo);
        return veiculoRepository.save(veiculo);
    }

    @Transactional
    public Veiculo registrarEntradaSaida(Long id) {
        Veiculo veiculo = veiculoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));
        
        // Inverte o status presente/ausente
        veiculo.setPresente(!veiculo.isPresente());
        return veiculoRepository.save(veiculo);
    }

    @Transactional
    public void delete(Long id) {
        if (!veiculoRepository.existsById(id)) {
            throw new RuntimeException("Veículo não encontrado");
        }
        veiculoRepository.deleteById(id);
    }

    private void validarVeiculo(Veiculo veiculo) {
        if (veiculo.getPlaca() == null || veiculo.getPlaca().trim().isEmpty()) {
            throw new RuntimeException("Placa é obrigatória");
        }
        if (veiculo.getModelo() == null || veiculo.getModelo().trim().isEmpty()) {
            throw new RuntimeException("Modelo é obrigatório");
        }
        if (veiculo.getCor() == null || veiculo.getCor().trim().isEmpty()) {
            throw new RuntimeException("Cor é obrigatória");
        }
        if (veiculo.getMorador() == null || veiculo.getMorador().getId() == null) {
            throw new RuntimeException("Morador é obrigatório");
        }
        if (!moradorRepository.existsById(veiculo.getMorador().getId())) {
            throw new RuntimeException("Morador não encontrado");
        }
        if (veiculo.getVaga() == null || veiculo.getVaga().trim().isEmpty()) {
            throw new RuntimeException("Vaga é obrigatória");
        }

        // Validar formato da placa (Mercosul ou antiga)
        String placaPattern = "^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$";
        if (!veiculo.getPlaca().matches(placaPattern)) {
            throw new RuntimeException("Formato de placa inválido");
        }
    }

    public long countByPresente(boolean presente) {
        return veiculoRepository.countByPresente(presente);
    }

    public long getTotalVagas() {
        return totalVagas;
    }
}
