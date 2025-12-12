import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    message: '',
    budget: '',
    timeline: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      // Use environment variable or production URL
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://consltr.com/api/v1/public/project-inquiry'
        : 'http://localhost:3000/api/v1/public/project-inquiry';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          projectType: formData.project,
          projectDescription: formData.message,
          budgetRange: formData.budget,
          timeline: formData.timeline,
          source: 'portfolio_website'
        })
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Project inquiry submitted successfully:', result)
        setIsSubmitted(true)
        
        // Clear form
        setFormData({
          name: '',
          email: '',
          company: '',
          project: '',
          message: '',
          budget: '',
          timeline: ''
        })
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        const errorData = await response.json()
        setSubmitError(errorData.message || 'Failed to submit inquiry. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      detail: "hello@consltr.com",
      href: "mailto:hello@consltr.com"
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      detail: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      detail: "San Francisco, CA",
      href: "#"
    }
  ]

  const projectTypes = [
    "SaaS Platform Development",
    "Mobile Application",
    "Web Application", 
    "Digital Experience",
    "Consulting & Strategy",
    "Other"
  ]

  const budgetRanges = [
    "$5k - $10k",
    "$10k - $25k", 
    "$25k - $50k",
    "$50k - $100k",
    "$100k+",
    "Let's discuss"
  ]

  const timelineOptions = [
    "1-2 months",
    "2-3 months",
    "3-6 months", 
    "6-12 months",
    "12+ months",
    "Flexible"
  ]

  return (
    <section id="contact" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="magazine-title text-5xl md:text-6xl mb-6">
            Let's Build
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Something Amazing
            </span>
          </h2>
          <p className="magazine-body text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to bring your vision to life? We'd love to hear about your project 
            and explore how we can help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
          >
            <h3 className="magazine-title text-2xl font-bold text-white mb-6">
              Start Your Project
            </h3>

            {/* Error Message */}
            {submitError && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {submitError}
              </div>
            )}

            {/* Success Message */}
            {isSubmitted && (
              <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm">
                Thank you! Your project inquiry has been submitted successfully. We'll get back to you within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block magazine-subtitle text-sm text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block magazine-subtitle text-sm text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block magazine-subtitle text-sm text-gray-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label htmlFor="project" className="block magazine-subtitle text-sm text-gray-300 mb-2">
                  Project Type
                </label>
                <select
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="">Select project type</option>
                  {projectTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budget" className="block magazine-subtitle text-sm text-gray-300 mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((range, index) => (
                      <option key={index} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline" className="block magazine-subtitle text-sm text-gray-300 mb-2">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="">Select timeline</option>
                    {timelineOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block magazine-subtitle text-sm text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                disabled={isSubmitting || isSubmitted}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all magazine-subtitle text-sm flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle size={20} />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="magazine-title text-2xl font-bold text-white mb-6">
              Get in Touch
            </h3>
            <p className="magazine-body text-gray-300 mb-8 leading-relaxed">
              Have a question or want to discuss your project? We're here to help. 
              Reach out through any of these channels and we'll get back to you promptly.
            </p>

            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                    {info.icon}
                  </div>
                  <div>
                    <div className="magazine-subtitle text-sm text-gray-400 mb-1">
                      {info.title}
                    </div>
                    <div className="text-white group-hover:text-purple-300 transition-colors">
                      {info.detail}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Admin Backend Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30"
            >
              <h4 className="magazine-title text-lg font-semibold text-white mb-3">
                Backend API Demo
              </h4>
              <p className="magazine-body text-gray-300 text-sm mb-4">
                Explore our admin backend system powering this portfolio.
              </p>
              <motion.a
                href={process.env.NODE_ENV === 'production' 
                  ? 'https://consltr.com/api/v1/docs' 
                  : 'http://localhost:3000/api/v1/docs'}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors magazine-subtitle text-sm"
              >
                <span>View API Docs</span>
                <Send size={16} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact