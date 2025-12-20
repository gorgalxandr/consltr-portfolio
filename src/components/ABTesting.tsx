import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, Target, Brain, Zap } from 'lucide-react'

interface ABTestingProps {
  apiKey?: string
}

interface Campaign {
  id: string
  [key: string]: unknown
}

const ABTesting: React.FC<ABTestingProps> = ({ 
  apiKey = 'demo-api-key-123456789abcdef' 
}) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  useEffect(() => {
    const initializeABTesting = async () => {
      try {
        // Load the A/B testing script dynamically
        const script = document.createElement('script')
        script.src = `http://localhost:4000/ab-script/${apiKey}`
        script.async = true
        script.onload = () => {
          setIsInitialized(true)
          // Give the script a moment to initialize
          setTimeout(() => {
            if (window.ConsltrAB) {
              // Track page view for A/B testing
              window.ConsltrAB.trackEvent('portfolio_view', 'acquisition', {
                page: 'portfolio',
                timestamp: new Date().toISOString()
              })
            }
          }, 1000)
        }
        document.head.appendChild(script)
  
        // Fetch campaign information for display
        const response = await fetch(`http://localhost:4000/api/public/ab-campaigns?domain=localhost:3002`)
        const data = await response.json()
        if (data.campaigns) {
          setCampaigns(data.campaigns)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to initialize A/B testing:', error)
      }
    }

    initializeABTesting()
  }, [apiKey])

  const trackInteraction = (eventName: string, category: string = 'activation') => {
    if (window.ConsltrAB && isInitialized) {
      window.ConsltrAB.trackEvent(eventName, category, {
        timestamp: new Date().toISOString(),
        page: 'portfolio'
      })
    }
  }

  const handleServiceInteraction = (serviceName: string) => {
    trackInteraction('service_interaction', 'activation')
    trackInteraction(`service_${serviceName.toLowerCase().replace(/\s+/g, '_')}_click`, 'activation')
  }

  const handleConversion = () => {
    if (window.ConsltrAB && isInitialized) {
      window.ConsltrAB.trackConversion(1)
    }
  }

  return (
    <section id="ab-testing" className="py-20 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            A/B Testing <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">& Analytics</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Data-driven optimization system following AARRR metrics principles. 
            Plug-and-play solution for continuous conversion improvement.
          </p>
        </motion.div>

        {/* A/B Testing Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-12 border border-white/10"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-3 h-3 rounded-full ${isInitialized ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`}></div>
            <h3 className="text-lg font-semibold">
              A/B Testing System: {isInitialized ? 'Active' : 'Initializing...'}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Active Campaigns:</span>
              <span className="ml-2 text-white font-semibold">{campaigns.length}</span>
            </div>
            <div>
              <span className="text-gray-400">API Status:</span>
              <span className="ml-2 text-green-400 font-semibold">Connected</span>
            </div>
            <div>
              <span className="text-gray-400">Tracking:</span>
              <span className="ml-2 text-blue-400 font-semibold">AARRR Metrics</span>
            </div>
          </div>
        </motion.div>

        {/* AARRR Metrics Framework */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
          {[
            { letter: 'A', name: 'Acquisition', desc: 'How visitors find you', icon: Target, color: 'from-red-500 to-pink-500' },
            { letter: 'A', name: 'Activation', desc: 'First experience quality', icon: Zap, color: 'from-orange-500 to-yellow-500' },
            { letter: 'R', name: 'Retention', desc: 'Repeat visitors', icon: Users, color: 'from-green-500 to-emerald-500' },
            { letter: 'R', name: 'Referral', desc: 'Word of mouth', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
            { letter: 'R', name: 'Revenue', desc: 'Monetization', icon: BarChart3, color: 'from-purple-500 to-indigo-500' }
          ].map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center group hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => trackInteraction(`aarrr_${metric.name.toLowerCase()}_click`)}
            >
              <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${metric.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <metric.icon size={24} className="text-white" />
              </div>
              <div className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                {metric.letter}
              </div>
              <h4 className="font-semibold text-white mb-2">{metric.name}</h4>
              <p className="text-sm text-gray-400">{metric.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* A/B Testing Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: 'Visual Editor',
              description: 'Point-and-click interface for creating test variations without code',
              features: ['Drag & drop elements', 'CSS overrides', 'Content swapping', 'Real-time preview']
            },
            {
              title: 'Statistical Engine',
              description: 'Robust statistical analysis with confidence intervals and significance testing',
              features: ['Bayesian analysis', '95% confidence level', 'Sample size calculator', 'Auto-stopping rules']
            },
            {
              title: 'Segmentation',
              description: 'Target specific user groups for more precise testing and insights',
              features: ['Geographic targeting', 'Device segmentation', 'Traffic source', 'Behavioral patterns']
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-colors group cursor-pointer"
              onClick={() => handleServiceInteraction(feature.title)}
            >
              <h3 className="text-xl font-semibold mb-4 group-hover:text-purple-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-300 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.features.map((item, i) => (
                  <li key={i} className="text-sm text-gray-400 flex items-center">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Integration Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Brain className="mr-2 text-purple-400" size={24} />
            Plug & Play Integration
          </h3>
          <p className="text-gray-300 mb-4">
            Add A/B testing to any website with just one line of code:
          </p>
          <div className="bg-black/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-green-400">
              {`<script src="https://api.consltr.com/ab-script/YOUR_API_KEY"></script>`}
            </code>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            <p>• Automatic visitor segmentation</p>
            <p>• Real-time result tracking</p>
            <p>• GDPR compliant data collection</p>
            <p>• Zero performance impact</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={handleConversion}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg"
          >
            Start A/B Testing Today
          </button>
          <p className="text-gray-400 mt-4 text-sm">
            Free 30-day trial • No credit card required • GDPR compliant
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ConsltrAB?: {
      init: () => void
      trackEvent: (eventName: string, category: string, properties?: Record<string, unknown>) => void
      trackConversion: (value?: number) => void
      trackRevenue: (amount: number) => void
      assignedVariants: Record<string, unknown>
      config: Record<string, unknown>
    }
  }
}

export default ABTesting