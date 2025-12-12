import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Users, Target, Award } from 'lucide-react'

const About = () => {
  const services = [
    {
      icon: <Zap size={32} />,
      title: "SaaS Development",
      description: "Full-stack development of scalable SaaS platforms with modern architecture and cloud-native deployment."
    },
    {
      icon: <Users size={32} />,
      title: "Digital Experiences",
      description: "Immersive digital experiences that bridge technology and artistry, creating memorable user interactions."
    },
    {
      icon: <Target size={32} />,
      title: "Strategic Consulting",
      description: "Technology strategy and digital transformation guidance for businesses ready to scale."
    },
    {
      icon: <Award size={32} />,
      title: "Innovation Labs",
      description: "Experimental projects pushing the boundaries of what's possible with emerging technologies."
    }
  ]

  const technologies = [
    "React & Next.js", "Node.js & TypeScript", "PostgreSQL & Redis", 
    "AWS & Docker", "AI & Machine Learning", "WebGL & Three.js",
    "Blockchain & Web3", "IoT & Real-time Systems"
  ]

  return (
    <section id="about" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        {/* Main About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="magazine-title text-5xl md:text-6xl mb-6">
              Crafting Digital
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Excellence
              </span>
            </h2>
            <p className="magazine-body text-xl text-gray-300 mb-8 leading-relaxed">
              We are a boutique digital studio specializing in high-impact technology solutions. 
              From revolutionary SaaS platforms to immersive artistic installations, we transform 
              ambitious visions into reality.
            </p>
            <p className="magazine-body text-lg text-gray-400 mb-8 leading-relaxed">
              Our approach combines cutting-edge technology with thoughtful design, ensuring 
              every project not only meets technical requirements but creates meaningful 
              experiences for users.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <a 
                href="#contact"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all magazine-subtitle text-sm"
              >
                Start a Project
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl"></div>
              <div className="relative">
                <h3 className="magazine-title text-2xl font-bold text-white mb-6">Our Impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: "2M+", label: "Users Reached" },
                    { number: "$10M+", label: "Revenue Generated" },
                    { number: "99.9%", label: "Uptime Achieved" },
                    { number: "24/7", label: "Support Provided" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="magazine-title text-2xl md:text-3xl text-purple-400 mb-2">
                        {stat.number}
                      </div>
                      <div className="magazine-subtitle text-xs text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="magazine-title text-4xl text-center text-white mb-12">
            What We Do
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group p-6 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="text-purple-400 mb-4 group-hover:text-purple-300 transition-colors">
                  {service.icon}
                </div>
                <h4 className="magazine-title text-xl font-semibold text-white mb-3">
                  {service.title}
                </h4>
                <p className="magazine-body text-gray-300 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="magazine-title text-4xl text-white mb-8">
            Technologies We Master
          </h3>
          <p className="magazine-body text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            We stay at the forefront of technology, constantly learning and adapting 
            to deliver cutting-edge solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-gray-800/50 border border-gray-700/50 rounded-full magazine-subtitle text-sm text-gray-300 hover:text-white hover:border-purple-500/50 transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About