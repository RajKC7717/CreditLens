import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Brain, TrendingUp, Banknote, Shield } from 'lucide-react';
import type { ExplainResponse } from '../../types/credit';

interface ExplanationGridProps {
  explanation: ExplainResponse;
}

function parseLoanRecommendations(text: string) {
  const lines = text.split('\n').filter((l) => l.trim().length > 0);
  return lines.map((line) => {
    const isSafe = line.toUpperCase().includes('[SAFE]');
    const isRisky = line.toUpperCase().includes('[RISKY]');
    const cleaned = line
      .replace(/^-\s*/, '')
      .replace(/\[SAFE\]/gi, '')
      .replace(/\[RISKY\]/gi, '')
      .trim();
    return {
      text: cleaned,
      type: isSafe ? 'safe' : isRisky ? 'risky' : 'safe',
    };
  });
}

function parseImprovementTips(text: string) {
  return text
    .split('\n')
    .filter((l) => l.trim().length > 0)
    .map((l) => l.replace(/^-\s*/, '').trim());
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export const ExplanationGrid: React.FC<ExplanationGridProps> = ({ explanation }) => {
  const loans = parseLoanRecommendations(explanation.loan_recommendations);
  const tips = parseImprovementTips(explanation.improvement_tips);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        marginTop: '24px',
      }}
    >
      {/* Score Reason */}
      <motion.div variants={item}>
        <Card style={{ height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Brain size={20} style={{ color: 'var(--color-accent)' }} />
            <h3
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '16px',
                color: 'var(--color-text-primary)',
              }}
            >
              📋 Why This Score?
            </h3>
          </div>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              color: 'var(--color-text-primary)',
              lineHeight: 1.7,
            }}
          >
            {explanation.score_reason}
          </p>
        </Card>
      </motion.div>

      {/* Improvement Tips */}
      <motion.div variants={item}>
        <Card variant="success" style={{ height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <TrendingUp size={20} style={{ color: 'var(--color-success)' }} />
            <h3
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '16px',
                color: 'var(--color-text-primary)',
              }}
            >
              📈 How to Improve
            </h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {tips.map((tip, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '14px',
                  color: 'var(--color-text-primary)',
                  padding: '6px 0',
                  display: 'flex',
                  gap: '8px',
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: 'var(--color-success)', flexShrink: 0 }}>✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>

      {/* Loan Recommendations */}
      <motion.div variants={item}>
        <Card variant="warning" style={{ height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Banknote size={20} style={{ color: 'var(--color-accent-alt)' }} />
            <h3
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '16px',
                color: 'var(--color-text-primary)',
              }}
            >
              💰 Loan Recommendations
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {loans.map((loan, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                }}
              >
                <Badge type={loan.type as 'safe' | 'risky'}>{loan.type.toUpperCase()}</Badge>
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '13px',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.5,
                  }}
                >
                  {loan.text}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Bias Check */}
      <motion.div variants={item}>
        <Card variant="tinted" style={{ height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Shield size={20} style={{ color: 'var(--color-accent-dark)' }} />
            <h3
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '16px',
                color: 'var(--color-text-primary)',
              }}
            >
              ⚖️ Bias & Fairness Check
            </h3>
          </div>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              color: 'var(--color-text-primary)',
              lineHeight: 1.7,
            }}
          >
            {explanation.bias_check}
          </p>
        </Card>
      </motion.div>
    </motion.div>
  );
};
