import React from 'react';

export interface ButtonProps {
  /**
   * Button content
   */
  children?: React.ReactNode;
  
  /**
   * Button variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'success' | 'outline';
  
  /**
   * Button size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * Button type
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * Icon element
   */
  icon?: React.ReactNode;
  
  /**
   * Icon position
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';
  
  /**
   * Icon only button
   * @default false
   */
  iconOnly?: boolean;
  
  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Render as different element
   * @default 'button'
   */
  as?: 'button' | 'a';
}

export function Button({ 
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
}: ButtonProps) {
  // Design tokens converted to actual values
  const tokens = {
    // Colors
    primary600: '#611F69',
    primary700: '#5a1f60',
    primary800: '#4d1a54',
    primary100: '#ebd4ef',
    primary50: '#f7edf8',
    textOnPrimary: '#ffffff',
    textPrimary: '#2a1f35',
    backgroundPrimary: '#ffffff',
    backgroundSecondary: '#f8f6fa',
    backgroundTertiary: '#efebf2',
    borderPrimary: '#ddd6e3',
    borderHover: '#c4b8cd',
    error600: '#d92d20',
    error700: '#b42318',
    success600: '#039855',
    success700: '#027a48',
    
    // Typography
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    fontWeightMedium: 500,
    fontSizeSm: '14px',
    fontSizeBase: '16px',
    fontSizeLg: '18px',
    
    // Spacing
    spacing1: '4px',
    spacing2: '8px',
    spacing3: '12px',
    spacing4: '16px',
    spacing5: '20px',
    spacing6: '24px',
    
    // Radius & shadows
    radiusMd: '8px',
    shadowXs: '0 1px 2px rgba(16, 24, 40, 0.05)',
    shadowSm: '0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)',
    shadowFocus: '0 0 0 4px #ebd4ef',
    shadowErrorFocus: '0 0 0 4px #fee4e2',
    
    // Animation
    animationDuration: '200ms',
    animationEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    
    // Button heights
    buttonHeightSm: '32px',
    buttonHeightBase: '40px',
    buttonHeightLg: '48px',
    buttonHeightXl: '56px',
  };

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: tokens.fontFamily,
    fontWeight: tokens.fontWeightMedium,
    border: 'none',
    borderRadius: tokens.radiusMd,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: `all ${tokens.animationDuration} ${tokens.animationEase}`,
    outline: 'none',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    textDecoration: 'none',
    whiteSpace: 'nowrap' as const,
    opacity: disabled ? 0.5 : 1,
  };

  const variantStyles = {
    primary: {
      backgroundColor: tokens.primary600,
      color: tokens.textOnPrimary,
      boxShadow: tokens.shadowXs,
    },
    secondary: {
      backgroundColor: tokens.backgroundPrimary,
      color: tokens.textPrimary,
      border: `1px solid ${tokens.borderPrimary}`,
      boxShadow: tokens.shadowXs,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: tokens.textPrimary,
      border: '1px solid transparent',
    },
    destructive: {
      backgroundColor: tokens.error600,
      color: tokens.textOnPrimary,
      boxShadow: tokens.shadowXs,
    },
    success: {
      backgroundColor: tokens.success600,
      color: tokens.textOnPrimary,
      boxShadow: tokens.shadowXs,
    },
    outline: {
      backgroundColor: 'transparent',
      color: tokens.primary600,
      border: `1px solid ${tokens.primary600}`,
    },
  };

  const sizeStyles = {
    small: {
      padding: `0 ${tokens.spacing3}`,
      fontSize: tokens.fontSizeSm,
      height: tokens.buttonHeightSm,
      gap: tokens.spacing1,
    },
    medium: {
      padding: `0 ${tokens.spacing4}`,
      fontSize: tokens.fontSizeSm,
      height: tokens.buttonHeightBase,
      gap: tokens.spacing2,
    },
    large: {
      padding: `0 ${tokens.spacing5}`,
      fontSize: tokens.fontSizeBase,
      height: tokens.buttonHeightLg,
      gap: tokens.spacing2,
    },
    xlarge: {
      padding: `0 ${tokens.spacing6}`,
      fontSize: tokens.fontSizeLg,
      height: tokens.buttonHeightXl,
      gap: tokens.spacing3,
    },
  };

  const buttonStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...(fullWidth && { width: '100%' }),
    ...(iconOnly && {
      aspectRatio: '1',
      padding: 0,
      width: sizeStyles[size].height,
    }),
    ...(loading && {
      color: 'transparent',
    }),
  };

  const iconStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const iconSizes = {
    small: { width: '14px', height: '14px' },
    medium: { width: '16px', height: '16px' },
    large: { width: '18px', height: '18px' },
    xlarge: { width: '20px', height: '20px' },
  };

  const loadingSpinnerStyles = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '16px',
    height: '16px',
    border: '2px solid transparent',
    borderTop: '2px solid currentColor',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  const Component = as;

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `}
      </style>
      <Component
        type={as === 'button' ? type : undefined}
        style={buttonStyles}
        disabled={disabled}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {loading && <div style={loadingSpinnerStyles} />}
        {icon && iconPosition === 'left' && (
          <span style={{...iconStyles, ...iconSizes[size]}}>
            {icon}
          </span>
        )}
        {!iconOnly && children}
        {icon && iconPosition === 'right' && (
          <span style={{...iconStyles, ...iconSizes[size]}}>
            {icon}
          </span>
        )}
        {iconOnly && !icon && children}
      </Component>
    </>
  );
}