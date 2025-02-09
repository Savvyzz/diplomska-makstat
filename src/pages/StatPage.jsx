import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

const StatPage = ({ title }) => {
  return (
    <Box sx={{ py: 3 }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 700,
          color: 'primary.main',
          mb: 4
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

StatPage.propTypes = {
  title: PropTypes.string.isRequired,
};

export default StatPage; 