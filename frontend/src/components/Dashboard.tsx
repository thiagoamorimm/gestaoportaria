import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Grid,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Chip,
    IconButton,
    CircularProgress,
    useTheme
} from '@mui/material';
import CardEstatistica from './CardEstatistica';
import PersonIcon from '@mui/icons-material/Person';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningIcon from '@mui/icons-material/Warning';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDashboardData } from '../hooks/useDashboardData';
import ErrorIcon from '@mui/icons-material/Error';

interface Ocorrencia {
  id: number;
  tipo: string;
  local: string;
  status: string;
  horario: string;
}

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { data, loading, error } = useDashboardData();
    const theme = useTheme();

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                backgroundColor: theme.palette.background.default
            }}>
                <CircularProgress size={60} thickness={4} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                mt: 4,
                p: 3,
                backgroundColor: theme.palette.error.light,
                borderRadius: 2
            }}>
                <ErrorIcon sx={{ fontSize: 60, mb: 2, color: theme.palette.error.main }} />
                <Typography variant="h6" sx={{ color: theme.palette.error.main }}>
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ 
            flexGrow: 1, 
            p: 4, 
            marginLeft: '280px',
            backgroundColor: theme.palette.background.default,
            minHeight: '100vh'
        }}>
            <Typography 
                variant="h4" 
                sx={{ 
                    mb: 4,
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    position: 'relative',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -8,
                        left: 0,
                        width: 60,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: theme.palette.primary.main
                    }
                }}
            >
                Dashboard
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Box 
                        onClick={() => navigate('/usuarios')} 
                        sx={{ 
                            cursor: 'pointer',
                            transform: 'translateY(0)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)'
                            }
                        }}
                    >
                        <CardEstatistica
                            titulo="Moradores Presentes"
                            valor={`${data?.moradores.presentes}/${data?.moradores.total}`}
                            icone={<PersonIcon sx={{ fontSize: 40 }} />}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Box 
                        onClick={() => navigate('/vagas')} 
                        sx={{ 
                            cursor: 'pointer',
                            transform: 'translateY(0)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)'
                            }
                        }}
                    >
                        <CardEstatistica
                            titulo="Vagas Ocupadas"
                            valor={`${data?.vagas.ocupadas}/${data?.vagas.total}`}
                            icone={<LocalParkingIcon sx={{ fontSize: 40 }} />}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Box 
                        onClick={() => navigate('/encomendas')} 
                        sx={{ 
                            cursor: 'pointer',
                            transform: 'translateY(0)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)'
                            }
                        }}
                    >
                        <CardEstatistica
                            titulo="Encomendas Pendentes"
                            valor={String(data?.encomendas.pendentes || 0)}
                            icone={<LocalShippingIcon sx={{ fontSize: 40 }} />}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Box 
                        onClick={() => navigate('/acessos')} 
                        sx={{ 
                            cursor: 'pointer',
                            transform: 'translateY(0)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)'
                            }
                        }}
                    >
                        <CardEstatistica
                            titulo="Acessos Hoje"
                            valor={String(data?.acessos.hoje || 0)}
                            icone={<SecurityIcon sx={{ fontSize: 40 }} />}
                        />
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper 
                        elevation={2}
                        sx={{ 
                            p: 3, 
                            height: '100%',
                            cursor: 'pointer',
                            borderRadius: 2,
                            background: theme.palette.background.paper,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: theme.shadows[8]
                            }
                        }}
                        onClick={() => navigate('/acessos')}
                    >
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            mb: 2 
                        }}>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    color: theme.palette.text.primary,
                                    fontWeight: 600
                                }}
                            >
                                <DirectionsWalkIcon sx={{ mr: 1, color: theme.palette.primary.main }} /> 
                                Últimos Acessos
                            </Typography>
                            <IconButton 
                                size="small" 
                                sx={{ 
                                    backgroundColor: theme.palette.primary.main,
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.dark
                                    }
                                }}
                            >
                                <ArrowForwardIcon />
                            </IconButton>
                        </Box>
                        <List>
                            {data?.acessos.ultimosAcessos.map((acesso) => (
                                <React.Fragment key={acesso.id}>
                                    <ListItem sx={{ px: 0 }}>
                                        <ListItemIcon>
                                            <AccessTimeIcon sx={{ color: theme.palette.primary.main }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                    {acesso.nome}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" color="textSecondary">
                                                    {`${acesso.tipo} - ${acesso.destino}`}
                                                </Typography>
                                            }
                                        />
                                        <Chip
                                            label={acesso.horario}
                                            size="small"
                                            sx={{
                                                backgroundColor: theme.palette.primary.light,
                                                color: theme.palette.primary.main,
                                                fontWeight: 500
                                            }}
                                        />
                                    </ListItem>
                                    <Divider sx={{ my: 1 }} />
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper 
                        elevation={2}
                        sx={{ 
                            p: 3, 
                            height: '100%',
                            cursor: 'pointer',
                            borderRadius: 2,
                            background: theme.palette.background.paper,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: theme.shadows[8]
                            }
                        }}
                        onClick={() => navigate('/encomendas')}
                    >
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            mb: 2 
                        }}>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    color: theme.palette.text.primary,
                                    fontWeight: 600
                                }}
                            >
                                <LocalShippingIcon sx={{ mr: 1, color: theme.palette.primary.main }} /> 
                                Encomendas Pendentes
                            </Typography>
                            <IconButton 
                                size="small" 
                                sx={{ 
                                    backgroundColor: theme.palette.primary.main,
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.dark
                                    }
                                }}
                            >
                                <ArrowForwardIcon />
                            </IconButton>
                        </Box>
                        <List>
                            {data?.encomendas.ultimasEncomendas.map((encomenda) => (
                                <React.Fragment key={encomenda.id}>
                                    <ListItem sx={{ px: 0 }}>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                    {`${encomenda.morador} (${encomenda.apto})`}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" color="textSecondary">
                                                    {`${encomenda.transportadora} - ${encomenda.recebimento}`}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                    <Divider sx={{ my: 1 }} />
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper 
                        elevation={2}
                        sx={{ 
                            p: 3, 
                            height: '100%',
                            cursor: 'pointer',
                            borderRadius: 2,
                            background: theme.palette.background.paper,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: theme.shadows[8]
                            }
                        }}
                        onClick={() => navigate('/relatorios')}
                    >
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            mb: 2 
                        }}>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    color: theme.palette.text.primary,
                                    fontWeight: 600
                                }}
                            >
                                <WarningIcon sx={{ mr: 1, color: theme.palette.warning.main }} /> 
                                Ocorrências Recentes
                            </Typography>
                            <IconButton 
                                size="small" 
                                sx={{ 
                                    backgroundColor: theme.palette.warning.main,
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: theme.palette.warning.dark
                                    }
                                }}
                            >
                                <ArrowForwardIcon />
                            </IconButton>
                        </Box>
                        <List>
                            {data?.ocorrencias.map((ocorrencia) => (
                                <React.Fragment key={ocorrencia.id}>
                                    <ListItem sx={{ px: 0 }}>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                    {ocorrencia.tipo}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" color="textSecondary">
                                                    {`${ocorrencia.horario} - ${ocorrencia.status}`}
                                                </Typography>
                                            }
                                        />
                                        <Chip
                                            label={ocorrencia.status}
                                            size="small"
                                            sx={{
                                                backgroundColor:
                                                    ocorrencia.status === 'Alta'
                                                        ? theme.palette.error.light
                                                        : ocorrencia.status === 'Média'
                                                            ? theme.palette.warning.light
                                                            : theme.palette.success.light,
                                                color:
                                                    ocorrencia.status === 'Alta'
                                                        ? theme.palette.error.main
                                                        : ocorrencia.status === 'Média'
                                                            ? theme.palette.warning.main
                                                            : theme.palette.success.main,
                                                fontWeight: 500
                                            }}
                                        />
                                    </ListItem>
                                    <Divider sx={{ my: 1 }} />
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
