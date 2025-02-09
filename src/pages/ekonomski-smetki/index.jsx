import { Grid, Card, CardContent, Typography, Box, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TimelineIcon from '@mui/icons-material/Timeline';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MapIcon from '@mui/icons-material/Map';

const categories = [
  {
    title: 'Економски сметки во земјоделството по тековни цени',
    subtitle: 'производна сметка, по години',
    path: '/ekonomski-smetki/tekovni-ceni',
    icon: TimelineIcon
  },
  {
    title: 'Економски сметки во земјоделството по постојани цени',
    subtitle: 'производна сметка, по години',
    path: '/ekonomski-smetki/postojani-ceni',
    icon: ShowChartIcon
  },
  {
    title: 'Регионални сметки во земјоделството',
    subtitle: 'Производна сметка, по години',
    path: '/ekonomski-smetki/regionalni-smetki',
    icon: MapIcon
  }
];

const EkonomskiSmetki = () => {
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
        Економски сметки во земјоделството
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

export default EkonomskiSmetki; 