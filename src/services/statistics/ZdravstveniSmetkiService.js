import BaseService from '../BaseService';
import { ENDPOINTS } from '@config/apiConfig';

class ZdravstveniSmetkiService extends BaseService {
  async getZdravstveniFunkciiShemi() {
    const response = await this.post(ENDPOINTS.ZDRAVSTVENI_SMETKI_FUNKCII_SHEMI, {
      query: [],
      response: {
        format: "json-stat"
      }
    });

    const dataset = response.dataset;
    const functions = dataset.dimension['Health care functions'].category;
    const years = dataset.dimension.Year.category;
    const schemes = dataset.dimension['Health care financing schemes'].category;
    const values = dataset.value;

    // Get dimensions sizes
    const numFunctions = Object.keys(functions.index).length;
    const numYears = Object.keys(years.index).length;
    const numSchemes = Object.keys(schemes.index).length;

    // Transform the data into rows
    const transformedData = [];
    const yearsWithData = new Set();
    
    // For each function and scheme combination
    Object.entries(functions.label).forEach(([functionCode, functionLabel]) => {
      const functionIndex = functions.index[functionCode];
      Object.entries(schemes.label).forEach(([schemeCode, schemeLabel]) => {
        const schemeIndex = schemes.index[schemeCode];
        Object.entries(years.label).forEach(([year, yearLabel]) => {
          const yearIndex = years.index[year];

          // Calculate the position in the values array
          const valueIndex = (functionIndex * numYears * numSchemes) + (yearIndex * numSchemes) + schemeIndex;
          const value = values[valueIndex];

          // Only add if value is not null and not undefined
          if (value !== null && value !== undefined) {
            transformedData.push({
              id: `${functionCode}-${year}-${schemeCode}`,
              function: functionLabel,
              scheme: schemeLabel,
              year: yearLabel,
              value: value
            });
            yearsWithData.add(yearLabel);
          }
        });
      });
    });

    // Get unique years for filtering, sorted in descending order
    const uniqueYears = [...yearsWithData].sort((a, b) => b - a);

    // Extract unique functions and schemes for filtering
    const uniqueFunctions = [...new Set(transformedData.map(item => item.function))];
    const uniqueSchemes = [...new Set(transformedData.map(item => item.scheme))];

    return {
      columns: [
        { field: 'function', headerName: 'Здравствена функција', numeric: false },
        { field: 'scheme', headerName: 'Здравствена шема', numeric: false },
        { field: 'year', headerName: 'Година', numeric: true },
        { field: 'value', headerName: 'Вредност', numeric: true }
      ],
      data: transformedData,
      totalRows: transformedData.length,
      years: uniqueYears,
      functions: uniqueFunctions,
      schemes: uniqueSchemes
    };
  }

  async getZdravstveniFunkciiDavateli() {
    const response = await this.post(ENDPOINTS.ZDRAVSTVENI_SMETKI_FUNKCII_DAVATELI, {
      query: [],
      response: {
        format: "json-stat"
      }
    });

    const dataset = response.dataset;
    const functions = dataset.dimension['Health care functions'].category;
    const years = dataset.dimension.Year.category;
    const providers = dataset.dimension['Health care providers'].category;
    const values = dataset.value;
    const status = dataset.status || {};

    // Get dimensions sizes
    const numFunctions = Object.keys(functions.index).length;
    const numYears = Object.keys(years.index).length;
    const numProviders = Object.keys(providers.index).length;

    // Transform the data into rows
    const transformedData = [];
    const yearsWithData = new Set();
    
    // For each function and provider combination
    Object.entries(functions.label).forEach(([functionCode, functionLabel]) => {
      const functionIndex = functions.index[functionCode];
      Object.entries(providers.label).forEach(([providerCode, providerLabel]) => {
        const providerIndex = providers.index[providerCode];
        Object.entries(years.label).forEach(([year, yearLabel]) => {
          const yearIndex = years.index[year];

          // Calculate the position in the values array
          const valueIndex = (functionIndex * numYears * numProviders) + (yearIndex * numProviders) + providerIndex;
          const value = values[valueIndex];

          // Check if value exists and is not marked as unavailable in status
          if (value !== null && value !== undefined && status[valueIndex] !== '-' && status[valueIndex] !== '..') {
            transformedData.push({
              id: `${functionCode}-${year}-${providerCode}`,
              function: functionLabel,
              provider: providerLabel.trim(),
              year: yearLabel,
              value: value
            });
            yearsWithData.add(yearLabel);
          }
        });
      });
    });

    // Get unique years for filtering, sorted in descending order
    const uniqueYears = [...yearsWithData].sort((a, b) => b - a);
    
    // Extract unique functions and providers for filtering
    const uniqueFunctions = [...new Set(transformedData.map(item => item.function))];
    const uniqueProviders = [...new Set(transformedData.map(item => item.provider))];

    return {
      columns: [
        { field: 'function', headerName: 'Здравствена функција', numeric: false },
        { field: 'provider', headerName: 'Давател на здравствена заштита', numeric: false },
        { field: 'year', headerName: 'Година', numeric: true },
        { field: 'value', headerName: 'Вредност', numeric: true }
      ],
      data: transformedData,
      totalRows: transformedData.length,
      years: uniqueYears,
      categories: uniqueFunctions, // Use functions as categories
      functions: uniqueFunctions,
      providers: uniqueProviders
    };
  }

  async getZdravstveniDavateliShemi() {
    const response = await this.post(ENDPOINTS.ZDRAVSTVENI_SMETKI_DAVATELI_SHEMI, {
      query: [],
      response: {
        format: "json-stat"
      }
    });

    const dataset = response.dataset;
    const providers = dataset.dimension['Даватели на здравствена заштита'].category;
    const years = dataset.dimension['Година'].category;
    const schemes = dataset.dimension['Здравствени  шеми'].category;
    const values = dataset.value;
    const status = dataset.status || {};

    // Get dimensions sizes
    const numProviders = Object.keys(providers.index).length;
    const numYears = Object.keys(years.index).length;
    const numSchemes = Object.keys(schemes.index).length;

    // Transform the data into rows
    const transformedData = [];
    const yearsWithData = new Set();
    
    // For each provider and scheme combination
    Object.entries(providers.label).forEach(([providerCode, providerLabel]) => {
      const providerIndex = providers.index[providerCode];
      Object.entries(schemes.label).forEach(([schemeCode, schemeLabel]) => {
        const schemeIndex = schemes.index[schemeCode];
        Object.entries(years.label).forEach(([year, yearLabel]) => {
          const yearIndex = years.index[year];

          // Calculate the position in the values array
          const valueIndex = (providerIndex * numYears * numSchemes) + (yearIndex * numSchemes) + schemeIndex;
          const value = values[valueIndex];

          // Check if value exists and is not marked as unavailable in status
          if (value !== null && value !== undefined && status[valueIndex] !== '-' && status[valueIndex] !== '..') {
            transformedData.push({
              id: `${providerCode}-${year}-${schemeCode}`,
              provider: providerLabel.trim(),
              scheme: schemeLabel.trim(),
              year: yearLabel,
              value: value
            });
            yearsWithData.add(yearLabel);
          }
        });
      });
    });

    // Get unique years for filtering, sorted in descending order
    const uniqueYears = [...yearsWithData].sort((a, b) => b - a);

    // Extract unique providers and schemes for filtering
    const uniqueProviders = [...new Set(transformedData.map(item => item.provider))];
    const uniqueSchemes = [...new Set(transformedData.map(item => item.scheme))];

    return {
      columns: [
        { field: 'provider', headerName: 'Давател на здравствена заштита', numeric: false },
        { field: 'scheme', headerName: 'Здравствена шема', numeric: false },
        { field: 'year', headerName: 'Година', numeric: true },
        { field: 'value', headerName: 'Вредност', numeric: true }
      ],
      data: transformedData,
      totalRows: transformedData.length,
      years: uniqueYears,
      providers: uniqueProviders,
      schemes: uniqueSchemes
    };
  }
}

export default new ZdravstveniSmetkiService(); 