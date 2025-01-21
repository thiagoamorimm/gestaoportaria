import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import DescriptionIcon from '@mui/icons-material/Description';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface RelatorioFiltros {
  tipo: string;
  dataInicio: string;
  dataFim: string;
}

const Relatorios: React.FC = () => {
  const [filtros, setFiltros] = useState<RelatorioFiltros>({
    tipo: '',
    dataInicio: '',
    dataFim: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleGerarRelatorio = () => {
    // TODO: Implementar geração de relatório
    console.log('Gerando relatório com filtros:', filtros);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Relatórios</Typography>

      <Grid container spacing={3}>
        {/* Filtros do Relatório */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Gerar Relatório</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Tipo de Relatório</InputLabel>
                  <Select
                    name="tipo"
                    value={filtros.tipo}
                    label="Tipo de Relatório"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="acessos">Acessos</MenuItem>
                    <MenuItem value="moradores">Moradores</MenuItem>
                    <MenuItem value="veiculos">Veículos</MenuItem>
                    <MenuItem value="encomendas">Encomendas</MenuItem>
                    <MenuItem value="ocorrencias">Ocorrências</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Data Início"
                  name="dataInicio"
                  value={filtros.dataInicio}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Data Fim"
                  name="dataFim"
                  value={filtros.dataFim}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FileDownloadIcon />}
                  onClick={handleGerarRelatorio}
                  fullWidth
                >
                  Gerar Relatório
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Lista de Relatórios Recentes */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Relatórios Recentes</Typography>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Relatório de Acessos" 
                  secondary="Gerado em 14/01/2025 15:30"
                />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Relatório de Encomendas" 
                  secondary="Gerado em 14/01/2025 14:15"
                />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Relatório de Veículos" 
                  secondary="Gerado em 14/01/2025 10:45"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Relatorios;
