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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Morador {
  id?: number;
  nome: string;
  apartamento: string;
  telefone: string;
  email?: string;
  bloco?: string;
  veiculos?: any[];
}

const Moradores: React.FC = () => {
  const [morador, setMorador] = useState<Morador>({
    nome: '',
    apartamento: '',
    telefone: '',
    email: '',
    bloco: ''
  });

  const [moradores, setMoradores] = useState<Morador[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [editingMorador, setEditingMorador] = useState<Morador | null>(null);
  const [moradorToDelete, setMoradorToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchMoradores = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/api/moradores');
        if (response.data) {
          const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
          if (Array.isArray(data)) {
            setMoradores(data);
          } else {
            setError('Formato de dados inválido recebido do servidor');
          }
        } else {
          setError('Nenhum dado recebido do servidor');
        }
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar moradores. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchMoradores();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/api/moradores', morador);
      setMoradores([...moradores, response.data]);
      setMorador({ nome: '', apartamento: '', telefone: '', email: '', bloco: '' });
    } catch (err) {
      setError('Erro ao cadastrar morador');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMorador({ ...morador, [e.target.name]: e.target.value });
  };

  const handleEdit = async (id: number) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/api/moradores/${id}`);
      if (response.data) {
        setEditingMorador(response.data);
        setEditModalOpen(true);
      } else {
        setError('Morador não encontrado');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar dados do morador');
      console.error('Erro ao editar morador:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMorador?.id) return;

    setLoading(true);
    try {
      const response = await api.put(`/api/moradores/${editingMorador.id}`, editingMorador);
      setMoradores(moradores.map(m => m.id === editingMorador.id ? response.data : m));
      setEditModalOpen(false);
    } catch (err) {
      setError('Erro ao atualizar morador');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    setError('');
    try {
      await api.delete(`/api/moradores/${id}`);
      setMoradores(moradores.filter(m => m.id !== id));
      setDeleteConfirmOpen(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao deletar morador');
      console.error('Erro ao deletar morador:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setMoradorToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (moradorToDelete) {
      handleDelete(moradorToDelete);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Modal de Edição */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Editar Morador</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                value={editingMorador?.nome || ''}
                onChange={(e) => editingMorador && setEditingMorador({
                  ...editingMorador,
                  nome: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Apartamento"
                value={editingMorador?.apartamento || ''}
                onChange={(e) => editingMorador && setEditingMorador({
                  ...editingMorador,
                  apartamento: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Telefone"
                value={editingMorador?.telefone || ''}
                onChange={(e) => editingMorador && setEditingMorador({
                  ...editingMorador,
                  telefone: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={editingMorador?.email || ''}
                onChange={(e) => editingMorador && setEditingMorador({
                  ...editingMorador,
                  email: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bloco"
                value={editingMorador?.bloco || ''}
                onChange={(e) => editingMorador && setEditingMorador({
                  ...editingMorador,
                  bloco: e.target.value
                })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Cancelar</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Confirmação de Exclusão */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir este morador? Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancelar</Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h4" sx={{ mb: 4 }}>Moradores</Typography>

      {/* Formulário de Cadastro */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Cadastrar Novo Morador</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nome"
                name="nome"
                value={morador.nome}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apartamento"
                name="apartamento"
                value={morador.apartamento}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Telefone"
                name="telefone"
                value={morador.telefone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={morador.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bloco"
                name="bloco"
                value={morador.bloco}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Mensagem de Erro */}
      {error && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: 'error.light' }}>
          <Typography color="error.contrastText">
            {error}
          </Typography>
        </Paper>
      )}

      {/* Loading */}
      <TableContainer component={Paper} sx={{ position: 'relative' }}>
        {loading && (
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 1
          }}>
            <CircularProgress />
          </Box>
        )}
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Apartamento</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Bloco</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {moradores.map((morador) => (
              <TableRow key={morador.id}>
                <TableCell>{morador.nome}</TableCell>
                <TableCell>{morador.apartamento}</TableCell>
                <TableCell>{morador.telefone}</TableCell>
                <TableCell>{morador.email}</TableCell>
                <TableCell>{morador.bloco}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => morador.id && handleEdit(morador.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => morador.id && handleDeleteClick(morador.id)}
                  >
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

export default Moradores;
