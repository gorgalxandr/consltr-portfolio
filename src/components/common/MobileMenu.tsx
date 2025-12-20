import React from 'react';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={`mobile-menu-overlay menu-bg-pattern fixed inset-0 bg-gray-900 bg-opacity-95 z-50 transition-all duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className="mobile-menu-content h-full flex flex-col items-center justify-center relative p-4">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-white hover:text-purple-400 transition-colors duration-300 focus:outline-none"
          aria-label="Close menu"
        >
          <div className="hamburger open w-8 h-8 relative">
            <span className="hamburger-line absolute left-0 top-1/2 w-full h-0.5 bg-current transform -translate-y-1/2 rotate-45 transition-transform duration-300" />
            <span className="hamburger-line absolute left-0 top-1/2 w-full h-0.5 bg-current transform -translate-y-1/2 -rotate-45 transition-transform duration-300" />
          </div>
        </button>
        
        <nav className="flex flex-col items-center space-y-8 text-center">
          {[
            { to: "/", text: "Home", color: "purple" },
            { to: "/services", text: "Services", color: "blue" },
            { to: "/portfolio", text: "Portfolio", color: "pink" },
            { to: "/contact", text: "Contact", color: "green" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`mobile-menu-item text-5xl md:text-6xl font-extralight text-white hover:text-${item.color}-400 transition-all duration-500 hover:scale-110 glow-text`}
              onClick={onClose}
            >
              {item.text}
            </Link>
          ))}
        </nav>
        
        <div className="mobile-menu-item flex flex-col space-y-4 mt-16 w-full max-w-xs">
          {[
            { to: "/login", text: "Login", gradient: "from-blue-600 to-purple-600" },
            { to: "/register", text: "Register", gradient: "from-purple-600 to-pink-600" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`bg-gradient-to-r ${item.gradient} hover:${item.gradient.replace('600', '700')} text-white font-bold py-4 px-8 rounded-full transition-all duration-300 text-xl hover:scale-105 shadow-lg hover:shadow-xl text-center`}
              onClick={onClose}
            >
              {item.text}
            </Link>
          ))}
        </div>
        
        <div className="mobile-menu-item flex justify-center space-x-8 mt-16">
          {[
            { href: "https://www.linkedin.com/company/consltr/", icon: "linkedin-in", color: "blue" },
            { href: "https://x.com/consltr", icon: "twitter", color: "blue" },
            { href: "#", icon: "instagram", color: "pink" },
          ].map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-300 hover:text-${social.color}-400 transition-all duration-300 hover:scale-125`}
            >
              <i className={`fab fa-${social.icon} text-3xl`} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;