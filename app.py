import streamlit as st
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from engine.predict import predict_score
from engine.genai_explain import generate_explanation

# ─── Page Config ───────────────────────────────────────────
st.set_page_config(
    page_title="CreditLens AI",
    page_icon="🔍",
    layout="wide"
)

# ─── Sample Profiles ───────────────────────────────────────
SAMPLE_PROFILES = {
    "Raju Sharma (Gig Worker - High Risk)": {
        "name": "Raju Sharma",
        "monthly_inflow_avg": 12000,
        "inflow_transaction_count": 2,
        "essential_spend_ratio": 0.35,
        "external_score_avg": 0.3,
        "p2p_vs_p2m_ratio": 0.7,
        "ecommerce_cod_ratio": 0.5,
        "recharge_gap_variance": 9.0,
        "ecommerce_return_rate": 0.25,
        "utility_avg_days_late": 8.0,
        "utility_missed_count": 2
    },
    "Priya Patel (Street Vendor - Medium Risk)": {
        "name": "Priya Patel",
        "monthly_inflow_avg": 22000,
        "inflow_transaction_count": 3,
        "essential_spend_ratio": 0.55,
        "external_score_avg": 0.45,
        "p2p_vs_p2m_ratio": 0.45,
        "ecommerce_cod_ratio": 0.3,
        "recharge_gap_variance": 5.0,
        "ecommerce_return_rate": 0.12,
        "utility_avg_days_late": 3.0,
        "utility_missed_count": 1
    },
    "Anil Kumar (Rural Entrepreneur - Low Risk)": {
        "name": "Anil Kumar",
        "monthly_inflow_avg": 45000,
        "inflow_transaction_count": 5,
        "essential_spend_ratio": 0.65,
        "external_score_avg": 0.72,
        "p2p_vs_p2m_ratio": 0.25,
        "ecommerce_cod_ratio": 0.1,
        "recharge_gap_variance": 2.0,
        "ecommerce_return_rate": 0.05,
        "utility_avg_days_late": -1.0,
        "utility_missed_count": 0
    }
}

# ─── Header ────────────────────────────────────────────────
st.markdown("# 🔍 CreditLens AI")
st.markdown("### Alternative Credit Scoring for Credit-Invisible Indians")
st.markdown("---")

# ─── Sidebar: Customer Input ───────────────────────────────
st.sidebar.header("👤 Customer Profile")

selected = st.sidebar.selectbox(
    "Load Sample Profile",
    ["-- Select a profile --"] + list(SAMPLE_PROFILES.keys())
)

# Load defaults from selected profile or blank
if selected != "-- Select a profile --":
    p = SAMPLE_PROFILES[selected]
else:
    p = {
        "name": "",
        "monthly_inflow_avg": 15000,
        "inflow_transaction_count": 3,
        "essential_spend_ratio": 0.5,
        "external_score_avg": 0.5,
        "p2p_vs_p2m_ratio": 0.5,
        "ecommerce_cod_ratio": 0.3,
        "recharge_gap_variance": 5.0,
        "ecommerce_return_rate": 0.15,
        "utility_avg_days_late": 2.0,
        "utility_missed_count": 1
    }

customer_name = st.sidebar.text_input("Customer Name", value=p["name"])

st.sidebar.markdown("#### 💰 Income Signals")
monthly_inflow = st.sidebar.number_input("Monthly UPI Inflow (₹)", 
    value=float(p["monthly_inflow_avg"]), min_value=0.0, step=1000.0)
inflow_count = st.sidebar.slider("Transaction Frequency (per month)", 
    1, 20, int(p["inflow_transaction_count"]))

st.sidebar.markdown("#### 📊 Spending Signals")
essential_ratio = st.sidebar.slider("Essential Spend Ratio", 
    0.0, 1.0, float(p["essential_spend_ratio"]), 0.05)
cod_ratio = st.sidebar.slider("Cash on Delivery Usage", 
    0.0, 1.0, float(p["ecommerce_cod_ratio"]), 0.05)
return_rate = st.sidebar.slider("E-commerce Return Rate", 
    0.0, 1.0, float(p["ecommerce_return_rate"]), 0.05)
p2p_ratio = st.sidebar.slider("P2P vs Merchant Payment Ratio", 
    0.0, 1.0, float(p["p2p_vs_p2m_ratio"]), 0.05)

st.sidebar.markdown("#### 🧾 Bill Payment Signals")
days_late = st.sidebar.slider("Utility Bill Avg Days Late", 
    -10.0, 30.0, float(p["utility_avg_days_late"]), 0.5)
missed_bills = st.sidebar.slider("Utility Bills Missed", 
    0, 10, int(p["utility_missed_count"]))
recharge_variance = st.sidebar.slider("Mobile Recharge Gap Variance (days)", 
    0.0, 20.0, float(p["recharge_gap_variance"]), 0.5)

st.sidebar.markdown("#### 🏦 External Score")
ext_score = st.sidebar.slider("External Credit Score (normalized)", 
    0.0, 1.0, float(p["external_score_avg"]), 0.05)

analyze = st.sidebar.button("🔍 Analyze Customer", type="primary", use_container_width=True)

# ─── Main Panel ────────────────────────────────────────────
if not analyze:
    st.markdown("""
    ## Welcome to CreditLens AI
    
    **The Problem:** 650 million Indians are credit-invisible — no CIBIL score, no loans.
    
    **Our Solution:** We analyze alternative digital footprints to generate a trust score:
    - 📱 UPI transaction patterns
    - 🧾 Utility bill payment behavior  
    - 🛒 E-commerce and spending habits
    - 📶 Mobile recharge consistency
    
    **How to use:** Select a sample profile from the sidebar or enter customer details, then click **Analyze Customer**.
    """)

else:
    if not customer_name:
        st.error("Please enter a customer name.")
    else:
        profile = {
            "monthly_inflow_avg": monthly_inflow,
            "inflow_transaction_count": inflow_count,
            "essential_spend_ratio": essential_ratio,
            "external_score_avg": ext_score,
            "p2p_vs_p2m_ratio": p2p_ratio,
            "ecommerce_cod_ratio": cod_ratio,
            "recharge_gap_variance": recharge_variance,
            "ecommerce_return_rate": return_rate,
            "utility_avg_days_late": days_late,
            "utility_missed_count": missed_bills
        }

        with st.spinner("🤖 Analyzing customer profile..."):
            result = predict_score(profile)

        with st.spinner("✨ Generating AI explanation..."):
            explanation = generate_explanation(result, customer_name=customer_name)

        score = result['credit_score']
        risk = result['risk_category']
        color = result['risk_color']

        # ─── Score Display ──────────────────────────────────
        st.markdown(f"## Analysis for {customer_name}")

        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Alternative Credit Score", f"{score} / 100")
        with col2:
            st.metric("Risk Category", risk)
        with col3:
            st.metric("Default Probability", f"{result['default_probability']}%")

        # Score bar
        bar_color = "#2ecc71" if color == "green" else "#e67e22" if color == "orange" else "#e74c3c"
        st.markdown(f"""
        <div style='background:#eee; border-radius:10px; height:30px; margin:10px 0'>
            <div style='background:{bar_color}; width:{score}%; height:30px; 
                border-radius:10px; display:flex; align-items:center; 
                padding-left:10px; color:white; font-weight:bold'>
                {score}/100
            </div>
        </div>
        """, unsafe_allow_html=True)

        st.markdown("---")

        # ─── AI Explanation ─────────────────────────────────
        col_left, col_right = st.columns(2)

        with col_left:
            st.markdown("### 📋 Why This Score?")
            st.info(explanation['score_reason'])

            st.markdown("### 📈 How to Improve")
            st.success(explanation['improvement_tips'])

        with col_right:
            st.markdown("### 💰 Loan Recommendations")
            st.warning(explanation['loan_recommendations'])

            st.markdown("### ⚖️ Bias & Fairness Check")
            st.success(explanation['bias_check'])

        st.markdown("---")

        # ─── Signal Breakdown ───────────────────────────────
        st.markdown("### 📊 Behavioral Signal Breakdown")
        signal_cols = st.columns(5)
        signals = [
            ("Monthly Inflow", f"₹{monthly_inflow:,.0f}"),
            ("Bill Punctuality", f"{days_late:+.1f} days"),
            ("Essential Spend", f"{essential_ratio*100:.0f}%"),
            ("COD Usage", f"{cod_ratio*100:.0f}%"),
            ("Bills Missed", str(missed_bills))
        ]
        for i, (label, val) in enumerate(signals):
            signal_cols[i].metric(label, val)


        st.markdown("---")
        
        # ─── What If Simulator ──────────────────────────────
        st.markdown("### 🔮 What-If Simulator")
        st.markdown("*Adjust the sliders below to see how behavior changes affect the score in real time*")

        sim_col1, sim_col2, sim_col3 = st.columns(3)
        
        with sim_col1:
            sim_bills_late = st.slider(
                "📅 If utility bills paid on time (days late)",
                -10.0, 30.0, float(days_late), 0.5,
                key="sim_bills"
            )
        with sim_col2:
            sim_missed = st.slider(
                "🧾 If missed bills reduced to",
                0, 10, int(missed_bills), 1,
                key="sim_missed"
            )
        with sim_col3:
            sim_cod = st.slider(
                "📦 If COD usage reduced to",
                0.0, 1.0, float(cod_ratio), 0.05,
                key="sim_cod"
            )

        # Build simulated profile with changed values
        simulated_profile = profile.copy()
        simulated_profile["utility_avg_days_late"] = sim_bills_late
        simulated_profile["utility_missed_count"] = sim_missed
        simulated_profile["ecommerce_cod_ratio"] = sim_cod

        sim_result = predict_score(simulated_profile)
        sim_score = sim_result["credit_score"]
        score_diff = sim_score - score

        # Show simulated score
        sim_col_a, sim_col_b, sim_col_c = st.columns(3)
        with sim_col_a:
            st.metric("Current Score", f"{score} / 100")
        with sim_col_b:
            arrow = "🟢" if score_diff > 0 else "🔴" if score_diff < 0 else "⚪"
            st.metric("Simulated Score", f"{sim_score} / 100", 
                     delta=f"{score_diff:+d} points")
        with sim_col_c:
            st.metric("New Risk Category", sim_result["risk_category"])

        # Simulated score bar
        sim_bar_color = "#2ecc71" if sim_result["risk_color"] == "green" else "#e67e22" if sim_result["risk_color"] == "orange" else "#e74c3c"
        st.markdown(f"""
        <div style='background:#eee; border-radius:10px; height:24px; margin:10px 0'>
            <div style='background:{sim_bar_color}; width:{sim_score}%; height:24px; 
                border-radius:10px; display:flex; align-items:center; 
                padding-left:10px; color:white; font-weight:bold; font-size:13px'>
                {sim_score}/100
            </div>
        </div>
        """, unsafe_allow_html=True)

        if score_diff > 0:
            st.success(f"✅ If {customer_name} makes these behavioral changes, their score improves by **{score_diff} points** — potentially moving to {sim_result['risk_category']}.")
        elif score_diff < 0:
            st.error(f"⚠️ These changes would decrease the score by {abs(score_diff)} points.")
        else:
            st.info("No change in score with these adjustments.")

        