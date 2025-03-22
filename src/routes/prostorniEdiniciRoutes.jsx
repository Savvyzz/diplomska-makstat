import { Route } from 'react-router-dom';

// Prostorni edinici pages
import ProstorniEdinici from '@/pages/prostorni-edinici';
import ProstorniEdiniciDetail from '@/pages/prostorni-edinici/Detail';

/**
 * Routes configuration for Prostorni Edinici section
 */
const prostorniEdiniciRoutes = [
  <Route key="prostorni-edinici-main" path="/prostorni-edinici" element={<ProstorniEdinici />} />,
  <Route 
    key="prostorni-edinici-opstini-naseleni-mesta"
    path="/prostorni-edinici/opstini-naseleni-mesta" 
    element={<ProstorniEdiniciDetail title="Број на општини и населени места по региони" />} 
  />
];

export default prostorniEdiniciRoutes; 