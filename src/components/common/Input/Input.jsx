import React, { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(({ 
  type = 'text',
  size = 'base',
  variant = 'default',
  state = 'default',
  placeholder,
  label,
  helperText,
  errorMessage,
  disabled = false,
  required = false,
  startIcon,
  endIcon,
  className = '',
  containerClassName = '',
  id,
  ...props 
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = state === 'error' || !!errorMessage;
  
  const inputClasses = [
    styles.input,
    styles[size],
    styles[variant],
    styles[state],
    startIcon && styles.hasStartIcon,
    endIcon && styles.hasEndIcon,
    disabled && styles.disabled,
    hasError && styles.error,
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    styles.container,
    containerClassName
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={styles.inputWrapper}>
        {startIcon && (
          <div className={styles.startIcon}>
            {startIcon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
          {...props}
        />
        
        {endIcon && (
          <div className={styles.endIcon}>
            {endIcon}
          </div>
        )}
      </div>
      
      {(helperText || errorMessage) && (
        <div className={styles.helpText}>
          {hasError ? (
            <span className={styles.errorText}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5C4.4 1.5 1.5 4.4 1.5 8S4.4 14.5 8 14.5S14.5 11.6 14.5 8S11.6 1.5 8 1.5ZM8 10.5C7.7 10.5 7.5 10.3 7.5 10V8C7.5 7.7 7.7 7.5 8 7.5S8.5 7.7 8.5 8V10C8.5 10.3 8.3 10.5 8 10.5ZM8 6.5C7.7 6.5 7.5 6.3 7.5 6S7.7 5.5 8 5.5S8.5 5.7 8.5 6S8.3 6.5 8 6.5Z" fill="currentColor"/>
              </svg>
              {errorMessage}
            </span>
          ) : (
            <span className={styles.helperText}>{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;