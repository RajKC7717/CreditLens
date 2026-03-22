import { useState, useCallback } from 'react';
import { predictScore, generateExplanation } from '../services/api';
import type { CustomerProfile, PredictResponse, ExplainResponse, AnalysisState } from '../types/credit';

interface UseCreditAnalysisReturn {
  state: AnalysisState;
  prediction: PredictResponse | null;
  explanation: ExplainResponse | null;
  error: string | null;
  analyze: (customerName: string, profile: CustomerProfile) => Promise<void>;
  reset: () => void;
}

export function useCreditAnalysis(): UseCreditAnalysisReturn {
  const [state, setState] = useState<AnalysisState>('idle');
  const [prediction, setPrediction] = useState<PredictResponse | null>(null);
  const [explanation, setExplanation] = useState<ExplainResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (customerName: string, profile: CustomerProfile) => {
    setError(null);
    setPrediction(null);
    setExplanation(null);

    try {
      // Step 1: Predict
      setState('predicting');
      const predResult = await predictScore({
        customer_name: customerName,
        ...profile,
      });
      setPrediction(predResult);

      // Step 2: Explain
      setState('explaining');
      const explainResult = await generateExplanation({
        customer_name: customerName,
        prediction_result: predResult,
      });
      setExplanation(explainResult);

      setState('done');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      setState('error');
    }
  }, []);

  const reset = useCallback(() => {
    setState('idle');
    setPrediction(null);
    setExplanation(null);
    setError(null);
  }, []);

  return { state, prediction, explanation, error, analyze, reset };
}
