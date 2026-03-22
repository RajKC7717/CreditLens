import React from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
  delay?: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon,
  color = 'var(--color-accent)',
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--color-white)',
        border: '2px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 16px rgba(91, 179, 71, 0.12)',
      }}
    >
      {icon && (
        <div style={{ marginBottom: '8px', color, fontSize: '24px' }}>{icon}</div>
      )}
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 800,
          fontSize: '32px',
          color,
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 500,
          fontSize: '13px',
          color: 'var(--color-text-muted)',
          marginTop: '4px',
        }}
      >
        {label}
      </div>
    </motion.div>
  );
};
