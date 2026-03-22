import React from 'react';
import { motion } from 'framer-motion';
import type { CustomerProfile } from '../../types/credit';

interface SignalBreakdownProps {
  profile: CustomerProfile;
}

function formatIndianCurrency(n: number): string {
  const str = Math.round(n).toString();
  if (str.length <= 3) return '₹' + str;
  const lastThree = str.slice(-3);
  const rest = str.slice(0, -3);
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return '₹' + formatted + ',' + lastThree;
}

export const SignalBreakdown: React.FC<SignalBreakdownProps> = ({ profile }) => {
  const signals = [
    {
      label: 'Monthly Inflow',
      value: formatIndianCurrency(profile.monthly_inflow_avg),
    },
    {
      label: 'Bill Punctuality',
      value: `${profile.utility_avg_days_late > 0 ? '+' : ''}${profile.utility_avg_days_late.toFixed(1)} days`,
    },
    {
      label: 'Essential Spend',
      value: `${Math.round(profile.essential_spend_ratio * 100)}%`,
    },
    {
      label: 'COD Usage',
      value: `${Math.round(profile.ecommerce_cod_ratio * 100)}%`,
    },
    {
      label: 'Bills Missed',
      value: profile.utility_missed_count.toString(),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginTop: '24px' }}
    >
      <h3
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: '16px',
          color: 'var(--color-text-primary)',
          marginBottom: '12px',
        }}
      >
        📊 Behavioral Signal Breakdown
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '12px',
        }}
      >
        {signals.map((signal, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
            style={{
              background: 'var(--color-white)',
              border: '2px solid var(--color-border)',
              borderRadius: 'var(--radius-card)',
              padding: '14px 10px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(91, 179, 71, 0.08)',
            }}
          >
            <div
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '18px',
                color: 'var(--color-accent-dark)',
                marginBottom: '4px',
              }}
            >
              {signal.value}
            </div>
            <div
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: '11px',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
              }}
            >
              {signal.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
