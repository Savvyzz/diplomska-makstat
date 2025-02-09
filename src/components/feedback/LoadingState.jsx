import { Box, CircularProgress, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PropTypes from 'prop-types';

const LoadingState = ({ 
  loading, 
  error, 
  onRetry,
  children 
}) => {
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 400,
          width: '100%',
          gap: 2
        }}
      >
        <CircularProgress size={48} />
        <Typography variant="body1" color="text.secondary">
          Се вчитува...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 400,
          width: '100%',
          gap: 3
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main' }} />
        <Typography variant="h6" color="text.primary" align="center">
          Се појави грешка при вчитување на податоците
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          {error}
        </Typography>
        {onRetry && (
          <Button 
            variant="contained" 
            onClick={onRetry}
            sx={{ mt: 2 }}
          >
            Обиди се повторно
          </Button>
        )}
      </Box>
    );
  }

  return children;
};

LoadingState.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  onRetry: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default LoadingState; 