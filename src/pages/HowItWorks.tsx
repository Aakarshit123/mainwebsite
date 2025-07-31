import React from 'react';
import { motion } from 'framer-motion';
import { CloudArrowUpIcon, CpuChipIcon, DocumentTextIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: CloudArrowUpIcon,
      title: 'Upload Your Property Image',
      description: 'Simply drag and drop your property image. We support PNG, JPG, and other common formats.',
      details: [
        'Accepts floor plans, property photos, or structural images',
        'Automatic image preprocessing and enhancement',
        'Secure upload with data encryption'
      ]
    },
    {
      icon: CpuChipIcon,
      title: 'AI Analysis',
      description: 'Our advanced AI models analyze your image using computer vision and specialized risk detection algorithms.',
      details: [
        'Computer vision for image analysis',
        'Machine learning for risk assessment',
        'AI-powered safety evaluation'
      ]
    },
    {
      icon: DocumentTextIcon,
      title: 'Generate Report',
      description: 'Receive a comprehensive risk analysis report with actionable insights and recommendations.',
      details: [
        'Risk assessment scoring',
        'Safety recommendations',
        'Property detail analysis',
        'Detailed improvement recommendations'
      ]
    },
    {
      icon: ShieldCheckIcon,
      title: 'Take Action',
      description: 'Use the insights to improve your property\'s safety and make informed decisions about modifications.',
      details: [
        'Prioritized action items',
        'Cost-benefit analysis for improvements',
        'Professional referrals when needed'
      ]
    }
  ];

  const technologies = [
    {
      name: 'Computer Vision',
      description: 'Advanced image analysis for property assessment and risk detection',
      accuracy: '95%+'
    },
    {
      name: 'Machine Learning',
      description: 'AI-powered risk assessment and safety recommendation generation',
      accuracy: '98%+'
    },
    {
      name: 'Safety Analysis',
      description: 'Specialized algorithms for structural and safety compliance analysis',
      accuracy: '94%+'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex justify-center mb-8 pt-8">
        <img src="/assets/images/logo.jpeg" alt="Plan2Protect Logo" className="h-20 w-auto object-contain" />
      </div>
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
              How <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">It Works</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform analyzes your property images and provides comprehensive safety assessment in just minutes.
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
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mr-4">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      <step.icon className="h-16 w-16 text-blue-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced AI Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use state-of-the-art machine learning models to deliver accurate and reliable risk analysis.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-8 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CpuChipIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{tech.name}</h3>
                <p className="text-gray-600 mb-4">{tech.description}</p>
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  {tech.accuracy} Accuracy
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our AI Analysis?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get professional-grade safety assessment with the convenience of AI technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Fast Analysis',
                description: 'Get comprehensive results in minutes, not days'
              },
              {
                title: 'Accurate Results',
                description: '95%+ accuracy in risk detection and assessment'
              },
              {
                title: 'Cost Effective',
                description: 'Save thousands on professional inspection fees'
              },
              {
                title: 'Always Available',
                description: '24/7 access to AI analysis whenever you need it'
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of property owners who trust our AI analysis for their safety assessments.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Start Free Analysis
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;