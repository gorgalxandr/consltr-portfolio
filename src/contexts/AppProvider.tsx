// src/contexts/AppProvider.tsx - Main app provider that combines all contexts
import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
import { NavigationProvider } from './NavigationContext';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
};