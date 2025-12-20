import { ReactNode, useState, useEffect } from 'react';
import { CookieConsent } from '../CookieConsent';
import Header from '../common/Header'; // Testing common Header component
import { Footer } from '../common/Footer';

interface MarketingLayoutProps {
  children: ReactNode;
}

// If Header and Footer are external components, you would import their props instead:
// import { HeaderProps, FooterProps } from './components';

const MarketingLayout = ({ children,}: MarketingLayoutProps) => {
  const [showFooter, setShowFooter] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
  <div className="min-h-screen bg-white flex flex-col">
    <Header 
      // type="marketing"
      // navigate={navigate} 
      // isAuthenticated={isAuthenticated} 
      // logout={logout} 
    />
    <main className="flex-1">
      {children}
    </main>
    {/* <Footer type="marketing" /> */}
    {showFooter && <Footer />}
    <CookieConsent />
  </div>
  )
};

export default MarketingLayout;