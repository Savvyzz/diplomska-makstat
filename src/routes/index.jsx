import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import delovniTendenciiRoutes from './delovniTendenciiRoutes';
import ekonomskiSmetkiRoutes from './ekonomskiSmetkiRoutes';
import zdravstveniSmetkiRoutes from './zdravstveniSmetkiRoutes';
import poloviStatistikiRoutes from './poloviStatistikiRoutes';
import prostorniEdiniciRoutes from './prostorniEdiniciRoutes';

/**
 * Application routes configuration
 * Organized by domain for better maintainability
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Home route */}
      <Route path="/" element={<Home />} />
      
      {/* Domain-specific routes */}
      {delovniTendenciiRoutes}
      {ekonomskiSmetkiRoutes}
      {zdravstveniSmetkiRoutes}
      {poloviStatistikiRoutes}
      {prostorniEdiniciRoutes}
    </Routes>
  );
};

export default AppRoutes; 