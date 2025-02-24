import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import TableChartIcon from '@mui/icons-material/TableChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import DataTable from './DataTable';
import DataChart from './DataChart';

const DataDisplay = ({ 
  data,
  columns,
  loading,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  totalRows,
  title,
  onViewModeChange
}) => {
  const [viewMode, setViewMode] = useState('table');

  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
      onViewModeChange?.(newMode);
    }
  };

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        mb: 2 
      }}>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewModeChange}
          aria-label="view mode"
          size="small"
        >
          <Tooltip title="Табеларен приказ">
            <ToggleButton value="table" aria-label="table view">
              <TableChartIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Графички приказ">
            <ToggleButton value="chart" aria-label="chart view">
              <PieChartIcon />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      </Box>

      {viewMode === 'table' ? (
        <DataTable
          columns={columns}
          data={data}
          loading={loading}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          totalRows={totalRows}
        />
      ) : (
        <DataChart 
          data={data}
          title={title}
        />
      )}
    </Box>
  );
};

DataDisplay.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    headerName: PropTypes.string.isRequired,
    numeric: PropTypes.bool
  })).isRequired,
  loading: PropTypes.bool,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  totalRows: PropTypes.number.isRequired,
  title: PropTypes.string,
  onViewModeChange: PropTypes.func
};

export default DataDisplay; 