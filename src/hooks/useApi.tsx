import { useState, useEffect } from 'react';
import api from '../utils/api';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Define a type for error response
interface ApiError {
  message?: string;
  // Add other possible error response fields if needed
  // error?: string;
  // statusCode?: number;
}

export const useApi = <T = unknown>(
  url: string, 
  options: AxiosRequestConfig = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<T> = await api.get(url, options);
        setData(response.data);
      } catch (err) {
        const error = err as AxiosError<ApiError>; // Specify the error response type
        setError(
          error.response?.data?.message || 
          error.message || 
          'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
};