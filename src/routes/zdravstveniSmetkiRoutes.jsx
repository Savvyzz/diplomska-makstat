import { Route } from 'react-router-dom';

// Zdravstveni smetki pages
import ZdravstveniSmetki from '@/pages/zdravstveni-smetki';
import ZdravstveniSmetkiDetail from '@/pages/zdravstveni-smetki/Detail';
import FunkciiShemiDashboard from '@/pages/zdravstveni-smetki/funkcii-shemi';
import DavateliShemiDashboard from '@/pages/zdravstveni-smetki/davateli-shemi';

/**
 * Routes configuration for Zdravstveni Smetki section
 */
const zdravstveniSmetkiRoutes = [
  <Route key="zdravstveni-smetki-main" path="/zdravstveni-smetki" element={<ZdravstveniSmetki />} />,
  <Route 
    key="zdravstveni-smetki-funkcii-shemi"
    path="/zdravstveni-smetki/funkcii-shemi" 
    element={<FunkciiShemiDashboard />} 
  />,
  <Route 
    key="zdravstveni-smetki-funkcii-davateli"
    path="/zdravstveni-smetki/funkcii-davateli" 
    element={
      <ZdravstveniSmetkiDetail 
        title="Тековни трошоци за здравството по здравствени функции и даватели на здравствена заштита" 
      />
    } 
  />,
  <Route 
    key="zdravstveni-smetki-davateli-shemi"
    path="/zdravstveni-smetki/davateli-shemi" 
    element={<DavateliShemiDashboard />} 
  />
];

export default zdravstveniSmetkiRoutes; 