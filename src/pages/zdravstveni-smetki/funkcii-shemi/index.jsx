import { useState, useMemo } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import BackButton from '../../../components/navigation/BackButton';
import DataDisplay from '../../../components/data-display/DataDisplay';
import LoadingState from '../../../components/feedback/LoadingState';
import { useZdravstveniFunkciiShemi } from '../../../hooks/useStatistics';

const FunkciiShemiDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedFunction, setSelectedFunction] = useState('');
  const [selectedScheme, setSelectedScheme] = useState('');
  const [viewMode, setViewMode] = useState('table');

  // Use React Query hook
  const { data: response, isLoading, error, refetch } = useZdravstveniFunkciiShemi();
  const { data: allData = [], columns = [], years = [], functions = [], schemes = [] } = response || {};

  // Set initial selections when data is loaded
  useMemo(() => {
    if (years.length > 0 && !selectedYear) {
      setSelectedYear('');
    }
    if (functions.length > 0 && !selectedFunction) {
      setSelectedFunction('');
    }
    if (schemes.length > 0 && !selectedScheme) {
      setSelectedScheme('');
    }
  }, [years, functions, schemes, selectedYear, selectedFunction, selectedScheme]);

  // Filter data by selected filters
  const filteredData = useMemo(() => {
    if (viewMode === 'chart') {
      return allData;
    }
    return allData.filter(item => {
      const yearMatch = !selectedYear || item.year === selectedYear;
      const functionMatch = !selectedFunction || item.function === selectedFunction;
      const schemeMatch = !selectedScheme || item.scheme === selectedScheme;
      return yearMatch && functionMatch && schemeMatch;
    });
  }, [selectedYear, selectedFunction, selectedScheme, allData, viewMode]);

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

  const handleFunctionChange = (event) => {
    setSelectedFunction(event.target.value);
  };

  const handleSchemeChange = (event) => {
    setSelectedScheme(event.target.value);
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
        Здравствени сметки по функции и шеми
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
            <InputLabel id="function-select-label">Функција</InputLabel>
            <Select
              labelId="function-select-label"
              id="function-select"
              value={selectedFunction}
              label="Функција"
              onChange={handleFunctionChange}
            >
              <MenuItem value="">Сите функции</MenuItem>
              {functions.map((func) => (
                <MenuItem key={func} value={func}>{func}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="scheme-select-label">Шема</InputLabel>
            <Select
              labelId="scheme-select-label"
              id="scheme-select"
              value={selectedScheme}
              label="Шема"
              onChange={handleSchemeChange}
            >
              <MenuItem value="">Сите шеми</MenuItem>
              {schemes.map((scheme) => (
                <MenuItem key={scheme} value={scheme}>{scheme}</MenuItem>
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
          title={`Здравствени сметки по функции и шеми - ${selectedYear || 'Сите години'}`}
          onViewModeChange={handleViewModeChange}
        />
      </LoadingState>
    </Box>
  );
};

export default FunkciiShemiDashboard; 