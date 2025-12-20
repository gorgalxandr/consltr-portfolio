// src/api.ts
import axios from 'axios';
import { getCSRFToken, resetCSRFToken } from './csrfToken';

const api = axios.create({
  baseURL: '', // Use relative URLs since frontend and backend are same origin
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(async (config) => {
  // Skip CSRF for GET/HEAD/OPTIONS
  if (!['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')) {
    return config;
  }

  try {
    // Use the existing getCSRFToken function
    const token = await getCSRFToken();
    
    // Add to headers
    config.headers['X-CSRF-Token'] = token;
    return config;
  } catch {
    throw new Error('Failed to obtain CSRF token');
  }
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403 && 
        (error.response?.data?.code === 'EBADCSRFTOKEN' || 
         error.response?.data?.error === 'CSRF token validation failed')) {
      // CSRF token invalid - reset and retry
      resetCSRFToken(); // This clears the cached token
      
      try {
        // Fetch fresh token using the utility function
        const freshToken = await getCSRFToken();
        
        // Update the failed request with new token and retry
        error.config.headers['X-CSRF-Token'] = freshToken;
        return api.request(error.config);
      } catch {
        return Promise.reject(new Error('Authentication failed. Please refresh the page.'));
      }
    }
    return Promise.reject(error);
  }
);

export default api;