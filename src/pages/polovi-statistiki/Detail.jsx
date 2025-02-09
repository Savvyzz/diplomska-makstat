import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import BackButton from '../../components/navigation/BackButton';

const PoloviStatistikiDetail = ({ title }) => {
  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ height: 48 }}>  {/* Reserved space for back button */}
        <BackButton />
      </Box>
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
      {/* Content will be added here */}
    </Box>
  );
};

PoloviStatistikiDetail.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PoloviStatistikiDetail; 