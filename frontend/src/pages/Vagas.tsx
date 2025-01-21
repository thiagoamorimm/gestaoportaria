import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Morador {
  id: number;
  nome: string;
  apartamento: string;
}

interface Veiculo {
  id?: number;
  placa: string;
  modelo: string;
  cor: string;
  vaga: string;
  presente: boolean;
  morador: Morador | undefined;
  apartamento: string;
}

const Vagas: React.FC = () => {
  const [veiculo, setVeiculo] = useState<Veiculo>({
    id: 0,
    placa: '',
    modelo: '',
    cor: '',
    vaga: '',
    presente: true,
    morador: undefined,
    apartamento: ''
  });

  const [moradores, setMoradores] = useState<Morador[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMoradores, setLoadingMoradores] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVeiculos();
    fetchMoradores();
  }, []);

  const fetchVeiculos = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/veiculos');
      setVeiculos(response.data);
    } catch (err) {
      setError('Erro ao carregar veículos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoradores = async () => {
    setLoadingMoradores(true);
    try {
      const response = await api.get('/api/moradores');
      setMoradores(response.data);
      setError('');
    } catch (err) {
      setError('Erro ao carregar moradores');
      console.error(err);
    } finally {
      setLoadingMoradores(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Valida formato da placa
    const placaRegex = /^[A-Z]{3}\d[A-Z]\d{2}$|^[A-Z]{3}\d{4}$/;
    if (!placaRegex.test(veiculo.placa)) {
      setError('Formato de placa inválido. Use AAA1A11 ou AAA1234');
      return;
    }

    // Valida se o morador foi selecionado
    if (!veiculo.morador) {
      setError('Selecione um morador para o veículo');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/veiculos', veiculo);
      setVeiculos([...veiculos, response.data]);
      setVeiculo({
        id: 0,
        placa: '',
        modelo: '',
        cor: '',
        vaga: '',
        presente: true,
        morador: undefined,
        apartamento: ''
      });
      setError(''); // Limpa erros anteriores
      alert(`Veículo ${response.data.placa} cadastrado com sucesso!`);
    } catch (err) {
      setError('Erro ao cadastrar veículo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const veiculo = veiculos.find(v => v.id === id);
    if (!veiculo) return;

    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir o veículo ${veiculo.placa}?`
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/veiculos/${id}`);
      setVeiculos(veiculos.filter(v => v.id !== id));
      setError(''); // Limpa erros anteriores
    } catch (err) {
      setError('Erro ao excluir veículo. Tente novamente.');
      console.error(err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVeiculo({ ...veiculo, [name]: value });
  };

  const handleMoradorChange = (e: any) => {
    const moradorId = e.target.value;
    console.log('Selected morador ID:', moradorId);
    const selectedMorador = moradores.find(m => m.id === moradorId);
    console.log('Selected morador:', selectedMorador);
    setVeiculo({
      ...veiculo,
      morador: selectedMorador || undefined,
      apartamento: selectedMorador?.apartamento || ''
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Controle de Vagas
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Placa"
                name="placa"
                value={veiculo.placa}
                onChange={(e) => {
                  let value = e.target.value.toUpperCase();
                  // Remove caracteres inválidos e mantém apenas letras e números
                  value = value.replace(/[^A-Z0-9]/g, '');
                  // Limita o tamanho máximo
                  value = value.slice(0, 7); // 3 letras + 4 números/letras
                  setVeiculo({ ...veiculo, placa: value });
                  setError(''); // Limpa erro ao digitar
                }}
                required
                inputProps={{
                  maxLength: 7,
                  pattern: '[A-Z]{3}[0-9][A-Z0-9][0-9]{2}|[A-Z]{3}[0-9]{4}',
                }}
                helperText={error && error.includes('placa') ? error : "Formato: AAA1A11 ou AAA1234"}
                error={!!error && error.includes('placa')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Modelo"
                name="modelo"
                value={veiculo.modelo}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cor"
                name="cor"
                value={veiculo.cor}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Vaga"
                name="vaga"
                value={veiculo.vaga}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!error && error.includes('morador')}>
                <InputLabel>Morador</InputLabel>
                <Select
                  value={veiculo.morador?.id || ''}
                  label="Morador"
                  onChange={handleMoradorChange}
                  error={!!error && error.includes('morador')}
                  disabled={loadingMoradores}
                >
                  {loadingMoradores ? (
                    <MenuItem disabled>
                      <Box display="flex" alignItems="center">
                        <CircularProgress size={20} sx={{ mr: 2 }} />
                        Carregando moradores...
                      </Box>
                    </MenuItem>
                  ) : (
                    moradores.map((morador) => (
                      <MenuItem key={morador.id} value={morador.id}>
                        {morador.nome} - Apt {morador.apartamento}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'CADASTRAR'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <TableContainer component={Paper} sx={{ position: 'relative' }}>
        {loading && (
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}>
            <CircularProgress />
          </Box>
        )}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Placa</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Cor</TableCell>
              <TableCell>Vaga</TableCell>
              <TableCell>Morador</TableCell>
              <TableCell>Apartamento</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {veiculos.length > 0 ? (
              veiculos.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.placa}</TableCell>
                  <TableCell>{item.modelo}</TableCell>
                  <TableCell>{item.cor}</TableCell>
                  <TableCell>{item.vaga}</TableCell>
                  <TableCell>{item.morador?.nome || '-'}</TableCell>
                  <TableCell>{item.morador?.apartamento || '-'}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.presente ? 'Presente' : 'Ausente'}
                      color={item.presente ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(item.id!)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  {error ? (
                    <Typography color="error">{error}</Typography>
                  ) : (
                    <Typography>Nenhum veículo cadastrado</Typography>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Vagas;
