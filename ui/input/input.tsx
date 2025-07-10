import React, { forwardRef } from 'react';

export interface InputProps {
  /**
   * Input type
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  
  /**
   * Input size
   * @default 'base'
   */
  size?: 'sm' | 'base' | 'lg';
  
  /**
   * Input variant
   * @default 'default'
   */
  variant?: 'default' | 'filled' | 'ghost';
  
  /**
   * Input state
   * @default 'default'
   */
  state?: 'default' | 'error' | 'success';
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * Input label
   */
  label?: string;
  
  /**
   * Helper text
   */
  helperText?: string;
  
  /**
   * Error message
   */
  errorMessage?: string;
  
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Required field
   * @default false
   */
  required?: boolean;
  
  /**
   * Icon at start of input
   */
  startIcon?: React.ReactNode;
  
  /**
   * Icon at end of input
   */
  endIcon?: React.ReactNode;
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * Container CSS class
   */
  containerClassName?: string;
  
  /**
   * Input ID
   */
  id?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps & React.ComponentProps<'input'>>(({ 
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
  
  // Design tokens converted to actual values (exact from original)
  const tokens = {
    // Colors
    textPrimary: '#2a1f35',
    textSecondary: '#6b5671',
    textTertiary: '#8a7490',
    textPlaceholder: '#a695b0',
    textDisabled: '#a695b0',
    textError: '#d92d20',
    backgroundPrimary: '#ffffff',
    backgroundSecondary: '#f8f6fa',
    backgroundTertiary: '#efebf2',
    backgroundDisabled: '#efebf2',
    borderPrimary: '#ddd6e3',
    borderHover: '#c4b8cd',
    borderDisabled: '#ddd6e3',
    primary600: '#611F69',
    error300: '#fda29b',
    error500: '#f04438',
    success300: '#6ce9a6',
    success500: '#12b76a',
    success100: '#d1fadf',
    
    // Typography
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    fontWeightMedium: 500,
    fontSizeXs: '12px',
    fontSizeSm: '14px',
    fontSizeBase: '16px',
    lineHeightTight: 1.25,
    lineHeightBase: 1.5,
    
    // Spacing
    spacing1: '4px',
    spacing2: '8px',
    spacing3: '12px',
    spacing4: '16px',
    spacing5: '20px',
    spacing8: '32px',
    spacing10: '40px',
    spacing12: '48px',
    
    // Radius & shadows
    radiusMd: '8px',
    shadowFocus: '0 0 0 4px #ebd4ef',
    shadowErrorFocus: '0 0 0 4px #fee4e2',
    
    // Animation
    animationDuration: '200ms',
    animationEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    
    // Input heights
    inputHeightSm: '32px',
    inputHeightBase: '40px',
    inputHeightLg: '48px',
  };

  const containerStyles = {
    width: '100%',
  };

  const labelStyles = {
    display: 'block',
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.textPrimary,
    marginBottom: tokens.spacing2,
    lineHeight: tokens.lineHeightTight,
  };

  const requiredStyles = {
    color: tokens.error500,
    marginLeft: tokens.spacing1,
  };

  const inputWrapperStyles = {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
  };

  const baseInputStyles = {
    width: '100%',
    border: `1px solid ${tokens.borderPrimary}`,
    borderRadius: tokens.radiusMd,
    backgroundColor: tokens.backgroundPrimary,
    color: tokens.textPrimary,
    fontFamily: tokens.fontFamily,
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightBase,
    transition: `all ${tokens.animationDuration} ${tokens.animationEase}`,
    outline: 'none',
  };

  const sizeStyles = {
    sm: {
      height: tokens.inputHeightSm,
      padding: `0 ${tokens.spacing3}`,
      fontSize: tokens.fontSizeXs,
    },
    base: {
      height: tokens.inputHeightBase,
      padding: `0 ${tokens.spacing4}`,
      fontSize: tokens.fontSizeSm,
    },
    lg: {
      height: tokens.inputHeightLg,
      padding: `0 ${tokens.spacing5}`,
      fontSize: tokens.fontSizeBase,
    },
  };

  const variantStyles = {
    default: {
      backgroundColor: tokens.backgroundPrimary,
      borderColor: tokens.borderPrimary,
    },
    filled: {
      backgroundColor: tokens.backgroundSecondary,
      borderColor: 'transparent',
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      paddingLeft: 0,
      paddingRight: 0,
    },
  };

  const stateStyles = {
    default: {},
    error: {
      borderColor: tokens.error300,
      backgroundColor: tokens.backgroundPrimary,
    },
    success: {
      borderColor: tokens.success300,
    },
  };

  // Handle icon padding
  const getIconPadding = () => {
    const iconPadding = {
      sm: { start: tokens.spacing8, end: tokens.spacing8 },
      base: { start: tokens.spacing10, end: tokens.spacing10 },
      lg: { start: tokens.spacing12, end: tokens.spacing12 },
    };
    
    let paddingLeft = sizeStyles[size].padding.split(' ')[1];
    let paddingRight = sizeStyles[size].padding.split(' ')[1];
    
    if (startIcon) {
      paddingLeft = iconPadding[size].start;
    }
    if (endIcon) {
      paddingRight = iconPadding[size].end;
    }
    
    return { paddingLeft, paddingRight };
  };

  const iconPadding = getIconPadding();

  const inputStyles = {
    ...baseInputStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...stateStyles[hasError ? 'error' : state],
    ...iconPadding,
    ...(disabled && {
      backgroundColor: tokens.backgroundDisabled,
      borderColor: tokens.borderDisabled,
      color: tokens.textDisabled,
      cursor: 'not-allowed',
    }),
  };

  const iconBaseStyles = {
    position: 'absolute' as const,
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.textTertiary,
    pointerEvents: 'none' as const,
    zIndex: 1,
  };

  const startIconStyles = {
    ...iconBaseStyles,
    left: tokens.spacing3,
  };

  const endIconStyles = {
    ...iconBaseStyles,
    right: tokens.spacing3,
  };

  const helpTextStyles = {
    marginTop: tokens.spacing2,
    fontSize: tokens.fontSizeXs,
    lineHeight: tokens.lineHeightTight,
  };

  const helperTextStyles = {
    color: tokens.textSecondary,
  };

  const errorTextStyles = {
    color: tokens.textError,
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing1,
  };

  // Custom focus styles need to be handled via CSS-in-JS since we can't use :focus with inline styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .input-focus:focus {
        border-color: ${tokens.primary600} !important;
        box-shadow: ${tokens.shadowFocus} !important;
      }
      .input-focus.error:focus {
        border-color: ${tokens.error500} !important;
        box-shadow: ${tokens.shadowErrorFocus} !important;
      }
      .input-focus.success:focus {
        border-color: ${tokens.success500} !important;
        box-shadow: 0 0 0 4px ${tokens.success100} !important;
      }
      .input-focus.filled:focus {
        background-color: ${tokens.backgroundPrimary} !important;
        border-color: ${tokens.primary600} !important;
      }
      .input-focus.ghost:focus {
        background-color: ${tokens.backgroundPrimary} !important;
        border-color: ${tokens.primary600} !important;
      }
      .input-focus:hover:not(:disabled) {
        border-color: ${tokens.borderHover} !important;
      }
      .input-focus.filled:hover:not(:disabled) {
        background-color: ${tokens.backgroundTertiary} !important;
      }
      .input-focus.ghost:hover:not(:disabled) {
        background-color: ${tokens.backgroundSecondary} !important;
        border-color: ${tokens.borderPrimary} !important;
      }
      .input-focus::placeholder {
        color: ${tokens.textPlaceholder};
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const inputClassNames = [
    'input-focus',
    hasError ? 'error' : state,
    variant,
    className
  ].filter(Boolean).join(' ');

  return (
    <div style={{...containerStyles}} className={containerClassName}>
      {label && (
        <label htmlFor={inputId} style={labelStyles}>
          {label}
          {required && <span style={requiredStyles}>*</span>}
        </label>
      )}
      
      <div style={inputWrapperStyles}>
        {startIcon && (
          <div style={startIconStyles}>
            {React.cloneElement(startIcon as React.ReactElement, {
              style: { width: '16px', height: '16px' }
            })}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          style={inputStyles}
          className={inputClassNames}
          {...props}
        />
        
        {endIcon && (
          <div style={endIconStyles}>
            {React.cloneElement(endIcon as React.ReactElement, {
              style: { width: '16px', height: '16px' }
            })}
          </div>
        )}
      </div>
      
      {(helperText || errorMessage) && (
        <div style={helpTextStyles}>
          {hasError ? (
            <span style={errorTextStyles}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5C4.4 1.5 1.5 4.4 1.5 8S4.4 14.5 8 14.5S14.5 11.6 14.5 8S11.6 1.5 8 1.5ZM8 10.5C7.7 10.5 7.5 10.3 7.5 10V8C7.5 7.7 7.7 7.5 8 7.5S8.5 7.7 8.5 8V10C8.5 10.3 8.3 10.5 8 10.5ZM8 6.5C7.7 6.5 7.5 6.3 7.5 6S7.7 5.5 8 5.5S8.5 5.7 8.5 6S8.3 6.5 8 6.5Z" fill="currentColor"/>
              </svg>
              {errorMessage}
            </span>
          ) : (
            <span style={helperTextStyles}>{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';