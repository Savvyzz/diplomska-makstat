import { useState, useEffect, useCallback, useMemo } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import BackButton from '../../components/navigation/BackButton';
import DataTable from '../../components/data-display/DataTable';
import LoadingState from '../../components/feedback/LoadingState';
import statisticsService from '../../services/StatisticsService';
import DataDisplay from '../../components/data-display/DataDisplay';

const EkonomskiSmetkiDetail = ({ title }) => {
  const location = useLocation();
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
  const [selectedRegion, setSelectedRegion] = useState('');
  const [regions, setRegions] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Determine which endpoint to use based on the current route
      const isTekovniCeni = location.pathname.includes('tekovni-ceni');
      const response = isTekovniCeni 
        ? await statisticsService.getEkonomskiSmetkiTekovni()
        : await statisticsService.getEkonomskiSmetkiPostojani();

      if (response) {
        setColumns(response.columns);
        setAllData(response.data);
        setYears(response.years);
        setSelectedYear(response.years[0]); // Select the most recent year by default
        setRegions(response.regions);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message || 'Настана грешка при вчитување на податоците');
    } finally {
      setLoading(false);
    }
  }, [location.pathname]);

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

          {location.pathname.includes('regionalni') && (
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
          )}
        </Box>
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
          title={`${title} - ${selectedYear || 'Сите години'}`}
        />
      </LoadingState>
    </Box>
  );
};

EkonomskiSmetkiDetail.propTypes = {
  title: PropTypes.string.isRequired,
};

export default EkonomskiSmetkiDetail; 