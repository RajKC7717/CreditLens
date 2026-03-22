import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Shield,
  Brain,
  Activity,
  Zap,
  ChevronDown,
  Smartphone,
  Receipt,
  ShoppingCart,
  Radio,
  Lock,
  BarChart3,
  FileCheck2,
  HeartHandshake,
} from 'lucide-react';
import Navbar from '../components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 650, suffix: 'M+', label: 'Credit-Invisible Indians' },
  { value: 10, suffix: '', label: 'Behavioral Signals Analyzed' },
  { value: 100, suffix: '%', label: 'Privacy Preserving' },
  { value: 3, suffix: 's', label: 'Average Scoring Time' },
];

const signals = [
  {
    icon: <Smartphone size={28} />,
    title: 'UPI Transactions',
    desc: 'Tracks monthly inflow averages, frequency of P2P vs merchant payments, and spending consistency — revealing income stability even without formal salary slips.',
    metric: '₹8K – ₹60K range',
  },
  {
    icon: <Receipt size={28} />,
    title: 'Utility Bill Payments',
    desc: 'Measures punctuality of electricity, water, and gas bill payments. Average days late and missed count directly reflect financial discipline and reliability.',
    metric: '0–30 days tracked',
  },
  {
    icon: <ShoppingCart size={28} />,
    title: 'E-Commerce Behavior',
    desc: 'Analyzes COD vs prepaid ratio, product return rates, and essential vs discretionary spending — indicating financial maturity and consumer trustworthiness.',
    metric: '5 sub-signals',
  },
  {
    icon: <Radio size={28} />,
    title: 'Mobile Recharges',
    desc: 'Evaluates recharge gap variance and consistency. Regular prepaid recharges signal stable income and routine financial behavior even in cash-heavy economies.',
    metric: 'Variance < 5 = strong',
  },
];

const features = [
  {
    icon: <Brain size={32} />,
    title: 'XGBoost ML Model',
    desc: 'Production-grade gradient boosting model trained on 10 behavioral features. Produces credit scores from 0–100 with calibrated default probabilities, optimized for thin-file populations with no traditional credit history.',
    badge: 'Machine Learning',
  },
  {
    icon: <Lock size={32} />,
    title: 'Privacy-First Architecture',
    desc: 'Designed for federated learning — raw data never leaves the source institution. All scoring happens locally with only model updates shared. Fully compliant with RBI data localization norms and upcoming DPDP Act provisions.',
    badge: 'Compliance',
  },
  {
    icon: <BarChart3 size={32} />,
    title: 'LLM Explainability',
    desc: 'Every credit score is accompanied by AI-generated explanations: why the score was given, specific improvement tips for the applicant, loan product recommendations (SAFE/RISKY), and a bias & fairness audit — all in plain language.',
    badge: 'Transparency',
  },
  {
    icon: <FileCheck2 size={32} />,
    title: 'Bias & Fairness Auditing',
    desc: 'Built-in fairness checks ensure scores are not influenced by gender, religion, caste, or geography. The LLM performs an automatic bias review on every score, flagging potential discrimination before decisions are made.',
    badge: 'Ethics',
  },
];

const steps = [
  { num: '01', title: 'Enter Profile', desc: 'Input 10 behavioral signals — UPI inflow, bill payment history, spending patterns, and recharge regularity — or load a sample profile.' },
  { num: '02', title: 'AI Scoring', desc: 'XGBoost model processes all signals in under 3 seconds to produce a credit score (0–100), risk category, and default probability.' },
  { num: '03', title: 'LLM Explanation', desc: 'LLaMA 3.3 generates human-readable explanations: why this score, how to improve, which loans are safe, and a bias fairness check.' },
  { num: '04', title: 'Loan Decision', desc: 'Loan officers review the score, explanation, and recommendations to make informed, fair, and transparent credit decisions.' },
];

const targetUsers = [
  { emoji: '🏦', title: 'Bank Loan Officers', desc: 'Evaluate thin-file applicants who have no CIBIL score but demonstrate strong digital payment behavior and financial discipline.' },
  { emoji: '📊', title: 'NBFC Analysts', desc: 'Assess creditworthiness of gig workers, self-employed individuals, and small business owners using alternative behavioral data.' },
  { emoji: '💻', title: 'Fintech Product Teams', desc: 'Integrate alternative scoring APIs into lending products targeting underserved segments — from digital microloans to BNPL.' },
  { emoji: '🌾', title: 'Rural MFI Staff', desc: 'Enable microloans for rural entrepreneurs and farmers using mobile recharge and UPI patterns instead of formal income proofs.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const statsRef = useRef<HTMLDivElement>(null);
  const signalsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const usersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.from('.hero-line', { y: 80, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.15, delay: 0.3 });
      gsap.from('.hero-badge', { scale: 0.8, opacity: 0, duration: 0.6, ease: 'back.out(2)', delay: 0.8 });
      gsap.from('.hero-cta', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 1.1 });
      gsap.from('.scroll-indicator', { opacity: 0, y: -10, duration: 0.6, delay: 1.5 });

      // Stats
      if (statsRef.current) {
        gsap.from('.stat-item', {
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
          y: 40, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        });
        statsRef.current.querySelectorAll('.stat-number').forEach((counter) => {
          const target = parseInt(counter.getAttribute('data-target') || '0');
          if (target > 0) {
            gsap.fromTo(counter, { innerText: '0' }, {
              innerText: target, duration: 2, ease: 'power2.out', snap: { innerText: 1 },
              scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
            });
          }
        });
      }

      // Sections
      const animateSections = [
        { ref: signalsRef, selector: '.signal-card', x: -60 },
        { ref: featuresRef, selector: '.feature-card', y: 60 },
        { ref: stepsRef, selector: '.step-item', y: 40 },
        { ref: usersRef, selector: '.user-card', y: 40 },
      ];
      animateSections.forEach(({ ref, selector, x, y }) => {
        if (ref.current) {
          gsap.from(selector, {
            scrollTrigger: { trigger: ref.current, start: 'top 75%' },
            ...(x !== undefined ? { x } : {}),
            ...(y !== undefined ? { y } : {}),
            opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          });
        }
      });

      if (stepsRef.current) {
        gsap.from('.step-line', {
          scrollTrigger: { trigger: stepsRef.current, start: 'top 75%' },
          scaleX: 0, duration: 1.2, ease: 'power3.inOut', delay: 0.3,
        });
      }

      if (ctaRef.current) {
        gsap.from('.cta-content', {
          scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
          y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
        });
      }

      gsap.utils.toArray<HTMLElement>('.section-header').forEach((el) => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 85%' }, y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: 'var(--color-bg-dark)', color: 'var(--color-text-light)', overflowX: 'hidden' }}>
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="grid-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 40px 60px', position: 'relative' }}>
        <div className="float" style={{ position: 'absolute', top: '15%', left: '10%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,179,71,0.15), transparent)', filter: 'blur(60px)' }} />
        <div className="float-slow" style={{ position: 'absolute', bottom: '20%', right: '8%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,179,71,0.1), transparent)', filter: 'blur(80px)' }} />

        <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', background: 'rgba(91, 179, 71, 0.15)', border: '1px solid rgba(91, 179, 71, 0.3)', marginBottom: '24px', fontSize: '13px', fontWeight: 500 }}>
          <Activity size={14} style={{ color: '#5BB347' }} /> AI-Powered Alternative Credit Scoring
        </div>

        <h1 style={{ maxWidth: '900px', marginBottom: '24px' }}>
          <div className="hero-line" style={{ fontSize: '56px', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em' }}>Credit Scores for the</div>
          <div className="hero-line" style={{ fontSize: '56px', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            <span className="gradient-text">Credit-Invisible</span>
          </div>
        </h1>

        <p className="hero-line" style={{ maxWidth: '600px', fontSize: '18px', lineHeight: 1.7, color: 'rgba(232, 240, 226, 0.7)', marginBottom: '40px' }}>
          650 million Indians lack a CIBIL score. CreditLens AI analyzes digital behavioral signals — UPI transactions, utility bills, e-commerce patterns — to generate explainable trust scores for microloans.
        </p>

        <div className="hero-cta" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(91, 179, 71, 0.4)' }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/dashboard')}
            style={{ background: 'linear-gradient(135deg, #5BB347, #3D8A2E)', color: 'white', border: 'none', padding: '16px 36px', borderRadius: '9999px', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 0 30px rgba(91, 179, 71, 0.25)' }}>
            Try the Dashboard <ArrowRight size={18} />
          </motion.button>
          <a href="#how-it-works" style={{ color: '#A8D896', fontWeight: 500, fontSize: '15px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', padding: '16px 24px', borderRadius: '9999px', border: '1.5px solid rgba(125, 198, 126, 0.3)' }}>
            How it works <ChevronDown size={16} />
          </a>
        </div>

        <motion.div className="scroll-indicator" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ position: 'absolute', bottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'rgba(232, 240, 226, 0.4)', fontSize: '12px', fontWeight: 500 }}>
          <span>SCROLL</span><ChevronDown size={16} />
        </motion.div>
      </section>

      {/* ─── Stats ─── */}
      <section ref={statsRef} style={{ padding: '60px 40px', background: 'rgba(91, 179, 71, 0.06)', borderTop: '1px solid rgba(125, 198, 126, 0.1)', borderBottom: '1px solid rgba(125, 198, 126, 0.1)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
          {stats.map((stat, i) => (
            <div key={i} className="stat-item" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '42px', fontWeight: 900, color: '#5BB347', marginBottom: '4px' }}>
                <span className="stat-number" data-target={stat.value}>0</span><span>{stat.suffix}</span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(232, 240, 226, 0.6)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── What We Analyze ─── */}
      <section ref={signalsRef} style={{ padding: '100px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="section-header" style={{ marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 14px', borderRadius: '9999px', background: 'rgba(91, 179, 71, 0.12)', border: '1px solid rgba(91, 179, 71, 0.2)', fontSize: '12px', fontWeight: 600, color: '#5BB347', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
              <Activity size={12} /> Behavioral Signals
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 800, lineHeight: 1.2, marginBottom: '12px' }}>What We <span className="gradient-text">Analyze</span></h2>
            <p style={{ fontSize: '16px', color: 'rgba(232, 240, 226, 0.6)', maxWidth: '550px' }}>
              We replace traditional CIBIL-based scoring with four categories of real-world digital behavior that reveal true financial discipline.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {signals.map((sig, i) => (
              <div key={i} className="signal-card dark-glass-card" style={{ padding: '28px', display: 'flex', gap: '20px', cursor: 'default', transition: 'all 0.35s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(125, 198, 126, 0.5)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(125, 198, 126, 0.15)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                <div style={{ color: '#5BB347', flexShrink: 0, marginTop: '4px' }}>{sig.icon}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 700 }}>{sig.title}</h3>
                    <span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', background: 'rgba(91, 179, 71, 0.15)', color: '#A8D896' }}>{sig.metric}</span>
                  </div>
                  <p style={{ fontSize: '13.5px', color: 'rgba(232, 240, 226, 0.55)', lineHeight: 1.7 }}>{sig.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" ref={stepsRef} style={{ padding: '100px 40px', background: 'rgba(91, 179, 71, 0.03)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 14px', borderRadius: '9999px', background: 'rgba(91, 179, 71, 0.12)', border: '1px solid rgba(91, 179, 71, 0.2)', fontSize: '12px', fontWeight: 600, color: '#5BB347', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
              <Zap size={12} /> Process
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 800 }}>How It <span className="gradient-text">Works</span></h2>
          </div>

          <div style={{ position: 'relative' }}>
            <div className="step-line" style={{ position: 'absolute', top: '44px', left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, #3D8A2E, #5BB347, #3D8A2E)', transformOrigin: 'left', zIndex: 0 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', position: 'relative', zIndex: 1 }}>
              {steps.map((step, i) => (
                <div key={i} className="step-item" style={{ textAlign: 'center' }}>
                  <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: 'var(--color-bg-dark)', border: '2px solid #5BB347', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '28px', fontWeight: 900, color: '#5BB347', boxShadow: '0 0 30px rgba(91, 179, 71, 0.15)' }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{step.title}</h3>
                  <p style={{ fontSize: '13px', color: 'rgba(232, 240, 226, 0.5)', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Built for Trust ─── */}
      <section ref={featuresRef} style={{ padding: '100px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 14px', borderRadius: '9999px', background: 'rgba(91, 179, 71, 0.12)', border: '1px solid rgba(91, 179, 71, 0.2)', fontSize: '12px', fontWeight: 600, color: '#5BB347', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
              <Shield size={12} /> Technology
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 800 }}>Built for <span className="gradient-text">Trust</span></h2>
            <p style={{ fontSize: '16px', color: 'rgba(232, 240, 226, 0.6)', maxWidth: '560px', margin: '12px auto 0' }}>
              Every component is designed with regulatory compliance, bias prevention, and institutional-grade quality in mind.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {features.map((feat, i) => (
              <div key={i} className="feature-card dark-glass-card" style={{ padding: '32px', display: 'flex', gap: '20px', cursor: 'default', transition: 'all 0.35s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(125, 198, 126, 0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(125, 198, 126, 0.15)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                <div style={{ color: '#5BB347', flexShrink: 0, marginTop: '2px' }}>{feat.icon}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{feat.title}</h3>
                    <span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', background: 'rgba(91, 179, 71, 0.15)', color: '#A8D896', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{feat.badge}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'rgba(232, 240, 226, 0.5)', lineHeight: 1.7 }}>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Who It's For ─── */}
      <section ref={usersRef} style={{ padding: '80px 40px', background: 'rgba(91, 179, 71, 0.03)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 14px', borderRadius: '9999px', background: 'rgba(91, 179, 71, 0.12)', border: '1px solid rgba(91, 179, 71, 0.2)', fontSize: '12px', fontWeight: 600, color: '#5BB347', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
              <HeartHandshake size={12} /> Users
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 800 }}>Built for <span className="gradient-text">Decision Makers</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {targetUsers.map((user, i) => (
              <div key={i} className="user-card dark-glass-card" style={{ padding: '24px', textAlign: 'center', transition: 'all 0.35s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(125, 198, 126, 0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(125, 198, 126, 0.15)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{user.emoji}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{user.title}</h3>
                <p style={{ fontSize: '12.5px', color: 'rgba(232, 240, 226, 0.5)', lineHeight: 1.6 }}>{user.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section ref={ctaRef} style={{ padding: '100px 40px' }}>
        <div className="cta-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '60px 40px', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(91,179,71,0.12), rgba(61,138,46,0.08))', border: '1.5px solid rgba(125, 198, 126, 0.2)' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px' }}>Ready to score the <span className="gradient-text">unscored</span>?</h2>
          <p style={{ fontSize: '16px', color: 'rgba(232, 240, 226, 0.6)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
            Try CreditLens AI with sample profiles and experience alternative credit scoring — instant, explainable, and fair.
          </p>
          <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(91, 179, 71, 0.4)' }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/dashboard')}
            style={{ background: 'linear-gradient(135deg, #5BB347, #3D8A2E)', color: 'white', border: 'none', padding: '18px 44px', borderRadius: '9999px', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '17px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 0 30px rgba(91, 179, 71, 0.25)' }}>
            Open Dashboard <ArrowRight size={18} />
          </motion.button>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{ padding: '24px 40px', borderTop: '1px solid rgba(125, 198, 126, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: 'rgba(232, 240, 226, 0.3)' }}>
        <span>© 2026 CreditLens AI — Alternative Credit Scoring</span>
        <span>Built with XGBoost + LLaMA 3.3 + Federated Learning</span>
      </footer>
    </div>
  );
}
