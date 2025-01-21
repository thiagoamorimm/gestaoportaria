import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
    useTheme
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssessmentIcon from '@mui/icons-material/Assessment';

const DRAWER_WIDTH = 280;

const MenuLateral: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const theme = useTheme();

    const menuItems = [
        { texto: 'Dashboard', icone: <DashboardIcon />, rota: '/' },
        { texto: 'Moradores', icone: <PersonIcon />, rota: '/moradores' },
        { texto: 'Controle de Acessos', icone: <SecurityIcon />, rota: '/acessos' },
        { texto: 'Vagas', icone: <LocalParkingIcon />, rota: '/vagas' },
        { texto: 'Encomendas', icone: <LocalShippingIcon />, rota: '/encomendas' },
        { texto: 'Relatórios', icone: <AssessmentIcon />, rota: '/relatorios' }
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: DRAWER_WIDTH,
                    boxSizing: 'border-box',
                    background: 'linear-gradient(180deg, #1a237e 0%, #303f9f 100%)',
                    color: 'white',
                    borderRight: 'none',
                    boxShadow: '4px 0 10px rgba(0, 0, 0, 0.2)',
                },
            }}
        >
            <Box
                sx={{
                    p: 3,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.05)'
                }}
            >
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        letterSpacing: '0.5px',
                        color: '#fff',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}
                >
                    Gestão de Portaria
                </Typography>
            </Box>
            <List sx={{ mt: 2 }}>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.texto}
                        onClick={() => navigate(item.rota)}
                        sx={{
                            my: 0.5,
                            mx: 1,
                            borderRadius: '8px',
                            backgroundColor: location.pathname === item.rota
                                ? 'rgba(255, 255, 255, 0.15)'
                                : 'transparent',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                transform: 'translateX(5px)',
                                transition: 'all 0.3s ease'
                            },
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            '&::before': location.pathname === item.rota ? {
                                content: '""',
                                position: 'absolute',
                                left: '-8px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '4px',
                                height: '70%',
                                backgroundColor: '#fff',
                                borderRadius: '0 4px 4px 0'
                            } : {}
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                color: 'white',
                                minWidth: '45px'
                            }}
                        >
                            {item.icone}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.texto}
                            sx={{
                                '& .MuiListItemText-primary': {
                                    fontSize: '0.95rem',
                                    fontWeight: location.pathname === item.rota ? 600 : 400
                                }
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default MenuLateral;
