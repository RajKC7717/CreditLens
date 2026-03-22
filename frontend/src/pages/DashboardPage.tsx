import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  Search,
  RotateCcw,
  Target,
  ShieldAlert,
  TrendingDown,
  Brain,
  TrendingUp,
  Banknote,
  Shield,
  AlertTriangle,
  User,
  Wallet,
  ShoppingCart,
  Receipt,
  BarChart3,
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

function formatINR(n: number): string {
  const str = Math.round(n).toString();
  if (str.length <= 3) return '₹' + str;
  const lastThree = str.slice(-3);
  const rest = str.slice(0, -3);
  return '₹' + rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
}

/* ─── Slider ─── */
function Slider({ label, value, min, max, step, onChange, format }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; format?: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(232, 240, 226, 0.7)' }}>{label}</span>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#A8D896' }}>{format ? format(value) : value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', height: '4px', borderRadius: '2px', outline: 'none', appearance: 'none', cursor: 'pointer',
          background: `linear-gradient(to right, #5BB347 ${pct}%, rgba(125,198,126,0.15) ${pct}%)` }} />
    </div>
  );
}

/* ─── Score Gauge ─── */
function ScoreGauge({ score, color }: { score: number; color: string }) {
  const ref = useRef<SVGCircleElement>(null);
  const c = 2 * Math.PI * 80;
  const offset = c - (score / 100) * c;
  const map: Record<string, string> = { green: '#4CAF50', orange: '#FF9800', red: '#E53935' };
  const col = map[color] || '#4CAF50';

  useEffect(() => {
    if (ref.current) gsap.fromTo(ref.current, { strokeDashoffset: c }, { strokeDashoffset: offset, duration: 1.2, ease: 'power3.out', delay: 0.3 });
  }, [score, offset, c]);

  return (
    <div style={{ position: 'relative', width: '180px', height: '180px' }}>
      <svg width="180" height="180" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(125,198,126,0.1)" strokeWidth="12" />
        <circle ref={ref} cx="100" cy="100" r="80" fill="none" stroke={col} strokeWidth="12"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c}
          style={{ filter: `drop-shadow(0 0 10px ${col}40)` }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '40px', fontWeight: 900, color: col, lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(232,240,226,0.5)' }}>out of 100</span>
      </div>
    </div>
  );
}

/* ─── Helpers ─── */
function parseLoanRecs(text: string) {
  return text.split('\n').filter(l => l.trim()).map(line => {
    const isSafe = line.toUpperCase().includes('[SAFE]');
    return { text: line.replace(/^-\s*/, '').replace(/\[SAFE\]/gi, '').replace(/\[RISKY\]/gi, '').trim(), type: isSafe ? 'safe' : 'risky' };
  });
}
function parseTips(text: string) {
  return text.split('\n').filter(l => l.trim()).map(l => l.replace(/^-\s*/, '').trim());
}

/* ─── Results ─── */
function Results({ prediction, explanation, name }: { prediction: PredictResponse; explanation: ExplainResponse; name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { credit_score, risk_category, risk_color, default_probability } = prediction;
  const colorMap: Record<string, string> = { green: '#4CAF50', orange: '#FF9800', red: '#E53935' };
  const col = colorMap[risk_color] || '#4CAF50';
  const loans = parseLoanRecs(explanation.loan_recommendations);
  const tips = parseTips(explanation.improvement_tips);

  useEffect(() => {
    if (ref.current) gsap.from(ref.current.querySelectorAll('.r-card'), { y: 30, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.2 });
  }, []);

  return (
    <div ref={ref}>
      {/* Header + Score */}
      <div className="r-card" style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
          <User size={18} style={{ color: '#5BB347' }} />
          <h2 style={{ fontSize: '22px', fontWeight: 700 }}>Credit Assessment — <span style={{ color: '#5BB347' }}>{name}</span></h2>
        </div>
        <ScoreGauge score={credit_score} color={risk_color} />
      </div>

      {/* Metric pills */}
      <div className="r-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {[
          { icon: <Target size={16} />, label: 'Credit Score', val: `${credit_score}/100` },
          { icon: <ShieldAlert size={16} />, label: 'Risk', val: risk_category },
          { icon: <TrendingDown size={16} />, label: 'Default Prob.', val: `${default_probability}%` },
        ].map((m, i) => (
          <div key={i} className="dark-glass-card" style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ color: col, display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>{m.icon}</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: col }}>{m.val}</div>
            <div style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(232,240,226,0.5)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* AI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <div className="r-card dark-glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Brain size={16} style={{ color: '#5BB347' }} />
            <h3 style={{ fontSize: '14px', fontWeight: 700 }}>Why This Score?</h3>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(232,240,226,0.6)', lineHeight: 1.7 }}>{explanation.score_reason}</p>
        </div>

        <div className="r-card dark-glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <TrendingUp size={16} style={{ color: '#4CAF50' }} />
            <h3 style={{ fontSize: '14px', fontWeight: 700 }}>Improvement Tips</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {tips.map((t, i) => (
              <li key={i} style={{ fontSize: '12.5px', padding: '3px 0', display: 'flex', gap: '6px', lineHeight: 1.5, color: 'rgba(232,240,226,0.6)' }}>
                <span style={{ color: '#4CAF50', flexShrink: 0 }}>✓</span> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="r-card dark-glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Banknote size={16} style={{ color: '#F9A825' }} />
            <h3 style={{ fontSize: '14px', fontWeight: 700 }}>Loan Recommendations</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {loans.map((l, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '9999px', background: l.type === 'safe' ? '#4CAF50' : '#E53935', color: 'white', flexShrink: 0, marginTop: '3px', textTransform: 'uppercase' }}>{l.type}</span>
                <span style={{ fontSize: '12.5px', lineHeight: 1.5, color: 'rgba(232,240,226,0.6)' }}>{l.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="r-card dark-glass-card" style={{ padding: '20px', borderColor: 'rgba(91,179,71,0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Shield size={16} style={{ color: '#3D8A2E' }} />
            <h3 style={{ fontSize: '14px', fontWeight: 700 }}>Bias & Fairness</h3>
          </div>
          <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(232,240,226,0.6)' }}>{explanation.bias_check}</p>
        </div>
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
    if (!customerName.trim()) { setNameError('Customer name is required'); return; }
    setNameError('');
    analyze(customerName.trim(), profile);
  };

  const isLoading = state === 'predicting' || state === 'explaining';
  const hasResults = state === 'done';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-dark)', color: 'var(--color-text-light)' }} className="grid-bg">
      <Navbar />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 32px 40px' }}>
        {/* ─── Page Title Bar ─── */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '4px' }}>
              Credit <span className="gradient-text">Assessment</span>
            </h1>
            <p style={{ fontSize: '14px', color: 'rgba(232, 240, 226, 0.5)' }}>Alternative credit scoring • XGBoost + LLM explainability</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {hasResults && (
              <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                onClick={reset}
                style={{ background: 'transparent', border: '1.5px solid rgba(125, 198, 126, 0.3)', borderRadius: '9999px', padding: '8px 18px', fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '13px', color: '#A8D896', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <RotateCcw size={14} /> New Analysis
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* ─── Profile Selection Row ─── */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {/* Profile Dropdown */}
          <div className="dark-glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#5BB347', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>📂 Load Sample</label>
            <select onChange={(e) => handleProfileSelect(parseInt(e.target.value))} defaultValue="-1"
              style={{ background: 'rgba(22, 33, 16, 0.8)', border: '1px solid rgba(125,198,126,0.2)', color: 'rgba(232,240,226,0.8)', borderRadius: '6px', padding: '8px 10px', fontSize: '12px', fontFamily: "'Poppins', sans-serif", outline: 'none', cursor: 'pointer' }}>
              <option value="-1" disabled>Select a profile...</option>
              {sampleProfiles.map((sp, i) => <option key={i} value={i}>{sp.label}</option>)}
            </select>
          </div>
          {/* Quick-Select Cards */}
          {sampleProfiles.map((sp, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02, borderColor: 'rgba(125,198,126,0.5)' }}
              className="dark-glass-card"
              onClick={() => { setCustomerName(sp.name); setProfile({ ...sp.profile }); setNameError(''); }}
              style={{ padding: '16px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.25s' }}>
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>{i === 0 ? '🛵' : i === 1 ? '🛒' : '🌾'}</div>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>{sp.name}</div>
              <div style={{ fontSize: '10px', color: 'rgba(232,240,226,0.4)', marginTop: '2px' }}>{sp.label.split(' - ')[1]?.replace(')', '')}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Customer Name + Analyze Row ─── */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.5 }}
          className="dark-glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <User size={18} style={{ color: '#5BB347', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <input type="text" value={customerName}
              onChange={(e) => { setCustomerName(e.target.value); if (e.target.value.trim()) setNameError(''); }}
              placeholder="Enter customer name..."
              style={{ width: '100%', background: 'transparent', border: 'none', color: 'rgba(232,240,226,0.9)', fontSize: '16px', fontWeight: 600, fontFamily: "'Poppins', sans-serif", outline: 'none', padding: '4px 0' }} />
            {nameError && <span style={{ fontSize: '11px', color: '#E53935', display: 'block', marginTop: '2px' }}>{nameError}</span>}
          </div>
          <motion.button whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(91, 179, 71, 0.35)' }} whileTap={{ scale: 0.97 }}
            onClick={handleAnalyze} disabled={isLoading}
            style={{ background: isLoading ? 'rgba(91,179,71,0.4)' : 'linear-gradient(135deg, #5BB347, #3D8A2E)', color: 'white', border: 'none', borderRadius: '9999px', padding: '10px 28px', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '13px', cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, boxShadow: '0 0 15px rgba(91, 179, 71, 0.2)' }}>
            <Search size={14} /> {isLoading ? 'Analyzing...' : 'Analyze Customer'}
          </motion.button>
        </motion.div>

        {/* ─── Input Signals Grid (4 cards, horizontal layout) ─── */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>

          {/* Income Signals */}
          <div className="dark-glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(125,198,126,0.1)' }}>
              <Wallet size={16} style={{ color: '#5BB347' }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#5BB347', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Income</span>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '11px', fontWeight: 500, display: 'block', marginBottom: '4px', color: 'rgba(232,240,226,0.5)' }}>Monthly UPI Inflow</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#5BB347', fontSize: '13px' }}>₹</span>
                <input type="number" value={profile.monthly_inflow_avg} onChange={(e) => update('monthly_inflow_avg', parseFloat(e.target.value) || 0)}
                  style={{ width: '100%', background: 'rgba(22,33,16,0.6)', border: '1px solid rgba(125,198,126,0.15)', color: 'rgba(232,240,226,0.8)', borderRadius: '6px', padding: '8px 10px 8px 26px', fontSize: '13px', fontFamily: "'Poppins', sans-serif", outline: 'none' }} />
              </div>
            </div>
            <Slider label="Txn Frequency" value={profile.inflow_transaction_count} min={1} max={20} step={1} onChange={(v) => update('inflow_transaction_count', v)} />
          </div>

          {/* Spending Signals */}
          <div className="dark-glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(125,198,126,0.1)' }}>
              <ShoppingCart size={16} style={{ color: '#5BB347' }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#5BB347', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Spending</span>
            </div>
            <Slider label="Essential Spend" value={profile.essential_spend_ratio} min={0} max={1} step={0.05} onChange={(v) => update('essential_spend_ratio', v)} format={(v) => `${Math.round(v * 100)}%`} />
            <div style={{ height: '10px' }} />
            <Slider label="COD Usage" value={profile.ecommerce_cod_ratio} min={0} max={1} step={0.05} onChange={(v) => update('ecommerce_cod_ratio', v)} format={(v) => `${Math.round(v * 100)}%`} />
            <div style={{ height: '10px' }} />
            <Slider label="Return Rate" value={profile.ecommerce_return_rate} min={0} max={1} step={0.05} onChange={(v) => update('ecommerce_return_rate', v)} format={(v) => `${Math.round(v * 100)}%`} />
            <div style={{ height: '10px' }} />
            <Slider label="P2P vs Merchant" value={profile.p2p_vs_p2m_ratio} min={0} max={1} step={0.05} onChange={(v) => update('p2p_vs_p2m_ratio', v)} format={(v) => `${Math.round(v * 100)}%`} />
          </div>

          {/* Bill Payments */}
          <div className="dark-glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(125,198,126,0.1)' }}>
              <Receipt size={16} style={{ color: '#5BB347' }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#5BB347', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Bills</span>
            </div>
            <Slider label="Avg Days Late" value={profile.utility_avg_days_late} min={-10} max={30} step={0.5} onChange={(v) => update('utility_avg_days_late', v)} format={(v) => `${v > 0 ? '+' : ''}${v.toFixed(1)}d`} />
            <div style={{ height: '10px' }} />
            <Slider label="Bills Missed" value={profile.utility_missed_count} min={0} max={10} step={1} onChange={(v) => update('utility_missed_count', v)} />
            <div style={{ height: '10px' }} />
            <Slider label="Recharge Gap" value={profile.recharge_gap_variance} min={0} max={20} step={0.5} onChange={(v) => update('recharge_gap_variance', v)} format={(v) => `${v.toFixed(1)}d`} />
          </div>

          {/* External Score */}
          <div className="dark-glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(125,198,126,0.1)' }}>
              <BarChart3 size={16} style={{ color: '#5BB347' }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#5BB347', textTransform: 'uppercase', letterSpacing: '0.06em' }}>External</span>
            </div>
            <Slider label="Normalized Score" value={profile.external_score_avg} min={0} max={1} step={0.05} onChange={(v) => update('external_score_avg', v)} format={(v) => `${Math.round(v * 100)}/100`} />

            {/* Summary panel */}
            <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(91,179,71,0.06)', borderRadius: '8px', border: '1px solid rgba(91,179,71,0.1)' }}>
              <div style={{ fontSize: '10px', fontWeight: 600, color: '#5BB347', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Quick Summary</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <div style={{ fontSize: '11px', color: 'rgba(232,240,226,0.4)' }}>Inflow</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(232,240,226,0.7)', textAlign: 'right' }}>{formatINR(profile.monthly_inflow_avg)}</div>
                <div style={{ fontSize: '11px', color: 'rgba(232,240,226,0.4)' }}>Missed Bills</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(232,240,226,0.7)', textAlign: 'right' }}>{profile.utility_missed_count}</div>
                <div style={{ fontSize: '11px', color: 'rgba(232,240,226,0.4)' }}>COD Ratio</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(232,240,226,0.7)', textAlign: 'right' }}>{Math.round(profile.ecommerce_cod_ratio * 100)}%</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Results Area ─── */}
        <AnimatePresence mode="wait">
          {state === 'idle' && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: 'center', padding: '40px 0' }}>
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}
                style={{ fontSize: '40px', marginBottom: '12px' }}>📊</motion.div>
              <p style={{ fontSize: '15px', color: 'rgba(232, 240, 226, 0.4)', maxWidth: '400px', margin: '0 auto' }}>
                Fill in the behavioral signals above and click <strong style={{ color: '#5BB347' }}>"Analyze Customer"</strong> to generate an AI credit assessment.
              </p>
            </motion.div>
          )}

          {(state === 'predicting' || state === 'explaining') && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px 0', gap: '16px' }}>
              <div style={{ width: '100%', maxWidth: '600px' }}>
                {[1, 2, 3].map(i => <div key={i} className="shimmer" style={{ height: i === 1 ? '60px' : '40px', borderRadius: '10px', marginBottom: '10px', opacity: 1 - i * 0.15 }} />)}
              </div>
              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ fontSize: '32px' }}>
                {state === 'predicting' ? '🤖' : '✨'}
              </motion.div>
              <span className="pulse-green" style={{ fontSize: '15px', fontWeight: 600, color: '#5BB347' }}>
                {state === 'predicting' ? 'Running XGBoost model on behavioral signals...' : 'LLaMA is generating your AI explanation...'}
              </span>
            </motion.div>
          )}

          {state === 'done' && prediction && explanation && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Results prediction={prediction} explanation={explanation} name={customerName} />
            </motion.div>
          )}

          {state === 'error' && (
            <motion.div key="error" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ display: 'flex', justifyContent: 'center', padding: '50px 0' }}>
              <div className="dark-glass-card" style={{ maxWidth: '450px', textAlign: 'center', padding: '32px', borderColor: 'rgba(229,57,53,0.3)' }}>
                <AlertTriangle size={32} style={{ color: '#E53935', marginBottom: '10px' }} />
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#E53935', marginBottom: '8px' }}>Analysis Failed</h3>
                <p style={{ fontSize: '13px', color: 'rgba(232,240,226,0.5)', lineHeight: 1.6 }}>{error || 'Connection failed.'}</p>
                <p style={{ fontSize: '12px', color: 'rgba(232,240,226,0.4)', marginTop: '10px' }}>Ensure backend is running: <code style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(91,179,71,0.1)' }}>uvicorn backend.main:app --port 8501</code></p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
