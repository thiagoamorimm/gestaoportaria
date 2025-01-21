import axios from 'axios';
import { Morador, Encomenda, Veiculo, Acesso } from '../types';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para tratar erros
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);

        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);

            // Se o servidor retornou uma mensagem de erro, use-a
            if (error.response.data && error.response.data.message) {
                return Promise.reject(new Error(error.response.data.message));
            }
        }

        // Se não houver resposta do servidor
        if (!error.response) {
            return Promise.reject(new Error('Não foi possível conectar ao servidor. Verifique sua conexão.'));
        }

        return Promise.reject(error);
    }
);

// Exporta a instância da API
export { api };

export const getDashboardData = async (): Promise<any> => {
    const response = await api.get('/api/dashboard');
    return response.data;
};

export const getMoradores = async (): Promise<Morador[]> => {
    const response = await api.get('/api/moradores');
    return response.data;
};

export const getVeiculos = async (): Promise<Veiculo[]> => {
    const response = await api.get('/api/veiculos');
    return response.data;
};

export const getAcessos = async (): Promise<Acesso[]> => {
    const response = await api.get('/api/acessos');
    return response.data;
};

export const getEncomendas = async (): Promise<Encomenda[]> => {
    const response = await api.get('/api/encomendas');
    return response.data;
};

export const getOcorrencias = async (): Promise<any> => {
    const response = await api.get('/api/ocorrencias');
    return response.data;
};

export const createMorador = async (morador: Morador): Promise<Morador> => {
    const response = await api.post('/api/moradores', morador);
    return response.data;
};

export const updateMorador = async (id: number, morador: Morador): Promise<Morador> => {
    const response = await api.put(`/api/moradores/${id}`, morador);
    return response.data;
};

export const deleteMorador = async (id: number): Promise<void> => {
    await api.delete(`/api/moradores/${id}`);
};

export const createVeiculo = async (veiculo: Veiculo): Promise<Veiculo> => {
    const response = await api.post('/api/veiculos', veiculo);
    return response.data;
};

export const createEncomenda = async (encomenda: Encomenda): Promise<Encomenda> => {
    const response = await api.post('/api/encomendas', encomenda);
    return response.data;
};

export const createAcesso = async (acesso: Acesso): Promise<Acesso> => {
    const response = await api.post('/api/acessos', acesso);
    return response.data;
};

export const registrarEntradaMorador = async (placa: string): Promise<any> => {
    const response = await api.post('/api/controle-acessos/entrada-morador', null, {
        params: { placa }
    });
    return response.data;
};

export const registrarEntradaVisitante = async (placa: string, moradorId: number): Promise<any> => {
    const response = await api.post('/api/controle-acessos/entrada-visitante', null, {
        params: { placa, moradorId }
    });
    return response.data;
};

export const registrarSaida = async (id: number): Promise<any> => {
    const response = await api.post(`/api/controle-acessos/${id}/saida`);
    return response.data;
};

export const listarAcessosEmTransito = async (): Promise<any> => {
    const response = await api.get('/api/controle-acessos/em-transito');
    return response.data;
};

export const listarHistoricoAcessos = async (placa?: string, moradorId?: number): Promise<any> => {
    const response = await api.get('/api/controle-acessos/historico', {
        params: { placa, moradorId }
    });
    return response.data;
};
