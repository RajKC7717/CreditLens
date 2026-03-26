import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  Search,
  RotateCcw,
  Brain,
  TrendingUp,
  Banknote,
  Shield,
  AlertTriangle,
  Wallet,
  ShoppingCart,
  Receipt,
  BarChart3,
  UserSquare2
} from 'lucide-react';
import { useCreditAnalysis } from '../hooks/useCreditAnalysis';
import { sampleProfiles } from '../data/sampleProfiles';
import type { CustomerProfile, ExplainResponse, PredictResponse } from '../types/credit';
import Navbar from '../components/Navbar';

const defaultProfile: CustomerProfile = {
  monthly_inflow_avg: 15000,
  inflow_transaction_count: 3,
  essential_spend_ratio: 0.5,
  external_score_avg: 0.5,
  p2p_vs_p2m_ratio: 0.5,
  ecommerce_cod_ratio: 0.3,
  recharge_gap_variance: 5.0,
  ecommerce_return_rate: 0.15,
  utility_avg_days_late: 2.0,
  utility_missed_count: 1,
};

/* ─── Score Gauge ─── */
function ScoreGauge({ score, color }: { score: number; color: string }) {
  const ref = useRef<SVGCircleElement>(null);
  const c = 2 * Math.PI * 60;
  const offset = c - (score / 100) * c;
  const map: Record<string, string> = { green: '#22A06B', orange: '#F9A825', red: '#D94040' };
  const col = map[color] || '#22A06B';

  useEffect(() => {
    if (ref.current) gsap.fromTo(ref.current, { strokeDashoffset: c }, { strokeDashoffset: offset, duration: 1.2, ease: 'power3.out', delay: 0.3 });
  }, [score, offset, c]);

  return (
    <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 0 var(--space-4) 0' }}>
      <svg width="140" height="140" viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="80" cy="80" r="60" fill="none" stroke="var(--rule)" strokeWidth="4" />
        <circle ref={ref} cx="80" cy="80" r="60" fill="none" stroke={col} strokeWidth="5"
          strokeLinecap="square" strokeDasharray={c} strokeDashoffset={c} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span className="formal-display tabular-nums" style={{ fontSize: 'var(--type-3xl)', fontWeight: 400, color: 'var(--ink)', lineHeight: 1, marginTop: '12px' }}>{score}</span>
        <span className="formal-label" style={{ marginTop: '4px', fontSize: '10px' }}>Score</span>
      </div>
    </div>
  );
}

function parseLoanRecs(text: string) {
  return text.split('\n').filter(l => l.trim()).map(line => {
    const isSafe = line.toUpperCase().includes('[SAFE]');
    return { text: line.replace(/^-\s*/, '').replace(/\[SAFE\]/gi, '').replace(/\[RISKY\]/gi, '').trim(), type: isSafe ? 'SAFE' : 'RISKY' };
  });
}
function parseTips(text: string) {
  return text.split('\n').filter(l => l.trim()).map(l => l.replace(/^-\s*/, '').trim());
}

/* ─── Formal Results Panel ─── */
function ResultsPanel({ prediction, explanation, name }: { prediction: PredictResponse; explanation: ExplainResponse; name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { credit_score, risk_category, risk_color, default_probability } = prediction;
  const loans = parseLoanRecs(explanation.loan_recommendations);
  const tips = parseTips(explanation.improvement_tips);
  const colorMap: Record<string, string> = { green: '#22A06B', orange: '#F9A825', red: '#D94040' };
  const col = colorMap[risk_color] || '#22A06B';

  useEffect(() => {
    if (ref.current) gsap.from(ref.current.querySelectorAll('.r-anim'), { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.2 });
  }, []);

  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
      {/* Overview Block */}
      <div className="r-anim formal-card" style={{ padding: 'var(--space-6)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--space-8)', alignItems: 'center', borderLeft: `4px solid ${col}` }}>
        <ScoreGauge score={credit_score} color={risk_color} />
        <div>
          <div className="formal-label" style={{ marginBottom: '8px' }}>Analysis Outcome</div>
          <h2 className="formal-display" style={{ fontSize: 'var(--type-2xl)', color: 'var(--ink)', marginBottom: 'var(--space-4)' }}>{name}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-5)' }}>
            <div>
              <div className="formal-label" style={{ marginBottom: '4px' }}>Risk Assessment</div>
              <div style={{ fontSize: 'var(--type-xl)', color: col, fontWeight: 500 }}>{risk_category}</div>
            </div>
            <div>
              <div className="formal-label" style={{ marginBottom: '4px' }}>Default Probability</div>
              <div className="tabular-nums" style={{ fontSize: 'var(--type-xl)', color: 'var(--ink)' }}>{default_probability}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="r-anim formal-card" style={{ padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--rule)', paddingBottom: '12px' }}>
          <Brain size={16} style={{ color: 'var(--accent)' }} />
          <h3 className="formal-label" style={{ color: 'var(--ink)' }}>Algorithmic Rationale</h3>
        </div>
        <p style={{ fontSize: 'var(--type-sm)', color: 'var(--muted)', lineHeight: 1.7 }}>{explanation.score_reason}</p>
      </div>

      <div className="r-anim" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
        {/* Loan Recs */}
        <div className="formal-card" style={{ padding: 'var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--rule)', paddingBottom: '12px' }}>
            <Banknote size={16} style={{ color: 'var(--accent)' }} />
            <h3 className="formal-label" style={{ color: 'var(--ink)' }}>Product Structuring</h3>
          </div>
          <table className="formal-table">
            <tbody>
              {loans.map((l, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--muted)', width: '80%' }}>{l.text}</td>
                  <td style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 'var(--type-xs)', fontWeight: 600, padding: '4px 8px', borderRadius: '2px', background: l.type === 'SAFE' ? 'rgba(34,160,107,0.1)' : 'rgba(217,64,64,0.1)', color: l.type === 'SAFE' ? '#22A06B' : '#D94040' }}>
                      {l.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Actionable Tips */}
        <div className="formal-card" style={{ padding: 'var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--rule)', paddingBottom: '12px' }}>
            <TrendingUp size={16} style={{ color: 'var(--accent)' }} />
            <h3 className="formal-label" style={{ color: 'var(--ink)' }}>Remediation Guidance</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {tips.map((t, i) => (
              <li key={i} style={{ fontSize: 'var(--type-sm)', padding: '8px 0', borderBottom: '1px solid var(--rule)', display: 'flex', gap: '12px', color: 'var(--muted)', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent)', fontSize: '14px' }}>—</span> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="r-anim formal-card" style={{ padding: 'var(--space-6)', background: 'var(--surface-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--rule)', paddingBottom: '12px' }}>
          <Shield size={16} style={{ color: 'var(--accent)' }} />
          <h3 className="formal-label" style={{ color: 'var(--ink)' }}>Compliance & Fairness Verification</h3>
        </div>
        <p style={{ fontSize: 'var(--type-sm)', color: 'var(--muted)', lineHeight: 1.7 }}>{explanation.bias_check}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/* ─── DASHBOARD PAGE ─── */
/* ═══════════════════════════════════════════ */
export default function DashboardPage() {
  const [customerName, setCustomerName] = useState('');
  const [profile, setProfile] = useState<CustomerProfile>(defaultProfile);
  const [nameError, setNameError] = useState('');
  const { state, prediction, explanation, error, analyze, reset } = useCreditAnalysis();

  const update = (key: keyof CustomerProfile, value: number) => setProfile(prev => ({ ...prev, [key]: value }));

  const handleProfileSelect = (idx: number) => {
    if (idx >= 0) {
      const sp = sampleProfiles[idx];
      setCustomerName(sp.name);
      setProfile({ ...sp.profile });
      setNameError('');
    }
  };

  const handleAnalyze = () => {
    if (!customerName.trim()) { setNameError('Client identifier required'); return; }
    setNameError('');
    analyze(customerName.trim(), profile);
  };

  const isLoading = state === 'predicting' || state === 'explaining';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--foundation)' }}>
      <Navbar />

      <div className="offset-grid" style={{ flex: 1, paddingTop: '100px', paddingBottom: 'var(--space-8)' }}>
        
        {/* ─── LEFT SIDEBAR (Controls & Context) ─── */}
        <div className="offset-label" style={{ paddingRight: 'var(--space-5)', borderRight: '1px solid var(--rule)' }}>
          <div style={{ position: 'sticky', top: '100px' }}>
            
            <div className="formal-display" style={{ fontSize: 'var(--type-xl)', color: 'var(--ink)', marginBottom: 'var(--space-2)' }}>
              Underwriting Portal
            </div>
            <p style={{ fontSize: 'var(--type-xs)', color: 'var(--muted)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
              Configure client telemetry parameters manually or load institutional templates to generate a formalized risk assessment.
            </p>

            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label className="formal-label" style={{ display: 'block', marginBottom: '8px' }}>Client Identifier</label>
              <div style={{ position: 'relative' }}>
                <UserSquare2 size={16} style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                <input type="text" value={customerName}
                  onChange={(e) => { setCustomerName(e.target.value); if (e.target.value.trim()) setNameError(''); }}
                  placeholder="E.g. RK Gupta (ID: 8092)"
                  style={{ width: '100%', paddingLeft: '28px', fontSize: 'var(--type-sm)', borderBottom: '1.5px solid var(--rule)' }} />
                {nameError && <div style={{ fontSize: '10px', color: '#D94040', marginTop: '4px' }}>{nameError}</div>}
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label className="formal-label" style={{ display: 'block', marginBottom: '8px' }}>Registry Templates</label>
              <select onChange={(e) => handleProfileSelect(parseInt(e.target.value))} defaultValue="-1"
                style={{ width: '100%', fontSize: 'var(--type-sm)', paddingBottom: '6px' }}>
                <option value="-1" disabled>Select from verified profiles...</option>
                {sampleProfiles.map((sp, i) => <option key={i} value={i}>{sp.name} — {sp.label.split(' - ')[1]?.replace(')', '')}</option>)}
              </select>
            </div>

            <button className="formal-btn-primary" onClick={handleAnalyze} disabled={isLoading} style={{ width: '100%' }}>
              <Search size={14} /> {isLoading ? 'Processing Evaluation...' : 'Execute Evaluation'}
            </button>
            <div style={{ height: '8px' }} />
            <button className="formal-btn-ghost" onClick={reset} disabled={isLoading} style={{ width: '100%' }}>
              <RotateCcw size={14} /> Clear Registry
            </button>

          </div>
        </div>

        {/* ─── MAIN CONTENT (Data Form & Results) ─── */}
        <div className="offset-content" style={{ paddingLeft: 'var(--space-4)' }}>
          
          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                
                <div style={{ marginBottom: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--ink)', paddingBottom: '8px' }}>
                  <h2 className="formal-display" style={{ fontSize: 'var(--type-xl)', color: 'var(--ink)' }}>Parameter Matrix</h2>
                  <span className="formal-label">4 Datasets • 10 Signals</span>
                </div>

                {/* Multicolumn Form */}
                <div className="formal-card" style={{ padding: '0' }}>
                  <table className="formal-table">
                    <thead>
                      <tr>
                        <th style={{ width: '25%' }}><Wallet size={12} style={{display:'inline', marginRight:'6px'}}/>Income Logs</th>
                        <th style={{ width: '25%' }}><ShoppingCart size={12} style={{display:'inline', marginRight:'6px'}}/>Spending Habits</th>
                        <th style={{ width: '25%' }}><Receipt size={12} style={{display:'inline', marginRight:'6px'}}/>Obligations</th>
                        <th style={{ width: '25%' }}><BarChart3 size={12} style={{display:'inline', marginRight:'6px'}}/>External Context</th>
                      </tr>
                    </thead>
                    <tbody style={{ verticalAlign: 'top' }}>
                      <tr>
                        {/* 1. Income */}
                        <td style={{ padding: 'var(--space-5)' }}>
                          <div style={{ marginBottom: 'var(--space-4)' }}>
                            <div className="formal-label" style={{ marginBottom: '4px', fontSize: '9px' }}>Monthly Inflow (₹)</div>
                            <input type="number" className="tabular-nums" value={profile.monthly_inflow_avg} onChange={(e) => update('monthly_inflow_avg', parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                          </div>
                          <div style={{ marginBottom: 'var(--space-4)' }}>
                            <div className="formal-label" style={{ marginBottom: '4px', fontSize: '9px' }}>Txn Count</div>
                            <input type="number" className="tabular-nums" value={profile.inflow_transaction_count} onChange={(e) => update('inflow_transaction_count', parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                          </div>
                        </td>

                        {/* 2. Spending */}
                        <td style={{ padding: 'var(--space-5)', borderLeft: '1px solid var(--rule)' }}>
                          <div style={{ marginBottom: 'var(--space-4)' }}>
                            <div className="formal-label" style={{ marginBottom: '4px', fontSize: '9px' }}>Essential Ratio (0-1)</div>
                            <input type="number" className="tabular-nums" step="0.05" value={profile.essential_spend_ratio} onChange={(e) => update('essential_spend_ratio', parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                          </div>
                          <div style={{ marginBottom: 'var(--space-4)' }}>
                            <div className="formal-label" style={{ marginBottom: '4px', fontSize: '9px' }}>COD Ratio (0-1)</div>
                            <input type="number" className="tabular-nums" step="0.05" value={profile.ecommerce_cod_ratio} onChange={(e) => update('ecommerce_cod_ratio', parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                          </div>
                          <div style={{ marginBottom: 'var(--space-4)' }}>
                            <div className="formal-label" style={{ marginBottom: '4px', fontSize: '9px' }}>Returns Ratio (0-1)</div>
                            <input type="number" className="tabular-nums" step="0.05" value={profile.ecommerce_return_rate} onChange={(e) => update('ecommerce_return_rate', parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                          </div>
                          <div style={{ marginBottom: 'var(--space-4)' }}>
                            <div className="formal-label" style={{ marginBottom: '4px', fontSize: '9px' }}>P2P Ratio (0-1)</div>
                            <input type="number" className="tabular-nums" step="0.05" value={profile.p2p_vs_p2m_ratio} onChange={(e) => update('p2p_vs_p2m_ratio', parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                          </div>
                        </td>

                        {/* 3. Bills */}
                        <td style={{ padding: 'var(--space-5)', borderLeft: '1px solid var(--rule)' }}>
                          <div style={{ marginBottom: 'var(--space-4)' }}>
                            <div className="formal-label" style={{ marginBottom: '4px', fontSize: '9px' }}>Avg Days Late</div>
                            <input type="number" className="tabular-nums" step="0.5" value={profile.utility_avg_days_late} onChange={(e) => update('utility_avg_days_late', parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                          </div>
                          <div style={{ marginBottom: 'var(--space-4)' }}>
                            <div className="formal-label" style={{ marginBottom: '4px', fontSize: '9px' }}>Missed Cycles</div>
                            <input type="number" className="tabular-nums" step="1" value={profile.utility_missed_count} onChange={(e) => update('utility_missed_count', parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                          </div>
                          <div style={{ marginBottom: 'var(--space-4)' }}>
                            <div className="formal-label" style={{ marginBottom: '4px', fontSize: '9px' }}>Telecon Gap (Days)</div>
                            <input type="number" className="tabular-nums" step="0.5" value={profile.recharge_gap_variance} onChange={(e) => update('recharge_gap_variance', parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                          </div>
                        </td>

                        {/* 4. External */}
                        <td style={{ padding: 'var(--space-5)', borderLeft: '1px solid var(--rule)' }}>
                          <div style={{ marginBottom: 'var(--space-4)' }}>
                            <div className="formal-label" style={{ marginBottom: '4px', fontSize: '9px' }}>Base Index (0-1)</div>
                            <input type="number" className="tabular-nums" step="0.05" value={profile.external_score_avg} onChange={(e) => update('external_score_avg', parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {(state === 'predicting' || state === 'explaining') && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', background: 'var(--surface-2)', border: '1px solid var(--rule)' }}>
                <div style={{ fontSize: 'var(--type-2xl)', color: 'var(--muted)', animation: 'fadeUp 1s ease-in-out infinite alternate' }}>⟳</div>
                <div style={{ height: 'var(--space-4)' }} />
                <span className="formal-label" style={{ color: 'var(--accent)' }}>
                  {state === 'predicting' ? 'Evaluating Core Model...' : 'Synthesizing Neural Reasoning...'}
                </span>
              </motion.div>
            )}

            {state === 'done' && prediction && explanation && (
              <motion.div key="results" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--ink)', paddingBottom: '8px', marginBottom: 'var(--space-6)' }}>
                  <h2 className="formal-display" style={{ fontSize: 'var(--type-xl)', color: 'var(--ink)' }}>Decision Report</h2>
                  <span className="formal-label">Final Evaluation</span>
                </div>
                <ResultsPanel prediction={prediction} explanation={explanation} name={customerName} />
              </motion.div>
            )}

            {state === 'error' && (
              <motion.div key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ padding: 'var(--space-6)', border: '1px solid rgba(217,64,64,0.3)', background: 'var(--surface)', display: 'flex', gap: 'var(--space-5)' }}>
                <AlertTriangle size={24} style={{ color: '#D94040', flexShrink: 0 }} />
                <div>
                  <h3 className="formal-label" style={{ color: '#D94040', marginBottom: '8px' }}>Execution Failure</h3>
                  <p style={{ fontSize: 'var(--type-sm)', color: 'var(--muted)' }}>{error || 'Connection to the underlying logic engine was disrupted.'}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
