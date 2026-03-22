from pydantic import BaseModel, Field
from typing import Optional


class CustomerProfile(BaseModel):
    monthly_inflow_avg: float = Field(..., description="Monthly UPI inflow in ₹")
    inflow_transaction_count: int = Field(..., ge=1, le=20)
    essential_spend_ratio: float = Field(..., ge=0.0, le=1.0)
    external_score_avg: float = Field(..., ge=0.0, le=1.0)
    p2p_vs_p2m_ratio: float = Field(..., ge=0.0, le=1.0)
    ecommerce_cod_ratio: float = Field(..., ge=0.0, le=1.0)
    recharge_gap_variance: float = Field(..., ge=0.0)
    ecommerce_return_rate: float = Field(..., ge=0.0, le=1.0)
    utility_avg_days_late: float = Field(..., ge=-10.0, le=30.0)
    utility_missed_count: int = Field(..., ge=0, le=10)


class PredictRequest(BaseModel):
    customer_name: str = Field(..., min_length=1)
    monthly_inflow_avg: float
    inflow_transaction_count: int
    essential_spend_ratio: float
    external_score_avg: float
    p2p_vs_p2m_ratio: float
    ecommerce_cod_ratio: float
    recharge_gap_variance: float
    ecommerce_return_rate: float
    utility_avg_days_late: float
    utility_missed_count: int


class PredictResponse(BaseModel):
    credit_score: int
    default_probability: float
    risk_category: str
    risk_color: str
    profile: dict


class ExplainRequest(BaseModel):
    customer_name: str
    prediction_result: PredictResponse


class ExplainResponse(BaseModel):
    score_reason: str
    loan_recommendations: str
    improvement_tips: str
    bias_check: str
    full_response: Optional[str] = None
