import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo: React.FC = () => {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Background building */}
      <motion.svg
        width="256"
        height="256"
        viewBox="0 0 256 256"
        className="absolute inset-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
      >
        {/* Building base */}
        <motion.rect
          x="80"
          y="120"
          width="96"
          height="120"
          fill="url(#buildingGradient)"
          rx="4"
          initial={{ y: 256 }}
          animate={{ y: 120 }}
          transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 100 }}
        />
        
        {/* Building floors */}
        {[140, 160, 180, 200].map((y, index) => (
          <motion.line
            key={index}
            x1="85"
            y1={y}
            x2="171"
            y2={y}
            stroke="#1e40af"
            strokeWidth="1"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
          />
        ))}
        
        {/* Windows */}
        {[0, 1, 2, 3].map((floor) => (
          [0, 1, 2].map((window) => (
            <motion.rect
              key={`${floor}-${window}`}
              x={95 + window * 22}
              y={130 + floor * 20}
              width="12"
              height="12"
              fill="#3b82f6"
              rx="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + floor * 0.1 + window * 0.05, duration: 0.2 }}
            />
          ))
        ))}
        
        {/* Rooftop */}
        <motion.polygon
          points="75,120 128,80 181,120"
          fill="url(#roofGradient)"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
        />
        
        <defs>
          <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          <linearGradient id="roofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
        </defs>
      </motion.svg>
      
      {/* Floating shield icon */}
      <motion.div
        className="absolute top-8 right-8 w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
      >
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </motion.div>
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedLogo;