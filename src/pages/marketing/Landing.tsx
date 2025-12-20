import React, { useState, useEffect } from 'react';
// import Layout from '../../components/layout/Layout'; // Welcome Default with Cookies
import MarketingLayout from '../../components/layout/MarketingLayout';

// Animation timing constants
const ANIMATION_TIMING = {
  HELLO_DURATION: 2500,
  AGENCY_DELAY: 500
};

const HomePage: React.FC = () => {
  const [helloAnimationComplete, setHelloAnimationComplete] = useState<boolean>(false);
  const [showAgencyInfo, setShowAgencyInfo] = useState<boolean>(false);

  useEffect(() => {
    const helloTimer = setTimeout(() => {
      setHelloAnimationComplete(true);
    }, ANIMATION_TIMING.HELLO_DURATION);
    
    return () => clearTimeout(helloTimer);
  }, []);

  useEffect(() => {
    if (!helloAnimationComplete) return;
    
    const agencyTimer = setTimeout(() => {
      setShowAgencyInfo(true);
    }, ANIMATION_TIMING.AGENCY_DELAY);
    
    return () => clearTimeout(agencyTimer);
  }, [helloAnimationComplete]);

  return (
    <MarketingLayout>
      <div className="flex items-center justify-center w-full h-full min-h-[60vh]">
        <div className="text-center max-w-2xl w-full px-4">
          <h1 className="text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight">
            <span 
              className={`hello-animation ${helloAnimationComplete ? 'animation-complete' : ''}`}
              aria-label="Hello"
            >
              Hello.
            </span>
          </h1>
          
          <div 
            className={`transition-opacity duration-500 mt-6 md:mt-8 ${
              showAgencyInfo ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={!showAgencyInfo}
          >
            <p className="text-xl md:text-2xl lg:text-3xl font-extralight text-gray-200">
              We are{' '}
              <span className="font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Consltr
              </span>
              , a boutique digital agency.
            </p>
            <p className="mt-6 text-lg md:text-xl font-light text-gray-400">
              Crafting innovative digital solutions tailored to your unique vision.
            </p>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
};

export default HomePage;