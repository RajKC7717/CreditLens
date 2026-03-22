import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
  formatValue?: (val: number) => string;
  icon?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
  icon,
}) => {
  const displayValue = formatValue ? formatValue(value) : value.toString();
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '6px',
      }}>
        <label style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 500,
          fontSize: '13px',
          color: 'var(--color-text-primary)',
        }}>
          {icon && <span style={{ marginRight: '4px' }}>{icon}</span>}
          {label}
        </label>
        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          fontSize: '13px',
          color: 'var(--color-accent-dark)',
          background: 'var(--color-bg-tertiary)',
          padding: '2px 8px',
          borderRadius: '6px',
        }}>
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          width: '100%',
          height: '6px',
          borderRadius: '3px',
          outline: 'none',
          appearance: 'none',
          background: `linear-gradient(to right, var(--color-accent) ${percentage}%, var(--color-bg-tertiary) ${percentage}%)`,
          cursor: 'pointer',
          accentColor: 'var(--color-accent)',
        }}
      />
    </div>
  );
};
