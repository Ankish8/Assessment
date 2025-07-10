import React from 'react';

export interface FloatingFooterProps {
  /** Content to display in the footer (typically buttons) */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Whether to show validation alerts */
  hasValidationAlert?: boolean;
  /** Validation message to display */
  validationMessage?: string;
  /** Whether to show the alert */
  showAlert?: boolean;
}

export const FloatingFooter: React.FC<FloatingFooterProps> = ({ 
  children, 
  className = '', 
  hasValidationAlert = false, 
  validationMessage = '', 
  showAlert = false 
}) => {
  const bottomSectionStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: '#ffffff',
    borderTop: '1px solid #e2e8f0',
    boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.05)',
    zIndex: 100,
  };

  const bottomContainerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const validationAlertStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#dc2626',
    fontWeight: 500,
    padding: '8px 16px',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '6px',
    textAlign: 'center',
  };

  const validationIconStyle: React.CSSProperties = {
    fontSize: '14px',
  };

  const actionButtonsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
  };

  // Mobile responsive styles
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const isSmallMobile = typeof window !== 'undefined' && window.innerWidth <= 480;

  const responsiveActionButtonsStyle: React.CSSProperties = {
    ...actionButtonsStyle,
    ...(isMobile && {
      flexDirection: 'column',
      gap: isSmallMobile ? '8px' : '12px',
    }),
  };

  const responsiveBottomContainerStyle: React.CSSProperties = {
    ...bottomContainerStyle,
    ...(isMobile && {
      padding: '12px 16px',
    }),
  };

  return (
    <div className={className} style={bottomSectionStyle}>
      <div style={responsiveBottomContainerStyle}>
        {hasValidationAlert && showAlert && validationMessage && (
          <div style={validationAlertStyle}>
            <i className="fas fa-exclamation-triangle" style={validationIconStyle}></i>
            {validationMessage}
          </div>
        )}
        
        <div style={responsiveActionButtonsStyle}>
          {children}
        </div>
      </div>
    </div>
  );
};