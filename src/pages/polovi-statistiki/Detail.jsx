import { useState, useEffect, useCallback, useMemo } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import BackButton from '../../components/navigation/BackButton';
import DataDisplay from '../../components/data-display/DataDisplay';
import LoadingState from '../../components/feedback/LoadingState';
import statisticsService from '../../services/StatisticsService';

const PoloviStatistikiDetail = ({ title }) => {
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
  const [vozrasniGrupi, setVozrasniGrupi] = useState([]);
  const [selectedVozrastGrupa, setSelectedVozrastGrupa] = useState('');
  const [genders, setGenders] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');

  const isZrtviNasilstvo = location.pathname.includes('zrtvi-nasilstvo');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = isZrtviNasilstvo
        ? await statisticsService.getPoloviStatistikiZrtviNasilstvo()
        : await statisticsService.getPoloviStatistikiPokazateli();

      if (response) {
        setColumns(response.columns);
        setAllData(response.data);
        setYears(response.years);
        setSelectedYear(response.years[0]); // Select the most recent year by default

        if (isZrtviNasilstvo) {
          setVozrasniGrupi(response.vozrasniGrupi);
          setSelectedVozrastGrupa(response.vozrasniGrupi[0]);
        } else {
          setGenders(response.genders);
          setSelectedGender(response.genders[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message || 'Настана грешка при вчитување на податоците');
    } finally {
      setLoading(false);
    }
  }, [location.pathname, isZrtviNasilstvo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    if (!selectedYear && !selectedGender && !selectedVozrastGrupa) return allData;
    
    return allData.filter(item => {
      if (isZrtviNasilstvo) {
        const yearMatch = !selectedYear || item.year === selectedYear;
        const vozrastMatch = !selectedVozrastGrupa || item.vozrastGrupa === selectedVozrastGrupa;
        return yearMatch && vozrastMatch;
      } else {
        const yearMatch = !selectedYear || item.year === selectedYear;
        const genderMatch = !selectedGender || item.pol === selectedGender;
        return yearMatch && genderMatch;
      }
    });
  }, [allData, selectedYear, selectedGender, selectedVozrastGrupa, isZrtviNasilstvo]);

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

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleVozrastGrupaChange = (event) => {
    setSelectedVozrastGrupa(event.target.value);
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
          {location.pathname.includes('zrtvi-nasilstvo') ? (
            <>
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
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="age-group-select-label">Возрасна група</InputLabel>
                <Select
                  labelId="age-group-select-label"
                  id="age-group-select"
                  value={selectedVozrastGrupa}
                  label="Возрасна група"
                  onChange={handleVozrastGrupaChange}
                >
                  <MenuItem value="">Сите возрасни групи</MenuItem>
                  {vozrasniGrupi.map((grupa) => (
                    <MenuItem key={grupa} value={grupa}>{grupa}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            <>
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
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="gender-select-label">Пол</InputLabel>
                <Select
                  labelId="gender-select-label"
                  id="gender-select"
                  value={selectedGender}
                  label="Пол"
                  onChange={handleGenderChange}
                >
                  <MenuItem value="">Сите</MenuItem>
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
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

PoloviStatistikiDetail.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PoloviStatistikiDetail; 