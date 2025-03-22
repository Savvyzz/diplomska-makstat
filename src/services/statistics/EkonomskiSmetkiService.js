import BaseService from '../BaseService';
import { ENDPOINTS } from '@config/apiConfig';

class EkonomskiSmetkiService extends BaseService {
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
}

export default new EkonomskiSmetkiService(); 