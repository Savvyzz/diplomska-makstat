import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import DelovniTendencii from './pages/delovni-tendencii';
import EkonomskiSmetki from './pages/ekonomski-smetki';
import EkonomskiSmetkiDetail from './pages/ekonomski-smetki/Detail';
import RegionalniSmetki from './pages/ekonomski-smetki/RegionalniSmetki';
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
import GradeznistvoDashboard from './pages/delovni-tendencii/gradeznistvo';
import PrerabotuvackaIndustrijaDashboard from './pages/delovni-tendencii/prerabotuvacka-industrija';
import TrgovijaDashboard from './pages/delovni-tendencii/trgovija';

function App() {
  const theme = useTheme();

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
              element={<GradeznistvoDashboard />} 
            />
            <Route 
              path="/delovni-tendencii/prerabotuvacka-industrija" 
              element={<PrerabotuvackaIndustrijaDashboard />} 
            />
            <Route 
              path="/delovni-tendencii/trgovija" 
              element={<TrgovijaDashboard />} 
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
              element={<RegionalniSmetki />} 
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
