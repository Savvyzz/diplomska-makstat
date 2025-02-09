import { Button, useTheme } from '@mui/material';
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
  const theme = useTheme();

  // Don't show back button for main menu routes
  if (mainRoutes.includes(location.pathname)) {
    return null;
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate(-1);
    }
  };

  return (
    <Button
      onClick={() => navigate(-1)}
      onKeyDown={handleKeyPress}
      startIcon={<ArrowBackIcon />}
      variant="outlined"
      className="back-button"
      aria-label="назад на претходна страница"
      sx={{
        mb: 3,
        borderColor: 'divider',
        color: 'text.secondary',
        '&:hover': {
          borderColor: 'primary.main',
          color: 'primary.main',
          bgcolor: 'primary.light',
        },
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
      }}
    >
      Назад
    </Button>
  );
};

export default BackButton; 