import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import DelovniTendencii from './pages/delovni-tendencii';
import DelovniTendenciiDetail from './pages/delovni-tendencii/Detail';
import EkonomskiSmetki from './pages/ekonomski-smetki';
import EkonomskiSmetkiDetail from './pages/ekonomski-smetki/Detail';
import ZdravstveniSmetki from './pages/zdravstveni-smetki';
import ZdravstveniSmetkiDetail from './pages/zdravstveni-smetki/Detail';
import PoloviStatistiki from './pages/polovi-statistiki';
import PoloviStatistikiDetail from './pages/polovi-statistiki/Detail';
import ProstorniEdinici from './pages/prostorni-edinici';
import ProstorniEdiniciDetail from './pages/prostorni-edinici/Detail';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import './assets/styles/main.scss';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a4b8c',
      light: '#e8f0fe',
      dark: '#0f2b52',
    },
    secondary: {
      main: '#7c3aed',
      light: '#ede9fe',
      dark: '#5b21b6',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a2b42',
      secondary: '#445167',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 0,
        },
      },
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/delovni-tendencii" element={<DelovniTendencii />} />
            <Route 
              path="/delovni-tendencii/gradeznistvo" 
              element={<DelovniTendenciiDetail title="Деловни тенденции во градежништвото" />} 
            />
            <Route 
              path="/delovni-tendencii/prerabotuvacka-industrija" 
              element={<DelovniTendenciiDetail title="Деловни тенденции во преработувачката индустрија" />} 
            />
            <Route 
              path="/delovni-tendencii/trgovija" 
              element={<DelovniTendenciiDetail title="Деловни тенденции во трговијата на мало" />} 
            />
            <Route path="/ekonomski-smetki" element={<EkonomskiSmetki />} />
            <Route 
              path="/ekonomski-smetki/tekovni-ceni" 
              element={<EkonomskiSmetkiDetail title="Економски сметки во земјоделството по тековни цени" />} 
            />
            <Route 
              path="/ekonomski-smetki/postojani-ceni" 
              element={<EkonomskiSmetkiDetail title="Економски сметки во земјоделството по постојани цени" />} 
            />
            <Route 
              path="/ekonomski-smetki/regionalni-smetki" 
              element={<EkonomskiSmetkiDetail title="Регионални сметки во земјоделството" />} 
            />
            <Route path="/zdravstveni-smetki" element={<ZdravstveniSmetki />} />
            <Route 
              path="/zdravstveni-smetki/funkcii-shemi" 
              element={<ZdravstveniSmetkiDetail title="Тековни трошоци за здравството по здравствени функции и здравствени шеми" />} 
            />
            <Route 
              path="/zdravstveni-smetki/funkcii-davateli" 
              element={<ZdravstveniSmetkiDetail title="Тековни трошоци за здравството по здравствени функции и даватели на здравствена заштита" />} 
            />
            <Route 
              path="/zdravstveni-smetki/davateli-shemi" 
              element={<ZdravstveniSmetkiDetail title="Тековни трошоци за здравството по даватели на здравствена заштита и здравствени шеми" />} 
            />
            <Route path="/polovi-statistiki" element={<PoloviStatistiki />} />
            <Route 
              path="/polovi-statistiki/pokazateli" 
              element={<PoloviStatistikiDetail title="Показатели од половите статистики во Република Македонија" />} 
            />
            <Route 
              path="/polovi-statistiki/zrtvi-nasilstvo" 
              element={<PoloviStatistikiDetail title="Жени жртви на насилство во Северна Македонија" />} 
            />
            <Route path="/prostorni-edinici" element={<ProstorniEdinici />} />
            <Route 
              path="/prostorni-edinici/opstini-naseleni-mesta" 
              element={<ProstorniEdiniciDetail title="Број на општини и населени места по региони" />} 
            />
          </Routes>
        </MainLayout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
