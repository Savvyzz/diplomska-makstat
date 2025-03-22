import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import MainLayout from '@/layouts/MainLayout';
import AppRoutes from '@/routes';

// Font imports
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

// Styles
import '@/assets/styles/main.scss';

/**
 * Main application component
 * Handles routing and theme setup
 */
function App() {
  const theme = useTheme();

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
