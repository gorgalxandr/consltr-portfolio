// src/components/layout/AppLayout.tsx
import React, { ReactNode } from 'react';
import Header from '../Header';
import { CookieConsent } from '../CookieConsent';
import { Footer } from '../common/Footer';
import { LayoutType } from './layoutTypes';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigation } from '../../contexts/NavigationContext';

interface AppLayoutProps {
  children: ReactNode;
  layoutType?: LayoutType;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  layoutType = 'app'
}) => {
  // Get state from contexts
  const { isAuthenticated, user, isLoading, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { navigate } = useNavigation();

  // Get container classes based on theme
  const getContainerClasses = () => {
    const baseClasses = "min-h-screen flex flex-col transition-colors duration-300";
    return theme === 'dark' 
      ? `${baseClasses} bg-gray-900 text-white` 
      : `${baseClasses} bg-gray-50 text-gray-900`;
  };

  const getMainClasses = () => {
    const baseClasses = "flex-1 max-w-7xl mx-auto w-full py-6 sm:px-6 lg:px-8";
    return theme === 'dark' 
      ? `${baseClasses} bg-gray-900` 
      : `${baseClasses} bg-gray-50`;
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className={getContainerClasses()}>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className={`mt-4 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Loading...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={getContainerClasses()}>
      <Header 
        navigate={navigate}
        isAuthenticated={isAuthenticated}
        theme={theme}
        onThemeChange={setTheme}
        userInfo={user || undefined}
        logout={logout}
      />
      
      <main className={getMainClasses()}>
        {children}
      </main>
      
      <Footer variant={layoutType} />
      <CookieConsent />
    </div>
  );
};

export default AppLayout;