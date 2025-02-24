import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

const DataChart = ({ data, title }) => {
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

  // Prepare data for the pie chart
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
        backgroundColor,
        borderColor,
        borderWidth: 1,
      }]
    };
  };

  const chartData = prepareChartData();

  const options = {
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
          // Customize legend labels
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

  return (
    <Box sx={{ 
      width: '100%', 
      height: 500, 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center' 
    }}>
      {title && (
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
      )}
      <Box sx={{ width: '100%', height: '100%' }}>
        <Pie data={chartData} options={options} />
      </Box>
    </Box>
  );
};

DataChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string
};

export default DataChart; 