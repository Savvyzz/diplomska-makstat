import { useState, useEffect, useCallback, useMemo } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import BackButton from '../../../components/navigation/BackButton';
import DataTable from '../../../components/data-display/DataTable';
import LoadingState from '../../../components/feedback/LoadingState';
import statisticsService from '../../../services/StatisticsService';

const PoloviStatistikiPokazateliDashboard = () => {
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
      const response = await statisticsService.getPoloviStatistikiPokazateli();

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

  // Filter data based on selected year
  const filteredData = useMemo(() => {
    if (!selectedYear) return allData;
    return allData.filter(item => item.year === selectedYear);
  }, [allData, selectedYear]);

  // Update data and total rows when filtered data changes
  useEffect(() => {
    setData(filteredData);
    setTotalRows(filteredData.length);
  }, [filteredData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setPage(0);
  };

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  }, [data, page, rowsPerPage]);

  return (
    <Box>
      <BackButton />
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 700,
          color: 'primary.main',
          mb: 4
        }}
      >
        Показатели од половите статистики во Република Македонија
      </Typography>

      <Box sx={{ mb: 4 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="year-select-label">Година</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear}
            label="Година"
            onChange={handleYearChange}
          >
            <MenuItem value="">Сите години</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default PoloviStatistikiPokazateliDashboard; 