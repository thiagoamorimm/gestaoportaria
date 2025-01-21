import React from 'react';
import { Paper, Typography, Box, useTheme } from '@mui/material';

interface CardEstatisticaProps {
    titulo: string;
    valor: string | number;
    icone: React.ReactNode;
}

const CardEstatistica: React.FC<CardEstatisticaProps> = ({ titulo, valor, icone }) => {
    const theme = useTheme();

    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: theme.palette.background.paper,
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                minHeight: '140px',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '30%',
                    height: '100%',
                    background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.background.paper})`,
                    zIndex: 1
                }
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Typography 
                    variant="subtitle2" 
                    sx={{
                        color: theme.palette.text.secondary,
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        mb: 1
                    }}
                >
                    {titulo}
                </Typography>
                <Typography 
                    variant="h4" 
                    component="div" 
                    sx={{ 
                        mt: 1,
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        fontSize: '2rem'
                    }}
                >
                    {valor}
                </Typography>
            </Box>
            <Box 
                sx={{ 
                    color: theme.palette.primary.main,
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: `${theme.palette.primary.main}15`,
                    '& > *': {
                        fontSize: 32,
                        color: theme.palette.primary.main
                    }
                }}
            >
                {icone}
            </Box>
        </Paper>
    );
};

export default CardEstatistica;
