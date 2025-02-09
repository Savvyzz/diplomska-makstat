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
        const valueIndex = parseInt(questionIndex) + (parseInt(periodIndex) * Object.keys(questions.label).length);
        
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
        const valueIndex = parseInt(questionIndex) + (parseInt(periodIndex) * Object.keys(questions.label).length);
        
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
        const valueIndex = parseInt(questionIndex) + (parseInt(periodIndex) * Object.keys(questions.index).length);
        
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
}

export default new StatisticsService(); 