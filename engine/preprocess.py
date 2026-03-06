import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler

def load_and_preprocess(filepath):
    df = pd.read_csv(filepath)
    
    cols_needed = [
        'SK_ID_CURR', 'TARGET', 'AMT_INCOME_TOTAL',
        'AMT_CREDIT', 'AMT_GOODS_PRICE', 'CNT_FAM_MEMBERS',
        'EXT_SOURCE_2', 'EXT_SOURCE_3'  # ← adding these two
    ]
    df = df[cols_needed]
    df = df.dropna()
    
    df['monthly_inflow_avg'] = df['AMT_INCOME_TOTAL']
    df['inflow_transaction_count'] = df['CNT_FAM_MEMBERS']
    df['essential_spend_ratio'] = df['AMT_GOODS_PRICE'] / (df['AMT_CREDIT'] + 1)
    df['external_score_avg'] = (df['EXT_SOURCE_2'] + df['EXT_SOURCE_3']) / 2  # ← new
    
    np.random.seed(42)
    df['p2p_vs_p2m_ratio'] = np.random.uniform(0.1, 0.9, len(df))
    df['ecommerce_cod_ratio'] = np.random.uniform(0, 0.7, len(df))
    df['recharge_gap_variance'] = np.random.uniform(1, 15, len(df))
    df['ecommerce_return_rate'] = np.random.uniform(0, 0.4, len(df))
    df['utility_avg_days_late'] = np.random.uniform(-5, 20, len(df))
    df['utility_missed_count'] = np.random.randint(0, 5, len(df))
    
    feature_cols = [
        'monthly_inflow_avg', 'inflow_transaction_count',
        'essential_spend_ratio', 'external_score_avg',  # ← replaced one signal
        'p2p_vs_p2m_ratio', 'ecommerce_cod_ratio',
        'recharge_gap_variance', 'ecommerce_return_rate',
        'utility_avg_days_late', 'utility_missed_count'
    ]
    
    X = df[feature_cols]
    y = df['TARGET']
    
    scaler = MinMaxScaler()
    X_scaled = scaler.fit_transform(X)
    X_scaled = pd.DataFrame(X_scaled, columns=feature_cols)
    
    return X_scaled, y, scaler


# ← ADD THIS BLOCK at the bottom to test
if __name__ == "__main__":
    X, y, scaler = load_and_preprocess('Data/sample_profiles.csv')
    print("✅ Shape of X:", X.shape)
    print("✅ Target distribution:\n", y.value_counts())
    print("✅ First row of features:\n", X.iloc[0])