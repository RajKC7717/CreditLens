import React from 'react';
import { Slider } from '../ui/Slider';
import { SectionHeader } from '../ui/SectionHeader';
import type { CustomerProfile } from '../../types/credit';

interface InputFormProps {
  customerName: string;
  profile: CustomerProfile;
  onNameChange: (name: string) => void;
  onProfileChange: (profile: CustomerProfile) => void;
  nameError?: string;
}

export const InputForm: React.FC<InputFormProps> = ({
  customerName,
  profile,
  onNameChange,
  onProfileChange,
  nameError,
}) => {
  const update = (key: keyof CustomerProfile, value: number) => {
    onProfileChange({ ...profile, [key]: value });
  };

  return (
    <div>
      {/* Customer Name */}
      <div style={{ marginBottom: '20px' }}>
        <label
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: '13px',
            color: 'var(--color-accent-dark)',
            display: 'block',
            marginBottom: '6px',
          }}
        >
          👤 Customer Name
        </label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter customer name..."
          style={nameError ? { borderColor: 'var(--color-error)' } : {}}
        />
        {nameError && (
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '12px',
              color: 'var(--color-error)',
              marginTop: '4px',
              display: 'block',
            }}
          >
            {nameError}
          </span>
        )}
      </div>

      {/* Income Signals */}
      <SectionHeader title="Income Signals" icon="💰" />
      <div style={{ marginBottom: '8px' }}>
        <label
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: '13px',
            color: 'var(--color-text-primary)',
            display: 'block',
            marginBottom: '6px',
          }}
        >
          Monthly UPI Inflow (₹)
        </label>
        <div style={{ position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontWeight: 600,
              color: 'var(--color-accent-dark)',
              fontSize: '14px',
            }}
          >
            ₹
          </span>
          <input
            type="number"
            value={profile.monthly_inflow_avg}
            onChange={(e) => update('monthly_inflow_avg', parseFloat(e.target.value) || 0)}
            min={0}
            step={1000}
            style={{ paddingLeft: '28px' }}
          />
        </div>
      </div>

      <Slider
        label="Transaction Frequency (per month)"
        value={profile.inflow_transaction_count}
        min={1}
        max={20}
        step={1}
        onChange={(v) => update('inflow_transaction_count', v)}
      />

      {/* Spending Signals */}
      <SectionHeader title="Spending Signals" icon="📊" />
      <Slider
        label="Essential Spend Ratio"
        value={profile.essential_spend_ratio}
        min={0}
        max={1}
        step={0.05}
        onChange={(v) => update('essential_spend_ratio', v)}
        formatValue={(v) => `${Math.round(v * 100)}%`}
      />
      <Slider
        label="Cash on Delivery Usage"
        value={profile.ecommerce_cod_ratio}
        min={0}
        max={1}
        step={0.05}
        onChange={(v) => update('ecommerce_cod_ratio', v)}
        formatValue={(v) => `${Math.round(v * 100)}%`}
      />
      <Slider
        label="E-commerce Return Rate"
        value={profile.ecommerce_return_rate}
        min={0}
        max={1}
        step={0.05}
        onChange={(v) => update('ecommerce_return_rate', v)}
        formatValue={(v) => `${Math.round(v * 100)}%`}
      />
      <Slider
        label="P2P vs Merchant Payment Ratio"
        value={profile.p2p_vs_p2m_ratio}
        min={0}
        max={1}
        step={0.05}
        onChange={(v) => update('p2p_vs_p2m_ratio', v)}
        formatValue={(v) => `${Math.round(v * 100)}%`}
      />

      {/* Bill Payment Signals */}
      <SectionHeader title="Bill Payment Signals" icon="🧾" />
      <Slider
        label="Utility Bill Avg Days Late"
        value={profile.utility_avg_days_late}
        min={-10}
        max={30}
        step={0.5}
        onChange={(v) => update('utility_avg_days_late', v)}
        formatValue={(v) => `${v > 0 ? '+' : ''}${v.toFixed(1)} days`}
      />
      <Slider
        label="Utility Bills Missed"
        value={profile.utility_missed_count}
        min={0}
        max={10}
        step={1}
        onChange={(v) => update('utility_missed_count', v)}
      />
      <Slider
        label="Mobile Recharge Gap Variance (days)"
        value={profile.recharge_gap_variance}
        min={0}
        max={20}
        step={0.5}
        onChange={(v) => update('recharge_gap_variance', v)}
        formatValue={(v) => `${v.toFixed(1)} days`}
      />

      {/* External Score */}
      <SectionHeader title="External Score" icon="🏦" />
      <Slider
        label="External Credit Score (normalized)"
        value={profile.external_score_avg}
        min={0}
        max={1}
        step={0.05}
        onChange={(v) => update('external_score_avg', v)}
        formatValue={(v) => `${Math.round(v * 100)}/100`}
      />
    </div>
  );
};
