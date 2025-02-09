import { Grid, Card, CardContent, Typography, Box, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import FactoryIcon from '@mui/icons-material/Factory';
import StorefrontIcon from '@mui/icons-material/Storefront';

const categories = [
  {
    title: 'Деловни тенденции во градежништвото',
    subtitle: 'баланси на пондерираните одговори',
    path: '/delovni-tendencii/gradeznistvo',
    icon: BusinessIcon
  },
  {
    title: 'Деловни тенденции во преработувачката индустрија',
    subtitle: 'баланси на пондерираните одговори',
    path: '/delovni-tendencii/prerabotuvacka-industrija',
    icon: FactoryIcon
  },
  {
    title: 'Деловни тенденции во трговијата на мало',
    subtitle: 'баланси на пондерираните одговори',
    path: '/delovni-tendencii/trgovija',
    icon: StorefrontIcon
  }
];

const DelovniTendencii = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 700,
          color: 'primary.main',
          mb: 4,
          mt: 2
        }}
      >
        Деловни тенденции
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
                      <Typography variant="body2" color="text.secondary">
                        {category.subtitle}
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

export default DelovniTendencii; 