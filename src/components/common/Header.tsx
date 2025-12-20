import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Implement your mobile menu component here
  return isOpen ? (
    <div className="md:hidden fixed inset-0 bg-gray-900 z-20 p-4">
      {/* Mobile menu content */}
      <button onClick={onClose} className="absolute top-4 right-4 text-white">
        Close
      </button>
      <nav className="flex flex-col space-y-4 mt-12">
        <Link to="/" className="text-white hover:text-gray-300" onClick={onClose}>Home</Link>
        <Link to="/services" className="text-white hover:text-gray-300" onClick={onClose}>Services</Link>
        <Link to="/portfolio" className="text-white hover:text-gray-300" onClick={onClose}>Portfolio</Link>
        <Link to="/contact" className="text-white hover:text-gray-300" onClick={onClose}>Contact</Link>
        <Link to="/login" className="text-white hover:text-gray-300" onClick={onClose}>Login</Link>
        <Link to="/register" className="text-white hover:text-gray-300" onClick={onClose}>Register</Link>
      </nav>
    </div>
  ) : null;
};

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className="w-full flex justify-between items-center p-4 md:p-6 z-10">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          <Link to="/">Consltr</Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">Home</Link>
          <Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-300">Services</Link>
          <Link to="/portfolio" className="text-gray-300 hover:text-white transition-colors duration-300">Portfolio</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">Contact</Link>
          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-md transition-colors duration-300">Login</Link>
          <Link to="/register" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-4 rounded-md transition-colors duration-300">Register</Link>
        </nav>
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
              <span className="hamburger-line block w-6 h-0.5 bg-current my-1.5 transition-transform duration-300 ease-in-out" />
              <span className="hamburger-line block w-6 h-0.5 bg-current my-1.5 transition-transform duration-300 ease-in-out" />
              <span className="hamburger-line block w-6 h-0.5 bg-current my-1.5 transition-transform duration-300 ease-in-out" />
            </div>
          </button>
        </div>
      </header>
      
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default Header;