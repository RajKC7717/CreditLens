import pickle
import numpy as np
import pandas as pd

# Load model and scaler once when file is imported
with open('models/risk_model.pkl', 'rb') as f:
    model = pickle.load(f)
with open('models/scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

FEATURE_COLS = [
    'monthly_inflow_avg', 'inflow_transaction_count',
    'essential_spend_ratio', 'external_score_avg',
    'p2p_vs_p2m_ratio', 'ecommerce_cod_ratio',
    'recharge_gap_variance', 'ecommerce_return_rate',
    'utility_avg_days_late', 'utility_missed_count'
]

def predict_score(profile: dict) -> dict:
    # Convert profile dict to dataframe row
    df = pd.DataFrame([profile], columns=FEATURE_COLS)
    
    # Scale using the same scaler from training
    df_scaled = scaler.transform(df)
    
    # Get default probability (0 to 1)
    default_prob = model.predict_proba(df_scaled)[0][1]
    
    # Convert to credit score (higher prob of default = lower score)
    credit_score = round((1 - default_prob) * 100)
    
    # Risk category
    if credit_score >= 70:
        risk = "Low Risk"
        risk_color = "green"
    elif credit_score >= 45:
        risk = "Medium Risk"
        risk_color = "orange"
    else:
        risk = "High Risk"
        risk_color = "red"
    
    return {
        "credit_score": credit_score,
        "default_probability": round(default_prob * 100, 2),
        "risk_category": risk,
        "risk_color": risk_color,
        "profile": profile
    }


# Test it
if __name__ == "__main__":
    # A sample "good" customer profile
    good_customer = {
        'monthly_inflow_avg': 45000,
        'inflow_transaction_count': 4,
        'essential_spend_ratio': 0.6,
        'external_score_avg': 0.7,
        'p2p_vs_p2m_ratio': 0.3,
        'ecommerce_cod_ratio': 0.1,
        'recharge_gap_variance': 2.0,
        'ecommerce_return_rate': 0.05,
        'utility_avg_days_late': -2.0,
        'utility_missed_count': 0
    }

    # A sample "risky" customer profile
    risky_customer = {
        'monthly_inflow_avg': 8000,
        'inflow_transaction_count': 1,
        'essential_spend_ratio': 0.2,
        'external_score_avg': 0.2,
        'p2p_vs_p2m_ratio': 0.8,
        'ecommerce_cod_ratio': 0.6,
        'recharge_gap_variance': 12.0,
        'ecommerce_return_rate': 0.35,
        'utility_avg_days_late': 15.0,
        'utility_missed_count': 4
    }

    print("👤 GOOD CUSTOMER:")
    result = predict_score(good_customer)
    print(f"   Credit Score : {result['credit_score']} / 100")
    print(f"   Risk         : {result['risk_category']}")
    print(f"   Default Prob : {result['default_probability']}%")

    print("\n👤 RISKY CUSTOMER:")
    result = predict_score(risky_customer)
    print(f"   Credit Score : {result['credit_score']} / 100")
    print(f"   Risk         : {result['risk_category']}")
    print(f"   Default Prob : {result['default_probability']}%")
    