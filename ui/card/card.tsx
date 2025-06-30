import React from 'react';

export interface CardProps {
  /**
   * Card content
   */
  children?: React.ReactNode;
  
  /**
   * Visual style variant
   * @default 'elevated'
   */
  variant?: 'elevated' | 'outlined' | 'filled' | 'ghost';
  
  /**
   * Internal padding size
   * @default 'base'
   */
  padding?: 'none' | 'sm' | 'base' | 'lg';
  
  /**
   * Border radius size
   * @default 'base'
   */
  radius?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
  
  /**
   * Enable hover effects
   * @default false
   */
  hoverable?: boolean;
  
  /**
   * Make card clickable with pointer cursor
   * @default false
   */
  clickable?: boolean;
  
  /**
   * Show selected state
   * @default false
   */
  selected?: boolean;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Click handler function
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /**
   * Custom header content (overrides title/subtitle/action)
   */
  header?: React.ReactNode;
  
  /**
   * Footer content
   */
  footer?: React.ReactNode;
  
  /**
   * Card title (used in default header)
   */
  title?: string;
  
  /**
   * Card subtitle (used in default header)
   */
  subtitle?: string;
  
  /**
   * Action element for header (usually a button)
   */
  action?: React.ReactNode;
}

export function Card({ 
  variant = 'elevated',
  padding = 'base',
  radius = 'base',
  hoverable = false,
  clickable = false,
  selected = false,
  children,
  className = '',
  onClick,
  header,
  footer,
  title,
  subtitle,
  action,
  ...props 
}: CardProps & Omit<React.ComponentProps<'div'>, 'onClick'>) {
  
  // Design tokens converted to actual values (exact from original)
  const tokens = {
    // Colors
    backgroundPrimary: '#ffffff',
    backgroundSecondary: '#f8f6fa',
    borderPrimary: '#ddd6e3',
    borderHover: '#c4b8cd',
    primary600: '#611F69',
    textPrimary: '#2a1f35',
    textSecondary: '#6b5671',
    
    // Typography
    fontSizeLg: '18px',
    fontSizeSm: '14px',
    fontWeightSemibold: 600,
    lineHeightTight: 1.25,
    lineHeightBase: 1.5,
    
    // Spacing
    spacing1: '4px',
    spacing4: '16px',
    cardPaddingSm: '16px',
    cardPaddingBase: '24px',
    cardPaddingLg: '32px',
    
    // Radius
    radiusNone: '0',
    radiusSm: '4px',
    radiusBase: '6px',
    radiusMd: '8px',
    radiusLg: '12px',
    radiusXl: '16px',
    
    // Shadows
    shadowSm: '0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)',
    shadowMd: '0 4px 8px -2px rgba(16, 24, 40, 0.1), 0 2px 4px -2px rgba(16, 24, 40, 0.06)',
    shadowLg: '0 12px 16px -4px rgba(16, 24, 40, 0.08), 0 4px 6px -2px rgba(16, 24, 40, 0.03)',
    shadowFocus: '0 0 0 4px #ebd4ef',
    
    // Animation
    animationDuration: '200ms',
    animationEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const baseStyles = {
    backgroundColor: tokens.backgroundPrimary,
    border: `1px solid ${tokens.borderPrimary}`,
    transition: `all ${tokens.animationDuration} ${tokens.animationEase}`,
    position: 'relative' as const,
    overflow: 'hidden' as const,
  };

  const variantStyles = {
    elevated: {
      boxShadow: tokens.shadowSm,
      border: 'none',
    },
    outlined: {
      border: `1px solid ${tokens.borderPrimary}`,
      boxShadow: 'none',
    },
    filled: {
      backgroundColor: tokens.backgroundSecondary,
      border: 'none',
      boxShadow: 'none',
    },
    ghost: {
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
    },
  };

  const paddingStyles = {
    none: { padding: 0 },
    sm: { padding: tokens.cardPaddingSm },
    base: { padding: tokens.cardPaddingBase },
    lg: { padding: tokens.cardPaddingLg },
  };

  const radiusStyles = {
    none: { borderRadius: tokens.radiusNone },
    sm: { borderRadius: tokens.radiusSm },
    base: { borderRadius: tokens.radiusBase },
    md: { borderRadius: tokens.radiusMd },
    lg: { borderRadius: tokens.radiusLg },
    xl: { borderRadius: tokens.radiusXl },
  };

  const interactiveStyles = {
    cursor: clickable ? 'pointer' : 'default',
    ...(selected && {
      borderColor: tokens.primary600,
      boxShadow: variant === 'elevated' 
        ? `${tokens.shadowMd}, ${tokens.shadowFocus}`
        : tokens.shadowFocus,
    }),
  };

  const cardStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...paddingStyles[padding],
    ...radiusStyles[radius],
    ...interactiveStyles,
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick && (clickable || hoverable)) {
      onClick(e);
    }
  };

  const hasHeader = header || title || subtitle || action;

  const headerStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: tokens.spacing4,
    marginBottom: padding === 'none' ? 0 : tokens.spacing4,
    ...(padding === 'none' && {
      padding: tokens.cardPaddingBase,
    }),
  };

  const headerContentStyles = {
    flex: 1,
    minWidth: 0,
  };

  const titleStyles = {
    fontSize: tokens.fontSizeLg,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.textPrimary,
    margin: `0 0 ${tokens.spacing1} 0`,
    lineHeight: tokens.lineHeightTight,
  };

  const subtitleStyles = {
    fontSize: tokens.fontSizeSm,
    color: tokens.textSecondary,
    margin: 0,
    lineHeight: tokens.lineHeightBase,
  };

  const actionStyles = {
    flexShrink: 0,
  };

  const contentStyles = {
    flex: 1,
  };

  const footerStyles = {
    marginTop: padding === 'none' ? 0 : tokens.spacing4,
    paddingTop: tokens.spacing4,
    borderTop: `1px solid ${tokens.borderPrimary}`,
    ...(padding === 'none' && {
      padding: tokens.cardPaddingBase,
      marginTop: 0,
    }),
  };

  // Handle hover and click effects with CSS-in-JS
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .card-hover.hoverable:hover {
        transform: translateY(-2px);
        box-shadow: ${tokens.shadowLg} !important;
        border-color: ${tokens.borderHover} !important;
      }
      .card-hover.clickable:hover {
        box-shadow: ${tokens.shadowMd} !important;
        border-color: ${tokens.borderHover} !important;
      }
      .card-hover.clickable:active {
        transform: translateY(1px);
        box-shadow: ${tokens.shadowSm} !important;
      }
      
      /* Responsive adjustments */
      @media (max-width: 640px) {
        .card-hover.padding-lg {
          padding: ${tokens.cardPaddingBase} !important;
        }
        .card-hover.padding-base {
          padding: ${tokens.cardPaddingSm} !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const cardClassNames = [
    'card-hover',
    hoverable && 'hoverable',
    clickable && 'clickable',
    selected && 'selected',
    `padding-${padding}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      style={cardStyles}
      onClick={handleClick}
      className={cardClassNames}
      {...props}
    >
      {hasHeader && (
        <div style={headerStyles}>
          {header || (
            <>
              <div style={headerContentStyles}>
                {title && <h3 style={titleStyles}>{title}</h3>}
                {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
              </div>
              {action && <div style={actionStyles}>{action}</div>}
            </>
          )}
        </div>
      )}
      
      <div style={contentStyles}>
        {children}
      </div>
      
      {footer && (
        <div style={footerStyles}>
          {footer}
        </div>
      )}
    </div>
  );
}