import React from 'react';
import PropTypes from 'prop-types';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Box, Typography, ToggleButton, ToggleButtonGroup, Tooltip as MuiTooltip } from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title
);

const DataChart = ({ data, title }) => {
  const [chartType, setChartType] = React.useState('pie');

  // Generate random colors for chart segments
  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 137.5) % 360; // Use golden angle approximation for better distribution
      colors.push(`hsl(${hue}, 70%, 60%)`);
    }
    return colors;
  };

  // Create a descriptive label for each data point
  const createLabel = (item) => {
    // Extract meaningful fields based on data structure
    const labelParts = [];

    // Handle different data structures
    if (item.function) labelParts.push(item.function);
    if (item.provider) labelParts.push(item.provider);
    if (item.category) labelParts.push(item.category);
    if (item.pokazatel) labelParts.push(item.pokazatel);
    if (item.region) labelParts.push(item.region);
    if (item.type) labelParts.push(item.type);
    if (item.pol) labelParts.push(item.pol);
    if (item.vozrastGrupa) labelParts.push(item.vozrastGrupa);
    if (item.pricina) labelParts.push(item.pricina);
    
    // Add year/period if available
    if (item.year || item.period) {
      labelParts.push(item.year || item.period);
    }

    return labelParts.join(' - ');
  };

  // Prepare data for the charts
  const prepareChartData = () => {
    // Take first 10 items to avoid overcrowding
    const displayData = data.slice(0, 10);
    
    const backgroundColor = generateColors(displayData.length);
    const borderColor = backgroundColor.map(color => color.replace('60%', '50%'));

    const labels = displayData.map(item => createLabel(item));
    const values = displayData.map(item => 
      typeof item.value === 'string' ? 
        parseFloat(item.value.replace(/,/g, '')) : 
        item.value
    );

    return {
      labels,
      datasets: [{
        data: values,
        backgroundColor: chartType === 'line' ? backgroundColor[0] : backgroundColor,
        borderColor: chartType === 'line' ? borderColor[0] : borderColor,
        borderWidth: chartType === 'line' ? 2 : 1,
        label: 'Вредност',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: backgroundColor[0],
        pointBorderColor: borderColor[0],
        pointRadius: chartType === 'line' ? 4 : 0,
        pointHoverRadius: chartType === 'line' ? 6 : 0,
      }]
    };
  };

  const chartData = prepareChartData();

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 20,
          padding: 20,
          font: {
            size: 12
          },
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => ({
                text: label,
                fillStyle: data.datasets[0].backgroundColor[i],
                strokeStyle: data.datasets[0].borderColor[i],
                lineWidth: 1,
                hidden: false,
                index: i
              }));
            }
            return [];
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const label = context.label || '';
            return [
              label,
              `Вредност: ${value.toLocaleString('mk-MK')}`
            ];
          }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `Вредност: ${value.toLocaleString('mk-MK')}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toLocaleString('mk-MK')
        }
      },
      y: {
        ticks: {
          font: {
            size: 11
          },
          callback: (value) => {
            const label = chartData.labels[value];
            // Truncate long labels
            return label.length > 50 ? label.substr(0, 47) + '...' : label;
          }
        }
      }
    }
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `Вредност: ${value.toLocaleString('mk-MK')}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 11
          },
          maxRotation: 45,
          minRotation: 45,
          callback: (value) => {
            const label = chartData.labels[value];
            return label.length > 30 ? label.substr(0, 27) + '...' : label;
          }
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toLocaleString('mk-MK')
        }
      }
    }
  };

  const handleChartTypeChange = (event, newType) => {
    if (newType !== null) {
      setChartType(newType);
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      height: 500, 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center' 
    }}>
      <Box sx={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2 
      }}>
        {title && (
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
        )}
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={handleChartTypeChange}
          aria-label="chart type"
          size="small"
        >
          <MuiTooltip title="Кружен дијаграм">
            <ToggleButton value="pie" aria-label="pie chart">
              <PieChartIcon />
            </ToggleButton>
          </MuiTooltip>
          <MuiTooltip title="Столбест дијаграм">
            <ToggleButton value="bar" aria-label="bar chart">
              <BarChartIcon />
            </ToggleButton>
          </MuiTooltip>
          <MuiTooltip title="Линиски дијаграм">
            <ToggleButton value="line" aria-label="line chart">
              <ShowChartIcon />
            </ToggleButton>
          </MuiTooltip>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ width: '100%', height: 'calc(100% - 48px)' }}>
        {chartType === 'pie' ? (
          <Pie data={chartData} options={pieOptions} />
        ) : chartType === 'bar' ? (
          <Bar data={chartData} options={barOptions} />
        ) : (
          <Line data={chartData} options={lineOptions} />
        )}
      </Box>
    </Box>
  );
};

DataChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string
};

export default DataChart; 