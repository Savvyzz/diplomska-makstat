import { Typography, Box } from '@mui/material';
import BackButton from '../../../components/navigation/BackButton';

const TrgovijaDashboard = () => {
  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 700,
          color: 'primary.main',
          mb: 4
        }}
      >
        Деловни тенденции во трговијата на мало
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Податоците ќе бидат достапни наскоро.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <BackButton />
      </Box>
    </Box>
  );
};

export default TrgovijaDashboard; 