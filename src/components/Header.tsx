import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Settings } from 'lucide-react'

interface HeaderProps {
  onAdminAccess: () => void
}

const Header: React.FC<HeaderProps> = ({ onAdminAccess }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'A/B Testing', href: '#ab-testing' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold"
          >
            <span className="serif">Consltr</span>
            <span className="text-purple-400 ml-1">.</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="magazine-subtitle text-sm text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </motion.a>
            ))}
            
            {/* Admin Access Button */}
            <motion.button
              onClick={onAdminAccess}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              <Settings size={16} />
              <span className="text-sm">Admin</span>
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-white/10"
          >
            <div className="flex flex-col space-y-4 pt-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="magazine-subtitle text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  onAdminAccess()
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors w-fit"
              >
                <Settings size={16} />
                <span className="text-sm">Admin Panel</span>
              </button>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}

export default Header