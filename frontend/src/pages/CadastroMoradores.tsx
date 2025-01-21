import React, { useState, useEffect } from 'react';
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
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { api } from '../services/api';

interface MoradorForm {
    id?: number;
    nome: string;
    apartamento: string;
    telefone: string;
    email: string;
    placa?: string;
}

const CadastroMoradores: React.FC = () => {
    const [morador, setMorador] = useState<MoradorForm>({
        nome: '',
        apartamento: '',
        telefone: '',
        email: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validatePlaca = (placa: string) => {
        const regex = /^[A-Z]{3}\d[A-Z]\d{2}$|^[A-Z]{3}\d{4}$/;
        return regex.test(placa);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'placa') {
            setMorador({ ...morador, [name]: value.toUpperCase() });
        } else {
            setMorador({ ...morador, [name]: value });
        }
    };

    const [moradores, setMoradores] = useState<MoradorForm[]>([]);
    const [editando, setEditando] = useState(false);
    const [moradorEditando, setMoradorEditando] = useState<MoradorForm | null>(null);

    const fetchMoradores = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/moradores');
            setMoradores(response.data);
        } catch (err) {
            setError('Erro ao carregar moradores');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editando && moradorEditando) {
                await api.put(`/api/moradores/${moradorEditando.id}`, morador);
                setEditando(false);
                setMoradorEditando(null);
            } else {
                await api.post('/api/moradores', morador);
            }
            setMorador({
                nome: '',
                apartamento: '',
                telefone: '',
                email: ''
            });
            fetchMoradores();
            alert(`Morador ${editando ? 'atualizado' : 'cadastrado'} com sucesso!`);
        } catch (err) {
            setError(`Erro ao ${editando ? 'atualizar' : 'cadastrar'} morador`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEditar = (morador: MoradorForm) => {
        setMorador(morador);
        setMoradorEditando(morador);
        setEditando(true);
    };

    const handleDeletar = async (id: number) => {
        const confirmacao = window.confirm('Tem certeza que deseja excluir este morador?');
        if (!confirmacao) return;

        setLoading(true);
        try {
            await api.delete(`/api/moradores/${id}`);
            fetchMoradores();
            alert('Morador excluído com sucesso!');
        } catch (err) {
            setError('Erro ao excluir morador');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMoradores();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Cadastro de Moradores
            </Typography>

            <Paper sx={{ p: 2 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Nome Completo"
                                name="nome"
                                value={morador.nome}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Apartamento"
                                name="apartamento"
                                value={morador.apartamento}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Telefone"
                                name="telefone"
                                value={morador.telefone}
                                onChange={handleInputChange}
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
                                onChange={handleInputChange}
                                required
                            />
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
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default CadastroMoradores;

export { };
