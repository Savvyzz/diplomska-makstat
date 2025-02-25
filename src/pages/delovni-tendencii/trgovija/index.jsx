import { useState, useEffect, useCallback, useMemo } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem, Collapse } from '@mui/material';
import BackButton from '../../../components/navigation/BackButton';
import DataDisplay from '../../../components/data-display/DataDisplay';
import LoadingState from '../../../components/feedback/LoadingState';
import statisticsService from '../../../services/StatisticsService';

const TrgovijaDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [viewMode, setViewMode] = useState('table');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await statisticsService.getTrgovija();

      if (response) {
        setColumns(response.columns);
        setAllData(response.data);
        setPeriods(response.periods);
        setSelectedPeriod(response.periods[0]); // Select the most recent period by default
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

  // Filter data by selected period
  useEffect(() => {
    if (viewMode === 'chart') {
      setData(allData);
      setTotalRows(allData.length);
    } else if (selectedPeriod && allData.length > 0) {
      const filteredData = allData.filter(item => item.period === selectedPeriod);
      setData(filteredData);
      setTotalRows(filteredData.length);
      setPage(0); // Reset to first page when changing period
    }
  }, [selectedPeriod, allData, viewMode]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const handleViewModeChange = (newMode) => {
    setViewMode(newMode);
    if (newMode === 'chart') {
      // Show all data in chart view
      setData(allData);
      setTotalRows(allData.length);
    } else {
      // Reapply filters in table view
      if (selectedPeriod) {
        const filteredData = allData.filter(item => item.period === selectedPeriod);
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
        Деловни тенденции во трговијата на мало
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
              <InputLabel id="period-select-label">Период</InputLabel>
              <Select
                labelId="period-select-label"
                id="period-select"
                value={selectedPeriod}
                label="Период"
                onChange={handlePeriodChange}
              >
                <MenuItem value="">Сите периоди</MenuItem>
                {periods.map((period) => (
                  <MenuItem key={period} value={period}>{period}</MenuItem>
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
          title={`Деловни тенденции во трговијата на мало - ${selectedPeriod || 'Сите периоди'}`}
          onViewModeChange={handleViewModeChange}
        />
      </LoadingState>
    </Box>
  );
};

export default TrgovijaDashboard; 