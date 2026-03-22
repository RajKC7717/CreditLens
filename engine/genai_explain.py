from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_explanation(result: dict, customer_name: str = "This customer") -> dict:
    score = result['credit_score']
    risk = result['risk_category']
    prob = result['default_probability']
    p = result['profile']

    prompt = f"""You are CreditLens AI, an expert financial analyst helping Indian bank loan officers evaluate credit-invisible customers (people with no CIBIL score).

CUSTOMER PROFILE:
- Name: {customer_name}
- Alternative Credit Score: {score}/100
- Risk Category: {risk}
- Default Probability: {prob}%

BEHAVIORAL SIGNALS:
- Monthly Income (UPI inflow): ₹{p['monthly_inflow_avg']:,.0f}
- Transaction Frequency: {p['inflow_transaction_count']} times/month
- Essential Spend Ratio: {p['essential_spend_ratio']*100:.0f}%
- External Credit Score: {p['external_score_avg']*100:.0f}/100
- P2P vs Merchant Payment Ratio: {p['p2p_vs_p2m_ratio']*100:.0f}% peer transfers
- Cash on Delivery Usage: {p['ecommerce_cod_ratio']*100:.0f}%
- Mobile Recharge Consistency: variance of {p['recharge_gap_variance']:.1f} days
- E-commerce Return Rate: {p['ecommerce_return_rate']*100:.0f}%
- Utility Bill Avg Days Late: {p['utility_avg_days_late']:.1f} days
- Utility Bills Missed: {p['utility_missed_count']}

Respond in this EXACT format with no extra text:

SCORE_REASON:
In 2-3 sentences, explain why this person got this score. Mention 2-3 specific signals. Be direct and human.

LOAN_RECOMMENDATIONS:
- [SAFE/RISKY] Loan Name (₹amount range): one sentence reason
- [SAFE/RISKY] Loan Name (₹amount range): one sentence reason
- [SAFE/RISKY] Loan Name (₹amount range): one sentence reason

IMPROVEMENT_TIPS:
- Tip 1 specific action
- Tip 2 specific action
- Tip 3 specific action

BIAS_CHECK:
One sentence confirming this score is based purely on financial behavior, not demographics."""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=800
    )

    text = response.choices[0].message.content

    def extract_section(text, section_name):
        try:
            start = text.index(section_name + ":") + len(section_name) + 1
            next_sections = [s + ":" for s in
                           ["SCORE_REASON", "LOAN_RECOMMENDATIONS",
                            "IMPROVEMENT_TIPS", "BIAS_CHECK"]
                           if s + ":" in text and text.index(s+":") > start]
            end = text.index(next_sections[0]) if next_sections else len(text)
            return text[start:end].strip()
        except:
            return "Information not available."

    return {
        "score_reason": extract_section(text, "SCORE_REASON"),
        "loan_recommendations": extract_section(text, "LOAN_RECOMMENDATIONS"),
        "improvement_tips": extract_section(text, "IMPROVEMENT_TIPS"),
        "bias_check": extract_section(text, "BIAS_CHECK"),
        "full_response": text
    }


if __name__ == "__main__":
    from predict import predict_score

    profile = {
        'monthly_inflow_avg': 12000,
        'inflow_transaction_count': 2,
        'essential_spend_ratio': 0.35,
        'external_score_avg': 0.3,
        'p2p_vs_p2m_ratio': 0.7,
        'ecommerce_cod_ratio': 0.5,
        'recharge_gap_variance': 9.0,
        'ecommerce_return_rate': 0.25,
        'utility_avg_days_late': 8.0,
        'utility_missed_count': 2
    }

    result = predict_score(profile)
    explanation = generate_explanation(result, customer_name="Raju Sharma")

    print(f"\n🎯 SCORE: {result['credit_score']}/100 — {result['risk_category']}\n")
    print("📋 SCORE REASON:")
    print(explanation['score_reason'])
    print("\n💰 LOAN RECOMMENDATIONS:")
    print(explanation['loan_recommendations'])
    print("\n📈 IMPROVEMENT TIPS:")
    print(explanation['improvement_tips'])
    print("\n⚖️ BIAS CHECK:")
    print(explanation['bias_check'])













# from google import genai
# from config import GEMINI_API_KEY

# client = genai.Client(api_key=GEMINI_API_KEY)

# def generate_explanation(result: dict, customer_name: str = "This customer") -> dict:
#     score = result['credit_score']
#     risk = result['risk_category']
#     prob = result['default_probability']
#     p = result['profile']

#     prompt = f"""
# You are CreditLens AI, an expert financial analyst helping Indian bank loan officers evaluate credit-invisible customers (people with no CIBIL score).

# CUSTOMER PROFILE:
# - Name: {customer_name}
# - Alternative Credit Score: {score}/100
# - Risk Category: {risk}
# - Default Probability: {prob}%

# BEHAVIORAL SIGNALS:
# - Monthly Income (UPI inflow): ₹{p['monthly_inflow_avg']:,.0f}
# - Transaction Frequency: {p['inflow_transaction_count']} times/month
# - Essential Spend Ratio: {p['essential_spend_ratio']*100:.0f}%
# - External Credit Score: {p['external_score_avg']*100:.0f}/100
# - P2P vs Merchant Payment Ratio: {p['p2p_vs_p2m_ratio']*100:.0f}% peer transfers
# - Cash on Delivery Usage: {p['ecommerce_cod_ratio']*100:.0f}%
# - Mobile Recharge Consistency: variance of {p['recharge_gap_variance']:.1f} days
# - E-commerce Return Rate: {p['ecommerce_return_rate']*100:.0f}%
# - Utility Bill Avg Days Late: {p['utility_avg_days_late']:.1f} days
# - Utility Bills Missed: {p['utility_missed_count']}

# Respond in this EXACT format:

# SCORE_REASON:
# In 2-3 sentences, explain why this person got this score. Mention 2-3 specific signals. Be direct and human.

# LOAN_RECOMMENDATIONS:
# List exactly 3 loans in this format:
# - [SAFE/RISKY] Loan Name (₹amount range): one sentence reason

# IMPROVEMENT_TIPS:
# List exactly 3 specific actions this person can take to improve their score. Be practical for an Indian gig worker.

# BIAS_CHECK:
# One sentence confirming this score is based purely on financial behavior, not demographics.
# """

#     response = client.models.generate_content(
#         model="models/gemini-2.0-flash",
#         contents=prompt
#     )
#     text = response.text

#     def extract_section(text, section_name):
#         try:
#             start = text.index(section_name + ":") + len(section_name) + 1
#             next_sections = [s + ":" for s in
#                            ["SCORE_REASON", "LOAN_RECOMMENDATIONS",
#                             "IMPROVEMENT_TIPS", "BIAS_CHECK"]
#                            if s + ":" in text and text.index(s+":") > start]
#             end = text.index(next_sections[0]) if next_sections else len(text)
#             return text[start:end].strip()
#         except:
#             return "Information not available."

#     return {
#         "score_reason": extract_section(text, "SCORE_REASON"),
#         "loan_recommendations": extract_section(text, "LOAN_RECOMMENDATIONS"),
#         "improvement_tips": extract_section(text, "IMPROVEMENT_TIPS"),
#         "bias_check": extract_section(text, "BIAS_CHECK"),
#         "full_response": text
#     }


# if __name__ == "__main__":
#     from engine.predict import predict_score

#     profile = {
#         'monthly_inflow_avg': 12000,
#         'inflow_transaction_count': 2,
#         'essential_spend_ratio': 0.35,
#         'external_score_avg': 0.3,
#         'p2p_vs_p2m_ratio': 0.7,
#         'ecommerce_cod_ratio': 0.5,
#         'recharge_gap_variance': 9.0,
#         'ecommerce_return_rate': 0.25,
#         'utility_avg_days_late': 8.0,
#         'utility_missed_count': 2
#     }

#     result = predict_score(profile)
#     explanation = generate_explanation(result, customer_name="Raju Sharma")

#     print(f"\n🎯 SCORE: {result['credit_score']}/100 — {result['risk_category']}\n")
#     print("📋 SCORE REASON:")
#     print(explanation['score_reason'])
#     print("\n💰 LOAN RECOMMENDATIONS:")
#     print(explanation['loan_recommendations'])
#     print("\n📈 IMPROVEMENT TIPS:")
#     print(explanation['improvement_tips'])
#     print("\n⚖️ BIAS CHECK:")
#     print(explanation['bias_check'])
