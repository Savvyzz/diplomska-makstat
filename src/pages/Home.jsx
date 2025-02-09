import { Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
          fontWeight: 700,
          color: 'primary.main',
          mb: 2
        }}
      >
        Добредојдовте во MAKSTAT
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
          color: 'text.secondary',
          maxWidth: '800px',
          mx: 'auto'
        }}
      >
        Вашиот портал за статистички податоци
      </Typography>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: 'center',
          py: 3,
          borderTop: 1,
          borderColor: 'divider',
          mt: 4
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: 'italic' }}
        >
          Извор: Државен завод за статистика
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 0.5 }}
        >
          *Сите податоци прикажани на веб-страницата се преземени од Државниот завод за статистика
        </Typography>
      </Box>
    </Box>
  );
};

export default Home; 