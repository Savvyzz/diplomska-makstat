import { useState, useMemo } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import BackButton from '../../components/navigation/BackButton';
import DataDisplay from '../../components/data-display/DataDisplay';
import LoadingState from '../../components/feedback/LoadingState';
import { usePoloviStatistiki } from '../../hooks/useStatistics';

const PoloviStatistikiDetail = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [viewMode, setViewMode] = useState('table');

  // Use React Query hook
  const { data: response, isLoading, error, refetch } = usePoloviStatistiki();
  const { data: allData = [], columns = [], years = [], categories = [], genders = [] } = response || {};

  // Filter data by selected filters
  const filteredData = useMemo(() => {
    if (viewMode === 'chart') {
      return allData;
    }
    return allData.filter(item => {
      const yearMatch = selectedYear === '' || item.year === selectedYear;
      const categoryMatch = selectedCategory === '' || item.pokazatel === selectedCategory;
      const genderMatch = selectedGender === '' || item.pol === selectedGender;
      return yearMatch && categoryMatch && genderMatch;
    });
  }, [selectedYear, selectedCategory, selectedGender, allData, viewMode]);

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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
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
        Полови статистики
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
            <InputLabel id="category-select-label">Категорија</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              label="Категорија"
              onChange={handleCategoryChange}
            >
              <MenuItem value="">Сите категории</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
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
          title={`Полови статистики${selectedYear ? ` - ${selectedYear}` : ''}${selectedCategory ? ` - ${selectedCategory}` : ''}${selectedGender ? ` - ${selectedGender}` : ''}`}
          onViewModeChange={handleViewModeChange}
        />
      </LoadingState>
    </Box>
  );
};

export default PoloviStatistikiDetail; 