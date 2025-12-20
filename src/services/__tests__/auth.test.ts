import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { authService } from '../auth';
import api from '../../utils/api';
import { AxiosError } from 'axios';

// Mock the API module
vi.mock('../../utils/api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    put: vi.fn()
  }
}));

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('calls api.post with correct params', async () => {
      const mockResponse = { data: { success: true, token: 'fake-token', user: { id: '1', email: 'test@example.com' } } };
      (api.post as Mock).mockResolvedValue(mockResponse);

      const result = await authService.login({ email: 'test@example.com', password: 'password' });

      expect(api.post).toHaveBeenCalledWith('/login', { email: 'test@example.com', password: 'password' });
      expect(result).toEqual(mockResponse.data);
    });

    it('handles login error with response', async () => {
      const mockError = {
        response: {
          status: 401,
          data: { message: 'Invalid credentials', errors: { email: 'Not found' } }
        },
        message: 'Request failed'
      };
      (api.post as Mock).mockRejectedValue(mockError);

      try {
        await authService.login({ email: 'test@example.com', password: 'wrong' });
        expect.fail('Should have thrown error');
      } catch (err: unknown) {
        const error = err as { message: string; status: number; errors?: Record<string, string> };
        expect(error.message).toBe('Invalid credentials');
        expect(error.status).toBe(401);
        expect(error.errors).toEqual({ email: 'Not found' });
      }
    });

    it('handles login network error', async () => {
      const mockError = {
        message: 'Network error'
      };
      (api.post as Mock).mockRejectedValue(mockError);

      try {
        await authService.login({ email: 'test@example.com', password: 'password' });
        expect.fail('Should have thrown error');
      } catch (err: unknown) {
        const error = err as { message: string; status?: number };
        expect(error.message).toBe('Network error');
        expect(error.status).toBeUndefined();
      }
    });
  });

  describe('register', () => {
    it('calls api.post with registration data', async () => {
      const mockResponse = { 
        data: { 
          success: true, 
          token: 'new-token', 
          user: { id: '2', email: 'new@example.com' } 
        } 
      };
      (api.post as Mock).mockResolvedValue(mockResponse);

      const result = await authService.register({ email: 'new@example.com', password: 'password123' });

      expect(api.post).toHaveBeenCalledWith('/register', { email: 'new@example.com', password: 'password123' });
      expect(result).toEqual(mockResponse.data);
    });

    it('handles registration validation error', async () => {
      const mockError = {
        response: {
          status: 400,
          data: { 
            message: 'Validation failed', 
            errors: { password: 'Too weak' } 
          }
        }
      };
      (api.post as Mock).mockRejectedValue(mockError);

      try {
        await authService.register({ email: 'test@example.com', password: 'weak' });
        expect.fail('Should have thrown error');
      } catch (err: unknown) {
        const error = err as { message: string; status: number; errors?: Record<string, string> };
        expect(error.message).toBe('Validation failed');
        expect(error.status).toBe(400);
        expect(error.errors).toEqual({ password: 'Too weak' });
      }
    });
  });

  describe('logout', () => {
    it('calls api.post for logout', async () => {
      const mockResponse = { data: { success: true, message: 'Logged out' } };
      (api.post as Mock).mockResolvedValue(mockResponse);

      const result = await authService.logout();

      expect(api.post).toHaveBeenCalledWith('/logout');
      expect(result).toEqual(mockResponse.data);
    });

    it('handles logout error', async () => {
      const mockError = {
        response: {
          status: 500,
          data: { message: 'Server error' }
        }
      };
      (api.post as Mock).mockRejectedValue(mockError);

      try {
        await authService.logout();
        expect.fail('Should have thrown error');
      } catch (err: unknown) {
        const error = err as { message: string; status: number };
        expect(error.message).toBe('Server error');
        expect(error.status).toBe(500);
      }
    });
  });

  describe('getProfile', () => {
    it('calls api.get for profile', async () => {
      const mockResponse = { 
        data: { 
          success: true, 
          profile: { 
            firstName: 'John', 
            lastName: 'Doe', 
            email: 'john@example.com' 
          } 
        } 
      };
      (api.get as Mock).mockResolvedValue(mockResponse);

      const result = await authService.getProfile();

      expect(api.get).toHaveBeenCalledWith('/profile');
      expect(result).toEqual(mockResponse.data);
    });

    it('handles unauthorized profile access', async () => {
      const mockError = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' }
        }
      };
      (api.get as Mock).mockRejectedValue(mockError);

      try {
        await authService.getProfile();
        expect.fail('Should have thrown error');
      } catch (err: unknown) {
        const error = err as { message: string; status: number };
        expect(error.message).toBe('Unauthorized');
        expect(error.status).toBe(401);
      }
    });
  });

  describe('updateProfile', () => {
    it('calls api.put with profile data', async () => {
      const profileData = { firstName: 'Jane', lastName: 'Smith' };
      const mockResponse = { 
        data: { 
          success: true, 
          profile: { ...profileData, email: 'jane@example.com' } 
        } 
      };
      (api.put as Mock).mockResolvedValue(mockResponse);

      const result = await authService.updateProfile(profileData);

      expect(api.put).toHaveBeenCalledWith('/profile', profileData);
      expect(result).toEqual(mockResponse.data);
    });

    it('handles profile update validation error', async () => {
      const mockError = {
        response: {
          status: 400,
          data: { 
            message: 'Invalid data', 
            errors: { email: 'Invalid format' } 
          }
        }
      };
      (api.put as Mock).mockRejectedValue(mockError);

      try {
        await authService.updateProfile({ email: 'invalid' });
        expect.fail('Should have thrown error');
      } catch (err: unknown) {
        const error = err as { message: string; status: number; errors?: Record<string, string> };
        expect(error.message).toBe('Invalid data');
        expect(error.status).toBe(400);
        expect(error.errors).toEqual({ email: 'Invalid format' });
      }
    });

    it('handles network error during profile update', async () => {
      const mockError = {
        message: 'Connection timeout'
      };
      (api.put as Mock).mockRejectedValue(mockError);

      try {
        await authService.updateProfile({ firstName: 'Test' });
        expect.fail('Should have thrown error');
      } catch (err: unknown) {
        const error = err as { message: string; status?: number };
        expect(error.message).toBe('Connection timeout');
        expect(error.status).toBeUndefined();
      }
    });
  });
});