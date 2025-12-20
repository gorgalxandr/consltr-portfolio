// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserInfo {
  id: string;
  firstname: string;
  lastname: string;
  company: string;
  email: string;
  avatar?: string;
  role?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserInfo | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, firstname?: string, lastname?: string, company?: string) => Promise<void>;
  updateUser: (userData: { firstname?: string; lastname?: string; company?: string; password?: string }) => Promise<{ message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Get CSRF token
  const getCsrfToken = async (): Promise<string> => {
    const response = await fetch('/api/csrf-token', {
      credentials: 'include'
    });
    const data = await response.json();
    return data.csrfToken;
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      
      const csrfToken = await getCsrfToken();
      
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, firstname?: string, lastname?: string, company?: string): Promise<void> => {
    try {
      setIsLoading(true);
      
      const csrfToken = await getCsrfToken();
      
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, firstname, lastname, company })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const csrfToken = await getCsrfToken();
      
      await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'X-CSRF-Token': csrfToken
        },
        credentials: 'include'
      });
      
      setIsAuthenticated(false);
      setUser(null);
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Logout error:', error);
      // Still clear local state even if request fails
      setIsAuthenticated(false);
      setUser(null);
      window.location.href = '/';
    }
  };

  const updateUser = async (userData: { firstname?: string; lastname?: string; company?: string; password?: string }): Promise<{ message: string }> => {
    try {
      const csrfToken = await getCsrfToken();
      
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setUser(data.user);
        return { message: data.message };
      } else {
        throw new Error(data.message || 'Update failed');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Update user error:', error);
      throw error;
    }
  };

  // Check authentication status
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/check', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    register,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};