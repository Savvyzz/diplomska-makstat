import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import Gradeznistvo from './pages/gradeznistvo/Gradeznistvo';
import PrerabotuvackaIndustrija from './pages/prerabotuvacka-industrija/PrerabotuvackaIndustrija';
import Trgovija from './pages/trgovija/Trgovija';
import EkonomskiSmetkiTekovni from './pages/ekonomski-smetki/Detail';
import RegionalniSmetki from './pages/ekonomski-smetki/RegionalniSmetki';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/gradeznistvo" element={<Gradeznistvo />} />
          <Route path="/prerabotuvacka-industrija" element={<PrerabotuvackaIndustrija />} />
          <Route path="/trgovija" element={<Trgovija />} />
          <Route path="/ekonomski-smetki/tekovni-ceni" element={<EkonomskiSmetkiTekovni title="Економски сметки во земјоделството - тековни цени" />} />
          <Route path="/ekonomski-smetki/postojani-ceni" element={<EkonomskiSmetkiTekovni title="Економски сметки во земјоделството - постојани цени" />} />
          <Route path="/ekonomski-smetki/regionalni-smetki" element={<RegionalniSmetki />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 