import React from 'react';
import { FooterProps } from '../layout/layoutTypes';

export const Footer: React.FC<FooterProps> = ({ variant = 'app' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 text-center px-4">
      <div className={variant === 'marketing' ? 'bg-gray-100' : 'bg-white'}>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://www.linkedin.com/company/consltr/" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
            <i className="fab fa-linkedin-in text-2xl"></i>
          </a>
          <a href="https://x.com/consltr" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
            <i className="fab fa-instagram text-2xl"></i>
          </a>
        </div>
        <p className="text-sm text-gray-500">
          &copy; {currentYear} Consltr, LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};