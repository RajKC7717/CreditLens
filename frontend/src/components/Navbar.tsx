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
        padding: '0 var(--page-pad)',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--accent)',
        borderBottom: '4px solid var(--highlight)', /* Institutional Gold strip */
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <span className="formal-display" style={{ fontSize: 'var(--type-xl)', fontWeight: 'normal', color: '#FFFFFF', letterSpacing: '1px' }}>
          CreditLens
        </span>
        {isDashboard && (
          <span style={{ marginLeft: '12px', paddingLeft: '12px', borderLeft: '1px solid #4D7399', fontSize: '12px', color: '#A0BBE0', fontFamily: 'var(--font-ui)', fontWeight: 'bold', textTransform: 'uppercase' }}>
            Corporate Underwriting
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {isDashboard ? (
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '6px 14px',
              fontSize: '11px',
              fontFamily: 'var(--font-ui)',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              background: '#FFFFFF',
              border: '1px solid #A0BBE0',
              cursor: 'pointer'
            }}
          >
            Terminal Output &gt;
          </button>
        ) : (
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '6px 14px',
              fontSize: '11px',
              fontFamily: 'var(--font-ui)',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              background: '#FFFFFF',
              border: '1px solid #A0BBE0',
              cursor: 'pointer'
            }}
          >
            Access Portal &gt;
          </button>
        )}
      </div>
    </nav>
  );
}
