import { describe, it, expect, vi, beforeEach } from 'vitest';
import { customerService } from '../customer';
import api from '../../utils/api';

// Mock the API module
vi.mock('../../utils/api', () => ({
  default: {
    post: vi.fn(),
  }
}));

describe('Customer Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('verifyApiKey', () => {
    it('should verify API key successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          isValid: true,
          customerDetails: {
            id: 'customer-123',
            name: 'Test Customer',
            email: 'test@example.com',
            createdAt: '2023-01-01T00:00:00Z',
            isActive: true
          }
        }
      };

      (api.post as any).mockResolvedValue(mockResponse);

      const result = await customerService.verifyApiKey({
        apiKey: 'test-api-key',
        customerId: 'customer-123'
      });

      expect(api.post).toHaveBeenCalledWith('/verify-api-key', {
        apiKey: 'test-api-key',
        customerId: 'customer-123'
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle network error with response', async () => {
      const mockError = {
        response: {
          status: 401,
          data: {
            message: 'Unauthorized access',
            details: { reason: 'Invalid credentials' }
          }
        },
        message: 'Request failed'
      };

      (api.post as any).mockRejectedValue(mockError);

      await expect(customerService.verifyApiKey({
        apiKey: 'test-key',
        customerId: 'customer-123'
      })).rejects.toEqual({
        message: 'Unauthorized access',
        status: 401,
        details: { reason: 'Invalid credentials' }
      });
    });

    it('should handle network error without response', async () => {
      const mockError = {
        message: 'Network timeout'
      };

      (api.post as any).mockRejectedValue(mockError);

      await expect(customerService.verifyApiKey({
        apiKey: 'test-key',
        customerId: 'customer-123'
      })).rejects.toEqual({
        message: 'Network timeout',
        status: undefined,
        details: undefined
      });
    });
  });

  describe('registerCustomer', () => {
    it('should register customer successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          customerId: 'new-customer-456',
          authToken: 'auth-token-xyz',
          customerDetails: {
            id: 'new-customer-456',
            name: 'New Customer',
            email: 'new@example.com',
            createdAt: '2023-06-01T00:00:00Z',
            isActive: true
          }
        }
      };

      (api.post as any).mockResolvedValue(mockResponse);

      const result = await customerService.registerCustomer({
        apiKey: 'test-api-key',
        customerName: 'New Customer'
      });

      expect(api.post).toHaveBeenCalledWith('/register-customer', {
        apiKey: 'test-api-key',
        customerName: 'New Customer'
      });
      expect(result).toEqual(mockResponse.data);
      expect(result.customerId).toBe('new-customer-456');
      expect(result.authToken).toBe('auth-token-xyz');
    });

    it('should handle registration error with response', async () => {
      const mockError = {
        response: {
          status: 400,
          data: {
            message: 'Invalid customer name',
            details: { field: 'customerName', issue: 'Too short' }
          }
        },
        message: 'Bad request'
      };

      (api.post as any).mockRejectedValue(mockError);

      await expect(customerService.registerCustomer({
        apiKey: 'test-key',
        customerName: 'A'
      })).rejects.toEqual({
        message: 'Invalid customer name',
        status: 400,
        details: { field: 'customerName', issue: 'Too short' }
      });
    });

    it('should handle registration network error', async () => {
      const mockError = {
        message: 'Connection refused'
      };

      (api.post as any).mockRejectedValue(mockError);

      await expect(customerService.registerCustomer({
        apiKey: 'test-key',
        customerName: 'Test Customer'
      })).rejects.toEqual({
        message: 'Connection refused',
        status: undefined,
        details: undefined
      });
    });
  });
});
