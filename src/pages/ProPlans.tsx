import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ProPlans: React.FC = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$9.99',
      period: 'month',
      description: 'Perfect for individual property owners',
      features: [
        'Up to 5 analyses per month',
        'AI-powered image analysis',
        'Basic risk assessment',
        'Safety recommendations',
        'PDF reports',
        'Email support'
      ],
      limitations: [
        'No advanced risk scoring',
        'No detailed recommendations',
        'No priority support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$24.99',
      period: 'month',
      description: 'Ideal for property managers and inspectors',
      features: [
        'Unlimited analyses',
        'Advanced AI analysis',
        'Complete risk assessment',
        'Detailed safety scoring',
        'Comprehensive recommendations',
        'Custom branding on reports',
        'Priority support',
        'API access'
      ],
      limitations: [],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99.99',
      period: 'month',
      description: 'For construction companies and large organizations',
      features: [
        'Everything in Professional',
        'White-label solution',
        'Custom AI model training',
        'Dedicated account manager',
        'SLA guarantees',
        'Custom integrations',
        'Training sessions',
        'Multi-user accounts'
      ],
      limitations: [],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="flex justify-center mb-8 pt-8">
        <img src="/assets/images/logo.jpeg" alt="Plan2Protect Logo" className="h-20 w-auto object-contain" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Pro Plan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock advanced AI capabilities and detailed risk analysis with our professional plans
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 ml-1">/{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations.length > 0 && (
                  <>
                    <h4 className="font-semibold text-gray-900 mb-3 mt-6">Limitations:</h4>
                    {plan.limitations.map((limitation, limitationIndex) => (
                      <div key={limitationIndex} className="flex items-center">
                        <XMarkIcon className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-500">{limitation}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200">
                Choose {plan.name}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Basic</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Professional</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['AI image analysis', '✓', '✓', '✓'],
                  ['Risk assessment scoring', '✓', '✓', '✓'],
                  ['Safety recommendations', '✓', '✓', '✓'],
                  ['Property detail analysis', '✓', '✓', '✓'],
                  ['PDF report download', '✓', '✓', '✓'],
                  ['Advanced risk scoring', '✗', '✓', '✓'],
                  ['Detailed recommendations', '✗', '✓', '✓'],
                  ['API access', '✗', '✓', '✓'],
                  ['Custom AI training', '✗', '✗', '✓'],
                  ['White-label solution', '✗', '✗', '✓']
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-700">{row[0]}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={row[1] === '✓' ? 'text-green-500' : 'text-red-500'}>{row[1]}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={row[2] === '✓' ? 'text-green-500' : 'text-red-500'}>{row[2]}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={row[3] === '✓' ? 'text-green-500' : 'text-red-500'}>{row[3]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How accurate is the AI analysis?",
                answer: "Our AI models achieve 95%+ accuracy in risk detection. However, professional inspection is always recommended for critical decisions."
              },
              {
                question: "Can I customize the analysis for my specific needs?",
                answer: "Yes, our Enterprise plan includes custom AI model training and integrations tailored to your specific needs."
              },
              {
                question: "What types of images can I analyze?",
                answer: "We support all common image formats (PNG, JPG, JPEG) and can analyze floor plans, property photos, and structural images."
              },
              {
                question: "Is my data secure?",
                answer: "Yes, we use enterprise-grade encryption and never share your data with third parties. All analyses are confidential."
              }
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProPlans;