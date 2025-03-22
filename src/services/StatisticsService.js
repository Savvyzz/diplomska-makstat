import BaseService from './BaseService';
import { ENDPOINTS } from '../config/apiConfig';

class StatisticsService extends BaseService {
  async getGradeznistvo() {
    const response = await this.post(ENDPOINTS.GRADEZNISTVO, {
      query: [],
      response: {
        format: "json-stat"
      }
    });

    const dataset = response.dataset;
    const questions = dataset.dimension['Прашања'].category;
    const periods = dataset.dimension['Година/месец'].category;
    const values = dataset.value;

    // Extract unique years from periods
    const uniqueYears = [...new Set(Object.values(periods.label).map(period => period.split('/')[0]))].sort().reverse();

    // Transform the data into rows
    const transformedData = [];
    
    // For each question and period combination
    Object.entries(questions.label).forEach(([questionIndex, questionLabel]) => {
      Object.entries(periods.label).forEach(([periodIndex, periodLabel]) => {
        // Calculate the position in the values array
        const valueIndex = parseInt(questionIndex) + parseInt(periodIndex) + (Object.keys(periods.label).length-1) * parseInt(questionIndex);
        
        const [year, month] = periodLabel.split('/');
        
        transformedData.push({
          id: `${questionIndex}-${periodIndex}`,
          question: questionLabel,
          period: periodLabel,
          year: year,
          month: month,
          value: values[valueIndex]
        });
      });
    });

    return {
      columns: [
        { field: 'question', headerName: 'Прашање', numeric: false },
        { field: 'period', headerName: 'Период', numeric: false },
        { field: 'value', headerName: 'Вредност', numeric: true }
      ],
      data: transformedData,
      totalRows: transformedData.length,
      years: uniqueYears
    };
  }

  async getPrerabotuvackaIndustrija() {
    const response = await this.post(ENDPOINTS.PRERABOTUVACKA_INDUSTRIJA, {
      query: [],
      response: {
        format: "json-stat"
      }
    });

    const dataset = response.dataset;
    const questions = dataset.dimension['Прашања'].category;
    const periods = dataset.dimension['Година/месец'].category;
    const values = dataset.value;

    // Extract unique years from periods
    const uniqueYears = [...new Set(Object.values(periods.label).map(period => period.split('/')[0]))].sort().reverse();

    // Transform the data into rows
    const transformedData = [];
    
    // For each question and period combination
    Object.entries(questions.label).forEach(([questionIndex, questionLabel]) => {
      Object.entries(periods.label).forEach(([periodIndex, periodLabel]) => {
        // Calculate the position in the values array
        const valueIndex = parseInt(questionIndex) + parseInt(periodIndex) + (Object.keys(periods.label).length-1) * parseInt(questionIndex);
        
        const [year, month] = periodLabel.split('/');
        
        transformedData.push({
          id: `${questionIndex}-${periodIndex}`,
          question: questionLabel,
          period: periodLabel,
          year: year,
          month: month,
          value: values[valueIndex]
        });
      });
    });

    return {
      columns: [
        { field: 'question', headerName: 'Прашање', numeric: false },
        { field: 'period', headerName: 'Период', numeric: false },
        { field: 'value', headerName: 'Вредност', numeric: true }
      ],
      data: transformedData,
      totalRows: transformedData.length,
      years: uniqueYears
    };
  }

  async getTrgovija() {
    const response = await this.post(ENDPOINTS.TRGOVIJA, {
      query: [],
      response: {
        format: "json-stat"
      }
    });

    const dataset = response.dataset;
    const questions = dataset.dimension['Прашања'].category;
    const periods = dataset.dimension['Година/тримесечје'].category;
    const values = dataset.value;

    // Get all period labels sorted in reverse chronological order
    const periodLabels = Object.values(periods.label).sort().reverse();

    // Transform the data into rows
    const transformedData = [];
    
    // For each question and period combination
    Object.entries(questions.index).forEach(([questionKey, questionIndex]) => {
      Object.entries(periods.index).forEach(([periodKey, periodIndex]) => {
        // Calculate the position in the values array
        const valueIndex = parseInt(questionIndex) + parseInt(periodIndex) + (Object.keys(periods.label).length-1) * parseInt(questionIndex);
        
        const periodLabel = periods.label[periodKey];
        
        transformedData.push({
          id: `${questionIndex}-${periodIndex}`,
          question: questions.label[questionKey],
          period: periodLabel,
          value: values[valueIndex]
        });
      });
    });

    return {
      columns: [
        { field: 'question', headerName: 'Прашање', numeric: false },
        { field: 'period', headerName: 'Период', numeric: false },
        { field: 'value', headerName: 'Вредност', numeric: true }
      ],
      data: transformedData,
      totalRows: transformedData.length,
      periods: periodLabels
    };
  }

  async getEkonomskiSmetkiTekovni() {
    const response = await this.post(ENDPOINTS.EKONOMSKI_SMETKI_TEKOVNI, {
      query: [],
      response: {
        format: "json"
      }
    });

    // Get the mapping of codes to labels from the first column
    const categories = response.columns.find(col => 
      col.text === "Земјоделско производство и трошоци на земјоделското производство"
    );

    // Create a map of codes to their labels
    const categoryMap = {};
    if (categories && categories.values && categories.valueTexts) {
      categories.values.forEach((code, index) => {
        categoryMap[code] = categories.valueTexts[index];
      });
    }

    // Transform the data
    const transformedData = response.data
      .filter(item => item.key[1] && item.key[1].trim() !== "") // Filter out empty years
      .map((item, index) => ({
        id: index,
        category: categoryMap[item.key[0]] || item.key[0],
        categoryCode: item.key[0],
        year: item.key[1],
        value: parseFloat(item.values[0])
      }));

    // Get unique years for filtering
    const years = [...new Set(transformedData.map(item => item.year))]
      .sort((a, b) => b - a); // Sort years in descending order

    return {
      columns: [
        { field: 'category', headerName: 'Категорија', numeric: false },
        { field: 'year', headerName: 'Година', numeric: true },
        { field: 'value', headerName: 'Вредност', numeric: true }
      ],
      data: transformedData,
      totalRows: transformedData.length,
      years: years
    };
  }

  async getEkonomskiSmetkiPostojani() {
    const response = await this.post(ENDPOINTS.EKONOMSKI_SMETKI_POSTOJANI, {
      query: [],
      response: {
        format: "json-stat"
      }
    });

    const dataset = response.dataset;
    const categories = dataset.dimension['Agricultural production and costs of agricultural production'];
    const years = dataset.dimension['Year'];
    const values = dataset.value;

    // Transform the data into rows
    const transformedData = [];
    
    // For each category and year combination
    Object.entries(categories.category.index).forEach(([categoryIndex, categoryPosition]) => {
      Object.entries(years.category.index).forEach(([year, yearPosition]) => {
        // Calculate the position in the values array
        const valueIndex = parseInt(categoryPosition) + parseInt(yearPosition) + (Object.keys(years.category.index).length - 1) * parseInt(categoryPosition);
        const value = values[valueIndex];
        
        // Only add if value is not null
        if (value !== null) {
          transformedData.push({
            id: `${categoryIndex}-${year}`,
            category: categories.category.label[categoryIndex],
            year: year,
            value: value
          });
        }
      });
    });

    // Get unique years for filtering
    const uniqueYears = Object.keys(years.category.label)
      .sort((a, b) => b - a); // Sort years in descending order

    return {
      columns: [
        { field: 'category', headerName: 'Категорија', numeric: false },
        { field: 'year', headerName: 'Година', numeric: true },
        { field: 'value', headerName: 'Вредност', numeric: true }
      ],
      data: transformedData,
      totalRows: transformedData.length,
      years: uniqueYears
    };
  }

  async getEkonomskiSmetkiRegionalni() {
    const response = await this.post(ENDPOINTS.EKONOMSKI_SMETKI_REGIONALNI, {
      query: [],
      response: {
        format: "json-stat"
      }
    });

    const dataset = response.dataset;
    const items = dataset.dimension.Items.category;
    const years = dataset.dimension.Year.category;
    const regions = dataset.dimension.Region.category;
    const values = dataset.value;

    // Get dimensions sizes
    const numItems = Object.keys(items.index).length;
    const numYears = Object.keys(years.index).length;
    const numRegions = Object.keys(regions.index).length;

    // Transform the data into rows
    const transformedData = [];
    
    // For each item, year, and region combination
    Object.entries(items.label).forEach(([itemCode, itemLabel]) => {
      const itemIndex = items.index[itemCode];
      Object.entries(years.label).forEach(([year, yearLabel]) => {
        const yearIndex = years.index[year];
        Object.entries(regions.label).forEach(([regionCode, regionLabel]) => {
          const regionIndex = regions.index[regionCode];

          const valueIndex = (itemIndex * numYears * numRegions) + (yearIndex * numRegions) + regionIndex;

          const value = values[valueIndex];

          // Only add if value is not null
          if (value !== null) {
            transformedData.push({
              id: `${itemCode}-${year}-${regionCode}`,
              item: itemLabel,
              year: yearLabel,
              region: regionLabel,
              value: parseFloat(value).toLocaleString('mk-MK')
            });
          }
        });
      });
    });

    // Get unique years for filtering, sorted in descending order
    const uniqueYears = Object.values(years.label)
      .sort((a, b) => b - a);

    // Get unique regions for filtering
    const uniqueRegions = Object.values(regions.label);

    return {
      data: transformedData,
      columns: [
        { field: 'item', headerName: 'Категорија', numeric: false },
        { field: 'year', headerName: 'Година', numeric: true },
        { field: 'region', headerName: 'Регион', numeric: false },
        { field: 'value', headerName: 'Вредност', numeric: true }
      ],
      years: uniqueYears,
      regions: uniqueRegions,
      totalRows: transformedData.length
    };
  }

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

export default new StatisticsService(); 