import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WelcomeScreen } from '../features/WelcomeScreen';
import { LoadingState } from '../features/LoadingState';
import { ScoreHeader } from '../features/ScoreHeader';
import { ExplanationGrid } from '../features/ExplanationGrid';
import { SignalBreakdown } from '../features/SignalBreakdown';
import { Card } from '../ui/Card';
import { AlertTriangle } from 'lucide-react';
import type { AnalysisState, PredictResponse, ExplainResponse } from '../../types/credit';

interface MainPanelProps {
  state: AnalysisState;
  customerName: string;
  prediction: PredictResponse | null;
  explanation: ExplainResponse | null;
  error: string | null;
}

export const MainPanel: React.FC<MainPanelProps> = ({
  state,
  customerName,
  prediction,
  explanation,
  error,
}) => {
  return (
    <main
      style={{
        flex: 1,
        height: '100vh',
        overflowY: 'auto',
        padding: '32px',
        background: 'var(--color-bg-primary)',
      }}
    >
      <AnimatePresence mode="wait">
        {/* Idle — Welcome */}
        {state === 'idle' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <WelcomeScreen />
          </motion.div>
        )}

        {/* Loading */}
        {(state === 'predicting' || state === 'explaining') && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <LoadingState state={state} />
          </motion.div>
        )}

        {/* Results */}
        {state === 'done' && prediction && explanation && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ maxWidth: '900px', margin: '0 auto' }}
          >
            <ScoreHeader customerName={customerName} prediction={prediction} />
            <ExplanationGrid explanation={explanation} />
            <SignalBreakdown profile={prediction.profile} />
          </motion.div>
        )}

        {/* Error */}
        {state === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
            }}
          >
            <Card
              variant="error"
              hoverable={false}
              style={{ maxWidth: '500px', textAlign: 'center' }}
            >
              <AlertTriangle
                size={40}
                style={{ color: 'var(--color-error)', marginBottom: '12px' }}
              />
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '18px',
                  color: 'var(--color-error)',
                  marginBottom: '8px',
                }}
              >
                Analysis Failed
              </h3>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '14px',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                }}
              >
                {error || 'An unexpected error occurred. Please try again.'}
              </p>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '13px',
                  color: 'var(--color-text-muted)',
                  marginTop: '12px',
                }}
              >
                Make sure the backend server is running on port 8000.
              </p>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
