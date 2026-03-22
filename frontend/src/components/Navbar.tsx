import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, LayoutDashboard, Home } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '14px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15, 26, 10, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(125, 198, 126, 0.12)',
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <span style={{ fontSize: '24px' }}>🔍</span>
        <span style={{ fontWeight: 800, fontSize: '20px', color: '#5BB347', letterSpacing: '-0.01em' }}>
          CreditLens AI
        </span>
        {isDashboard && (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              color: 'rgba(232, 240, 226, 0.5)',
              padding: '3px 10px',
              background: 'rgba(91, 179, 71, 0.12)',
              borderRadius: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginLeft: '4px',
            }}
          >
            Dashboard
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {isDashboard ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/')}
            style={{
              background: 'transparent',
              color: 'rgba(232, 240, 226, 0.7)',
              border: '1.5px solid rgba(125, 198, 126, 0.25)',
              padding: '9px 20px',
              borderRadius: '9999px',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.25s',
            }}
          >
            <Home size={14} /> Home
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(91, 179, 71, 0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'linear-gradient(135deg, #5BB347, #3D8A2E)',
              color: 'white',
              border: 'none',
              padding: '9px 22px',
              borderRadius: '9999px',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 15px rgba(91, 179, 71, 0.15)',
            }}
          >
            <LayoutDashboard size={14} /> Launch Dashboard <ArrowRight size={14} />
          </motion.button>
        )}
      </div>
    </nav>
  );
}
