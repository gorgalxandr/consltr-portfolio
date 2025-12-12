import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Services from './components/Services'
import ABTesting from './components/ABTesting'
import Contact from './components/Contact'
import AdminPanel from './components/AdminPanel'

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

function App() {
  const [showAdmin, setShowAdmin] = useState(false)
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)

  // Sample portfolio data - this would come from the backend API
  const samplePortfolioItems = [
    {
      id: 1,
      title: "DeafDreamer Studios",
      category: "artist",
      description: "Revolutionary audio-visual experiences for the deaf and hard of hearing community",
      image: "/api/placeholder/600/400",
      tags: ["Music", "Accessibility", "Innovation"],
      featured: true,
      url: "https://deafdreamer.com"
    },
    {
      id: 2,
      title: "Consltr Admin Platform",
      category: "saas",
      description: "Comprehensive digital agency management system with CRM, project tracking, and analytics",
      image: "/api/placeholder/600/400",
      tags: ["SaaS", "CRM", "Analytics"],
      featured: true,
      url: "http://localhost:4000"
    },
    {
      id: 3,
      title: "TechFlow Solutions",
      category: "app",
      description: "Enterprise workflow automation platform reducing manual processes by 80%",
      image: "/api/placeholder/600/400",
      tags: ["Automation", "Enterprise", "AI"],
      featured: false
    },
    {
      id: 4,
      title: "Luxe Brands Campaign",
      category: "marketing",
      description: "Digital transformation campaign for luxury fashion house resulting in 300% online growth",
      image: "/api/placeholder/600/400",
      tags: ["Fashion", "Luxury", "Digital"],
      featured: true
    },
    {
      id: 5,
      title: "Neural Networks Visualization",
      category: "technology",
      description: "Interactive 3D visualization platform for understanding complex AI architectures",
      image: "/api/placeholder/600/400",
      tags: ["AI", "Visualization", "Education"],
      featured: false
    },
    {
      id: 6,
      title: "Sustainable Energy Dashboard",
      category: "app",
      description: "Real-time monitoring and optimization platform for renewable energy systems",
      image: "/api/placeholder/600/400",
      tags: ["Sustainability", "Energy", "IoT"],
      featured: true
    }
  ]

  useEffect(() => {
    // Simulate API call to backend
    setTimeout(() => {
      setPortfolioItems(samplePortfolioItems)
      setLoading(false)
    }, 1000)
  }, [])

  const handleAdminAccess = () => {
    setShowAdmin(true)
  }

  if (showAdmin) {
    return <AdminPanel onBack={() => setShowAdmin(false)} />
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header onAdminAccess={handleAdminAccess} />
      
      <main>
        <Hero />
        <About />
        <Portfolio items={portfolioItems} loading={loading} />
        <Services />
        <ABTesting />
        <Contact />
      </main>

      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}

export default App