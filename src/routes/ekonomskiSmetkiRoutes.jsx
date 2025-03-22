import { Route } from 'react-router-dom';

// Ekonomski smetki pages
import EkonomskiSmetki from '@/pages/ekonomski-smetki';
import EkonomskiSmetkiDetail from '@/pages/ekonomski-smetki/Detail';
import RegionalniSmetki from '@/pages/ekonomski-smetki/RegionalniSmetki';

/**
 * Routes configuration for Ekonomski Smetki section
 */
const ekonomskiSmetkiRoutes = [
  <Route key="ekonomski-smetki-main" path="/ekonomski-smetki" element={<EkonomskiSmetki />} />,
  <Route 
    key="ekonomski-smetki-tekovni"
    path="/ekonomski-smetki/tekovni-ceni" 
    element={<EkonomskiSmetkiDetail title="Економски сметки во земјоделството по тековни цени" />} 
  />,
  <Route 
    key="ekonomski-smetki-postojani"
    path="/ekonomski-smetki/postojani-ceni" 
    element={<EkonomskiSmetkiDetail title="Економски сметки во земјоделството по постојани цени" />} 
  />,
  <Route 
    key="ekonomski-smetki-regionalni"
    path="/ekonomski-smetki/regionalni-smetki" 
    element={<RegionalniSmetki />} 
  />
];

export default ekonomskiSmetkiRoutes; 