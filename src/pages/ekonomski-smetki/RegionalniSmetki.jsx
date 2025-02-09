import { useState, useEffect, useCallback, useMemo } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import BackButton from '../../components/navigation/BackButton';
import DataTable from '../../components/data-display/DataTable';
import LoadingState from '../../components/feedback/LoadingState';
import statisticsService from '../../services/StatisticsService';

const RegionalniSmetki = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [years, setYears] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  // Define columns statically to ensure they're always in the correct order
  const columns = [
    { field: 'item', headerName: 'Ставка', numeric: false },
    { field: 'region', headerName: 'Регион', numeric: false },
    { field: 'year', headerName: 'Година', numeric: true },
    { field: 'value', headerName: 'Вредност', numeric: true }
  ];

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await statisticsService.getEkonomskiSmetkiRegionalni();

      if (response) {
        setAllData(response.data);
        setYears(response.years);
        setRegions(response.regions);
        setSelectedYear(response.years[0]); // Select the most recent year by default
        setSelectedRegion(response.regions[0]); // Select the first region by default
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

  // Filter data by selected year and region
  useEffect(() => {
    if (selectedYear && selectedRegion && allData.length > 0) {
      const filteredData = allData.filter(item => 
        item.year === selectedYear && 
        item.region === selectedRegion
      );
      setData(filteredData);
      setTotalRows(filteredData.length);
      setPage(0); // Reset to first page when changing filters
    }
  }, [selectedYear, selectedRegion, allData]);

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
              {regions.map((region) => (
                <MenuItem key={region} value={region}>{region}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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

export default RegionalniSmetki; 