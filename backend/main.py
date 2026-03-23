from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from engine.predict import predict_score
from engine.genai_explain import generate_explanation

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictRequest(BaseModel):
    customer_name: str
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

class ExplainRequest(BaseModel):
    customer_name: str
    prediction_result: dict

@app.post("/predict")
def predict(req: PredictRequest):
    profile = req.dict()
    profile.pop("customer_name")
    result = predict_score(profile)
    return result

@app.post("/explain")
def explain(req: ExplainRequest):
    explanation = generate_explanation(
        req.prediction_result,
        customer_name=req.customer_name
    )
    return explanation

@app.get("/health")
def health():
    return {"status": "ok"}

