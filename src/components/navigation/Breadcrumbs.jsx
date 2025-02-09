import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import './styles/Breadcrumbs.scss';

const routeNameMap = {
  'delovni-tendencii': 'Деловни тенденции',
  'gradeznistvo': 'Градежништво',
  'prerabotuvacka-industrija': 'Преработувачка индустрија',
  'trgovija': 'Трговија на мало',
  'ekonomski-smetki': 'Економски сметки во земјоделството',
  'tekovni-ceni': 'Тековни цени',
  'postojani-ceni': 'Постојани цени',
  'regionalni-smetki': 'Регионални сметки',
  'zdravstveni-smetki': 'Здравствени сметки',
  'polovi-statistiki': 'Полови статистики',
  'prostorni-edinici': 'Просторни единици',
  'funkcii-shemi': 'Функции и шеми',
  'funkcii-davateli': 'Функции и даватели',
  'davateli-shemi': 'Даватели и шеми',
  'pokazateli': 'Показатели',
  'zrtvi-nasilstvo': 'Жртви на насилство',
  'opstini-naseleni-mesta': 'Општини и населени места',
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <Box sx={{ mb: 3, mt: 1 }}>
      <MuiBreadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="навигација"
        className="breadcrumbs"
      >
        <Link
          component={RouterLink}
          to="/"
          className="breadcrumbs-link"
        >
          <HomeIcon />
          Почетна
        </Link>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const name = routeNameMap[value] || value;

          return last ? (
            <Typography 
              color="text.primary" 
              key={to}
              className="breadcrumbs-text"
            >
              {name}
            </Typography>
          ) : (
            <Link
              component={RouterLink}
              to={to}
              key={to}
              className="breadcrumbs-link"
            >
              {name}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs; 