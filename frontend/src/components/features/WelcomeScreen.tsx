import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Users, Activity, Brain } from 'lucide-react';

const features = [
  {
    icon: <Users size={28} />,
    title: '650M Credit-Invisible Indians',
    desc: 'No CIBIL score, no access to formal loans. We bridge this gap with behavioral analytics.',
    color: 'var(--color-error)',
  },
  {
    icon: <Activity size={28} />,
    title: '10 Behavioral Signals',
    desc: 'UPI transactions, bill payments, e-commerce patterns, mobile recharge — all analyzed.',
    color: 'var(--color-accent)',
  },
  {
    icon: <Brain size={28} />,
    title: 'AI-Powered Explainability',
    desc: 'LLM-generated explanations for every score — transparent, fair, and human-readable.',
    color: 'var(--color-accent-alt)',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export const WelcomeScreen: React.FC = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      style={{ maxWidth: '800px', margin: '0 auto' }}
    >
      {/* Hero */}
      <motion.div variants={item}>
        <Card
          hoverable={false}
          style={{
            textAlign: 'center',
            marginBottom: '24px',
            padding: '40px 32px',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              marginBottom: '12px',
            }}
          >
            🔍
          </div>
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: '32px',
              color: 'var(--color-accent-dark)',
              marginBottom: '8px',
            }}
          >
            Welcome to CreditLens AI
          </h1>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              color: 'var(--color-text-muted)',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Alternative credit scoring for India's credit-invisible population.
            Powered by XGBoost ML + LLM explainability.
          </p>
        </Card>
      </motion.div>

      {/* Feature Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {features.map((f, i) => (
          <motion.div key={i} variants={item}>
            <Card style={{ textAlign: 'center', height: '100%' }}>
              <div style={{ color: f.color, marginBottom: '12px' }}>{f.icon}</div>
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '15px',
                  color: 'var(--color-text-primary)',
                  marginBottom: '8px',
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '13px',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.5,
                }}
              >
                {f.desc}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Instructions */}
      <motion.div variants={item}>
        <Card
          hoverable={false}
          variant="tinted"
          style={{ padding: '20px 24px' }}
        >
          <h3
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: '15px',
              color: 'var(--color-accent-dark)',
              marginBottom: '8px',
            }}
          >
            📖 How to Use
          </h3>
          <ol
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              color: 'var(--color-text-primary)',
              paddingLeft: '20px',
              lineHeight: 1.8,
            }}
          >
            <li>Select a sample profile or enter customer details in the sidebar</li>
            <li>Adjust the 10 behavioral signal sliders to match the customer</li>
            <li>
              Click <strong>"Analyze Customer"</strong> to generate the AI credit score
            </li>
            <li>Review the explainable score breakdown and loan recommendations</li>
          </ol>
        </Card>
      </motion.div>
    </motion.div>
  );
};
