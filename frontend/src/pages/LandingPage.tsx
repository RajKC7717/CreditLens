import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Brain,
  Smartphone,
  Receipt,
  ShoppingCart,
  Radio,
  Lock,
  BarChart3,
  FileCheck2,
  Landmark,
  Building2,
  Briefcase,
  LineChart
} from 'lucide-react';
import Navbar from '../components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 650, suffix: 'M+', label: 'Credit-Invisible Clients' },
  { value: 10, suffix: '', label: 'Behavioral Metrics Tracked' },
  { value: 100, suffix: '%', label: 'Compliance Audit Coverage' },
  { value: 3, suffix: 's', label: 'Institutional Scoring Latency' },
];

const signals = [
  {
    icon: <Smartphone size={18} />,
    title: 'UPI Payment Telemetry',
    desc: 'Monitors transaction velocity, peer-to-peer ratios, and spending consistency to evaluate implicit income stability.',
    metric: 'P2P vs Merchant',
  },
  {
    icon: <Receipt size={18} />,
    title: 'Obligation Fulfillment',
    desc: 'Measures utility bill punctuality. Delinquency windows directly correlate with financial discipline and risk capacity.',
    metric: 'Delinquency Variance',
  },
  {
    icon: <ShoppingCart size={18} />,
    title: 'Discretionary Output',
    desc: 'Analyzes the ratio of essential spend against delivery and return patterns to gauge consumer financial maturity.',
    metric: 'Essential Ratio',
  },
  {
    icon: <Radio size={18} />,
    title: 'Telecon Stability',
    desc: 'Evaluates recurring prepaid recharge rhythm. Consistency indicates stable employment and procedural adherence.',
    metric: 'Recharge Rhythm',
  },
];

const features = [
  {
    icon: <Brain size={20} />,
    title: 'Gradient Boosting Architecture',
    desc: 'Production-grade XGBoost models trained on extensive behavioral telemetries. Generates institutional-grade risk probabilities specifically engineered for thin-file populations.',
    badge: 'Machine Learning',
  },
  {
    icon: <Lock size={20} />,
    title: 'Federated Data Security',
    desc: 'Designed for strict data sovereignty. Raw telemetry remains localized within source institutions, with only abstracted model weights updating the central ledger.',
    badge: 'Regulatory Compliance',
  },
  {
    icon: <BarChart3 size={20} />,
    title: 'Algorithmic Transparency',
    desc: 'Neural assessments output detailed, human-readable rationales. Loan officers receive deterministic reasoning for every probabilistic score to ensure regulatory defensibility.',
    badge: 'Explainability',
  },
  {
    icon: <FileCheck2 size={20} />,
    title: 'Institutional Fairness Audit',
    desc: 'Built-in systematic auditing prevents disparate impact across protected classes. Every credit decision is screened through comprehensive bias mitigation pipelines.',
    badge: 'Ethical Architecture',
  },
];

const steps = [
  { num: 'I', title: 'Data Ingestion', desc: 'Securely import 10 essential behavioral signals via the portal or automated API gateway.' },
  { num: 'II', title: 'Model Evaluation', desc: 'XGBoost engine processes telemetry to compute the core risk score and default probability in milliseconds.' },
  { num: 'III', title: 'Rationale Synthesis', desc: 'Generative AI synthesizes the raw model outputs into a structured, compliance-ready narrative.' },
  { num: 'IV', title: 'Executive Decision', desc: 'Underwriters execute the final loan allocation informed by empirical guidance and algorithmic transparency.' },
];

const targetUsers = [
  { icon: <Landmark size={20} />, title: 'Private Banks', desc: 'Safely originate credit for emerging affluent individuals lacking traditional bureau depth.' },
  { icon: <Building2 size={20} />, title: 'NBFC Analytics', desc: 'Deploy precise alternative parameters to underwrite micro-entrepreneurs and gig-economy participants.' },
  { icon: <Briefcase size={20} />, title: 'Fintech Sponsors', desc: 'Integrate programmatic risk interfaces directly into onboarding flows for digital lending applications.' },
  { icon: <LineChart size={20} />, title: 'Microfinance Institutions', desc: 'Scale rural credit deployment by leveraging mobile and utility proxies instead of manual audits.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const statsRef = useRef<HTMLDivElement>(null);
  const signalsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrances
      gsap.from('.hero-elem', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.15, delay: 0.2 });
      
      // Stats count up
      if (statsRef.current) {
        gsap.from('.stat-item', {
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
          y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        });
        statsRef.current.querySelectorAll('.stat-number').forEach((counter) => {
          const target = parseInt(counter.getAttribute('data-target') || '0');
          if (target > 0) {
            gsap.fromTo(counter, { innerText: '0' }, {
              innerText: target, duration: 2, ease: 'power2.out', snap: { innerText: 1 },
              scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
            });
          }
        });
      }

      // Card Sections
      const animateSections = [
        { ref: signalsRef, selector: '.signal-card', y: 30 },
        { ref: featuresRef, selector: '.feature-card', y: 30 },
        { ref: stepsRef, selector: '.step-item', y: 30 },
      ];
      animateSections.forEach(({ ref, selector, y }) => {
        if (ref.current) {
          gsap.from(selector, {
            scrollTrigger: { trigger: ref.current, start: 'top 80%' },
            y, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          });
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="grid-bg">
      <Navbar />

      {/* ─── Architectural Hero ─── */}
      <section style={{ padding: 'clamp(140px, 15vh, 200px) var(--page-pad) 100px', borderBottom: '1px solid var(--rule)' }}>
        <div className="offset-grid">
          <div className="offset-label hero-elem">
            <div className="formal-label" style={{ borderBottom: '1.5px solid var(--accent)', paddingBottom: '8px', display: 'inline-block', marginBottom: 'var(--space-5)' }}>
              Institutional Analytics
            </div>
            <p style={{ fontSize: 'var(--type-sm)', color: 'var(--muted)', maxWidth: '200px', lineHeight: 1.6 }}>
              Calibrated algorithmic assessment engineering specifically for the unbanked and underserved.
            </p>
          </div>
          
          <div className="offset-content hero-elem">
            <h1 className="formal-display" style={{ fontSize: 'clamp(var(--type-3xl), 6vw, 6rem)', lineHeight: 1.05, color: 'var(--ink)', marginBottom: 'var(--space-6)' }}>
              Assessing the <br/> Credit-Invisible.<br/>
              <span style={{ color: 'var(--accent)' }}>Powering Trusted Capital.</span>
            </h1>
            <p style={{ maxWidth: '640px', fontSize: 'var(--type-md)', lineHeight: 1.7, color: 'var(--muted)', marginBottom: 'var(--space-7)' }}>
              CreditLens deploys high-fidelity behavioral telemetry to underwrite the 650 million individuals lacking traditional bureau footprints securely and objectively.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
              <button className="formal-btn-primary" onClick={() => navigate('/dashboard')}>
                Initiate Underwriting Portal <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Metrics Ledger ─── */}
      <section ref={statsRef} style={{ background: 'var(--surface)' }}>
        <div className="offset-grid" style={{ padding: 'var(--space-8) 0' }}>
          {stats.map((stat, i) => (
            <div key={i} className="stat-item" style={{ gridColumn: 'span 3', borderLeft: i === 0 ? 'none' : '1px solid var(--rule)', paddingLeft: i === 0 ? '0' : 'var(--space-5)' }}>
              <div className="formal-label" style={{ marginBottom: '12px' }}>{stat.label}</div>
              <div className="formal-display tabular-nums" style={{ fontSize: 'var(--type-3xl)', color: 'var(--ink)', lineHeight: 1 }}>
                <span className="stat-number" data-target={stat.value}>0</span><span style={{ fontSize: '0.6em', marginLeft: '4px', color: 'var(--accent)' }}>{stat.suffix}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="rule-line" />

      {/* ─── Telemetry Vectors (What We Analyze) ─── */}
      <section ref={signalsRef} style={{ padding: 'var(--space-10) var(--page-pad)' }}>
        <div className="offset-grid">
          <div className="offset-label">
            <div className="formal-label" style={{ marginBottom: 'var(--space-4)', display: 'inline-block', borderBottom: '1px solid var(--ink)', paddingBottom: '4px', color: 'var(--ink)' }}>
              Vector Analysis
            </div>
            <h2 className="formal-display" style={{ fontSize: 'var(--type-xl)', marginBottom: 'var(--space-6)', color: 'var(--ink)', maxWidth: '280px' }}>
              Core Behavioral Telemetry Pipelines
            </h2>
            <p style={{ fontSize: 'var(--type-sm)', color: 'var(--muted)', maxWidth: '280px', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>
              Replacing conventional credit histories with four distinct categories of digital footprint tracing to model empirical fiscal discipline securely.
            </p>
          </div>

          <div className="offset-content">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
              {signals.map((sig, i) => (
                <div key={i} className="signal-card formal-card" style={{ padding: 'var(--space-6)', minHeight: '220px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                    <div style={{ color: 'var(--accent)' }}>{sig.icon}</div>
                    <span className="formal-label" style={{ fontSize: '9px' }}>{sig.metric}</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 'var(--type-base)', fontWeight: 600, color: 'var(--ink)', marginBottom: 'var(--space-2)' }}>{sig.title}</h3>
                    <p style={{ fontSize: 'var(--type-sm)', color: 'var(--muted)', lineHeight: 1.7 }}>{sig.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="rule-line" />

      {/* ─── Processing Sequence ─── */}
      <section ref={stepsRef} style={{ padding: 'var(--space-10) var(--page-pad)', background: 'var(--surface-2)' }}>
        <div className="offset-grid">
          <div className="offset-label">
            <div className="formal-label" style={{ marginBottom: 'var(--space-4)', display: 'inline-block', borderBottom: '1px solid var(--ink)', paddingBottom: '4px', color: 'var(--ink)' }}>
              Operational Hierarchy
            </div>
            <h2 className="formal-display" style={{ fontSize: 'var(--type-xl)', color: 'var(--ink)' }}>
              Evaluation Sequence
            </h2>
          </div>

          <div className="offset-content">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-6)' }}>
              {steps.map((step, i) => (
                <div key={i} className="step-item" style={{ borderLeft: '1px solid var(--accent)', paddingLeft: 'var(--space-4)' }}>
                  <div className="formal-display" style={{ fontSize: 'var(--type-xl)', color: 'var(--accent)', marginBottom: 'var(--space-3)' }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontSize: 'var(--type-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--ink)' }}>{step.title}</h3>
                  <p style={{ fontSize: 'var(--type-xs)', color: 'var(--muted)', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="rule-line" />

      {/* ─── Trust Architecture ─── */}
      <section ref={featuresRef} style={{ padding: 'var(--space-10) var(--page-pad)' }}>
        <div className="offset-grid">
          <div className="offset-label">
            <div className="formal-label" style={{ marginBottom: 'var(--space-4)', display: 'inline-block', borderBottom: '1px solid var(--ink)', paddingBottom: '4px', color: 'var(--ink)' }}>
              Platform Integrity
            </div>
            <h2 className="formal-display" style={{ fontSize: 'var(--type-xl)', color: 'var(--ink)', marginBottom: 'var(--space-4)', maxWidth: '280px' }}>
              Institutional Compliance Formulations
            </h2>
          </div>

          <div className="offset-content">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0' }}>
              {features.map((feat, i) => (
                <div key={i} className="feature-card interactive" style={{ padding: 'var(--space-6) 0', borderBottom: '1px solid var(--rule)', display: 'flex', gap: 'var(--space-6)', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '4px' }}>{feat.icon}</div>
                  <div style={{ flex: 1, display: 'flex', gap: 'var(--space-4)', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ maxWidth: '400px' }}>
                      <h3 style={{ fontSize: 'var(--type-base)', fontWeight: 600, color: 'var(--ink)', marginBottom: 'var(--space-2)' }}>{feat.title}</h3>
                      <p style={{ fontSize: 'var(--type-sm)', color: 'var(--muted)', lineHeight: 1.7 }}>{feat.desc}</p>
                    </div>
                    <span className="formal-label" style={{ fontSize: '9px', textAlign: 'right', minWidth: '120px' }}>{feat.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="rule-line" />

      {/* ─── Client Base ─── */}
      <section style={{ padding: 'var(--space-10) var(--page-pad)' }}>
        <div className="offset-grid">
          <div className="offset-label">
            <div className="formal-label" style={{ marginBottom: 'var(--space-4)', display: 'inline-block', borderBottom: '1px solid var(--ink)', paddingBottom: '4px', color: 'var(--ink)' }}>
              Strategic Partners
            </div>
            <h2 className="formal-display" style={{ fontSize: 'var(--type-xl)', color: 'var(--ink)' }}>
              Designed For The Enterprise
            </h2>
          </div>
          
          <div className="offset-content">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
              {targetUsers.map((user, i) => (
                <div key={i} className="formal-card interactive" style={{ padding: 'var(--space-5)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                  <div style={{ color: 'var(--accent)' }}>{user.icon}</div>
                  <div>
                    <h3 style={{ fontSize: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink)', marginBottom: '4px' }}>{user.title}</h3>
                    <p style={{ fontSize: 'var(--type-xs)', color: 'var(--muted)', lineHeight: 1.5 }}>{user.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{ padding: 'var(--space-5) var(--page-pad)', borderTop: '1px solid var(--rule)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface)' }}>
        <span className="formal-label" style={{ fontSize: '10px' }}>© {new Date().getFullYear()} CreditLens Analytics — Trust Platform</span>
        <span className="formal-label" style={{ fontSize: '10px' }}>Federated Risk Infrastructure</span>
      </footer>
    </div>
  );
}
