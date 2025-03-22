import BaseService from '../BaseService';
import { ENDPOINTS } from '@config/apiConfig';

class ProstorniEdiniciService extends BaseService {
  async getProstorniEdiniciOpstiniNaseleniMesta() {
    const response = await this.post(ENDPOINTS.PROSTORNI_EDINICI_OPSTINI_NASELENI_MESTA, {
      query: [],
      response: {
        format: "json-stat"
      }
    });

    const dataset = response.dataset;
    const regionDimension = dataset.dimension['Статистички регион'].category;
    const periodDimension = dataset.dimension['Период'].category;
    const typeDimension = dataset.dimension['Општини и населени места'].category;
    const values = dataset.value;

    // Get dimensions sizes
    const numRegions = Object.keys(regionDimension.index).length;
    const numPeriods = Object.keys(periodDimension.index).length;
    const numTypes = Object.keys(typeDimension.index).length;

    // Transform the data into rows
    const transformedData = [];
    const periodsWithData = new Set();
    const regionsWithData = new Set();
    
    // For each combination of dimensions
    Object.entries(regionDimension.label).forEach(([regionCode, regionLabel]) => {
      const regionIndex = regionDimension.index[regionCode];
      Object.entries(periodDimension.label).forEach(([periodCode, periodLabel]) => {
        const periodIndex = periodDimension.index[periodCode];
        Object.entries(typeDimension.label).forEach(([typeCode, typeLabel]) => {
          const typeIndex = typeDimension.index[typeCode];

          // Calculate the position in the values array
          const valueIndex = (regionIndex * numPeriods * numTypes) + (periodIndex * numTypes) + typeIndex;
          const value = values[valueIndex];

          // Only add if value is not null
          if (value !== null) {
            transformedData.push({
              id: `${regionCode}-${periodCode}-${typeCode}`,
              region: regionLabel,
              period: periodLabel,
              type: typeLabel,
              value: value
            });
            periodsWithData.add(periodLabel);
            regionsWithData.add(regionLabel);
          }
        });
      });
    });

    // Get unique periods and regions for filtering
    const uniquePeriods = [...periodsWithData];
    const uniqueRegions = [...regionsWithData];
    const uniqueTypes = [...new Set(transformedData.map(item => item.type))];

    return {
      columns: [
        { field: 'region', headerName: 'Статистички регион', numeric: false },
        { field: 'period', headerName: 'Период', numeric: false },
        { field: 'type', headerName: 'Тип', numeric: false },
        { field: 'value', headerName: 'Број', numeric: true }
      ],
      data: transformedData,
      totalRows: transformedData.length,
      periods: uniquePeriods,
      regions: uniqueRegions,
      types: uniqueTypes
    };
  }
}

export default new ProstorniEdiniciService(); 