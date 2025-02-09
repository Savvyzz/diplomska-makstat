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
        textAlign: 'center'
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
    </Box>
  );
};

export default Home; 