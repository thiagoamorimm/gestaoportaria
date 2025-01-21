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
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export interface Morador {
  id: number;
  nome: string;
  apartamento: string;
}

export interface Encomenda {
  id?: number;
  codigoRastreio: string;
  descricao: string;
  dataRecebimento: string;
  dataRetirada?: string;
  retirada: boolean;
  morador?: Morador;
}

const Encomendas: React.FC = () => {
  const [encomenda, setEncomenda] = useState<Encomenda>({
    codigoRastreio: '',
    descricao: '',
    dataRecebimento: new Date().toISOString().slice(0, 16),
    retirada: false,
    morador: undefined
  });

  const [encomendas, setEncomendas] = useState<Encomenda[]>([]);
  const [moradores, setMoradores] = useState<Morador[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEncomendas();
    fetchMoradores();
  }, []);

  const fetchEncomendas = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/encomendas');
      setEncomendas(response.data);
    } catch (err) {
      setError('Erro ao carregar encomendas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoradores = async () => {
    try {
      const response = await api.get('/api/moradores');
      setMoradores(response.data);
    } catch (err) {
      setError('Erro ao carregar moradores');
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/api/encomendas', encomenda);
      setEncomendas([...encomendas, response.data]);
      setEncomenda({
        codigoRastreio: '',
        descricao: '',
        dataRecebimento: new Date().toISOString().slice(0, 16),
        retirada: false,
        morador: undefined
      });
    } catch (err) {
      setError('Erro ao cadastrar encomenda');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/encomendas/${id}`);
      setEncomendas(encomendas.filter(e => e.id !== id));
    } catch (err) {
      setError('Erro ao excluir encomenda');
      console.error(err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEncomenda({ ...encomenda, [name]: value });
  };

  const handleMoradorChange = (e: any) => {
    const moradorId = e.target.value;
    const selectedMorador = moradores.find(m => m.id === moradorId);
    setEncomenda({ ...encomenda, morador: selectedMorador || undefined });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Controle de Encomendas
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Código de Rastreio"
                name="codigoRastreio"
                value={encomenda.codigoRastreio}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Descrição"
                name="descricao"
                value={encomenda.descricao}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Data de Recebimento"
                name="dataRecebimento"
                value={encomenda.dataRecebimento}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="morador-label">Morador</InputLabel>
                <Select
                  labelId="morador-label"
                  value={encomenda.morador?.id || ''}
                  label="Morador"
                  onChange={handleMoradorChange}
                >
                  {moradores && moradores.map((morador) => (
                    <MenuItem key={morador.id} value={morador.id}>
                      {morador.nome} - Apt {morador.apartamento}
                    </MenuItem>
                  ))}
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código de Rastreio</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Data de Recebimento</TableCell>
              <TableCell>Morador</TableCell>
              <TableCell>Apartamento</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data de Retirada</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {encomendas.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.codigoRastreio}</TableCell>
                <TableCell>{item.descricao}</TableCell>
                <TableCell>{new Date(item.dataRecebimento).toLocaleString()}</TableCell>
                <TableCell>{item.morador?.nome || '-'}</TableCell>
                <TableCell>{item.morador?.apartamento || '-'}</TableCell>
                <TableCell>
                  <Chip
                    label={item.retirada ? 'Retirada' : 'Pendente'}
                    color={item.retirada ? 'success' : 'warning'}
                  />
                </TableCell>
                <TableCell>
                  {item.dataRetirada ? new Date(item.dataRetirada).toLocaleString() : '-'}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(item.id!)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Encomendas;
