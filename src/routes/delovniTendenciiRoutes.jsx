import { Route } from 'react-router-dom';

// Delovni tendencii pages
import DelovniTendencii from '@/pages/delovni-tendencii';
import GradeznistvoDashboard from '@/pages/delovni-tendencii/gradeznistvo';
import PrerabotuvackaIndustrijaDashboard from '@/pages/delovni-tendencii/prerabotuvacka-industrija';
import TrgovijaDashboard from '@/pages/delovni-tendencii/trgovija';

/**
 * Routes configuration for Delovni Tendencii section
 */
const delovniTendenciiRoutes = [
  <Route key="delovni-tendencii-main" path="/delovni-tendencii" element={<DelovniTendencii />} />,
  <Route key="delovni-tendencii-gradeznistvo" path="/delovni-tendencii/gradeznistvo" element={<GradeznistvoDashboard />} />,
  <Route key="delovni-tendencii-prerabotuvacka" path="/delovni-tendencii/prerabotuvacka-industrija" element={<PrerabotuvackaIndustrijaDashboard />} />,
  <Route key="delovni-tendencii-trgovija" path="/delovni-tendencii/trgovija" element={<TrgovijaDashboard />} />
];

export default delovniTendenciiRoutes; 