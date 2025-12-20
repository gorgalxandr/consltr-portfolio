import React, { useState } from 'react';
import { Cookie, Shield, Settings } from 'lucide-react';

type CookieConsentStatus = 'accepted' | 'declined' | 'customized' | null;

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export const CookieConsent: React.FC = () => {
  const [cookieConsent, setCookieConsent] = useState<CookieConsentStatus>(() => {
    return localStorage.getItem('cookieConsent') as CookieConsentStatus;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>(() => {
    const savedSettings = localStorage.getItem('cookieSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
  });

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    setSettings(allAccepted);
    setCookieConsent('accepted');
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieSettings', JSON.stringify(allAccepted));
  };

  const handleDeclineAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    setSettings(onlyNecessary);
    setCookieConsent('declined');
    localStorage.setItem('cookieConsent', 'declined');
    localStorage.setItem('cookieSettings', JSON.stringify(onlyNecessary));
  };

  const handleCustomize = () => {
    setShowSettings(!showSettings);
  };

  const handleSaveSettings = () => {
    setCookieConsent('customized');
    setShowSettings(false);
    localStorage.setItem('cookieConsent', 'customized');
    localStorage.setItem('cookieSettings', JSON.stringify(settings));
  };

  const updateSetting = (key: keyof CookieSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (cookieConsent) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-40 animate-fade-in" />
      
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700 shadow-2xl">
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <Cookie className="h-8 w-8 text-blue-400" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="h-5 w-5 text-green-400" />
                  <h3 className="text-xl font-bold text-white">Your Privacy Matters</h3>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                  Your data is handled with the utmost care and in accordance with our privacy policy.
                </p>

                {showSettings && (
                  <div className="bg-slate-800 rounded-lg p-4 mb-4 border border-slate-600">
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Cookie Preferences
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-white">Necessary Cookies</label>
                          <p className="text-xs text-gray-400">Required for basic site functionality</p>
                        </div>
                        <div className="bg-green-600 rounded-full w-12 h-6 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">ON</span>
                        </div>
                      </div>
                      
                      {Object.entries({
                        analytics: { name: 'Analytics', desc: 'Help us understand how visitors use our site' },
                        marketing: { name: 'Marketing', desc: 'Personalize ads and content based on your interests' },
                        functional: { name: 'Functional', desc: 'Remember your preferences and settings' }
                      }).map(([key, { name, desc }]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-white">{name}</label>
                            <p className="text-xs text-gray-400">{desc}</p>
                          </div>
                          <button
                            onClick={() => updateSetting(key as keyof CookieSettings, !settings[key as keyof CookieSettings])}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              settings[key as keyof CookieSettings] ? 'bg-blue-600' : 'bg-gray-600'
                            }`}
                          >
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              settings[key as keyof CookieSettings] ? 'translate-x-6' : 'translate-x-0'
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <a 
                  href="/privacy" 
                  className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2"
                >
                  Privacy Policy
                </a>
                <span className="text-gray-500">•</span>
                <a 
                  href="/cookies" 
                  className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2"
                >
                  Cookie Policy
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleCustomize}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium border border-slate-600"
                >
                  {showSettings ? 'Hide Settings' : 'Customize'}
                </button>
                
                {showSettings ? (
                  <button
                    onClick={handleSaveSettings}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium shadow-lg"
                  >
                    Save Preferences
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleDeclineAll}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      Decline All
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all text-sm font-medium shadow-lg transform hover:scale-105"
                    >
                      Accept All
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Demo App Component
// const App: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//       <main className="relative">
//         {/* Header */}
//         <header className="bg-white shadow-sm border-b">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center py-6">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//                   <span className="text-white font-bold text-lg">W</span>
//                 </div>
//                 <h1 className="text-2xl font-bold text-gray-900">Website</h1>
//               </div>
//               <nav className="hidden md:flex space-x-8">
//                 <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
//                 <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
//                 <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
//                 <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
//               </nav>
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Our Website</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Experience our modern cookie consent system that respects user privacy while maintaining 
//               excellent user experience. This demo shows how the cookie banner integrates seamlessly 
//               with your main application content.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[1, 2, 3, 4, 5, 6].map((item) => (
//               <div key={item} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
//                 <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4"></div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">Feature {item}</h3>
//                 <p className="text-gray-600">
//                   This is a sample card that demonstrates how your main content appears with the cookie banner.
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Cookie Consent Component */}
//         <CookieConsent />
//       </main>
//     </div>
//   );
// };

// export default App;