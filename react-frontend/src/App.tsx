import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Container, Typography, Box, CircularProgress } from '@mui/material';
import { store, persistor } from './store';
import { createAppTheme } from './theme/theme';
import { useTheme } from './hooks/useTheme';
import ThemeToggle from './components/ThemeToggle';
import CurrencyDropdown from './components/CurrencyDropdown';
import type { CurrencyUnit } from './components/CurrencyDropdown';

// Lazy load components
const Dashboard = lazy(() => import('./components/Dashboard'));

const AppContent: React.FC = () => {
  const { mode } = useTheme();
  const theme = createAppTheme(mode);
  const [currencyUnit, setCurrencyUnit] = useState<CurrencyUnit>('troy-ounce');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`min-h-screen ${mode === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <AppBar 
          position="static" 
          sx={{ 
            backgroundColor: mode === 'dark' ? '#111111' : '#FFFFFF',
            borderBottom: `1px solid ${mode === 'dark' ? '#1f1f1f' : '#E0E0E0'}`,
            boxShadow: 'none',
          }}
        >
          <Toolbar>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1,
                color: mode === 'dark' ? '#FFFFFF' : '#000000',
                fontWeight: 600,
              }}
            >
              Gold Price Prediction
            </Typography>
            <CurrencyDropdown
              value={currencyUnit}
              onChange={setCurrencyUnit}
            />
            <Box sx={{ marginLeft: 2 }}>
              <ThemeToggle />
            </Box>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="xl" sx={{ padding: '2rem 1rem' }}>
          <Suspense fallback={
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
              <CircularProgress />
            </Box>
          }>
            <Routes>
              <Route path="/" element={<Dashboard currencyUnit={currencyUnit} />} />
              <Route path="/dashboard" element={<Dashboard currencyUnit={currencyUnit} />} />
            </Routes>
          </Suspense>
        </Container>
      </div>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppContent />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;