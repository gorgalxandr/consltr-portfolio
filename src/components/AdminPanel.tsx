import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Database, 
  Users, 
  Building, 
  Globe, 
  DollarSign, 
  BarChart3,
  Server,
  Activity,
  Settings,
  ExternalLink,
  Bot,
  Mic,
  Play,
  Volume2
} from 'lucide-react'

interface AdminPanelProps {
  onBack: () => void
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const [stats, setStats] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [voiceStatus, setVoiceStatus] = useState<'checking' | 'healthy' | 'error'>('checking')
  const [isPlayingVoice, setIsPlayingVoice] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
    checkVoiceHealth()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch statistics
      const statsResponse = await fetch('http://localhost:4000/api/v1/stats')
      const statsData = await statsResponse.json()
      setStats(statsData.statistics)

      // Fetch users
      const usersResponse = await fetch('http://localhost:4000/api/v1/users')
      const usersData = await usersResponse.json()
      setUsers(usersData.users || [])

      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setLoading(false)
    }
  }

  const checkVoiceHealth = async () => {
    try {
      const response = await fetch('https://onzoe.com/api/voice/health')
      const data = await response.json()
      setVoiceStatus(data.integration === 'healthy' ? 'healthy' : 'error')
    } catch (error) {
      console.error('Voice health check failed:', error)
      setVoiceStatus('error')
    }
  }

  const testVoicePreview = async (text: string, voice: string) => {
    try {
      setIsPlayingVoice(voice)
      
      // Try OnZoe API first, fallback to browser TTS
      try {
        // Get CSRF token
        const tokenResponse = await fetch('https://onzoe.com/api/csrf-token', {
          credentials: 'include'
        })
        
        if (tokenResponse.ok) {
          const { csrfToken } = await tokenResponse.json()
          console.log('🎤 OnZoe Voice API connected, CSRF token:', csrfToken.substring(0, 10) + '...')
          
          // Use OnZoe voice synthesis endpoint
          const voiceResponse = await fetch('https://onzoe.com/api/voice/synthesize', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': csrfToken
            },
            credentials: 'include',
            body: JSON.stringify({
              text: text,
              voice: voice
            })
          })
          
          if (voiceResponse.ok) {
            const audioBlob = await voiceResponse.blob()
            const audioUrl = URL.createObjectURL(audioBlob)
            const audio = new Audio(audioUrl)
            
            audio.onended = () => {
              setIsPlayingVoice(null)
              URL.revokeObjectURL(audioUrl)
            }
            
            audio.onerror = () => {
              console.log('⚠️ Audio playback failed, falling back to browser TTS')
              setIsPlayingVoice(null)
              // Fallback to browser TTS
              const utterance = new SpeechSynthesisUtterance(text)
              setupVoiceUtterance(utterance, voice, text)
            }
            
            await audio.play()
            console.log('🔊 Playing OnZoe AI voice:', voice)
            return // Success - exit early
          } else {
            console.log('⚠️ OnZoe voice synthesis failed, using browser TTS fallback')
          }
        }
      } catch (onzoeError) {
        console.log('⚠️ OnZoe API not available, using browser TTS fallback')
      }

      // Use browser's Speech Synthesis API for immediate feedback
      const utterance = new SpeechSynthesisUtterance(text)
      
      // Wait for voices to be loaded
      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.addEventListener('voiceschanged', () => {
          setupVoiceUtterance(utterance, voice, text)
        }, { once: true })
      } else {
        setupVoiceUtterance(utterance, voice, text)
      }
      
    } catch (error) {
      console.error('Voice preview failed:', error)
      setIsPlayingVoice(null)
    }
  }

  const setupVoiceUtterance = (utterance: SpeechSynthesisUtterance, voice: string, text: string) => {
    const voices = speechSynthesis.getVoices()
    
    // Try to find a voice that matches the requested voice
    let selectedVoice = voices.find(v => 
      v.name.toLowerCase().includes(voice) || 
      v.name.toLowerCase().includes('female') ||
      v.name.toLowerCase().includes('male')
    )
    
    // Fallback to any English voice
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.startsWith('en')) || voices[0]
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice
    }
    
    utterance.rate = 0.9
    utterance.pitch = voice === 'alloy' ? 1.0 : voice === 'echo' ? 0.8 : 1.2
    utterance.volume = 0.8
    
    utterance.onend = () => {
      setIsPlayingVoice(null)
    }
    
    utterance.onerror = () => {
      setIsPlayingVoice(null)
    }
    
    speechSynthesis.speak(utterance)
  }

  const adminSections = [
    {
      title: "User Management",
      icon: <Users size={24} />,
      description: "Manage users, roles, and permissions",
      color: "from-blue-500 to-cyan-500",
      endpoint: "/api/v1/users"
    },
    {
      title: "Client Management", 
      icon: <Building size={24} />,
      description: "CRM system for client relationships",
      color: "from-green-500 to-emerald-500",
      endpoint: "/api/v1/clients"
    },
    {
      title: "Voice AI Management",
      icon: <Bot size={24} />,
      description: "Manage voice agents and test voice synthesis",
      color: "from-indigo-500 to-purple-500",
      endpoint: "https://onzoe.com/api/voice/health",
      isVoiceAI: true
    },
    {
      title: "Project Management",
      icon: <BarChart3 size={24} />,
      description: "Track projects, tasks, and timelines",
      color: "from-purple-500 to-violet-500",
      endpoint: "/api/v1/projects"
    },
    {
      title: "Website Monitoring",
      icon: <Globe size={24} />,
      description: "Monitor website uptime and performance",
      color: "from-orange-500 to-red-500",
      endpoint: "/api/v1/websites"
    },
    {
      title: "Financial Management",
      icon: <DollarSign size={24} />,
      description: "Invoicing and revenue tracking",
      color: "from-yellow-500 to-orange-500",
      endpoint: "/api/v1/invoices"
    },
    {
      title: "Analytics Dashboard",
      icon: <Activity size={24} />,
      description: "Business intelligence and reporting",
      color: "from-pink-500 to-rose-500",
      endpoint: "/api/v1/analytics"
    }
  ]

  const systemEndpoints = [
    { name: "API Health Check", url: "http://localhost:4000/health", method: "GET" },
    { name: "API Documentation", url: "http://localhost:4000/api/v1/docs", method: "GET" },
    { name: "System Statistics", url: "http://localhost:4000/api/v1/stats", method: "GET" },
    { name: "User List", url: "http://localhost:4000/api/v1/users", method: "GET" },
    { name: "Client List", url: "http://localhost:4000/api/v1/clients", method: "GET" },
    { name: "OnZoe Voice Health", url: "https://onzoe.com/api/voice/health", method: "GET" },
    { name: "OnZoe CSRF Token", url: "https://onzoe.com/api/csrf-token", method: "GET" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-md border-b border-gray-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={onBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </motion.button>
              <div>
                <h1 className="magazine-title text-2xl font-bold">Consltr Admin Dashboard</h1>
                <p className="text-gray-400 text-sm">Digital Agency Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Backend Running</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Statistics Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12"
        >
          {stats && Object.entries(stats).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
            >
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {typeof value === 'number' ? value : '0'}
              </div>
              <div className="text-gray-300 text-sm capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Admin Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="magazine-title text-3xl font-bold mb-8">Admin Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8 }}
                className="group relative bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} mb-4`}>
                    <div className="text-white">
                      {section.icon}
                    </div>
                  </div>
                  <h3 className="magazine-title text-xl font-semibold text-white mb-2">
                    {section.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {section.description}
                  </p>
                  
                  {section.isVoiceAI ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className={`w-3 h-3 rounded-full ${
                          voiceStatus === 'healthy' ? 'bg-green-500' : 
                          voiceStatus === 'checking' ? 'bg-yellow-500 animate-pulse' : 
                          'bg-red-500'
                        }`}></div>
                        <span className="text-xs text-gray-400">
                          {voiceStatus === 'healthy' ? 'Voice AI Online' : 
                           voiceStatus === 'checking' ? 'Checking...' : 
                           'Voice AI Offline'}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-xs text-gray-400 mb-2">Voice Preview:</div>
                        {['alloy', 'echo', 'nova'].map((voice) => (
                          <motion.button
                            key={voice}
                            onClick={() => testVoicePreview(`Hello! This is the ${voice} voice from OnZoe AI.`, voice)}
                            disabled={isPlayingVoice !== null}
                            whileHover={{ scale: 1.02 }}
                            className={`flex items-center justify-between w-full p-2 rounded-lg text-xs transition-all ${
                              isPlayingVoice === voice 
                                ? 'bg-purple-500/30 border border-purple-500/50' 
                                : 'bg-gray-700/30 border border-gray-600/50 hover:border-purple-500/50'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <Mic size={12} />
                              <span className="capitalize">{voice}</span>
                            </div>
                            {isPlayingVoice === voice ? (
                              <Volume2 size={12} className="text-purple-400 animate-pulse" />
                            ) : (
                              <Play size={12} className="text-gray-400" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                      
                      <motion.a
                        href={section.endpoint}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors text-sm mt-3"
                      >
                        <span>View API</span>
                        <ExternalLink size={16} />
                      </motion.a>
                    </div>
                  ) : (
                    <motion.a
                      href={`http://localhost:4000${section.endpoint}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
                    >
                      <span>View API</span>
                      <ExternalLink size={16} />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* API Endpoints */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="magazine-title text-3xl font-bold mb-8">API Endpoints</h2>
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {systemEndpoints.map((endpoint, index) => (
                <motion.a
                  key={endpoint.name}
                  href={endpoint.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/50 hover:border-purple-500/50 transition-all group"
                >
                  <div>
                    <div className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {endpoint.name}
                    </div>
                    <div className="text-gray-400 text-sm font-mono">
                      {endpoint.method} {endpoint.url.replace('http://localhost:4000', '')}
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Current Users */}
        {users.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="magazine-title text-3xl font-bold mb-8">Current Users</h2>
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
              <div className="space-y-4">
                {users.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {user.email}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'super_admin' 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {user.role}
                      </span>
                      <div className={`w-3 h-3 rounded-full ${
                        user.isActive ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel