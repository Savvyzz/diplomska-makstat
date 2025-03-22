import { useState, useMemo } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import BackButton from '../../components/navigation/BackButton';
import DataDisplay from '../../components/data-display/DataDisplay';
import LoadingState from '../../components/feedback/LoadingState';
import { useProstorniEdiniciOpstiniNaseleniMesta } from '../../hooks/useStatistics';

const ProstorniEdiniciDetail = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [viewMode, setViewMode] = useState('table');

  // Use React Query hook
  const { data: response, isLoading, error, refetch } = useProstorniEdiniciOpstiniNaseleniMesta();
  const { data: allData = [], columns = [], periods = [], regions = [], types = [] } = response || {};

  // Filter data by selected filters
  const filteredData = useMemo(() => {
    if (viewMode === 'chart') {
      return allData;
    }
    return allData.filter(item => {
      const periodMatch = selectedPeriod === '' || item.period === selectedPeriod;
      const regionMatch = selectedRegion === '' || item.region === selectedRegion;
      const typeMatch = selectedType === '' || item.type === selectedType;
      return periodMatch && regionMatch && typeMatch;
    });
  }, [selectedPeriod, selectedRegion, selectedType, allData, viewMode]);

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

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
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
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 700,
          color: 'primary.main',
          mb: 4
        }}
      >
        Просторни единици
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        gap: 2
      }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
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
              {periods?.map((period) => (
                <MenuItem key={period} value={period}>{period}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="region-select-label">Регион</InputLabel>
            <Select
              labelId="region-select-label"
              id="region-select"
              value={selectedRegion}
              label="Регион"
              onChange={handleRegionChange}
            >
              <MenuItem value="">Сите региони</MenuItem>
              {regions?.map((region) => (
                <MenuItem key={region} value={region}>{region}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="type-select-label">Категорија</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              value={selectedType}
              label="Категорија"
              onChange={handleTypeChange}
            >
              <MenuItem value="">Сите категории</MenuItem>
              {allData
                .map(item => item.type)
                .filter((value, index, self) => self.indexOf(value) === index)
                .map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
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
          title={`Просторни единици${selectedPeriod ? ` - ${selectedPeriod}` : ''}${selectedRegion ? ` - ${selectedRegion}` : ''}${selectedType ? ` - ${selectedType}` : ''}`}
          onViewModeChange={handleViewModeChange}
        />
      </LoadingState>
    </Box>
  );
};

export default ProstorniEdiniciDetail; 