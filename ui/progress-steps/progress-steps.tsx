import React from 'react';

export interface ProgressStep {
  /**
   * Unique identifier for the step
   */
  id: string | number;
  
  /**
   * Label text for the step
   */
  label: string;
}

export interface ProgressStepsProps {
  /**
   * Array of steps to display
   */
  steps: ProgressStep[];
  
  /**
   * Current active step number (1-based)
   */
  currentStep: number;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

export function ProgressSteps({ 
  steps, 
  currentStep,
  className = '',
  ...props 
}: ProgressStepsProps & React.ComponentProps<'div'>) {
  
  // Design tokens converted to actual values (exact from original)
  const tokens = {
    // Colors
    backgroundPrimary: '#ffffff',
    borderSecondary: '#c4b8cd',
    primary600: '#611F69',
    textOnPrimary: '#ffffff',
    textPrimary: '#2a1f35',
    textTertiary: '#8a7490',
    
    // Typography
    fontSizeBase: '16px',
    fontSizeSm: '14px',
    fontWeightSemibold: 600,
    fontWeightMedium: 500,
    
    // Spacing
    spacing2: '8px',
    spacing4: '16px',
    spacing5: '20px',
    spacing6: '24px',
    
    // Radius & shadows
    radiusLg: '12px',
    radiusFull: '50%',
    shadowSm: '0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)',
    shadowFocus: '0 0 0 4px #ebd4ef',
    
    // Animation
    animationDurationBase: '200ms',
    animationEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const containerStyles: React.CSSProperties = {
    background: tokens.backgroundPrimary,
    borderRadius: tokens.radiusLg,
    padding: tokens.spacing6,
    boxShadow: tokens.shadowSm,
    marginBottom: tokens.spacing5,
    overflowX: 'auto',
  };

  const progressStepsStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    minWidth: 'fit-content',
  };

  const stepStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacing2,
  };

  const baseStepCircleStyles: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: tokens.radiusFull,
    border: `2px solid ${tokens.borderSecondary}`,
    background: tokens.backgroundPrimary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase,
    color: tokens.textTertiary,
    transition: `all ${tokens.animationDurationBase} ${tokens.animationEaseInOut}`,
  };

  const activeStepCircleStyles: React.CSSProperties = {
    ...baseStepCircleStyles,
    borderColor: tokens.primary600,
    background: tokens.primary600,
    color: tokens.textOnPrimary,
    boxShadow: tokens.shadowFocus,
  };

  const completedStepCircleStyles: React.CSSProperties = {
    ...baseStepCircleStyles,
    borderColor: tokens.primary600,
    background: tokens.primary600,
    color: tokens.textOnPrimary,
  };

  const baseLabelStyles: React.CSSProperties = {
    fontSize: tokens.fontSizeSm,
    color: tokens.textTertiary,
    whiteSpace: 'nowrap',
    transition: `color ${tokens.animationDurationBase} ${tokens.animationEaseInOut}`,
  };

  const activeLabelStyles: React.CSSProperties = {
    ...baseLabelStyles,
    color: tokens.textPrimary,
    fontWeight: tokens.fontWeightMedium,
  };

  const baseDividerStyles: React.CSSProperties = {
    width: '100px',
    height: '2px',
    background: tokens.borderSecondary,
    margin: `0 ${tokens.spacing4}`,
    marginBottom: '28px',
    transition: `background-color ${tokens.animationDurationBase} ${tokens.animationEaseInOut}`,
  };

  const completedDividerStyles: React.CSSProperties = {
    ...baseDividerStyles,
    background: tokens.primary600,
  };

  // Handle responsive styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .progress-steps-container {
          padding: 20px 16px !important;
        }
        
        .progress-steps-divider {
          width: 60px !important;
          margin: 0 8px !important;
          margin-bottom: 28px !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const containerClassNames = [
    'progress-steps-container',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={containerClassNames}
      style={containerStyles}
      {...props}
    >
      <div style={progressStepsStyles}>
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          
          const stepCircleStyles = isCompleted 
            ? completedStepCircleStyles 
            : isActive 
            ? activeStepCircleStyles 
            : baseStepCircleStyles;
            
          const labelStyles = isActive ? activeLabelStyles : baseLabelStyles;
          const dividerStyles = isCompleted ? completedDividerStyles : baseDividerStyles;
          
          return (
            <React.Fragment key={step.id}>
              <div style={stepStyles}>
                <div style={stepCircleStyles}>
                  {isCompleted ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path 
                        d="M13.5 4.5L6 12L2.5 8.5" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>
                <span style={labelStyles}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div 
                  className="progress-steps-divider"
                  style={dividerStyles} 
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}