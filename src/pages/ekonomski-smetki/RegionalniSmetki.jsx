import { useState, useMemo } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import BackButton from '../../components/navigation/BackButton';
import DataDisplay from '../../components/data-display/DataDisplay';
import LoadingState from '../../components/feedback/LoadingState';
import { useEkonomskiSmetkiRegionalni } from '../../hooks/useStatistics';

const RegionalniSmetki = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [viewMode, setViewMode] = useState('table');

  // Use React Query hook
  const { data: response, isLoading, error, refetch } = useEkonomskiSmetkiRegionalni();
  const { data: allData = [], columns = [], years = [], regions = [] } = response || {};

  // Set initial selections when data is loaded
  useMemo(() => {
    if (years.length > 0 && !selectedYear) {
      setSelectedYear('');
    }
    if (regions.length > 0 && !selectedRegion) {
      setSelectedRegion('');
    }
  }, [years, regions, selectedYear, selectedRegion]);

  // Filter data by selected filters
  const filteredData = useMemo(() => {
    if (viewMode === 'chart') {
      return allData;
    }
    return allData.filter(item => {
      const yearMatch = !selectedYear || item.year === selectedYear;
      const regionMatch = !selectedRegion || item.region === selectedRegion;
      return yearMatch && regionMatch;
    });
  }, [selectedYear, selectedRegion, allData, viewMode]);

  const totalRows = filteredData.length;

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

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
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
        Регионални сметки во земјоделството
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
            <InputLabel id="year-select-label">Период</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={selectedYear}
              label="Период"
              onChange={handleYearChange}
            >
              <MenuItem value="">Сите години</MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
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
              {regions.map((region) => (
                <MenuItem key={region} value={region}>{region}</MenuItem>
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
          title={`Регионални сметки во земјоделството - ${selectedYear || 'Сите години'}`}
          onViewModeChange={handleViewModeChange}
        />
      </LoadingState>
    </Box>
  );
};

export default RegionalniSmetki; 