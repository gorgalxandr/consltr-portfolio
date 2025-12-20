// ===== client/src/services/auth.ts =====
import { AxiosError } from 'axios';
import api from '../utils/api';

// Interfaces for request payloads
interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
}

interface ProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  // Add other profile fields as needed
}

// Base API response interface
interface ApiResponse {
  success: boolean;
  message?: string;
}

// Specific response interfaces
interface AuthResponse extends ApiResponse {
  token: string;
  user: {
    id: string;
    email: string;
    // Add other user fields
  };
}

interface ProfileResponse extends ApiResponse {
  profile: ProfileData;
}

// Error interface
interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string>;
}

export const authService = {
  login: async ({ email, password }: LoginPayload): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/login', { email, password });
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string; errors?: Record<string, string> }>;
      throw {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        errors: error.response?.data?.errors
      } as ApiError;
    }
  },

  register: async ({ email, password }: RegisterPayload): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/register', { email, password });
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string; errors?: Record<string, string> }>;
      throw {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        errors: error.response?.data?.errors
      } as ApiError;
    }
  },

  logout: async (): Promise<ApiResponse> => {
    try {
      const response = await api.post<ApiResponse>('/logout');
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      throw {
        message: error.response?.data?.message || error.message,
        status: error.response?.status
      } as ApiError;
    }
  },

  getProfile: async (): Promise<ProfileResponse> => {
    try {
      const response = await api.get<ProfileResponse>('/profile');
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      throw {
        message: error.response?.data?.message || error.message,
        status: error.response?.status
      } as ApiError;
    }
  },

  updateProfile: async (profileData: ProfileData): Promise<ProfileResponse> => {
    try {
      const response = await api.put<ProfileResponse>('/profile', profileData);
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string; errors?: Record<string, string> }>;
      throw {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        errors: error.response?.data?.errors
      } as ApiError;
    }
  }
};