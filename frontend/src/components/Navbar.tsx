import { useNavigate, useLocation } from 'react-router-dom';
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
        padding: '0 var(--space-7)',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <span className="formal-display" style={{ fontSize: 'var(--type-xl)', fontWeight: 600, color: 'var(--ink)' }}>
          CreditLens
        </span>
        {isDashboard && (
          <span className="formal-label" style={{ marginLeft: '12px', paddingLeft: '12px', borderLeft: '1px solid var(--rule)', marginTop: '4px' }}>
            Underwriting Portal
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {isDashboard ? (
          <button
            className="formal-btn-ghost"
            onClick={() => navigate('/')}
            style={{ padding: '7px 20px', fontSize: '11px' }}
          >
            Institutional Home
          </button>
        ) : (
          <button
            className="formal-btn-ghost"
            onClick={() => navigate('/dashboard')}
            style={{ padding: '7px 20px', fontSize: '11px' }}
          >
            Launch Portal
          </button>
        )}
      </div>
    </nav>
  );
}
