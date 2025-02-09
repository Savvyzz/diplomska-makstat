import { Grid, Card, CardContent, Typography, Box, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const categories = [
  {
    title: 'Тековни трошоци за здравството по здравствени функции и здравствени шеми',
    path: '/zdravstveni-smetki/funkcii-shemi',
    icon: HealthAndSafetyIcon
  },
  {
    title: 'Тековни трошоци за здравството по здравствени функции и даватели на здравствена заштита',
    path: '/zdravstveni-smetki/funkcii-davateli',
    icon: LocalHospitalIcon
  },
  {
    title: 'Тековни трошоци за здравството по даватели на здравствена заштита и здравствени шеми',
    path: '/zdravstveni-smetki/davateli-shemi',
    icon: MedicalServicesIcon
  }
];

const ZdravstveniSmetki = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 700,
          color: 'primary.main',
          mb: 4
        }}
      >
        Здравствени сметки
      </Typography>
      <Grid container spacing={3}>
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Grid item xs={12} md={4} key={category.path}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => navigate(category.path)}
                  sx={{ height: '100%' }}
                >
                  <CardContent sx={{ height: '100%', p: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: 2
                      }}
                    >
                      <Icon sx={{ fontSize: 48, color: 'primary.main' }} />
                      <Typography variant="h5" component="h2" gutterBottom>
                        {category.title}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ZdravstveniSmetki; 