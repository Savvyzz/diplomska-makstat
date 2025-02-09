import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import BackButton from '../../components/navigation/BackButton';
import DataTable from '../../components/data-display/DataTable';
import LoadingState from '../../components/feedback/LoadingState';
import statisticsService from '../../services/StatisticsService';

const DelovniTendenciiDetail = ({ title }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const location = useLocation();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      let response;
      
      if (location.pathname === '/delovni-tendencii/gradeznistvo') {
        response = await statisticsService.getGradeznistvo();
        setColumns(response.columns);
        setData(response.data);
        setTotalRows(response.totalRows);
      }
      // Add other route handlers here later
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message || 'Настана грешка при вчитување на податоците');
    } finally {
      setLoading(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
      {location.pathname === '/delovni-tendencii/gradeznistvo' && (
        <LoadingState 
          loading={loading} 
          error={error}
          onRetry={fetchData}
        >
          <DataTable
            columns={columns}
            data={paginatedData}
            loading={loading}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            totalRows={totalRows}
          />
        </LoadingState>
      )}
      <Box sx={{ mt: 3 }}>
        <BackButton />
      </Box>
    </Box>
  );
};

DelovniTendenciiDetail.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DelovniTendenciiDetail; 