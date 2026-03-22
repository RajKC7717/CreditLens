export interface CustomerProfile {
  monthly_inflow_avg: number;
  inflow_transaction_count: number;
  essential_spend_ratio: number;
  external_score_avg: number;
  p2p_vs_p2m_ratio: number;
  ecommerce_cod_ratio: number;
  recharge_gap_variance: number;
  ecommerce_return_rate: number;
  utility_avg_days_late: number;
  utility_missed_count: number;
}

export interface PredictRequest extends CustomerProfile {
  customer_name: string;
}

export interface PredictResponse {
  credit_score: number;
  default_probability: number;
  risk_category: 'Low Risk' | 'Medium Risk' | 'High Risk';
  risk_color: 'green' | 'orange' | 'red';
  profile: CustomerProfile;
}

export interface ExplainRequest {
  customer_name: string;
  prediction_result: PredictResponse;
}

export interface ExplainResponse {
  score_reason: string;
  loan_recommendations: string;
  improvement_tips: string;
  bias_check: string;
  full_response?: string;
}

export interface SampleProfile {
  label: string;
  name: string;
  profile: CustomerProfile;
}

export type AnalysisState = 'idle' | 'predicting' | 'explaining' | 'done' | 'error';
