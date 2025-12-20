import React, { useState, useEffect } from 'react';
import Header from '../Header';
import { Footer } from '../common/Footer';
import { CookieConsent } from '../CookieConsent';
import { LayoutProps } from './layoutTypes'; // Assuming you have a types file for props

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showFooter, setShowFooter] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      {/* <Footer show={showFooter} /> */}
      {showFooter && <Footer />}
      <CookieConsent />
    </div>
  );
};

export default Layout;