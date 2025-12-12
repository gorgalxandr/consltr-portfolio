import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code, 
  Brain, 
  Megaphone, 
  Shield, 
  Server, 
  Palette, 
  Share2, 
  BarChart3,
  Bot,
  Database,
  Globe,
  Smartphone,
  Cloud,
  Eye,
  Zap,
  Users,
  ChevronRight,
  ExternalLink
} from 'lucide-react'

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const serviceCategories = [
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      icon: <Brain size={32} />,
      gradient: 'from-purple-600 to-blue-600',
      description: 'Cutting-edge AI solutions that transform how businesses operate',
      services: [
        {
          name: 'Voice AI Agents',
          description: 'Custom voice assistants and conversational AI systems powered by advanced LLMs',
          technologies: ['LiveKit', 'OpenAI', 'Groq', 'Silero TTS', 'WebRTC'],
          deliverables: ['Voice interface design', 'Real-time conversation handling', 'Custom voice training', 'Integration APIs'],
          timeline: '6-12 weeks',
          investment: '$25K - $75K'
        },
        {
          name: 'Private LLM Solutions',
          description: 'Secure, on-premise large language models tailored to your business needs',
          technologies: ['Llama 2/3', 'Mistral', 'Docker', 'NVIDIA GPU', 'Kubernetes'],
          deliverables: ['Model fine-tuning', 'Secure deployment', 'API endpoints', 'Performance optimization'],
          timeline: '8-16 weeks',
          investment: '$50K - $150K'
        },
        {
          name: 'AI Analytics & Insights',
          description: 'Machine learning models for predictive analytics and business intelligence',
          technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Apache Spark', 'MLflow'],
          deliverables: ['Predictive models', 'Data pipelines', 'Dashboard integration', 'Model monitoring'],
          timeline: '10-20 weeks',
          investment: '$35K - $100K'
        }
      ]
    },
    {
      id: 'full-stack',
      title: 'Full-Stack Development',
      icon: <Code size={32} />,
      gradient: 'from-green-600 to-teal-600',
      description: 'Complete web and mobile solutions from concept to deployment',
      services: [
        {
          name: 'SaaS Platform Development',
          description: 'Scalable software-as-a-service platforms with modern architecture',
          technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis'],
          deliverables: ['Full-stack application', 'Admin dashboard', 'Payment integration', 'API documentation'],
          timeline: '16-24 weeks',
          investment: '$75K - $200K'
        },
        {
          name: 'Backend API Development',
          description: 'Robust, scalable backend systems with comprehensive API design',
          technologies: ['Express.js', 'GraphQL', 'REST APIs', 'Microservices', 'JWT', 'OAuth'],
          deliverables: ['API architecture', 'Database design', 'Authentication system', 'Performance optimization'],
          timeline: '8-16 weeks',
          investment: '$30K - $80K'
        },
        {
          name: 'Mobile Applications',
          description: 'Native and cross-platform mobile apps for iOS and Android',
          technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Push notifications'],
          deliverables: ['iOS app', 'Android app', 'Backend integration', 'App store deployment'],
          timeline: '12-20 weeks',
          investment: '$50K - $120K'
        }
      ]
    },
    {
      id: 'marketing',
      title: 'Digital Marketing & Design',
      icon: <Megaphone size={32} />,
      gradient: 'from-pink-600 to-rose-600',
      description: 'Strategic marketing solutions that drive growth and engagement',
      services: [
        {
          name: 'Marketing Websites',
          description: 'High-converting marketing sites with advanced SEO and performance optimization',
          technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Google Analytics', 'SEO tools'],
          deliverables: ['Responsive website', 'SEO optimization', 'Performance optimization', 'Analytics setup'],
          timeline: '6-12 weeks',
          investment: '$15K - $50K'
        },
        {
          name: 'Brand & UI/UX Design',
          description: 'Complete brand identity and user experience design systems',
          technologies: ['Figma', 'Adobe Creative Suite', 'Framer', 'Principle', 'Design Systems'],
          deliverables: ['Brand guidelines', 'Design system', 'UI/UX mockups', 'Prototype'],
          timeline: '8-14 weeks',
          investment: '$20K - $60K'
        },
        {
          name: 'Growth Marketing',
          description: 'Data-driven marketing campaigns and conversion optimization',
          technologies: ['Google Ads', 'Facebook Ads', 'HubSpot', 'Mixpanel', 'A/B testing'],
          deliverables: ['Marketing strategy', 'Campaign setup', 'Landing pages', 'Performance reports'],
          timeline: '4-12 weeks',
          investment: '$10K - $40K'
        }
      ]
    },
    {
      id: 'devops',
      title: 'DevOps & Infrastructure',
      icon: <Server size={32} />,
      gradient: 'from-orange-600 to-red-600',
      description: 'Scalable infrastructure and deployment solutions',
      services: [
        {
          name: 'Cloud Infrastructure',
          description: 'Scalable cloud architecture on AWS, GCP, or Azure with best practices',
          technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CloudFormation', 'CDN'],
          deliverables: ['Infrastructure as code', 'CI/CD pipelines', 'Monitoring setup', 'Security configuration'],
          timeline: '6-12 weeks',
          investment: '$25K - $70K'
        },
        {
          name: 'DevOps Consulting',
          description: 'DevOps transformation and process optimization for development teams',
          technologies: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'Ansible', 'Prometheus', 'Grafana'],
          deliverables: ['Process assessment', 'Pipeline setup', 'Monitoring dashboards', 'Team training'],
          timeline: '8-16 weeks',
          investment: '$30K - $80K'
        },
        {
          name: 'Security & Compliance',
          description: 'Security audits, compliance setup, and penetration testing',
          technologies: ['OWASP', 'SSL/TLS', 'OAuth', 'SOC 2', 'GDPR', 'Security scanning'],
          deliverables: ['Security audit', 'Compliance documentation', 'Security implementation', 'Monitoring'],
          timeline: '4-10 weeks',
          investment: '$15K - $45K'
        }
      ]
    },
    {
      id: 'social-analytics',
      title: 'Social Media & Analytics',
      icon: <Share2 size={32} />,
      gradient: 'from-blue-600 to-indigo-600',
      description: 'Comprehensive social media management and analytics platforms',
      services: [
        {
          name: 'Social Media Platforms',
          description: 'Custom social media applications and community platforms',
          technologies: ['React', 'WebSocket', 'Redis', 'CDN', 'Real-time messaging', 'Content moderation'],
          deliverables: ['Social platform', 'User management', 'Content system', 'Moderation tools'],
          timeline: '20-30 weeks',
          investment: '$100K - $250K'
        },
        {
          name: 'Analytics & Tracking',
          description: 'Advanced analytics systems with real-time data processing',
          technologies: ['Google Analytics 4', 'Mixpanel', 'Segment', 'BigQuery', 'Data visualization'],
          deliverables: ['Analytics setup', 'Custom dashboards', 'Data pipelines', 'Reporting system'],
          timeline: '6-14 weeks',
          investment: '$20K - $60K'
        },
        {
          name: 'API Integrations',
          description: 'Seamless integrations with social media platforms and third-party services',
          technologies: ['Facebook API', 'Instagram API', 'Twitter API', 'LinkedIn API', 'TikTok API'],
          deliverables: ['API integrations', 'Data synchronization', 'Webhook setup', 'Rate limiting'],
          timeline: '4-8 weeks',
          investment: '$15K - $35K'
        }
      ]
    },
    {
      id: 'specialized',
      title: 'Specialized Solutions',
      icon: <Zap size={32} />,
      gradient: 'from-yellow-600 to-orange-600',
      description: 'Unique and innovative solutions for complex challenges',
      services: [
        {
          name: 'Accessibility Solutions',
          description: 'Inclusive digital experiences for users with disabilities (inspired by DeafDreamer)',
          technologies: ['WCAG 2.1', 'Screen readers', 'Voice interfaces', 'Visual indicators', 'Accessibility APIs'],
          deliverables: ['Accessibility audit', 'Implementation plan', 'Testing protocols', 'Compliance certification'],
          timeline: '6-12 weeks',
          investment: '$20K - $50K'
        },
        {
          name: 'IoT & Real-time Systems',
          description: 'Internet of Things solutions and real-time data processing systems',
          technologies: ['MQTT', 'WebSocket', 'InfluxDB', 'Edge computing', 'Sensor integration'],
          deliverables: ['IoT architecture', 'Device management', 'Real-time dashboard', 'Data processing'],
          timeline: '12-20 weeks',
          investment: '$40K - $100K'
        },
        {
          name: 'Blockchain & Web3',
          description: 'Decentralized applications and blockchain integration solutions',
          technologies: ['Ethereum', 'Solidity', 'Web3.js', 'MetaMask', 'IPFS', 'Smart contracts'],
          deliverables: ['Smart contracts', 'DApp frontend', 'Wallet integration', 'Testing suite'],
          timeline: '10-18 weeks',
          investment: '$35K - $90K'
        }
      ]
    }
  ]

  const getServiceIcon = (serviceName: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      'Voice AI Agents': <Bot size={20} />,
      'Private LLM Solutions': <Shield size={20} />,
      'AI Analytics & Insights': <BarChart3 size={20} />,
      'SaaS Platform Development': <Globe size={20} />,
      'Backend API Development': <Database size={20} />,
      'Mobile Applications': <Smartphone size={20} />,
      'Marketing Websites': <Globe size={20} />,
      'Brand & UI/UX Design': <Palette size={20} />,
      'Growth Marketing': <Megaphone size={20} />,
      'Cloud Infrastructure': <Cloud size={20} />,
      'DevOps Consulting': <Server size={20} />,
      'Security & Compliance': <Shield size={20} />,
      'Social Media Platforms': <Users size={20} />,
      'Analytics & Tracking': <Eye size={20} />,
      'API Integrations': <Share2 size={20} />,
      'Accessibility Solutions': <Eye size={20} />,
      'IoT & Real-time Systems': <Zap size={20} />,
      'Blockchain & Web3': <Database size={20} />
    }
    return iconMap[serviceName] || <Code size={20} />
  }

  return (
    <section id="services" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="magazine-title text-5xl md:text-6xl mb-6">
            Complete Digital
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Solutions
            </span>
          </h2>
          <p className="magazine-body text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            From AI-powered voice agents to full-stack platforms, we deliver comprehensive 
            technology solutions that transform businesses and create exceptional user experiences.
          </p>
        </motion.div>

        {/* Service Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 h-full">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${category.gradient} mb-6`}>
                  <div className="text-white">
                    {category.icon}
                  </div>
                </div>
                
                <h3 className="magazine-title text-2xl font-bold text-white mb-4">
                  {category.title}
                </h3>
                
                <p className="magazine-body text-gray-300 mb-6 leading-relaxed">
                  {category.description}
                </p>

                <div className="space-y-3">
                  {category.services.map((service, serviceIndex) => (
                    <motion.button
                      key={serviceIndex}
                      onClick={() => setSelectedService(`${category.id}-${serviceIndex}`)}
                      whileHover={{ x: 8 }}
                      className="flex items-center justify-between w-full p-3 bg-gray-800/30 rounded-lg border border-gray-600/50 hover:border-purple-500/50 transition-all group/service"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-gray-400 group-hover/service:text-purple-400 transition-colors">
                          {getServiceIcon(service.name)}
                        </div>
                        <span className="text-white text-sm font-medium">
                          {service.name}
                        </span>
                      </div>
                      <ChevronRight 
                        size={16} 
                        className="text-gray-400 group-hover/service:text-purple-400 transition-colors" 
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service Detail Modal */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedService(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto border border-gray-700/50"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const [categoryId, serviceIndex] = selectedService.split('-')
                  const category = serviceCategories.find(c => c.id === categoryId)
                  const service = category?.services[parseInt(serviceIndex)]
                  
                  if (!service || !category) return null

                  return (
                    <div className="p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-8">
                        <div className="flex items-start space-x-4">
                          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${category.gradient}`}>
                            <div className="text-white">
                              {getServiceIcon(service.name)}
                            </div>
                          </div>
                          <div>
                            <h3 className="magazine-title text-3xl font-bold text-white mb-2">
                              {service.name}
                            </h3>
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full magazine-subtitle text-sm">
                              {category.title}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedService(null)}
                          className="text-gray-400 hover:text-white p-2"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Description */}
                      <p className="magazine-body text-gray-300 text-lg mb-8 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Technologies */}
                        <div>
                          <h4 className="magazine-title text-xl font-semibold text-white mb-4">
                            Technologies & Tools
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg magazine-subtitle text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Deliverables */}
                        <div>
                          <h4 className="magazine-title text-xl font-semibold text-white mb-4">
                            Key Deliverables
                          </h4>
                          <ul className="space-y-2">
                            {service.deliverables.map((deliverable, index) => (
                              <li key={index} className="flex items-center space-x-2 text-gray-300">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                <span className="text-sm">{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Timeline & Investment */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-800/30 rounded-xl p-6">
                          <h4 className="magazine-title text-lg font-semibold text-white mb-2">
                            Timeline
                          </h4>
                          <p className="text-purple-400 font-semibold text-xl">
                            {service.timeline}
                          </p>
                        </div>
                        <div className="bg-gray-800/30 rounded-xl p-6">
                          <h4 className="magazine-title text-lg font-semibold text-white mb-2">
                            Investment Range
                          </h4>
                          <p className="text-green-400 font-semibold text-xl">
                            {service.investment}
                          </p>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <motion.a
                          href="#contact"
                          onClick={() => setSelectedService(null)}
                          whileHover={{ scale: 1.05 }}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all magazine-subtitle text-sm text-center"
                        >
                          Start This Project
                        </motion.a>
                        <motion.a
                          href="mailto:hello@consltr.com?subject=Inquiry about ${service.name}"
                          whileHover={{ scale: 1.05 }}
                          className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-800 transition-all magazine-subtitle text-sm text-center flex items-center justify-center space-x-2"
                        >
                          <span>Discuss Details</span>
                          <ExternalLink size={16} />
                        </motion.a>
                      </div>
                    </div>
                  )
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-12 border border-purple-500/30"
        >
          <h3 className="magazine-title text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="magazine-body text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a custom solution that perfectly fits your needs. 
            We'll work together to bring your vision to life with cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all magazine-subtitle text-sm"
            >
              Start Your Project
            </motion.a>
            <motion.a
              href="http://localhost:4000/api/v1/docs"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all magazine-subtitle text-sm flex items-center space-x-2"
            >
              <span>View Our API</span>
              <ExternalLink size={16} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services