import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AnalysisState } from '../../types/credit';

interface LoadingStateProps {
  state: AnalysisState;
}

const messages: Record<string, { text: string; icon: string }> = {
  predicting: { text: 'Analyzing behavioral signals...', icon: '🤖' },
  explaining: { text: 'Generating AI explanation...', icon: '✨' },
};

export const LoadingState: React.FC<LoadingStateProps> = ({ state }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const msg = messages[state];
  if (!msg) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        gap: '24px',
      }}
    >
      {/* Shimmer blocks */}
      <div style={{ width: '100%', maxWidth: '600px' }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="shimmer"
            style={{
              height: i === 1 ? '80px' : '60px',
              borderRadius: 'var(--radius-card)',
              marginBottom: '16px',
              opacity: 1 - i * 0.15,
            }}
          />
        ))}
      </div>

      {/* Message */}
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ fontSize: '32px' }}
          >
            {msg.icon}
          </motion.span>
          <span
            className="pulse-green"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: '18px',
              color: 'var(--color-accent-dark)',
            }}
          >
            {msg.text}{dots}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
