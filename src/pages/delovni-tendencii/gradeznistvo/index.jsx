import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState, useEffect, useCallback, useMemo } from 'react';
import BackButton from '../../../components/navigation/BackButton';
import DataTable from '../../../components/data-display/DataTable';
import LoadingState from '../../../components/feedback/LoadingState';
import statisticsService from '../../../services/StatisticsService';

const GradeznistvoDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await statisticsService.getGradeznistvo();

      if (response) {
        setColumns(response.columns);
        setAllData(response.data);
        setYears(response.years);
        setSelectedYear(response.years[0]); // Select the most recent year by default
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message || 'Настана грешка при вчитување на податоците');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter data by selected year
  useEffect(() => {
    if (selectedYear && allData.length > 0) {
      const filteredData = allData.filter(item => item.year === selectedYear);
      setData(filteredData);
      setTotalRows(filteredData.length);
      setPage(0); // Reset to first page when changing year
    }
  }, [selectedYear, allData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const paginatedData = useMemo(() => {
    return data.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [data, page, rowsPerPage]);

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
        Деловни тенденции во градежништвото
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3 
      }}>
        <FormControl 
          sx={{ 
            minWidth: 200
          }}
        >
          <InputLabel id="year-select-label">Период</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear}
            label="Период"
            onChange={handleYearChange}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <BackButton />
      </Box>

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
    </Box>
  );
};

export default GradeznistvoDashboard; 