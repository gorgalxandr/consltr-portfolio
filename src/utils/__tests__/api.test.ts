import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import api from '../api';
import * as csrfModule from '../csrfToken';

// Mock the csrf module
vi.mock('../csrfToken', () => ({
  getCSRFToken: vi.fn(),
  resetCSRFToken: vi.fn()
}));

// Mock axios
vi.mock('axios');

describe('API Module', () => {
  let mockAxiosInstance: any;
  let requestInterceptor: any;
  let responseInterceptor: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Create mock axios instance with interceptors
    mockAxiosInstance = {
      interceptors: {
        request: {
          use: vi.fn((handler) => {
            requestInterceptor = handler;
            return 1;
          })
        },
        response: {
          use: vi.fn((successHandler, errorHandler) => {
            responseInterceptor = { successHandler, errorHandler };
            return 1;
          })
        }
      },
      request: vi.fn()
    };

    // Mock axios.create to return our mock instance
    (axios.create as any) = vi.fn(() => mockAxiosInstance);
    
    // Re-import to trigger axios.create
    vi.resetModules();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Request Interceptor', () => {
    it('should skip CSRF token for GET requests', async () => {
      // Import fresh module
      const apiModule = await import('../api');
      const interceptors = (axios.create as any).mock.results[0].value.interceptors;
      const handler = interceptors.request.use.mock.calls[0][0];

      const config = { method: 'get', headers: {} };
      const result = await handler(config);

      expect(result).toBe(config);
      expect(csrfModule.getCSRFToken).not.toHaveBeenCalled();
    });

    it('should skip CSRF token for HEAD requests', async () => {
      const apiModule = await import('../api');
      const interceptors = (axios.create as any).mock.results[0].value.interceptors;
      const handler = interceptors.request.use.mock.calls[0][0];

      const config = { method: 'head', headers: {} };
      const result = await handler(config);

      expect(result).toBe(config);
      expect(csrfModule.getCSRFToken).not.toHaveBeenCalled();
    });

    it('should skip CSRF token for OPTIONS requests', async () => {
      const apiModule = await import('../api');
      const interceptors = (axios.create as any).mock.results[0].value.interceptors;
      const handler = interceptors.request.use.mock.calls[0][0];

      const config = { method: 'options', headers: {} };
      const result = await handler(config);

      expect(result).toBe(config);
      expect(csrfModule.getCSRFToken).not.toHaveBeenCalled();
    });

    it('should add CSRF token for POST requests', async () => {
      const apiModule = await import('../api');
      const interceptors = (axios.create as any).mock.results[0].value.interceptors;
      const handler = interceptors.request.use.mock.calls[0][0];

      (csrfModule.getCSRFToken as any).mockResolvedValue('test-csrf-token');

      const config = { method: 'post', headers: {} };
      const result = await handler(config);

      expect(csrfModule.getCSRFToken).toHaveBeenCalled();
      expect(result.headers['X-CSRF-Token']).toBe('test-csrf-token');
    });

    it('should add CSRF token for PUT requests', async () => {
      const apiModule = await import('../api');
      const interceptors = (axios.create as any).mock.results[0].value.interceptors;
      const handler = interceptors.request.use.mock.calls[0][0];

      (csrfModule.getCSRFToken as any).mockResolvedValue('test-csrf-token');

      const config = { method: 'put', headers: {} };
      const result = await handler(config);

      expect(csrfModule.getCSRFToken).toHaveBeenCalled();
      expect(result.headers['X-CSRF-Token']).toBe('test-csrf-token');
    });

    it('should add CSRF token for PATCH requests', async () => {
      const apiModule = await import('../api');
      const interceptors = (axios.create as any).mock.results[0].value.interceptors;
      const handler = interceptors.request.use.mock.calls[0][0];

      (csrfModule.getCSRFToken as any).mockResolvedValue('test-csrf-token');

      const config = { method: 'patch', headers: {} };
      const result = await handler(config);

      expect(csrfModule.getCSRFToken).toHaveBeenCalled();
      expect(result.headers['X-CSRF-Token']).toBe('test-csrf-token');
    });

    it('should add CSRF token for DELETE requests', async () => {
      const apiModule = await import('../api');
      const interceptors = (axios.create as any).mock.results[0].value.interceptors;
      const handler = interceptors.request.use.mock.calls[0][0];

      (csrfModule.getCSRFToken as any).mockResolvedValue('test-csrf-token');

      const config = { method: 'delete', headers: {} };
      const result = await handler(config);

      expect(csrfModule.getCSRFToken).toHaveBeenCalled();
      expect(result.headers['X-CSRF-Token']).toBe('test-csrf-token');
    });

    it('should handle undefined method gracefully', async () => {
      const apiModule = await import('../api');
      const interceptors = (axios.create as any).mock.results[0].value.interceptors;
      const handler = interceptors.request.use.mock.calls[0][0];

      const config = { headers: {} }; // No method defined
      const result = await handler(config);

      expect(result).toBe(config);
      expect(csrfModule.getCSRFToken).not.toHaveBeenCalled();
    });

    it('should throw error when CSRF token fetch fails', async () => {
      const apiModule = await import('../api');
      const interceptors = (axios.create as any).mock.results[0].value.interceptors;
      const handler = interceptors.request.use.mock.calls[0][0];

      (csrfModule.getCSRFToken as any).mockRejectedValue(new Error('Network error'));

      const config = { method: 'post', headers: {} };

      await expect(handler(config)).rejects.toThrow('Failed to obtain CSRF token');
    });
  });

  describe('Response Interceptor', () => {
    it('should pass through successful responses', async () => {
      const apiModule = await import('../api');
      const interceptors = (axios.create as any).mock.results[0].value.interceptors;
      const handlers = interceptors.response.use.mock.calls[0];
      const successHandler = handlers[0];

      const response = { data: 'test', status: 200 };
      const result = successHandler(response);

      expect(result).toBe(response);
    });

    it('should retry request on CSRF token error with EBADCSRFTOKEN', async () => {
      const apiModule = await import('../api');
      const interceptors = (axios.create as any).mock.results[0].value.interceptors;
      const handlers = interceptors.response.use.mock.calls[0];
      const errorHandler = handlers[1];

      const mockRequest = vi.fn().mockResolvedValue({ data: 'success' });
      (axios.create as any).mock.results[0].value.request = mockRequest;

      (csrfModule.getCSRFToken as any).mockResolvedValue('new-csrf-token');

      const error = {
        response: {
          status: 403,
          data: { code: 'EBADCSRFTOKEN' }
        },
        config: {
          headers: {}
        }
      };

      const result = await errorHandler(error);

      expect(csrfModule.resetCSRFToken).toHaveBeenCalled();
      expect(csrfModule.getCSRFToken).toHaveBeenCalled();
      expect(error.config.headers['X-CSRF-Token']).toBe('new-csrf-token');
      expect(mockRequest).toHaveBeenCalledWith(error.config);
    });

    it('should retry request on CSRF validation failed error', async () => {
      const apiModule = await import('../api');
      const interceptors = (axios.create as any).mock.results[0].value.interceptors;
      const handlers = interceptors.response.use.mock.calls[0];
      const errorHandler = handlers[1];

      const mockRequest = vi.fn().mockResolvedValue({ data: 'success' });
      (axios.create as any).mock.results[0].value.request = mockRequest;

      (csrfModule.getCSRFToken as any).mockResolvedValue('new-csrf-token');

      const error = {
        response: {
          status: 403,
          data: { error: 'CSRF token validation failed' }
        },
        config: {
          headers: {}
        }
      };

      const result = await errorHandler(error);

      expect(csrfModule.resetCSRFToken).toHaveBeenCalled();
      expect(csrfModule.getCSRFToken).toHaveBeenCalled();
      expect(error.config.headers['X-CSRF-Token']).toBe('new-csrf-token');
      expect(mockRequest).toHaveBeenCalledWith(error.config);
    });

    it('should reject with authentication error if retry fails', async () => {
      const apiModule = await import('../api');
      const interceptors = (axios.create as any).mock.results[0].value.interceptors;
      const handlers = interceptors.response.use.mock.calls[0];
      const errorHandler = handlers[1];

      (csrfModule.getCSRFToken as any).mockRejectedValue(new Error('Token fetch failed'));

      const error = {
        response: {
          status: 403,
          data: { code: 'EBADCSRFTOKEN' }
        },
        config: {
          headers: {}
        }
      };

      await expect(errorHandler(error)).rejects.toThrow('Authentication failed. Please refresh the page.');
      expect(csrfModule.resetCSRFToken).toHaveBeenCalled();
    });

    it('should pass through non-CSRF errors', async () => {
      const apiModule = await import('../api');
      const interceptors = (axios.create as any).mock.results[0].value.interceptors;
      const handlers = interceptors.response.use.mock.calls[0];
      const errorHandler = handlers[1];

      const error = {
        response: {
          status: 404,
          data: { message: 'Not found' }
        }
      };

      await expect(errorHandler(error)).rejects.toBe(error);
      expect(csrfModule.resetCSRFToken).not.toHaveBeenCalled();
    });

    it('should pass through errors without response', async () => {
      const apiModule = await import('../api');
      const interceptors = (axios.create as any).mock.results[0].value.interceptors;
      const handlers = interceptors.response.use.mock.calls[0];
      const errorHandler = handlers[1];

      const error = new Error('Network error');

      await expect(errorHandler(error)).rejects.toBe(error);
      expect(csrfModule.resetCSRFToken).not.toHaveBeenCalled();
    });

    it('should pass through 403 errors that are not CSRF related', async () => {
      const apiModule = await import('../api');
      const interceptors = (axios.create as any).mock.results[0].value.interceptors;
      const handlers = interceptors.response.use.mock.calls[0];
      const errorHandler = handlers[1];

      const error = {
        response: {
          status: 403,
          data: { message: 'Forbidden resource' }
        }
      };

      await expect(errorHandler(error)).rejects.toBe(error);
      expect(csrfModule.resetCSRFToken).not.toHaveBeenCalled();
    });
  });

  describe('Axios Configuration', () => {
    it('should create axios instance with correct configuration', async () => {
      await import('../api');

      expect(axios.create).toHaveBeenCalledWith({
        baseURL: '',
        withCredentials: true
      });
    });
  });
});