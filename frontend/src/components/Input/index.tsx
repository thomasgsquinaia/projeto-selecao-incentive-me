import React from 'react';
import './style.css';

interface InputProps {
  label: string;
  value: string;
  disabled?: string | any;
  onChange: (value: string) => void;
}

export default function Input({ label, value, disabled, onChange }: InputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input
        disabled={disabled}
        className="input-field"
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}


