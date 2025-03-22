import BaseService from '../BaseService';
import { ENDPOINTS } from '@config/apiConfig';

class PoloviStatistikiService extends BaseService {
  async getPoloviStatistikiPokazateli() {
    const response = await this.post(ENDPOINTS.POLOVI_STATISTIKI_POKAZATELI, {
      query: [],
      response: {
        format: "json-stat"
      }
    });

    const dataset = response.dataset;
    const pokazateliDimension = dataset.dimension['Показател'].category;
    const yearDimension = dataset.dimension['Година'].category;
    const polDimension = dataset.dimension['Пол'].category;
    const values = dataset.value;
    const status = dataset.status || {};

    // Get dimensions sizes
    const numPokazateli = Object.keys(pokazateliDimension.index).length;
    const numYears = Object.keys(yearDimension.index).length;
    const numPol = Object.keys(polDimension.index).length;

    // Transform the data into rows
    const transformedData = [];
    const yearsWithData = new Set();
    const gendersWithData = new Set();
    
    // For each pokazatel, year, and pol combination
    Object.entries(pokazateliDimension.label).forEach(([pokazatelCode, pokazatelLabel]) => {
      const pokazatelIndex = pokazateliDimension.index[pokazatelCode];
      Object.entries(yearDimension.label).forEach(([year, yearLabel]) => {
        const yearIndex = yearDimension.index[year];
        Object.entries(polDimension.label).forEach(([polCode, polLabel]) => {
          const polIndex = polDimension.index[polCode];

          // Calculate the position in the values array
          const valueIndex = (pokazatelIndex * numYears * numPol) + (yearIndex * numPol) + polIndex;
          const value = values[valueIndex];
          const statusValue = status[valueIndex];

          // Only add if value is not null or has a status
          if (value !== null || statusValue) {
            transformedData.push({
              id: `${pokazatelCode}-${year}-${polCode}`,
              pokazatel: pokazatelLabel,
              year: yearLabel,
              pol: polLabel,
              value: statusValue || value
            });
            yearsWithData.add(yearLabel);
            gendersWithData.add(polLabel);
          }
        });
      });
    });

    // Get unique years and genders for filtering, sorted appropriately
    const uniqueYears = [...yearsWithData].sort((a, b) => b - a);
    const uniqueGenders = [...gendersWithData];
    const uniquePokazateli = [...new Set(transformedData.map(item => item.pokazatel))];

    return {
      columns: [
        { field: 'pokazatel', headerName: 'Показател', numeric: false },
        { field: 'year', headerName: 'Година', numeric: true },
        { field: 'pol', headerName: 'Пол', numeric: false },
        { field: 'value', headerName: 'Вредност', numeric: true }
      ],
      data: transformedData,
      totalRows: transformedData.length,
      years: uniqueYears,
      genders: uniqueGenders,
      categories: uniquePokazateli
    };
  }

  async getPoloviStatistikiZrtviNasilstvo() {
    const response = await this.post(ENDPOINTS.POLOVI_STATISTIKI_ZRTVI_NASILSTVO, {
      query: [],
      response: {
        format: "json-stat"
      }
    });

    const dataset = response.dataset;
    const vozrasniGrupiDimension = dataset.dimension['Возрасни групи'].category;
    const yearDimension = dataset.dimension['Година'].category;
    const priciniDimension = dataset.dimension['Причини'].category;
    const values = dataset.value;
    const status = dataset.status || {};

    // Get dimensions sizes
    const numVozrasniGrupi = Object.keys(vozrasniGrupiDimension.index).length;
    const numYears = Object.keys(yearDimension.index).length;
    const numPricini = Object.keys(priciniDimension.index).length;

    // Transform the data into rows
    const transformedData = [];
    const yearsWithData = new Set();
    const vozrasniGrupiWithData = new Set();
    
    // For each combination of dimensions
    Object.entries(vozrasniGrupiDimension.label).forEach(([vozrastCode, vozrastLabel]) => {
      const vozrastIndex = vozrasniGrupiDimension.index[vozrastCode];
      Object.entries(yearDimension.label).forEach(([year, yearLabel]) => {
        const yearIndex = yearDimension.index[year];
        Object.entries(priciniDimension.label).forEach(([pricinaCode, pricinaLabel]) => {
          const pricinaIndex = priciniDimension.index[pricinaCode];

          // Calculate the position in the values array
          const valueIndex = (vozrastIndex * numYears * numPricini) + (yearIndex * numPricini) + pricinaIndex;
          const value = values[valueIndex];
          const statusValue = status[valueIndex];

          // Only add if value is not null or has a status
          if (value !== null || statusValue) {
            transformedData.push({
              id: `${vozrastCode}-${year}-${pricinaCode}`,
              vozrastGrupa: vozrastLabel,
              year: yearLabel,
              pricina: pricinaLabel,
              value: statusValue || value
            });
            yearsWithData.add(yearLabel);
            vozrasniGrupiWithData.add(vozrastLabel);
          }
        });
      });
    });

    // Get unique years and age groups for filtering, sorted appropriately
    const uniqueYears = [...yearsWithData].sort((a, b) => b - a);
    const uniqueVozrasniGrupi = [...vozrasniGrupiWithData];

    return {
      columns: [
        { field: 'vozrastGrupa', headerName: 'Возрасна група', numeric: false },
        { field: 'pricina', headerName: 'Причина', numeric: false },
        { field: 'year', headerName: 'Година', numeric: true },
        { field: 'value', headerName: 'Процент', numeric: true }
      ],
      data: transformedData,
      totalRows: transformedData.length,
      years: uniqueYears,
      vozrasniGrupi: uniqueVozrasniGrupi
    };
  }
}

export default new PoloviStatistikiService(); 