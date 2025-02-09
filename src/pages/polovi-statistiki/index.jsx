import { Grid, Card, CardContent, Typography, Box, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SupportIcon from '@mui/icons-material/Support';

const categories = [
  {
    title: 'Показатели од половите статистики во Република Македонија',
    path: '/polovi-statistiki/pokazateli',
    icon: AssessmentIcon
  },
  {
    title: 'Жени жртви на насилство во Северна Македонија',
    subtitle: 'по години',
    path: '/polovi-statistiki/zrtvi-nasilstvo',
    icon: SupportIcon
  }
];

const PoloviStatistiki = () => {
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
        Полови статистики
      </Typography>
      <Grid container spacing={3}>
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Grid item xs={12} md={6} key={category.path}>
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
                      {category.subtitle && (
                        <Typography variant="body2" color="text.secondary">
                          {category.subtitle}
                        </Typography>
                      )}
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

export default PoloviStatistiki; 