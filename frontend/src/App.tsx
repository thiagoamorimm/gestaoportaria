import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import MenuLateral from './components/MenuLateral';
import Dashboard from './components/Dashboard';
import Moradores from './pages/Moradores';
import Acessos from './pages/Acessos';
import Vagas from './pages/Vagas';
import Encomendas from './pages/Encomendas';
import Relatorios from './pages/Relatorios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 30000, // Atualiza dados a cada 30 segundos
      staleTime: 10000,      // Considera dados obsoletos após 10 segundos
      retry: 3,              // Tenta 3 vezes em caso de erro
    },
  },
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2c3e50',
    },
    secondary: {
      main: '#e74c3c',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <MenuLateral />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/moradores" element={<Moradores />} />
                <Route path="/acessos" element={<Acessos />} />
                <Route path="/vagas" element={<Vagas />} />
                <Route path="/encomendas" element={<Encomendas />} />
                <Route path="/relatorios" element={<Relatorios />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
