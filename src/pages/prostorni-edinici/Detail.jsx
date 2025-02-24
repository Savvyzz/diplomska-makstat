import { useState, useEffect, useCallback, useMemo } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import BackButton from '../../components/navigation/BackButton';
import DataTable from '../../components/data-display/DataTable';
import LoadingState from '../../components/feedback/LoadingState';
import statisticsService from '../../services/StatisticsService';

const ProstorniEdiniciDetail = ({ title }) => {
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
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await statisticsService.getProstorniEdiniciOpstiniNaseleniMesta();

      if (response) {
        setColumns(response.columns);
        setAllData(response.data);
        setPeriods(response.periods);
        setRegions(response.regions);
        setSelectedPeriod(response.periods[0]); // Select the most recent period by default
        setSelectedRegion(''); // Don't select any region by default
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

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    if (!selectedPeriod && !selectedRegion) return allData;
    
    return allData.filter(item => {
      const periodMatch = !selectedPeriod || item.period === selectedPeriod;
      const regionMatch = !selectedRegion || item.region === selectedRegion;
      return periodMatch && regionMatch;
    });
  }, [allData, selectedPeriod, selectedRegion]);

  // Update data and total rows when filtered data changes
  useEffect(() => {
    setData(filteredData);
    setTotalRows(filteredData.length);
    setPage(0); // Reset to first page when filters change
  }, [filteredData]);

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

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
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
        {title}
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        gap: 2
      }}>
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

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="region-select-label">Статистички регион</InputLabel>
            <Select
              labelId="region-select-label"
              id="region-select"
              value={selectedRegion}
              label="Статистички регион"
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

ProstorniEdiniciDetail.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ProstorniEdiniciDetail; 