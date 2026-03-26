import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
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
  { value: 650, suffix: 'M+', label: 'Credit-Invisible Profiles' },
  { value: 10, suffix: '', label: 'Telemetry Vectors Analyzed' },
  { value: 100, suffix: '%', label: 'Regulatory Auditing' },
  { value: 3, suffix: 's', label: 'Average Processing Time' },
];

const signals = [
  {
    icon: <Smartphone size={16} />,
    title: 'UPI Payment Telemetry',
    desc: 'Analyzes transaction velocity, peer-to-peer ratios, and consistency to determine implicit income.',
  },
  {
    icon: <Receipt size={16} />,
    title: 'Obligation Metrics',
    desc: 'Tracks utility bill payments; delinquency window variation correlates with financial capacity.',
  },
  {
    icon: <ShoppingCart size={16} />,
    title: 'Discretionary Output',
    desc: 'Ratio of essential spend against retail and return rates to gauge financial maturity.',
  },
  {
    icon: <Radio size={16} />,
    title: 'Telecon Stability',
    desc: 'Recurring prepaid rhythm indicates stable employment and adherence to procedures.',
  },
];

const features = [
  {
    icon: <Brain size={18} />,
    title: 'XGBoost Architecture',
    desc: 'Production-grade models trained on behavioral data for populations lacking formal bureau histories.',
  },
  {
    icon: <Lock size={18} />,
    title: 'Federated Security',
    desc: 'Strict data sovereignty ensuring raw client telemetries remain localized within host institutions.',
  },
  {
    icon: <BarChart3 size={18} />,
    title: 'Transparent Outcomes',
    desc: 'Neural assessments output detailed readable rationales, ensuring rigorous regulatory defensibility.',
  },
  {
    icon: <FileCheck2 size={18} />,
    title: 'Systematic Fairness',
    desc: 'Built-in auditing pipelines neutralize disparate impact risks across protected socio-economic classes.',
  },
];

const targetUsers = [
  { icon: <Landmark size={18} />, title: 'Private Banks', desc: 'Securely originate credit for the emerging affluent without traditional documentation.' },
  { icon: <Building2 size={18} />, title: 'NBFC Operations', desc: 'Deploy alternative parameter sets to underwrite micro-entrepreneurs effectively.' },
  { icon: <Briefcase size={18} />, title: 'Fintech Sponsors', desc: 'Integrate programmatic risk interfaces directly into onboarding sequences.' },
  { icon: <LineChart size={18} />, title: 'Microfinance (MFI)', desc: 'Scale rural credit deployment natively via mobile and digital proxy evaluations.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const signalsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const usersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      if (heroRef.current) {
        gsap.from(heroRef.current.querySelectorAll('.h-anim'), {
          y: 20, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', delay: 0.1
        });
      }

      // Stats Counting
      if (statsRef.current) {
        gsap.from(statsRef.current.querySelectorAll('.stat-item'), {
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
          y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        });

        statsRef.current.querySelectorAll('.stat-number').forEach((counter) => {
          const targetStr = counter.getAttribute('data-target') || '0';
          const target = parseInt(targetStr.replace(/[^0-9]/g, ''), 10);
          if (target > 0) {
            gsap.fromTo(counter,
              { innerText: '0' },
              {
                innerText: target.toString(),
                duration: 2,
                ease: 'power2.out',
                snap: { innerText: 1 },
                scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
              }
            );
          }
        });
      }

      // Card Staggers
      const animateSections = [
        { ref: signalsRef, selector: '.signal-card', title: '.section-title' },
        { ref: featuresRef, selector: '.feature-card', title: '.section-title' },
        { ref: usersRef, selector: '.user-card', title: '.section-title' },
      ];

      animateSections.forEach(({ ref, selector, title }) => {
        if (ref.current) {
          gsap.from(ref.current.querySelector(title), {
            scrollTrigger: { trigger: ref.current, start: 'top 85%' },
            y: 20, opacity: 0, duration: 0.8, ease: 'power2.out',
          });
          gsap.from(ref.current.querySelectorAll(selector), {
            scrollTrigger: { trigger: ref.current, start: 'top 80%' },
            y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          });
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: 'var(--surface)' }}>
      <Navbar />

      {/* ─── Hero Banner (Classic Corporate Blue) ─── */}
      <div ref={heroRef} style={{ background: 'linear-gradient(180deg, var(--accent) 0%, #001A33 100%)', color: '#FFFFFF', padding: '120px var(--page-pad) 60px', borderBottom: '4px solid var(--highlight)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="h-anim" style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--highlight)', marginBottom: '16px' }}>
            Enterprise Risk Assessment Engine
          </div>
          <h1 className="formal-display h-anim" style={{ fontSize: '48px', margin: '0 0 24px 0', lineHeight: 1.1, textShadow: '0 2px 4px rgba(0,0,0,0.5)', color: 'white' }}>
            Expanding Access to Capital.<br />
            Securing Institutional Trust.
          </h1>
          <p className="h-anim" style={{ fontFamily: 'var(--font-ui)', fontSize: '18px', lineHeight: 1.5, color: '#CCD6E0', maxWidth: '700px', margin: '0 0 40px 0' }}>
            CreditLens deploys advanced behavioral telemetry to empower financial institutions to underwrite the 650 million credit-invisible adults securely, objectively, and rapidly.
          </p>
          <div className="h-anim">
            <button className="formal-btn-primary" onClick={() => navigate('/dashboard')} style={{ fontSize: '14px', padding: '12px 32px' }}>
              Launch Underwriting Terminal
            </button>
          </div>
        </div>
      </div>

      {/* ─── Metrics Strip ─── */}
      <div ref={statsRef} style={{ background: '#FFFFFF', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', borderLeft: '1px solid var(--rule)', borderRight: '1px solid var(--rule)' }}>
          {stats.map((s, i) => (
            <div key={i} className="stat-item" style={{ flex: 1, padding: '24px', borderRight: i < stats.length - 1 ? '1px solid var(--rule)' : 'none', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--accent)', fontFamily: 'var(--font-ui)', marginBottom: '4px' }}>
                <span className="stat-number tabular-nums" data-target={s.value}>0</span>
                <span>{s.suffix}</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 0', display: 'flex', flexDirection: 'column', gap: '60px' }}>

        {/* ─── Telemetry Vectors ─── */}
        <div ref={signalsRef}>
          <h2 className="formal-display section-title" style={{ fontSize: '28px', color: 'var(--accent)', borderBottom: '2px solid var(--accent)', paddingBottom: '8px', marginBottom: '24px' }}>
            Behavioral Telemetry Pipelines
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {signals.map((sig, i) => (
              <div key={i} className="formal-card signal-card" style={{ padding: '20px', display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--accent)', marginTop: '2px' }}>{sig.icon}</div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--ink)', margin: '0 0 8px 0' }}>{sig.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>{sig.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Architecture & Compliance ─── */}
        <div ref={featuresRef}>
          <h2 className="formal-display section-title" style={{ fontSize: '28px', color: 'var(--accent)', borderBottom: '2px solid var(--accent)', paddingBottom: '8px', marginBottom: '24px' }}>
            Institutional Infrastructure
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {features.map((feat, i) => (
              <div key={i} className="formal-card feature-card" style={{ padding: '20px', display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--accent)', marginTop: '2px' }}>{feat.icon}</div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--ink)', margin: '0 0 8px 0' }}>{feat.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Client Types ─── */}
        <div ref={usersRef}>
          <h2 className="formal-display section-title" style={{ fontSize: '28px', color: 'var(--accent)', borderBottom: '2px solid var(--accent)', paddingBottom: '8px', marginBottom: '24px' }}>
            Enterprise Deployment Profiles
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {targetUsers.map((user, i) => (
              <div key={i} className="formal-card user-card" style={{ padding: '16px', background: '#FFFFFF' }}>
                <div style={{ color: 'var(--accent)', marginBottom: '12px' }}>{user.icon}</div>
                <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--ink)', margin: '0 0 8px 0' }}>{user.title}</h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0, lineHeight: 1.4 }}>{user.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ─── Corporate Footer ─── */}
      <footer style={{ background: 'var(--accent)', color: '#FFFFFF', padding: '32px var(--page-pad)', borderTop: '4px solid var(--highlight)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>
          <span>© {new Date().getFullYear()} CreditLens Analytics</span>
          <span style={{ color: '#A0BBE0' }}>Confidential Risk Infrastructure System</span>
        </div>
      </footer>
    </div>
  );
}
