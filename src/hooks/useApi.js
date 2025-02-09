import { useState, useCallback } from 'react';
import apiService from '../services/BaseService';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (method, endpoint, data = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService[method](endpoint, data);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback((endpoint, params) => {
    return execute('get', endpoint, params);
  }, [execute]);

  const post = useCallback((endpoint, data) => {
    return execute('post', endpoint, data);
  }, [execute]);

  return {
    loading,
    error,
    get,
    post,
  };
}; 