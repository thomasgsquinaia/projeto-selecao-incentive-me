import React from 'react';
import './style.css';

interface ButtonProps {
  onClick: () => void | any;
  color?: string;
  backgroundColor?: string;
  children?: any;
}

export default function Button ({ onClick, color, backgroundColor,children }:ButtonProps) {
  const buttonStyle: React.CSSProperties = {
    color: color || '#ffffff',
    backgroundColor: backgroundColor || '#1976D2',
  };

  return (
    <button className="custom-button" style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
}


