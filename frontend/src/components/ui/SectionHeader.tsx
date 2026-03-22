import React from 'react';

interface SectionHeaderProps {
  title: string;
  icon?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'var(--color-white)',
        border: '2px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        padding: '8px 20px',
        marginBottom: '16px',
      }}
    >
      {icon && <span style={{ fontSize: '16px' }}>{icon}</span>}
      <span
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: '14px',
          color: 'var(--color-accent-dark)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {title}
      </span>
    </div>
  );
};
