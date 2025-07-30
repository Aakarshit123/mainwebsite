import React from 'react';
import { motion } from 'framer-motion';
import { CloudArrowUpIcon, CpuChipIcon, DocumentTextIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: CloudArrowUpIcon,
      title: 'Upload Your Floor Plan',
      description: 'Simply drag and drop your 2D floor plan image. We support PNG, JPG, and other common formats.',
      details: [
        'Accepts hand-drawn sketches or CAD drawings',
        'Automatic image preprocessing and enhancement',
        'Secure upload with data encryption'
      ]
    },
    {
      icon: CpuChipIcon,
      title: 'AI Processing',
      description: 'Our advanced AI models analyze your floor plan using MiDaS depth estimation and specialized risk detection algorithms.',
      details: [
        'MiDaS neural network for 3D depth mapping',
        'OpenChat 3.5 for intelligent analysis',
        'DeepSeek-Coder for structural assessment'
      ]
    },
    {
      icon: DocumentTextIcon,
      title: 'Generate Report',
      description: 'Receive a comprehensive risk analysis report with actionable insights and recommendations.',
      details: [
        'Fire safety assessment with exit route analysis',
        'Structural integrity evaluation',
        'Earthquake resistance scoring',
        'Detailed improvement recommendations'
      ]
    },
    {
      icon: ShieldCheckIcon,
      title: 'Take Action',
      description: 'Use the insights to improve your home\'s safety and make informed decisions about modifications.',
      details: [
        'Prioritized action items',
        'Cost-benefit analysis for improvements',
        'Professional referrals when needed'
      ]
    }
  ];

  const technologies = [
    {
      name: 'MiDaS',
      description: 'Monocular depth estimation for accurate 3D reconstruction from 2D images',
      accuracy: '95%+'
    },
    {
      name: 'OpenChat 3.5',
      description: 'Advanced language model for intelligent risk analysis and report generation',
      accuracy: '98%+'
    },
    {
      name: 'DeepSeek-Coder',
      description: 'Specialized AI for structural code compliance and engineering analysis',
      accuracy: '94%+'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">It Works</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform transforms your floor plans into comprehensive safety analysis in just minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                        Step {index + 1}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600">{step.description}</p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex-1">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border">
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                      <step.icon className="h-16 w-16 text-gray-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powered by Advanced AI</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use state-of-the-art machine learning models to deliver accurate and reliable risk analysis.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tech.name}</h3>
                  <div className="inline-block bg-gradient-to-r from-emerald-400 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {tech.accuracy} Accuracy
                  </div>
                </div>
                <p className="text-gray-600 text-center">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Analysis Pipeline</h2>
            <p className="text-xl text-gray-600">See how your floor plan travels through our AI system</p>
          </motion.div>

          <div className="bg-white rounded-3xl shadow-xl p-8 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
              {[
                { label: 'Floor Plan Upload', color: 'from-blue-400 to-blue-600' },
                { label: 'Image Preprocessing', color: 'from-purple-400 to-purple-600' },
                { label: 'Depth Estimation', color: 'from-teal-400 to-teal-600' },
                { label: 'Risk Analysis', color: 'from-orange-400 to-orange-600' },
                { label: 'Report Generation', color: 'from-emerald-400 to-emerald-600' }
              ].map((stage, index) => (
                <div key={stage.label} className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${stage.color} flex items-center justify-center text-white font-bold text-lg mb-4`}
                  >
                    {index + 1}
                  </motion.div>
                  <p className="text-sm font-medium text-gray-900 text-center">{stage.label}</p>
                  {index < 4 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                      className="hidden lg:block w-12 h-0.5 bg-gray-300 mt-4 origin-left"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Analyze Your Home?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Experience the power of AI-driven home safety analysis in just a few clicks.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Try Free Analysis
              <CloudArrowUpIcon className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;