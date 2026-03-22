import React from 'react';

interface BadgeProps {
  type: 'safe' | 'risky' | 'low' | 'medium' | 'high';
  children: React.ReactNode;
}

const badgeStyles: Record<string, React.CSSProperties> = {
  safe: {
    background: 'var(--color-success)',
    color: 'var(--color-white)',
  },
  risky: {
    background: 'var(--color-error)',
    color: 'var(--color-white)',
  },
  low: {
    background: 'var(--color-success)',
    color: 'var(--color-white)',
  },
  medium: {
    background: 'var(--color-warning)',
    color: 'var(--color-white)',
  },
  high: {
    background: 'var(--color-error)',
    color: 'var(--color-white)',
  },
};

export const Badge: React.FC<BadgeProps> = ({ type, children }) => {
  return (
    <span
      style={{
        ...badgeStyles[type],
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        fontSize: '11px',
        padding: '3px 10px',
        borderRadius: '9999px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        display: 'inline-block',
        lineHeight: 1.4,
      }}
    >
      {children}
    </span>
  );
};
