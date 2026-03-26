import axios from 'axios';
import type { PredictRequest, PredictResponse, ExplainRequest, ExplainResponse } from '../types/credit';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

export async function predictScore(request: PredictRequest): Promise<PredictResponse> {
  const { data } = await api.post<PredictResponse>('/api/predict', request);
  return data;
}

export async function generateExplanation(request: ExplainRequest): Promise<ExplainResponse> {
  const { data } = await api.post<ExplainResponse>('/api/explain', request);
  return data;
}

export async function healthCheck(): Promise<{ status: string; model: string }> {
  const { data } = await api.get('/api/health');
  return data;
}
