import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TablePagination,
  Box,
  LinearProgress,
  TableSortLabel,
  useTheme,
  Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

// Style for screen reader only content
const visuallyHiddenStyle = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
};

const DataTable = ({ 
  columns, 
  data, 
  loading = false,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  totalRows
}) => {
  const theme = useTheme();
  const [orderBy, setOrderBy] = useState(columns[0]?.field || '');
  const [order, setOrder] = useState('asc');

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    const newPage = Math.floor((page * rowsPerPage) / newRowsPerPage);
    onRowsPerPageChange(event);
    onPageChange(null, newPage);
  };

  const sortData = (data) => {
    if (!orderBy) return data;

    return [...data].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (columns.find(col => col.field === orderBy)?.numeric) {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return order === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  };

  const sortedData = sortData(data);

  return (
    <Paper 
      sx={{ 
        width: '100%', 
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: theme.shadows[2]
      }}
      elevation={0}
      variant="outlined"
    >
      {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <TableContainer 
        sx={{ 
          maxHeight: 600,
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.background.default,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.light,
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
            },
          },
        }}
      >
        <Table 
          stickyHeader 
          aria-label="Статистички податоци" 
          sx={{ 
            minWidth: 650,
            '& .MuiTableCell-root': {
              borderColor: theme.palette.divider,
              padding: theme.spacing(2),
            },
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align={column.numeric ? 'right' : 'left'}
                  sortDirection={orderBy === column.field ? order : false}
                  sx={{ 
                    fontWeight: 600,
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <TableSortLabel
                    active={orderBy === column.field}
                    direction={orderBy === column.field ? order : 'asc'}
                    onClick={() => handleSort(column.field)}
                    hideSortIcon={orderBy !== column.field}
                    aria-label={`Подреди по ${column.headerName} ${
                      orderBy === column.field 
                        ? order === 'desc' 
                          ? 'опаѓачки' 
                          : 'растечки'
                        : 'растечки'
                    }`}
                  >
                    {column.headerName}
                    {orderBy === column.field ? (
                      <Box component="span" sx={visuallyHiddenStyle}>
                        {order === 'desc' ? 'подредено опаѓачки' : 'подредено растечки'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length} 
                  align="center"
                  sx={{ py: 8 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    Нема податоци за приказ
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((row, index) => (
                <TableRow
                  hover
                  key={row.id || index}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:nth-of-type(even)': {
                      backgroundColor: theme.palette.action.hover,
                    },
                    '&:nth-of-type(odd)': {
                      backgroundColor: 'transparent',
                    },
                    '&:hover': {
                      backgroundColor: theme.palette.action.selected,
                    },
                  }}
                  tabIndex={0}
                  role="row"
                  aria-rowindex={index + 1}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      align={column.numeric ? 'right' : 'left'}
                      sx={{
                        color: theme.palette.text.primary,
                      }}
                    >
                      {row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Редови по страница:"
        labelDisplayedRows={({ from, to, count }) => 
          `${from}–${to} од ${count !== -1 ? count : `повеќе од ${to}`}`
        }
        getItemAriaLabel={(type) => 
          type === 'first' ? 'Оди на прва страница' :
          type === 'last' ? 'Оди на последна страница' :
          type === 'next' ? 'Оди на следна страница' :
          'Оди на претходна страница'
        }
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          '.MuiTablePagination-select': {
            paddingTop: 1,
            paddingBottom: 1,
          },
        }}
      />
    </Paper>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      numeric: PropTypes.bool
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  totalRows: PropTypes.number
};

export default DataTable; 