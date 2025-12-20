import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });
  const [isChasing, setIsChasing] = useState(false);

  const funnyMessages = [
    "Oops! This page went on vacation and forgot to tell us.",
    "404: Page not found. But hey, you found this funny cat! 🐱",
    "We searched everywhere, even under the couch cushions.",
    "This page is playing hide and seek... and winning.",
    "Error 404: Page took a coffee break and never came back.",
    "The page you're looking for is in another castle. 🏰"
  ];

  const [currentMessage, setCurrentMessage] = useState(() => 
    funnyMessages[Math.floor(Math.random() * funnyMessages.length)]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isChasing) {
        setCatPosition({
          x: Math.random() * 100,
          y: Math.random() * 100
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isChasing]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isChasing) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setCatPosition({ x: Math.max(0, Math.min(90, x)), y: Math.max(0, Math.min(90, y)) });
    }
  };

  const toggleChaseMode = () => {
    setIsChasing(!isChasing);
  };

  const getNewMessage = () => {
    const availableMessages = funnyMessages.filter(msg => msg !== currentMessage);
    setCurrentMessage(availableMessages[Math.floor(Math.random() * availableMessages.length)]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-white mb-4 animate-bounce">
            4
            <span className="inline-block animate-spin">0</span>
            4
          </h1>
        </div>

        {/* Interactive Cat Area */}
        <div 
          className="relative h-64 mb-8 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm border border-white border-opacity-30 overflow-hidden cursor-pointer"
          onMouseMove={handleMouseMove}
          onClick={toggleChaseMode}
        >
          <div 
            className="absolute transition-all duration-1000 ease-in-out text-4xl"
            style={{ 
              left: `${catPosition.x}%`, 
              top: `${catPosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            🐱
          </div>
          
          {/* Instructions */}
          <div className="absolute bottom-4 left-4 right-4 text-white text-sm">
            {isChasing ? (
              <p className="animate-pulse">🎯 Chase mode ON! Move your mouse to control the cat</p>
            ) : (
              <p>Click to toggle chase mode, or just watch the cat wander around!</p>
            )}
          </div>
        </div>

        {/* Funny Message */}
        <div className="bg-white bg-opacity-20 rounded-xl p-6 mb-8 backdrop-blur-sm border border-white border-opacity-30">
          <p className="text-xl text-white mb-4 font-medium">
            {currentMessage}
          </p>
          <button
            onClick={getNewMessage}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-300 border border-white border-opacity-30 text-sm"
          >
            Get Another Excuse 🎲
          </button>
        </div>

        {/* Navigation Options */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🏠 Take Me Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-purple-600 bg-opacity-20 text-white hover:bg-opacity-30 px-8 py-3 rounded-lg font-semibold transition-all duration-300 border border-white border-opacity-30 backdrop-blur-sm"
            >
              ↩️ Go Back
            </button>
          </div>
          
          <div className="text-white text-opacity-80 text-sm">
            <p>Or maybe try searching for what you were looking for?</p>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mt-12 text-white text-opacity-60 text-xs">
          <p>💡 Fun fact: The first 404 error was at CERN in 1992!</p>
          <p className="mt-1">🎨 This page has been viewed by exactly one confused person (you).</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;