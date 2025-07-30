import React from 'react';
import styles from './Button.module.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  onClick,
  type = 'button',
  className = '',
  icon,
  iconPosition = 'left',
  iconOnly = false,
  fullWidth = false,
  as = 'button',
  ...props 
}) => {
  // Map size aliases
  const sizeMap = {
    'sm': 'small',
    'md': 'medium', 
    'lg': 'large',
    'xl': 'xlarge',
    'small': 'small',
    'medium': 'medium',
    'large': 'large',
    'xlarge': 'xlarge'
  };
  
  const mappedSize = sizeMap[size] || 'medium';
  const Component = as;
  
  const buttonClass = [
    styles.button,
    styles[variant],
    styles[mappedSize],
    loading && styles.loading,
    iconOnly && styles.iconOnly,
    fullWidth && styles.fullWidth,
    className
  ].filter(Boolean).join(' ');

  const isDisabled = disabled || loading;

  const handleClick = (e) => {
    if (!isDisabled && onClick) {
      onClick(e);
    }
  };

  return (
    <Component
      type={as === 'button' ? type : undefined}
      className={buttonClass}
      disabled={isDisabled}
      onClick={handleClick}
      aria-disabled={isDisabled}
      {...props}
    >
      {loading && <div className={styles.loadingSpinner} />}
      {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
      {!iconOnly && children}
      {icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
      {iconOnly && !icon && children}
    </Component>
  );
};

export default Button;