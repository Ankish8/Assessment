import React from 'react';

// React component
const Button = ({ label, variant = 'primary', size = 'medium', disabled = false, onClick }) => {
  const baseStyles = {
    padding: size === 'small' ? '8px 16px' : size === 'large' ? '12px 24px' : '10px 20px',
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    borderRadius: '8px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    opacity: disabled ? '0.5' : '1',
  };

  const variantStyles = {
    primary: {
      backgroundColor: '#7f56d9',
      color: 'white',
    },
    secondary: {
      backgroundColor: '#f9fafb',
      color: '#344054',
      border: '1px solid #d0d5dd',
    },
  };

  return (
    <button
      style={{ ...baseStyles, ...variantStyles[variant] }}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default {
  title: 'React Examples/Button',
  component: Button,
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
  },
};

export const Primary = {
  args: {
    label: 'Button',
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    label: 'Button',
    variant: 'secondary',
  },
};