import { useState, useMemo } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem, Collapse } from '@mui/material';
import BackButton from '../../../components/navigation/BackButton';
import DataDisplay from '../../../components/data-display/DataDisplay';
import LoadingState from '../../../components/feedback/LoadingState';
import { useTrgovija } from '../../../hooks/useStatistics';

const TrgovijaDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [viewMode, setViewMode] = useState('table');

  // Use React Query hook
  const { data: response, isLoading, error, refetch } = useTrgovija();
  const { data: allData = [], columns = [], periods = [] } = response || {};

  // Set initial period when data is loaded
  useMemo(() => {
    if (periods.length > 0 && !selectedPeriod) {
      setSelectedPeriod(periods[0]);
    }
  }, [periods, selectedPeriod]);

  // Filter data by selected period
  const filteredData = useMemo(() => {
    if (viewMode === 'chart') {
      return allData;
    }
    if (selectedPeriod && allData.length > 0) {
      return allData.filter(item => item.period === selectedPeriod);
    }
    return allData;
  }, [selectedPeriod, allData, viewMode]);

  const totalRows = filteredData.length;

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
  };

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredData, page, rowsPerPage]);

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
        loading={isLoading} 
        error={error?.message}
        onRetry={refetch}
      >
        <DataDisplay
          columns={columns}
          data={paginatedData}
          loading={isLoading}
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