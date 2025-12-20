// src/contexts/NavigationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  currentPath: string;
  navigate: (path: string) => void;
  goBack: () => void;
  goForward: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  const navigate = (path: string): void => {
    if (typeof window !== 'undefined') {
      // Update browser history
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      
      // Dispatch popstate event to notify other components
      window.dispatchEvent(new PopStateEvent('popstate'));
      
      // Custom navigation event
      window.dispatchEvent(new CustomEvent('navigate', { detail: { path } }));
    }
  };

  const goBack = (): void => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const goForward = (): void => {
    if (typeof window !== 'undefined') {
      window.history.forward();
    }
  };

  // Listen for browser back/forward buttons
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const value: NavigationContextType = {
    currentPath,
    navigate,
    goBack,
    goForward
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};