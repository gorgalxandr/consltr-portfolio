// types/auth.ts
export interface User {
  id: number;
  email: string;
  firstname?: string;  // Changed from full_name
  lastname?: string;   // New field
  company?: string;
  created_at: string;
  updated_at: string;
  message?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<{
    success: boolean;
    message?: string;
  }>;
  checkAuth: () => Promise<void>;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  redirect?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  redirect?: string;
}

export interface ProfileResponse {
  success: boolean;
  user: User;
  message?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export // Interface for the customer details that might be returned
interface CustomerDetails {
  id: string;
  name: string;
  email?: string;
  createdAt: string;
  isActive: boolean;
  // Add other customer properties your API returns
}

export interface VerifyApiKeyResponse extends ApiResponse {
  isValid: boolean;
  customerDetails?: CustomerDetails;
}

export interface RegisterCustomerResponse extends ApiResponse {
  customerId: string;
  authToken?: string;
}