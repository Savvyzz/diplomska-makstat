import { Route } from 'react-router-dom';

// Polovi statistiki pages
import PoloviStatistiki from '@/pages/polovi-statistiki';
import PoloviStatistikiDetail from '@/pages/polovi-statistiki/Detail';
import PokazeliDashboard from '@/pages/polovi-statistiki/pokazateli';

/**
 * Routes configuration for Polovi Statistiki section
 */
const poloviStatistikiRoutes = [
  <Route key="polovi-statistiki-main" path="/polovi-statistiki" element={<PoloviStatistiki />} />,
  <Route 
    key="polovi-statistiki-pokazateli"
    path="/polovi-statistiki/pokazateli" 
    element={<PokazeliDashboard />} 
  />,
  <Route 
    key="polovi-statistiki-zrtvi-nasilstvo"
    path="/polovi-statistiki/zrtvi-nasilstvo" 
    element={<PoloviStatistikiDetail title="Жени жртви на насилство во Северна Македонија" />} 
  />
];

export default poloviStatistikiRoutes; 