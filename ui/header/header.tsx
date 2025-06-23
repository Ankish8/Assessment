import React from 'react';

export interface HeaderProps {
  /**
   * Header title text
   */
  title?: string;
  
  /**
   * Custom back button handler
   */
  onBack?: () => void;
  
  /**
   * Show or hide the back button
   * @default true
   */
  showBackButton?: boolean;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

export function Header({ 
  title, 
  onBack, 
  showBackButton = true,
  className = '',
  ...props 
}: HeaderProps & React.ComponentProps<'div'>) {
  
  // Design tokens converted to actual values (exact from original)
  const tokens = {
    // Colors
    primary600: '#611F69',
    primary700: '#5a1f60',
    primary800: '#4d1b54',
    textOnPrimary: '#ffffff',
    textPrimary: '#2a1f35',
    
    // Typography
    fontSize3xl: '30px',
    fontWeightSemibold: 600,
    lineHeightTight: 1.25,
    
    // Spacing
    spacing4: '16px',
    spacing8: '32px',
    
    // Radius & shadows
    radiusLg: '12px',
    shadowXs: '0 1px 2px rgba(16, 24, 40, 0.05)',
    shadowSm: '0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)',
    shadowFocus: '0 0 0 4px #ebd4ef',
    
    // Animation
    animationDurationBase: '200ms',
    animationEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  };
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // Fallback to browser history for environments without router
      if (typeof window !== 'undefined' && window.history) {
        window.history.back();
      }
    }
  };

  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing4,
    marginBottom: tokens.spacing8,
  };

  const backButtonStyles = {
    width: '44px',
    height: '44px',
    background: tokens.primary600,
    border: 'none',
    borderRadius: tokens.radiusLg,
    color: tokens.textOnPrimary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: `all ${tokens.animationDurationBase} ${tokens.animationEaseInOut}`,
    boxShadow: tokens.shadowXs,
  };

  const titleStyles = {
    fontSize: tokens.fontSize3xl,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.textPrimary,
    margin: 0,
    lineHeight: tokens.lineHeightTight,
  };

  // Handle hover and active effects with CSS-in-JS
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .header-back-button:hover {
        background: ${tokens.primary700} !important;
        box-shadow: ${tokens.shadowSm} !important;
      }
      
      .header-back-button:active {
        transform: translateY(1px) !important;
        background: ${tokens.primary800} !important;
      }
      
      .header-back-button:focus {
        outline: none !important;
        box-shadow: ${tokens.shadowFocus} !important;
      }
      
      /* Responsive adjustments */
      @media (max-width: 640px) {
        .header-component {
          margin-bottom: ${tokens.spacing4} !important;
        }
        
        .header-title {
          font-size: 24px !important;
        }
        
        .header-back-button {
          width: 40px !important;
          height: 40px !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const headerClassNames = [
    'header-component',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={headerClassNames}
      style={headerStyles}
      {...props}
    >
      {showBackButton && (
        <button 
          className="header-back-button"
          style={backButtonStyles}
          onClick={handleBack} 
          aria-label="Go back"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path 
              d="M12.5 5L7.5 10L12.5 15" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      <h1 className="header-title" style={titleStyles}>
        {title}
      </h1>
    </div>
  );
}