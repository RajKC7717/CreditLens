import pandas as pd
import numpy as np
import pickle
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from engine.preprocess import load_and_preprocess

def train_and_save(filepath, model_output_path, scaler_output_path):
    print("📦 Loading and preprocessing data...")
    X, y, scaler = load_and_preprocess(filepath)

    # Split into training and testing
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    print(f"🔀 Train size: {len(X_train)} | Test size: {len(X_test)}")

    # Train XGBoost
    print("🚀 Training XGBoost model...")
    model = XGBClassifier(
        n_estimators=100,
        max_depth=4,
        learning_rate=0.1,
        scale_pos_weight=10,  # handles imbalance (more 0s than 1s)
        random_state=42,
        eval_metric='auc',
        verbosity=0
    )
    model.fit(X_train, y_train)

    # Evaluate
    y_pred_proba = model.predict_proba(X_test)[:, 1]
    auc = roc_auc_score(y_test, y_pred_proba)
    print(f"✅ Model AUC-ROC Score: {auc:.4f}")
    print("   (Above 0.70 is good. Above 0.80 is great.)")

    # Save model and scaler
    with open(model_output_path, 'wb') as f:
        pickle.dump(model, f)
    with open(scaler_output_path, 'wb') as f:
        pickle.dump(scaler, f)

    print(f"💾 Model saved to {model_output_path}")
    print(f"💾 Scaler saved to {scaler_output_path}")


if __name__ == "__main__":
    train_and_save(
        filepath='Data/sample_profiles.csv',
        model_output_path='models/risk_model.pkl',
        scaler_output_path='models/scaler.pkl'
    )