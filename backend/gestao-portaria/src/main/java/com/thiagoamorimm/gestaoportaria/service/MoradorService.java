package com.thiagoamorimm.gestaoportaria.service;

import com.thiagoamorimm.gestaoportaria.model.Morador;
import com.thiagoamorimm.gestaoportaria.model.Veiculo;
import com.thiagoamorimm.gestaoportaria.repository.MoradorRepository;
import com.thiagoamorimm.gestaoportaria.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MoradorService {

    @Autowired
    private MoradorRepository moradorRepository;

    @Autowired
    private VeiculoRepository veiculoRepository;

    @Transactional(readOnly = true)
    public List<Morador> findAll() {
        try {
            System.out.println("Buscando todos os moradores...");
            List<Morador> moradores = moradorRepository.findAll();
            System.out.println("Quantidade de moradores encontrados: " + moradores.size());
            return moradores;
        } catch (Exception e) {
            System.err.println("Erro ao buscar moradores: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Transactional(readOnly = true)
    public Optional<Morador> findById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID não pode ser nulo");
        }
        return moradorRepository.findById(id);
    }

    @Transactional
    public Morador save(Morador morador) {
        try {
            validarMorador(morador);
            Morador savedMorador = moradorRepository.save(morador);
            System.out.println("Morador salvo com sucesso: " + savedMorador);
            return savedMorador;
        } catch (Exception e) {
            System.err.println("Erro ao salvar morador: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public Optional<Veiculo> buscarPorPlaca(String placa) {
        if (placa == null || placa.trim().isEmpty()) {
            throw new IllegalArgumentException("Placa não pode ser vazia");
        }
        return veiculoRepository.findByPlaca(placa.toUpperCase());
    }

    @Transactional
    public Morador update(Long id, Morador morador) {
        if (!moradorRepository.existsById(id)) {
            throw new RuntimeException("Morador não encontrado");
        }
        morador.setId(id);
        validarMorador(morador);
        return moradorRepository.save(morador);
    }

    @Transactional
    public void delete(Long id) {
        if (!moradorRepository.existsById(id)) {
            throw new RuntimeException("Morador não encontrado");
        }
        moradorRepository.deleteById(id);
    }

    private void validarMorador(Morador morador) {
        if (morador.getNome() == null || morador.getNome().trim().isEmpty()) {
            throw new RuntimeException("Nome do morador é obrigatório");
        }
        if (morador.getApartamento() == null || morador.getApartamento().trim().isEmpty()) {
            throw new RuntimeException("Apartamento é obrigatório");
        }
        if (morador.getTelefone() == null || morador.getTelefone().trim().isEmpty()) {
            throw new RuntimeException("Telefone é obrigatório");
        }
        // Validar formato do email se fornecido
        if (morador.getEmail() != null && !morador.getEmail().trim().isEmpty()) {
            if (!morador.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
                throw new RuntimeException("Email inválido");
            }
        }
    }

    public Optional<Morador> buscarPorId(Long id) {
        return moradorRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public long countTotal() {
        return moradorRepository.count();
    }

    @Transactional(readOnly = true)
    public long countPresentes() {
        // Busca moradores que entraram mas não saíram
        return moradorRepository.countMoradoresPresentes();
    }

    @Transactional(readOnly = true)
    public List<Morador> listarMoradores() {
        return moradorRepository.findAll();
    }

    @Transactional
    public void deletarMorador(Long id) {
        moradorRepository.deleteById(id);
    }

}
