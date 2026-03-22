import React from 'react';
import { ProfileSelector } from '../features/ProfileSelector';
import { InputForm } from '../features/InputForm';
import { Button } from '../ui/Button';
import { Search, RotateCcw } from 'lucide-react';
import type { CustomerProfile } from '../../types/credit';

interface SidebarProps {
  customerName: string;
  profile: CustomerProfile;
  onNameChange: (name: string) => void;
  onProfileChange: (profile: CustomerProfile) => void;
  onProfileSelect: (name: string, profile: CustomerProfile) => void;
  onAnalyze: () => void;
  onReset: () => void;
  isLoading: boolean;
  hasResults: boolean;
  nameError?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  customerName,
  profile,
  onNameChange,
  onProfileChange,
  onProfileSelect,
  onAnalyze,
  onReset,
  isLoading,
  hasResults,
  nameError,
}) => {
  return (
    <aside
      style={{
        width: '380px',
        minWidth: '380px',
        height: '100vh',
        overflowY: 'auto',
        background: 'var(--color-white)',
        borderRight: '2px solid var(--color-border)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid var(--color-bg-tertiary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px' }}>🔍</span>
          <div>
            <h1
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                fontSize: '22px',
                color: 'var(--color-accent-dark)',
                lineHeight: 1.1,
              }}
            >
              CreditLens AI
            </h1>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: '11px',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.02em',
              }}
            >
              Alternative Credit Scoring Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Profile Selector */}
      <ProfileSelector onSelect={onProfileSelect} />

      {/* Input Form */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <InputForm
          customerName={customerName}
          profile={profile}
          onNameChange={onNameChange}
          onProfileChange={onProfileChange}
          nameError={nameError}
        />
      </div>

      {/* CTA Buttons */}
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Button
          variant="primary"
          fullWidth
          onClick={onAnalyze}
          disabled={isLoading}
          icon={<Search size={18} />}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Customer'}
        </Button>

        {hasResults && (
          <Button
            variant="secondary"
            fullWidth
            onClick={onReset}
            icon={<RotateCcw size={16} />}
          >
            New Analysis
          </Button>
        )}
      </div>
    </aside>
  );
};
