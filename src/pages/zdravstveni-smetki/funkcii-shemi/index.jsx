import { useState, useEffect, useCallback, useMemo } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem, Collapse } from '@mui/material';
import BackButton from '../../../components/navigation/BackButton';
import DataDisplay from '../../../components/data-display/DataDisplay';
import LoadingState from '../../../components/feedback/LoadingState';
import statisticsService from '../../../services/StatisticsService';

const FunkciiShemiDashboard = () => {
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
  const [viewMode, setViewMode] = useState('table');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await statisticsService.getZdravstveniFunkciiShemi();

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
    if (viewMode === 'chart') {
      setData(allData);
      setTotalRows(allData.length);
    } else if (selectedYear && allData.length > 0) {
      const filteredData = allData.filter(item => item.year === selectedYear);
      setData(filteredData);
      setTotalRows(filteredData.length);
      setPage(0); // Reset to first page when changing year
    }
  }, [selectedYear, allData, viewMode]);

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

  const handleViewModeChange = (newMode) => {
    setViewMode(newMode);
    if (newMode === 'chart') {
      // Show all data in chart view
      setData(allData);
      setTotalRows(allData.length);
    } else {
      // Reapply filters in table view
      if (selectedYear) {
        const filteredData = allData.filter(item => item.year === selectedYear);
        setData(filteredData);
        setTotalRows(filteredData.length);
      }
    }
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
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 700,
          color: 'primary.main',
          mb: 4
        }}
      >
        Тековни трошоци за здравството по здравствени функции и здравствени шеми
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        gap: 2
      }}>
        <Collapse in={viewMode === 'table'} orientation="horizontal">
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="year-select-label">Година</InputLabel>
              <Select
                labelId="year-select-label"
                id="year-select"
                value={selectedYear}
                label="Година"
                onChange={handleYearChange}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Collapse>
        <BackButton />
      </Box>

      <LoadingState 
        loading={loading} 
        error={error}
        onRetry={fetchData}
      >
        <DataDisplay
          columns={columns}
          data={paginatedData}
          loading={loading}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          totalRows={totalRows}
          title={`Тековни трошоци за здравството по здравствени функции и здравствени шеми - ${selectedYear || 'Сите години'}`}
          onViewModeChange={handleViewModeChange}
        />
      </LoadingState>
    </Box>
  );
};

export default FunkciiShemiDashboard; 