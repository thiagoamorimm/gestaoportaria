import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Button,
  Grid
} from '@mui/material';

interface Acesso {
  id: number;
  morador: {
    nome: string;
    apartamento: string;
  };
  veiculo: {
    placa: string;
  };
  tipo: 'VISITANTE' | 'PRESTADOR' | 'MORADOR';
  data: string;
}

interface NovoAcesso {
  moradorId: number | null;
  placaVeiculo: string;
  cpfVisitante: string;
  tipo: 'VISITANTE' | 'PRESTADOR' | 'MORADOR';
  data: string;
  observacoes: string;
}

const Acessos: React.FC = () => {
  const [acessos, setAcessos] = useState<Acesso[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [moradores, setMoradores] = useState<any[]>([]);
  const [novoAcesso, setNovoAcesso] = useState<NovoAcesso>({
    moradorId: null,
    placaVeiculo: '',
    cpfVisitante: '',
    tipo: 'VISITANTE',
    data: new Date().toISOString().slice(0, 16),
    observacoes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!novoAcesso.moradorId || isNaN(novoAcesso.moradorId)) {
      setError('Selecione um morador válido');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        tipo: novoAcesso.tipo,
        data: new Date(novoAcesso.data).toISOString(),
        observacoes: novoAcesso.observacoes,
        morador: {
          id: Number(novoAcesso.moradorId)
        },
        veiculo: novoAcesso.placaVeiculo ? { placa: novoAcesso.placaVeiculo } : null,
        visitante: novoAcesso.cpfVisitante ? { cpf: novoAcesso.cpfVisitante } : null
      };

      await api.post('/api/acessos', payload);
      setNovoAcesso({
        moradorId: null,
        placaVeiculo: '',
        cpfVisitante: '',
        tipo: 'VISITANTE',
        data: new Date().toISOString().slice(0, 16),
        observacoes: ''
      });
      await fetchAcessos();
    } catch (err: any) {
      if (err.response?.data) {
        const serverError = err.response.data;
        // Trata erros de validação do Spring
        const errorMessage = serverError.errors
          ? Object.values(serverError.errors).join(', ')
          : serverError.message.replace('Ocorreu um erro no servidor: ', '');

        setError(errorMessage.includes('morador')
          ? 'Selecione um morador válido'
          : errorMessage);
      } else {
        setError('Erro ao registrar acesso - verifique os dados');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchMoradores = async () => {
      try {
        const response = await api.get('/api/moradores');
        setMoradores(response.data);
      } catch (err) {
        console.error('Erro ao carregar moradores:', err);
      }
    };

    fetchMoradores();
    fetchAcessos();
  }, []);

  const fetchAcessos = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/acessos');
      setAcessos(response.data);
    } catch (err) {
      setError('Erro ao carregar acessos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Registro de Acessos
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Formulário de Cadastro */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, p: 3, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>Novo Registro de Acesso</Typography>

        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <TextField
              label="Morador"
              select
              fullWidth
              variant="outlined"
              value={novoAcesso.moradorId}
              onChange={(e) => {
                const numericValue = parseInt(e.target.value, 10);
                setNovoAcesso({
                  ...novoAcesso,
                  moradorId: !isNaN(numericValue) ? numericValue : null
                });
              }}
            >
              <MenuItem value="" disabled>
                Selecione um morador
              </MenuItem>
              {moradores.map((morador) => (
                <MenuItem key={morador.id} value={morador.id}>
                  {morador.nome} - Apt {morador.apartamento}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              label="Placa do Veículo (opcional)"
              fullWidth
              variant="outlined"
              value={novoAcesso.placaVeiculo}
              onChange={(e) => setNovoAcesso({ ...novoAcesso, placaVeiculo: e.target.value })}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              label="CPF Visitante (se não houver veículo)"
              fullWidth
              variant="outlined"
              value={novoAcesso.cpfVisitante}
              onChange={(e) => setNovoAcesso({ ...novoAcesso, cpfVisitante: e.target.value })}
              disabled={!!novoAcesso.placaVeiculo}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              label="Tipo"
              select
              value={novoAcesso.tipo}
              onChange={(e) => setNovoAcesso({ ...novoAcesso, tipo: e.target.value as 'VISITANTE' | 'PRESTADOR' | 'MORADOR' })}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="VISITANTE">Visitante</MenuItem>
              <MenuItem value="PRESTADOR">Prestador de Serviço</MenuItem>
              <MenuItem value="MORADOR">Morador</MenuItem>
            </TextField>
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              label="Data/Hora"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={novoAcesso.data}
              onChange={(e) => setNovoAcesso({ ...novoAcesso, data: e.target.value })}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, width: '100%' }}
            >
              Registrar Acesso
            </Button>
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Morador</TableCell>
              <TableCell>Apartamento</TableCell>
              <TableCell>Veículo</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Data/Hora</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {acessos.map((acesso) => (
              <TableRow key={acesso.id}>
                <TableCell>{acesso.morador.nome}</TableCell>
                <TableCell>{acesso.morador.apartamento}</TableCell>
                <TableCell>{acesso.veiculo.placa}</TableCell>
                <TableCell>{acesso.tipo}</TableCell>
                <TableCell>
                  {new Date(acesso.data).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Acessos;
