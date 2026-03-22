import React from 'react';
import { motion } from 'framer-motion';

interface ScoreBarProps {
  score: number;
  color: 'green' | 'orange' | 'red';
}

const colorMap = {
  green: 'var(--color-success)',
  orange: 'var(--color-warning)',
  red: 'var(--color-error)',
};

export const ScoreBar: React.FC<ScoreBarProps> = ({ score, color }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '36px',
        background: 'var(--color-bg-tertiary)',
        borderRadius: '18px',
        border: '2px solid var(--color-border)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: '100%',
          background: colorMap[color],
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: '12px',
          minWidth: score > 5 ? '50px' : '0',
        }}
      >
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: '14px',
            color: 'var(--color-white)',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }}
        >
          {score}/100
        </span>
      </motion.div>
    </div>
  );
};
