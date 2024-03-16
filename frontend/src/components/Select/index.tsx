import React from 'react';
import './style.css'
export interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string | number | any;
  disabled: string | number | any;
  onChange: (value: string | number | any) => void;
}

export default function Select ({ options, value, disabled,  onChange }:SelectProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select className="select-field" disabled={disabled} value={value} onChange={handleChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
