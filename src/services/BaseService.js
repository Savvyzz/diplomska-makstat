import axios from 'axios';
import { API_BASE_URL, API_RESPONSE_CODES } from '../config/apiConfig';

class BaseService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  handleError(error) {
    if (error.response) {
      const { status, data } = error.response;
      
      const errorMessages = {
        [API_RESPONSE_CODES.BAD_REQUEST]: 'Invalid request parameters',
        [API_RESPONSE_CODES.UNAUTHORIZED]: 'Unauthorized access',
        [API_RESPONSE_CODES.FORBIDDEN]: 'Access forbidden',
        [API_RESPONSE_CODES.NOT_FOUND]: 'Resource not found',
        [API_RESPONSE_CODES.TOO_MANY_REQUESTS]: 'Too many requests. Please try again later',
      };

      throw new Error(errorMessages[status] || data?.message || 'An unexpected error occurred');
    }

    if (error.request) {
      throw new Error('No response received from server');
    }

    throw new Error('Error setting up the request');
  }

  async get(endpoint, params = {}) {
    try {
      const response = await this.client.get(endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async post(endpoint, data = {}) {
    try {
      const response = await this.client.post(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

export default BaseService; 