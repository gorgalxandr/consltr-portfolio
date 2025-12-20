import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { authService } from '../auth';
import api from '../../utils/api';
import { AxiosError } from 'axios';

// Mock the API module
vi.mock('../../utils/api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    put: vi.fn(),
  }
}));

const mockApi = api as {
  post: Mock;
  get: Mock;
  put: Mock;
};

describe('authService Comprehensive Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockResponse = {
        data: {
          success: true,
          token: 'jwt-token-123',
          user: { id: '1', email: 'test@example.com' }
        }
      };
      mockApi.post.mockResolvedValue(mockResponse);

      const result = await authService.login({ email: 'test@example.com', password: 'password123' });

      expect(mockApi.post).toHaveBeenCalledWith('/login', {
        email: 'test@example.com',
        password: 'password123'
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle login error with response data', async () => {
      const mockError = {
        response: {
          status: 401,
          data: {
            message: 'Invalid credentials',
            errors: { email: 'Email not found' }
          }
        },
        message: 'Request failed'
      } as AxiosError;

      mockApi.post.mockRejectedValue(mockError);

      try {
        await authService.login({ email: 'test@example.com', password: 'wrong' });
        expect.fail('Should have thrown an error');
      } catch (err: any) {
        expect(err.message).toBe('Invalid credentials');
        expect(err.status).toBe(401);
        expect(err.errors).toEqual({ email: 'Email not found' });
      }
    });

    it('should handle login error without response data', async () => {
      const mockError = {
        message: 'Network Error',
        response: undefined
      } as AxiosError;

      mockApi.post.mockRejectedValue(mockError);

      try {
        await authService.login({ email: 'test@example.com', password: 'password' });
        expect.fail('Should have thrown an error');
      } catch (err: any) {
        expect(err.message).toBe('Network Error');
        expect(err.status).toBeUndefined();
      }
    });

    it('should handle login error with response but no data', async () => {
      const mockError = {
        response: {
          status: 500,
          data: undefined
        },
        message: 'Internal Server Error'
      } as AxiosError;

      mockApi.post.mockRejectedValue(mockError);

      try {
        await authService.login({ email: 'test@example.com', password: 'password' });
        expect.fail('Should have thrown an error');
      } catch (err: any) {
        expect(err.message).toBe('Internal Server Error');
        expect(err.status).toBe(500);
      }
    });
  });

  describe('register', () => {
    it('should register successfully with valid data', async () => {
      const mockResponse = {
        data: {
          success: true,
          token: 'jwt-token-456',
          user: { id: '2', email: 'newuser@example.com' }
        }
      };
      mockApi.post.mockResolvedValue(mockResponse);

      const result = await authService.register({ email: 'newuser@example.com', password: 'newpassword123' });

      expect(mockApi.post).toHaveBeenCalledWith('/register', {
        email: 'newuser@example.com',
        password: 'newpassword123'
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle registration validation errors', async () => {
      const mockError = {
        response: {
          status: 400,
          data: {
            message: 'Validation failed',
            errors: {
              email: 'Email is already in use',
              password: 'Password must be at least 8 characters'
            }
          }
        },
        message: 'Request failed'
      } as AxiosError;

      mockApi.post.mockRejectedValue(mockError);

      try {
        await authService.register({ email: 'existing@example.com', password: '123' });
        expect.fail('Should have thrown an error');
      } catch (err: any) {
        expect(err.message).toBe('Validation failed');
        expect(err.status).toBe(400);
        expect(err.errors).toEqual({
          email: 'Email is already in use',
          password: 'Password must be at least 8 characters'
        });
      }
    });

    it('should handle network error during registration', async () => {
      const mockError = {
        message: 'Connection timeout',
        response: undefined
      } as AxiosError;

      mockApi.post.mockRejectedValue(mockError);

      try {
        await authService.register({ email: 'test@example.com', password: 'password' });
        expect.fail('Should have thrown an error');
      } catch (err: any) {
        expect(err.message).toBe('Connection timeout');
        expect(err.status).toBeUndefined();
        expect(err.errors).toBeUndefined();
      }
    });
  });

  describe('logout', () => {
    it('should logout successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'Logged out successfully'
        }
      };
      mockApi.post.mockResolvedValue(mockResponse);

      const result = await authService.logout();

      expect(mockApi.post).toHaveBeenCalledWith('/logout');
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle logout error', async () => {
      const mockError = {
        response: {
          status: 401,
          data: {
            message: 'Not authenticated'
          }
        },
        message: 'Request failed'
      } as AxiosError;

      mockApi.post.mockRejectedValue(mockError);

      try {
        await authService.logout();
        expect.fail('Should have thrown an error');
      } catch (err: any) {
        expect(err.message).toBe('Not authenticated');
        expect(err.status).toBe(401);
      }
    });

    it('should handle logout network error', async () => {
      const mockError = {
        message: 'Network Error',
        response: undefined
      } as AxiosError;

      mockApi.post.mockRejectedValue(mockError);

      try {
        await authService.logout();
        expect.fail('Should have thrown an error');
      } catch (err: any) {
        expect(err.message).toBe('Network Error');
        expect(err.status).toBeUndefined();
      }
    });
  });

  describe('getProfile', () => {
    it('should get profile successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          profile: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            avatar: 'avatar-url'
          }
        }
      };
      mockApi.get.mockResolvedValue(mockResponse);

      const result = await authService.getProfile();

      expect(mockApi.get).toHaveBeenCalledWith('/profile');
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle profile fetch error', async () => {
      const mockError = {
        response: {
          status: 403,
          data: {
            message: 'Access denied'
          }
        },
        message: 'Request failed'
      } as AxiosError;

      mockApi.get.mockRejectedValue(mockError);

      try {
        await authService.getProfile();
        expect.fail('Should have thrown an error');
      } catch (err: any) {
        expect(err.message).toBe('Access denied');
        expect(err.status).toBe(403);
      }
    });

    it('should handle profile network error', async () => {
      const mockError = {
        message: 'Connection refused',
        response: undefined
      } as AxiosError;

      mockApi.get.mockRejectedValue(mockError);

      try {
        await authService.getProfile();
        expect.fail('Should have thrown an error');
      } catch (err: any) {
        expect(err.message).toBe('Connection refused');
        expect(err.status).toBeUndefined();
      }
    });
  });

  describe('updateProfile', () => {
    it('should update profile successfully', async () => {
      const profileData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com'
      };

      const mockResponse = {
        data: {
          success: true,
          profile: profileData
        }
      };
      mockApi.put.mockResolvedValue(mockResponse);

      const result = await authService.updateProfile(profileData);

      expect(mockApi.put).toHaveBeenCalledWith('/profile', profileData);
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle profile update validation errors', async () => {
      const profileData = {
        firstName: '',
        email: 'invalid-email'
      };

      const mockError = {
        response: {
          status: 400,
          data: {
            message: 'Validation failed',
            errors: {
              firstName: 'First name is required',
              email: 'Invalid email format'
            }
          }
        },
        message: 'Request failed'
      } as AxiosError;

      mockApi.put.mockRejectedValue(mockError);

      try {
        await authService.updateProfile(profileData);
        expect.fail('Should have thrown an error');
      } catch (err: any) {
        expect(err.message).toBe('Validation failed');
        expect(err.status).toBe(400);
        expect(err.errors).toEqual({
          firstName: 'First name is required',
          email: 'Invalid email format'
        });
      }
    });

    it('should handle profile update authorization error', async () => {
      const profileData = { firstName: 'John' };

      const mockError = {
        response: {
          status: 401,
          data: {
            message: 'Unauthorized'
          }
        },
        message: 'Request failed'
      } as AxiosError;

      mockApi.put.mockRejectedValue(mockError);

      try {
        await authService.updateProfile(profileData);
        expect.fail('Should have thrown an error');
      } catch (err: any) {
        expect(err.message).toBe('Unauthorized');
        expect(err.status).toBe(401);
      }
    });

    it('should handle profile update network error', async () => {
      const profileData = { firstName: 'John' };

      const mockError = {
        message: 'Request timeout',
        response: undefined
      } as AxiosError;

      mockApi.put.mockRejectedValue(mockError);

      try {
        await authService.updateProfile(profileData);
        expect.fail('Should have thrown an error');
      } catch (err: any) {
        expect(err.message).toBe('Request timeout');
        expect(err.status).toBeUndefined();
        expect(err.errors).toBeUndefined();
      }
    });

    it('should handle empty profile update', async () => {
      const profileData = {};

      const mockResponse = {
        data: {
          success: true,
          profile: {
            firstName: 'Existing',
            lastName: 'User'
          }
        }
      };
      mockApi.put.mockResolvedValue(mockResponse);

      const result = await authService.updateProfile(profileData);

      expect(mockApi.put).toHaveBeenCalledWith('/profile', {});
      expect(result).toEqual(mockResponse.data);
    });
  });
});