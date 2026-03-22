import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'tinted';
  hoverable?: boolean;
  className?: string;
}

const borderColorMap = {
  default: 'var(--color-border)',
  success: 'var(--color-success)',
  warning: 'var(--color-accent-alt)',
  error: 'var(--color-error)',
  tinted: 'var(--color-accent-dark)',
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverable = true,
  className = '',
  style,
  ...motionProps
}) => {
  const bg = variant === 'tinted' ? 'var(--color-bg-tertiary)' : 'var(--color-white)';

  return (
    <motion.div
      className={className}
      style={{
        background: bg,
        border: `2px solid ${borderColorMap[variant]}`,
        borderRadius: 'var(--radius-card)',
        padding: '24px',
        boxShadow: '0 4px 16px rgba(91, 179, 71, 0.12)',
        transition: 'border-color 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: hoverable ? 'default' : undefined,
        ...style,
      }}
      whileHover={
        hoverable
          ? {
              borderColor: 'var(--color-accent-dark)',
              boxShadow: '0 8px 24px rgba(91, 179, 71, 0.2)',
            }
          : undefined
      }
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};
