import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  icon,
  disabled,
  ...props
}) => {
  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--color-accent)',
      color: 'var(--color-white)',
      border: '2px solid var(--color-accent)',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--color-accent-dark)',
      border: '2px solid var(--color-border)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-muted)',
      border: '2px solid transparent',
    },
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      style={{
        ...styles[variant],
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        fontSize: '15px',
        padding: '12px 24px',
        borderRadius: 'var(--radius-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        width: fullWidth ? '100%' : 'auto',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        opacity: disabled ? 0.6 : 1,
        transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        if (!disabled && variant === 'primary') {
          (e.currentTarget as HTMLElement).style.background = 'var(--color-accent-dark)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && variant === 'primary') {
          (e.currentTarget as HTMLElement).style.background = 'var(--color-accent)';
        }
      }}
      disabled={disabled}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </motion.button>
  );
};
