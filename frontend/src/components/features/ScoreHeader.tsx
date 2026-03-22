import React from 'react';
import { motion } from 'framer-motion';
import { MetricCard } from '../ui/MetricCard';
import { ScoreBar } from '../ui/ScoreBar';
import { Target, ShieldAlert, TrendingDown } from 'lucide-react';
import type { PredictResponse } from '../../types/credit';

interface ScoreHeaderProps {
  customerName: string;
  prediction: PredictResponse;
}

const riskColorMap: Record<string, string> = {
  green: 'var(--color-success)',
  orange: 'var(--color-warning)',
  red: 'var(--color-error)',
};

export const ScoreHeader: React.FC<ScoreHeaderProps> = ({ customerName, prediction }) => {
  const { credit_score, risk_category, risk_color, default_probability } = prediction;
  const color = riskColorMap[risk_color] || 'var(--color-accent)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: '28px',
          color: 'var(--color-text-primary)',
          marginBottom: '20px',
        }}
      >
        Analysis for <span style={{ color: 'var(--color-accent-dark)' }}>{customerName}</span>
      </h2>

      {/* 3 metric cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <MetricCard
          label="Alternative Credit Score"
          value={`${credit_score}/100`}
          icon={<Target size={24} />}
          color={color}
          delay={0}
        />
        <MetricCard
          label="Risk Category"
          value={risk_category}
          icon={<ShieldAlert size={24} />}
          color={color}
          delay={0.1}
        />
        <MetricCard
          label="Default Probability"
          value={`${default_probability}%`}
          icon={<TrendingDown size={24} />}
          color={color}
          delay={0.2}
        />
      </div>

      {/* Score bar */}
      <ScoreBar score={credit_score} color={risk_color} />
    </motion.div>
  );
};
