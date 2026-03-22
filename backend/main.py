import sys
import os

# Add project root to path so engine imports work
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables from project root .env
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

from backend.schemas import PredictRequest, PredictResponse, ExplainRequest, ExplainResponse
from engine.predict import predict_score
from engine.genai_explain import generate_explanation

app = FastAPI(
    title="CreditLens AI",
    description="Alternative Credit Scoring API for Credit-Invisible Indians",
    version="1.0.0",
)

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:8501"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health_check():
    return {"status": "ok", "model": "loaded"}


@app.post("/api/predict", response_model=PredictResponse)
async def predict(request: PredictRequest):
    try:
        profile = {
            "monthly_inflow_avg": request.monthly_inflow_avg,
            "inflow_transaction_count": request.inflow_transaction_count,
            "essential_spend_ratio": request.essential_spend_ratio,
            "external_score_avg": request.external_score_avg,
            "p2p_vs_p2m_ratio": request.p2p_vs_p2m_ratio,
            "ecommerce_cod_ratio": request.ecommerce_cod_ratio,
            "recharge_gap_variance": request.recharge_gap_variance,
            "ecommerce_return_rate": request.ecommerce_return_rate,
            "utility_avg_days_late": request.utility_avg_days_late,
            "utility_missed_count": request.utility_missed_count,
        }
        result = predict_score(profile)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={"error": "Prediction failed", "detail": str(e)},
        )


@app.post("/api/explain", response_model=ExplainResponse)
async def explain(request: ExplainRequest):
    try:
        prediction_result = request.prediction_result.model_dump()
        explanation = generate_explanation(
            prediction_result, customer_name=request.customer_name
        )
        return explanation
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={"error": "Explanation generation failed", "detail": str(e)},
        )
