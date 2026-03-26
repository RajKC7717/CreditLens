import { useState, useRef } from 'react';
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
  const { credit_score, risk_category, risk_color, default_probability } = prediction;
  const loans = parseLoanRecs(explanation.loan_recommendations);
  const tips = parseTips(explanation.improvement_tips);
  const colorMap: Record<string, string> = { green: '#008000', orange: '#DAA520', red: '#CC0000' };
  const col = colorMap[risk_color] || '#008000';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      
      {/* Overview Block */}
      <div className="formal-card" style={{ padding: 'var(--space-4)', borderTop: `4px solid ${col}`, background: '#F8FBFC' }}>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ width: '25%', verticalAlign: 'top', borderRight: '1px solid var(--rule)' }}>
                <div className="formal-label" style={{ marginBottom: '4px' }}>Applicant Record</div>
                <h2 className="formal-display" style={{ fontSize: 'var(--type-xl)', margin: 0, fontWeight: 'bold' }}>{name}</h2>
              </td>
              <td style={{ paddingLeft: 'var(--space-5)', width: '25%', verticalAlign: 'top', borderRight: '1px solid var(--rule)' }}>
                <div className="formal-label" style={{ marginBottom: '4px' }}>System Score</div>
                <div className="tabular-nums" style={{ fontSize: 'var(--type-2xl)', fontWeight: 'bold', color: 'var(--accent)', lineHeight: 1 }}>
                  {credit_score} <span style={{fontSize: '14px', color: 'var(--muted)'}}>/ 100</span>
                </div>
              </td>
              <td style={{ paddingLeft: 'var(--space-5)', width: '25%', verticalAlign: 'top', borderRight: '1px solid var(--rule)' }}>
                <div className="formal-label" style={{ marginBottom: '4px' }}>Risk Assessment</div>
                <div style={{ fontSize: 'var(--type-lg)', color: col, fontWeight: 'bold' }}>{risk_category}</div>
              </td>
              <td style={{ paddingLeft: 'var(--space-5)', width: '25%', verticalAlign: 'top' }}>
                <div className="formal-label" style={{ marginBottom: '4px' }}>Default Prob.</div>
                <div className="tabular-nums" style={{ fontSize: 'var(--type-lg)', fontWeight: 'bold', color: '#CC0000' }}>{default_probability.toFixed(2)}%</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="formal-card" style={{ padding: 'var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)', borderBottom: '1px solid var(--rule)', paddingBottom: '4px' }}>
          <Brain size={16} style={{ color: 'var(--accent)' }} />
          <h3 className="formal-label" style={{ color: 'var(--accent)' }}>System Rationale</h3>
        </div>
        <p style={{ fontSize: 'var(--type-sm)', color: 'var(--ink)' }}>{explanation.score_reason}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
        {/* Loan Recs */}
        <div className="formal-card" style={{ padding: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)', borderBottom: '1px solid var(--rule)', paddingBottom: '4px' }}>
            <Banknote size={16} style={{ color: 'var(--accent)' }} />
            <h3 className="formal-label" style={{ color: 'var(--accent)' }}>Product Line Approvals</h3>
          </div>
          <table className="formal-table" style={{ marginTop: '8px' }}>
            <tbody>
              {loans.map((l, i) => (
                <tr key={i}>
                  <td style={{ width: '80%' }}>{l.text}</td>
                  <td style={{ textAlign: 'right', fontWeight: 'bold', color: l.type === 'SAFE' ? '#008000' : '#CC0000' }}>
                    {l.type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Actionable Tips */}
        <div className="formal-card" style={{ padding: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)', borderBottom: '1px solid var(--rule)', paddingBottom: '4px' }}>
            <TrendingUp size={16} style={{ color: 'var(--accent)' }} />
            <h3 className="formal-label" style={{ color: 'var(--accent)' }}>Actionable Recovery</h3>
          </div>
          <ul style={{ listStyle: 'square', paddingLeft: '20px', margin: '8px 0 0 0' }}>
            {tips.map((t, i) => (
              <li key={i} style={{ fontSize: 'var(--type-sm)', padding: '2px 0', color: 'var(--ink)' }}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="formal-card" style={{ padding: 'var(--space-4)', background: '#F4F7FA' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)', borderBottom: '1px solid var(--rule)', paddingBottom: '4px' }}>
          <Shield size={16} style={{ color: 'var(--accent)' }} />
          <h3 className="formal-label" style={{ color: 'var(--accent)' }}>Compliance Module Output</h3>
        </div>
        <p style={{ fontSize: 'var(--type-sm)', color: 'var(--ink)' }}>{explanation.bias_check}</p>
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
    if (!customerName.trim()) { setNameError('Account Name Required'); return; }
    setNameError('');
    analyze(customerName.trim(), profile);
  };

  const isLoading = state === 'predicting' || state === 'explaining';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--surface-2)' }}>
      <Navbar />

      <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', padding: '80px var(--page-pad) var(--space-6)', display: 'flex', gap: 'var(--space-5)' }}>
        
        {/* ─── LEFT SIDEBAR (Controls & Context) ─── */}
        <div style={{ flex: '0 0 280px' }}>
          
          <div className="formal-card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <h1 className="formal-display" style={{ fontSize: 'var(--type-lg)', margin: '0 0 var(--space-3) 0', borderBottom: '2px solid var(--rule)', paddingBottom: '4px' }}>
              Terminal Console
            </h1>
            
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label className="formal-label" style={{ display: 'block', marginBottom: '4px' }}>Account Identifier</label>
              <div style={{ position: 'relative' }}>
                <input type="text" value={customerName}
                  onChange={(e) => { setCustomerName(e.target.value); if (e.target.value.trim()) setNameError(''); }}
                  placeholder="E.g. RK Gupta (ID: 8092)"
                  style={{ width: '100%' }} />
                {nameError && <div style={{ fontSize: '10px', color: '#CC0000', marginTop: '2px', fontWeight: 'bold' }}>{nameError}</div>}
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-5)' }}>
              <label className="formal-label" style={{ display: 'block', marginBottom: '4px' }}>Registry Templates</label>
              <select onChange={(e) => handleProfileSelect(parseInt(e.target.value))} defaultValue="-1"
                style={{ width: '100%' }}>
                <option value="-1" disabled>Select saved profile...</option>
                {sampleProfiles.map((sp, i) => <option key={i} value={i}>{sp.name} — {sp.label.split(' - ')[1]?.replace(')', '')}</option>)}
              </select>
            </div>

            <button className="formal-btn-primary" onClick={handleAnalyze} disabled={isLoading} style={{ width: '100%', marginBottom: '8px' }}>
              <Search size={14} /> {isLoading ? 'Processing...' : 'Run Analysis'}
            </button>
            <button className="formal-btn-ghost" onClick={reset} disabled={isLoading} style={{ width: '100%' }}>
              <RotateCcw size={14} /> Clear Terminal
            </button>
          </div>

          <div style={{ padding: 'var(--space-3)', background: '#E8EDF2', border: '1px solid var(--rule)', fontSize: '11px', color: 'var(--muted)', textAlign: 'justify' }}>
            Warning: The outputs provided by this systemic terminal are algorithmic estimations and must be audited by a Senior Underwriter before final disbursement. Unauthorized access is logged automatically.
          </div>

        </div>

        {/* ─── MAIN CONTENT (Data Form & Results) ─── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          
          {/* Legacy Data Entry Form Area */}
          <div className="formal-card" style={{ padding: 'var(--space-4)' }}>
            <h2 className="formal-display" style={{ fontSize: 'var(--type-lg)', margin: '0 0 var(--space-4) 0', borderBottom: '2px solid var(--accent)', paddingBottom: '4px', color: 'var(--accent)' }}>
              Behavioral Telemetry Inputs
            </h2>
            
            <table className="formal-table">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}><Wallet size={12} style={{display:'inline', marginRight:'4px'}}/> Income Logs</th>
                  <th style={{ width: '25%' }}><ShoppingCart size={12} style={{display:'inline', marginRight:'4px'}}/> Spending Routines</th>
                  <th style={{ width: '25%' }}><Receipt size={12} style={{display:'inline', marginRight:'4px'}}/> Obligations</th>
                  <th style={{ width: '25%' }}><BarChart3 size={12} style={{display:'inline', marginRight:'4px'}}/> External Markers</th>
                </tr>
              </thead>
              <tbody style={{ verticalAlign: 'top' }}>
                <tr>
                  {/* 1. Income */}
                  <td style={{ padding: 'var(--space-3)', borderRight: '1px solid var(--rule)' }}>
                    <div style={{ marginBottom: 'var(--space-2)' }}>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 'bold', color: 'var(--muted)', marginBottom: '2px' }}>Monthly Inflow (₹)</label>
                      <input type="number" className="tabular-nums" value={profile.monthly_inflow_avg} onChange={(e) => update('monthly_inflow_avg', parseFloat(e.target.value) || 0)} />
                    </div>
                    <div style={{ marginBottom: 'var(--space-2)' }}>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 'bold', color: 'var(--muted)', marginBottom: '2px' }}>Transaction Count</label>
                      <input type="number" className="tabular-nums" value={profile.inflow_transaction_count} onChange={(e) => update('inflow_transaction_count', parseFloat(e.target.value) || 0)} />
                    </div>
                  </td>

                  {/* 2. Spending */}
                  <td style={{ padding: 'var(--space-3)', borderRight: '1px solid var(--rule)' }}>
                    <div style={{ marginBottom: 'var(--space-2)' }}>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 'bold', color: 'var(--muted)', marginBottom: '2px' }}>Essential Ratio (0-1)</label>
                      <input type="number" className="tabular-nums" step="0.05" value={profile.essential_spend_ratio} onChange={(e) => update('essential_spend_ratio', parseFloat(e.target.value) || 0)} />
                    </div>
                    <div style={{ marginBottom: 'var(--space-2)' }}>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 'bold', color: 'var(--muted)', marginBottom: '2px' }}>COD Ratio (0-1)</label>
                      <input type="number" className="tabular-nums" step="0.05" value={profile.ecommerce_cod_ratio} onChange={(e) => update('ecommerce_cod_ratio', parseFloat(e.target.value) || 0)} />
                    </div>
                    <div style={{ marginBottom: 'var(--space-2)' }}>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 'bold', color: 'var(--muted)', marginBottom: '2px' }}>Returns Ratio (0-1)</label>
                      <input type="number" className="tabular-nums" step="0.05" value={profile.ecommerce_return_rate} onChange={(e) => update('ecommerce_return_rate', parseFloat(e.target.value) || 0)} />
                    </div>
                    <div style={{ marginBottom: 'var(--space-2)' }}>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 'bold', color: 'var(--muted)', marginBottom: '2px' }}>P2P Ratio (0-1)</label>
                      <input type="number" className="tabular-nums" step="0.05" value={profile.p2p_vs_p2m_ratio} onChange={(e) => update('p2p_vs_p2m_ratio', parseFloat(e.target.value) || 0)} />
                    </div>
                  </td>

                  {/* 3. Bills */}
                  <td style={{ padding: 'var(--space-3)', borderRight: '1px solid var(--rule)' }}>
                    <div style={{ marginBottom: 'var(--space-2)' }}>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 'bold', color: 'var(--muted)', marginBottom: '2px' }}>Avg Days Late</label>
                      <input type="number" className="tabular-nums" step="0.5" value={profile.utility_avg_days_late} onChange={(e) => update('utility_avg_days_late', parseFloat(e.target.value) || 0)} />
                    </div>
                    <div style={{ marginBottom: 'var(--space-2)' }}>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 'bold', color: 'var(--muted)', marginBottom: '2px' }}>Missed Cycles</label>
                      <input type="number" className="tabular-nums" step="1" value={profile.utility_missed_count} onChange={(e) => update('utility_missed_count', parseFloat(e.target.value) || 0)} />
                    </div>
                    <div style={{ marginBottom: 'var(--space-2)' }}>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 'bold', color: 'var(--muted)', marginBottom: '2px' }}>Telecon Gap (Days)</label>
                      <input type="number" className="tabular-nums" step="0.5" value={profile.recharge_gap_variance} onChange={(e) => update('recharge_gap_variance', parseFloat(e.target.value) || 0)} />
                    </div>
                  </td>

                  {/* 4. External */}
                  <td style={{ padding: 'var(--space-3)' }}>
                    <div style={{ marginBottom: 'var(--space-2)' }}>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 'bold', color: 'var(--muted)', marginBottom: '2px' }}>Base Index (0-1)</label>
                      <input type="number" className="tabular-nums" step="0.05" value={profile.external_score_avg} onChange={(e) => update('external_score_avg', parseFloat(e.target.value) || 0)} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Results Area */}
          {(state === 'predicting' || state === 'explaining') && (
            <div className="formal-card" style={{ padding: 'var(--space-6)', textAlign: 'center', background: '#FFFFFF' }}>
              <div style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Executing Mainframe Calculation... 
              </div>
            </div>
          )}

          {state === 'done' && prediction && explanation && (
            <div style={{ marginTop: 'var(--space-2)' }}>
              <ResultsPanel prediction={prediction} explanation={explanation} name={customerName} />
            </div>
          )}

          {state === 'error' && (
            <div className="formal-card" style={{ padding: 'var(--space-4)', border: '2px solid #CC0000', backgroundColor: '#FFF0F0', display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
              <AlertTriangle size={32} style={{ color: '#CC0000' }} />
              <div>
                <h3 style={{ color: '#CC0000', margin: '0 0 4px 0', fontSize: 'var(--type-base)' }}>Network Transaction Error</h3>
                <p style={{ margin: 0, fontSize: 'var(--type-sm)', color: '#000' }}>{error || 'Unable to establish a connection to the risk-scoring mainframe. Check network topology.'}</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
