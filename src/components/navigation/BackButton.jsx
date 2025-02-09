import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './styles/BackButton.scss';

const mainRoutes = [
  '/',
  '/delovni-tendencii',
  '/ekonomski-smetki',
  '/zdravstveni-smetki',
  '/polovi-statistiki',
  '/prostorni-edinici'
];

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show back button for main menu routes
  if (mainRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <Button
      onClick={() => navigate(-1)}
      startIcon={<ArrowBackIcon />}
      variant="outlined"
      className="back-button"
      sx={{
        mb: 3,
        borderColor: 'divider',
        color: 'text.secondary',
        '&:hover': {
          borderColor: 'primary.main',
          color: 'primary.main',
          bgcolor: 'primary.light',
        },
      }}
    >
      Назад
    </Button>
  );
};

export default BackButton; 