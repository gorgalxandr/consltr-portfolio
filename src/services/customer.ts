// ===== client/src/services/customer.ts =====
import { AxiosError } from 'axios';
import api from '../utils/api';

// Interface for the customer details that might be returned
interface CustomerDetails {
  id: string;
  name: string;
  email?: string;
  createdAt: string;
  isActive: boolean;
  // Add other customer properties your API returns
}

interface VerifyApiKeyParams {
  apiKey: string;
  customerId: string;
}

interface RegisterCustomerParams {
  apiKey: string;
  customerName: string;
}

interface ApiResponse {
  // Define your API response structure here
  success: boolean;
  message?: string;
  data?: unknown;
  // Add other fields your API returns
}

// Specific response interfaces
interface VerifyApiKeyResponse extends ApiResponse {
  isValid: boolean;
  customerDetails?: CustomerDetails;
}

interface RegisterCustomerResponse extends ApiResponse {
  customerId: string;
  authToken?: string;
  customerDetails?: CustomerDetails;
}

// Error response interface
interface ApiError {
  message: string;
  status?: number;
  details?: unknown;
}

export const customerService = {
  verifyApiKey: async (
    { apiKey, customerId }: VerifyApiKeyParams
  ): Promise<VerifyApiKeyResponse> => {
    try {
      const response = await api.post<VerifyApiKeyResponse>(
        '/verify-api-key', 
        { apiKey, customerId }
      );
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string; details?: unknown }>;
      throw {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        details: error.response?.data?.details
      } as ApiError;
    }
  },

  registerCustomer: async (
    { apiKey, customerName }: RegisterCustomerParams
  ): Promise<RegisterCustomerResponse> => {
    try {
      const response = await api.post<RegisterCustomerResponse>(
        '/register-customer', 
        { apiKey, customerName }
      );
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string; details?: unknown }>;
      throw {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        details: error.response?.data?.details
      } as ApiError;
    }
  }
};