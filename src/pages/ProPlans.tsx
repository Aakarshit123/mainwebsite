import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ProPlans: React.FC = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$9.99',
      period: 'month',
      description: 'Perfect for individual homeowners',
      features: [
        'Up to 5 analyses per month',
        'Basic 2D to 3D conversion',
        'Fire safety assessment',
        'Structural analysis',
        'PDF reports',
        'Email support'
      ],
      limitations: [
        'No earthquake analysis',
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
        'Advanced 3D modeling',
        'Complete risk assessment',
        'Earthquake resistance analysis',
        'Detailed recommendations',
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Pro Plan</span>
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
                  <span className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation, limitationIndex) => (
                  <li key={limitationIndex} className="flex items-start">
                    <XMarkIcon className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">{limitation}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Feature Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Free</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Basic</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Professional</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Analyses per month', '1', '5', 'Unlimited', 'Unlimited'],
                  ['2D to 3D conversion', '✓', '✓', '✓', '✓'],
                  ['Fire safety analysis', '✓', '✓', '✓', '✓'],
                  ['Structural analysis', 'Basic', '✓', '✓', '✓'],
                  ['Earthquake analysis', '✗', '✗', '✓', '✓'],
                  ['Custom branding', '✗', '✗', '✓', '✓'],
                  ['API access', '✗', '✗', '✓', '✓'],
                  ['Priority support', '✗', '✗', '✓', '✓'],
                  ['White-label solution', '✗', '✗', '✗', '✓'],
                ].map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">{row[0]}</td>
                    <td className="py-4 px-6 text-center text-gray-600">{row[1]}</td>
                    <td className="py-4 px-6 text-center text-gray-600">{row[2]}</td>
                    <td className="py-4 px-6 text-center text-gray-600">{row[3]}</td>
                    <td className="py-4 px-6 text-center text-gray-600">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {[
              {
                question: "Can I upgrade or downgrade my plan anytime?",
                answer: "Yes, you can change your plan at any time. Changes take effect immediately for upgrades and at the next billing cycle for downgrades."
              },
              {
                question: "Is there a money-back guarantee?",
                answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact us for a full refund."
              },
              {
                question: "How accurate is the AI analysis?",
                answer: "Our AI models achieve 95%+ accuracy in risk detection. However, professional inspection is always recommended for critical decisions."
              },
              {
                question: "Do you offer custom solutions?",
                answer: "Yes, our Enterprise plan includes custom AI model training and integrations tailored to your specific needs."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
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