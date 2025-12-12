import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Calendar, Tag } from 'lucide-react'

interface PortfolioItem {
  id: number
  title: string
  category: string
  description: string
  image: string
  tags: string[]
  featured: boolean
  url?: string
}

interface PortfolioProps {
  items: PortfolioItem[]
  loading: boolean
}

const Portfolio: React.FC<PortfolioProps> = ({ items, loading }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  const categories = [
    { id: 'all', name: 'All Work', count: items.length },
    { id: 'saas', name: 'SaaS Platforms', count: items.filter(item => item.category === 'saas').length },
    { id: 'app', name: 'Applications', count: items.filter(item => item.category === 'app').length },
    { id: 'artist', name: 'Artist Projects', count: items.filter(item => item.category === 'artist').length },
    { id: 'marketing', name: 'Marketing', count: items.filter(item => item.category === 'marketing').length },
    { id: 'technology', name: 'Technology', count: items.filter(item => item.category === 'technology').length },
  ]

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory)

  const getCategoryGradient = (category: string) => {
    const gradients = {
      saas: 'from-green-400 to-cyan-400',
      app: 'from-blue-400 to-purple-400', 
      artist: 'from-pink-400 to-rose-400',
      marketing: 'from-orange-400 to-red-400',
      technology: 'from-cyan-400 to-blue-400',
    }
    return gradients[category as keyof typeof gradients] || 'from-gray-400 to-gray-600'
  }

  if (loading) {
    return (
      <section id="portfolio" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-700 rounded-lg animate-pulse mb-4 max-w-md mx-auto"></div>
            <div className="h-6 bg-gray-700 rounded-lg animate-pulse max-w-2xl mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
                <div className="h-48 bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-4 w-3/4"></div>
                <div className="flex space-x-2">
                  <div className="h-6 bg-gray-700 rounded w-16"></div>
                  <div className="h-6 bg-gray-700 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="portfolio" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="magazine-title text-5xl md:text-6xl mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Portfolio</span>
          </h2>
          <p className="magazine-body text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the digital experiences we've crafted across industries, 
            from cutting-edge SaaS platforms to artistic installations.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full magazine-subtitle text-sm transition-all ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-75">({category.count})</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 ${
                  item.featured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <div 
                    className={`h-64 ${item.featured ? 'md:h-80' : ''} bg-gradient-to-br ${getCategoryGradient(item.category)} opacity-80`}
                  >
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full magazine-subtitle text-xs text-white">
                        {item.category.toUpperCase()}
                      </span>
                    </div>
                    {item.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-purple-500 rounded-full magazine-subtitle text-xs text-white">
                          FEATURED
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.button
                      onClick={() => setSelectedItem(item)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="px-6 py-3 bg-white text-black font-semibold rounded-lg magazine-subtitle text-sm"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="magazine-title text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                      {item.title}
                    </h3>
                    {item.url && (
                      <motion.a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <ExternalLink size={18} />
                      </motion.a>
                    )}
                  </div>
                  
                  <p className="magazine-body text-gray-300 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full magazine-subtitle text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Portfolio Detail Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="magazine-title text-3xl font-bold text-white mb-2">
                        {selectedItem.title}
                      </h3>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full magazine-subtitle text-sm">
                        {selectedItem.category.toUpperCase()}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className={`h-64 md:h-80 bg-gradient-to-br ${getCategoryGradient(selectedItem.category)} rounded-lg mb-6 opacity-80`}>
                    <div className="w-full h-full bg-black/20 rounded-lg"></div>
                  </div>

                  <p className="magazine-body text-gray-300 text-lg mb-6 leading-relaxed">
                    {selectedItem.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {selectedItem.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg magazine-subtitle text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {selectedItem.url && (
                    <motion.a
                      href={selectedItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors magazine-subtitle text-sm"
                    >
                      <span>View Live Project</span>
                      <ExternalLink size={16} />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Portfolio