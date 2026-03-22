import React from 'react';
import { sampleProfiles } from '../../data/sampleProfiles';
import type { CustomerProfile } from '../../types/credit';

interface ProfileSelectorProps {
  onSelect: (name: string, profile: CustomerProfile) => void;
}

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onSelect }) => {
  return (
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
        📂 Load Sample Profile
      </label>
      <select
        onChange={(e) => {
          const idx = parseInt(e.target.value);
          if (idx >= 0) {
            const sp = sampleProfiles[idx];
            onSelect(sp.name, sp.profile);
          }
        }}
        defaultValue="-1"
      >
        <option value="-1" disabled>
          -- Select a profile --
        </option>
        {sampleProfiles.map((sp, i) => (
          <option key={i} value={i}>
            {sp.label}
          </option>
        ))}
      </select>
    </div>
  );
};
