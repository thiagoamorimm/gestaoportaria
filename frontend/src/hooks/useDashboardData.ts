import { useState, useEffect } from 'react';
import { getDashboardData } from '../services/api';

interface DashboardData {
  moradores: {
    total: number;
    presentes: number;
  };
  vagas: {
    total: number;
    ocupadas: number;
  };
  encomendas: {
    pendentes: number;
    ultimasEncomendas: Array<{
      id: number;
      morador: string;
      apto: string;
      transportadora: string;
      recebimento: string;
    }>;
  };
  acessos: {
    hoje: number;
    ultimosAcessos: Array<{
      id: number;
      nome: string;
      tipo: string;
      destino: string;
      horario: string;
    }>;
  };
  ocorrencias: Array<{
    id: number;
    tipo: string;
    local: string;
    status: string;
    horario: string;
  }>;
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const responseData = await getDashboardData();
      setData(responseData);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados do dashboard');
      console.error('Erro ao buscar dados do dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Atualiza os dados a cada 5 minutos
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: fetchDashboardData };
}
