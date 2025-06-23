import React, { useState, useEffect, useRef } from 'react';

export interface ResponsiveProgressStep {
  /**
   * Unique identifier for the step
   */
  id: string | number;
  
  /**
   * Display label for the step
   */
  label: string;
  
  /**
   * Optional description text
   */
  description?: string;
}

export interface ResponsiveProgressStepsProps {
  /**
   * Array of steps to display
   */
  steps: ResponsiveProgressStep[];
  
  /**
   * Current active step number (1-based)
   */
  currentStep: number;
  
  /**
   * Layout variant
   * @default 'horizontal'
   */
  variant?: 'horizontal' | 'vertical' | 'adaptive';
  
  /**
   * Show labels on mobile devices
   * @default false
   */
  showLabelsOnMobile?: boolean;
  
  /**
   * Use compact spacing
   * @default false
   */
  compact?: boolean;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

export function ResponsiveProgressSteps({ 
  steps, 
  currentStep, 
  variant = 'horizontal',
  showLabelsOnMobile = false,
  compact = false,
  className = ''
}: ResponsiveProgressStepsProps & React.ComponentProps<'div'>) {
  
  const [activeStepIndex, setActiveStepIndex] = useState(currentStep - 1);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  // Design tokens converted to actual values (exact from original with system-reminder updates)
  const tokens = {
    // Colors
    backgroundPrimary: '#ffffff',
    backgroundSecondary: '#f8f6fa',
    borderSecondary: '#c4b8cd',
    primary600: '#611F69',
    textPrimary: '#2a1f35',
    textSecondary: '#6b5671',
    textTertiary: '#8a7490',
    
    // Typography
    fontSizeSm: '14px',
    fontWeightBold: 700,
    fontWeightSemibold: 600,
    lineHeightTight: 1.25,
    lineHeightBase: 1.5,
    
    // Spacing
    spacing2: '8px',
    spacing4: '16px',
    spacing6: '24px',
    
    // Radius & shadows
    radiusBase: '6px',
    radiusMd: '8px',
    radiusFull: '50%',
    shadowFocus: '0 0 0 4px #ebd4ef',
    
    // Animation
    animationDurationBase: '200ms',
    animationEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  };

  // Check if content is overflowing
  useEffect(() => {
    const checkOverflow = () => {
      if (stepsRef.current && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const stepsWidth = stepsRef.current.scrollWidth;
        setIsOverflowing(stepsWidth > containerWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [steps]);

  // Auto-scroll to active step when it changes
  useEffect(() => {
    if (stepsRef.current && variant === 'horizontal') {
      const activeElement = stepsRef.current.children[activeStepIndex * 2]; // Account for dividers
      if (activeElement) {
        (activeElement as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeStepIndex, variant]);

  useEffect(() => {
    setActiveStepIndex(currentStep - 1);
  }, [currentStep]);

  // Styles
  const containerStyles: React.CSSProperties = {
    background: tokens.backgroundPrimary,
    borderRadius: tokens.radiusBase,
    padding: compact ? tokens.spacing4 : tokens.spacing6,
    boxShadow: '0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)',
    marginBottom: tokens.spacing6,
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    position: 'relative',
  };

  const progressIndicatorStyles: React.CSSProperties = {
    display: 'block',
    marginBottom: tokens.spacing4,
    textAlign: 'center',
  };

  const progressTextStyles: React.CSSProperties = {
    fontSize: tokens.fontSizeSm,
    color: tokens.textSecondary,
    marginBottom: tokens.spacing2,
  };

  const progressBarStyles: React.CSSProperties = {
    width: '100%',
    height: '4px',
    backgroundColor: tokens.backgroundSecondary,
    borderRadius: tokens.radiusBase,
    overflow: 'hidden',
  };

  const progressFillStyles: React.CSSProperties = {
    height: '100%',
    backgroundColor: tokens.primary600,
    transition: `width ${tokens.animationDurationBase} ${tokens.animationEaseInOut}`,
    width: `${(currentStep / steps.length) * 100}%`,
  };

  const stepsContainerStyles: React.CSSProperties = {
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    paddingBottom: tokens.spacing2,
  };

  const stepsStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    justifyContent: 'space-between',
    gap: 0,
  };

  const baseStepStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacing2,
    cursor: 'pointer',
    scrollSnapAlign: 'center',
    transition: `transform ${tokens.animationDurationBase} ${tokens.animationEaseInOut}`,
    padding: tokens.spacing2,
    borderRadius: tokens.radiusMd,
    flexShrink: 0,
    flex: 1,
    maxWidth: '180px',
  };

  const stepCircleStyles: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: tokens.radiusFull,
    border: `2px solid ${tokens.borderSecondary}`,
    background: tokens.backgroundPrimary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeSm,
    color: tokens.textTertiary,
    transition: `all ${tokens.animationDurationBase} ${tokens.animationEaseInOut}`,
    position: 'relative',
    zIndex: 2,
  };

  const stepLabelStyles: React.CSSProperties = {
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.textSecondary,
    textAlign: 'center',
    lineHeight: tokens.lineHeightTight,
    transition: `color ${tokens.animationDurationBase} ${tokens.animationEaseInOut}`,
  };

  const stepDescriptionStyles: React.CSSProperties = {
    fontSize: '12px',
    color: tokens.textTertiary,
    textAlign: 'center',
    lineHeight: tokens.lineHeightBase,
    marginTop: '2px',
  };

  const stepNumberStyles: React.CSSProperties = {
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightBold,
  };

  const dividerStyles: React.CSSProperties = {
    flex: 1,
    height: '2px',
    background: tokens.borderSecondary,
    marginTop: '20px',
    marginLeft: tokens.spacing2,
    marginRight: tokens.spacing2,
    transition: `background-color ${tokens.animationDurationBase} ${tokens.animationEaseInOut}`,
    position: 'relative',
    zIndex: 1,
  };

  const verticalContainerStyles: React.CSSProperties = {
    ...containerStyles,
    display: 'flex',
    flexDirection: 'column',
  };

  const verticalStepsStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing4,
  };

  const verticalStepStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacing4,
  };

  const verticalDividerStyles: React.CSSProperties = {
    width: '2px',
    height: '40px',
    background: tokens.borderSecondary,
    marginLeft: '19px',
    transition: `background-color ${tokens.animationDurationBase} ${tokens.animationEaseInOut}`,
  };

  // Handle responsive and interaction styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .responsive-progress-container::-webkit-scrollbar {
        display: none;
      }
      
      .responsive-progress-step:hover {
        transform: translateY(-2px) !important;
      }
      
      .responsive-progress-step:focus-visible {
        outline: 2px solid ${tokens.primary600} !important;
        outline-offset: 2px !important;
      }
      
      .responsive-progress-step.active .step-circle {
        border-color: ${tokens.primary600} !important;
        background: ${tokens.primary600} !important;
        color: white !important;
        box-shadow: ${tokens.shadowFocus} !important;
      }
      
      .responsive-progress-step.completed .step-circle {
        border-color: ${tokens.primary600} !important;
        background: ${tokens.primary600} !important;
        color: white !important;
      }
      
      .responsive-progress-step.active .step-label {
        color: ${tokens.textPrimary} !important;
        font-weight: ${tokens.fontWeightBold} !important;
      }
      
      .responsive-progress-divider.completed {
        background: ${tokens.primary600} !important;
      }
      
      @media (max-width: 768px) {
        .responsive-progress-indicator {
          display: block !important;
        }
        
        .responsive-progress-step-content {
          ${!showLabelsOnMobile ? 'display: none !important;' : ''}
        }
        
        .responsive-progress-step {
          min-width: 50px !important;
          max-width: 60px !important;
        }
        
        .responsive-progress-steps {
          justify-content: flex-start !important;
          gap: ${tokens.spacing2} !important;
        }
      }
      
      @media (min-width: 769px) {
        .responsive-progress-indicator {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [showLabelsOnMobile]);

  const renderStep = (step: ResponsiveProgressStep, index: number) => {
    const stepNumber = index + 1;
    const isCompleted = stepNumber < currentStep;
    const isActive = stepNumber === currentStep;
    
    const stepClasses = [
      'responsive-progress-step',
      isActive && 'active',
      isCompleted && 'completed'
    ].filter(Boolean).join(' ');

    return (
      <div 
        key={step.id}
        className={stepClasses}
        style={variant === 'vertical' ? verticalStepStyles : baseStepStyles}
        onClick={() => setActiveStepIndex(index)}
        tabIndex={0}
        role="button"
        aria-label={`Step ${stepNumber}: ${step.label}`}
      >
        <div className="step-circle" style={stepCircleStyles}>
          {isCompleted ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path 
                d="M13.5 4.5L6 12L2.5 8.5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <span style={stepNumberStyles}>{stepNumber}</span>
          )}
        </div>
        
        <div className="responsive-progress-step-content" style={{ textAlign: 'center' }}>
          <span className="step-label" style={stepLabelStyles}>
            {step.label}
          </span>
          {step.description && (
            <span style={stepDescriptionStyles}>
              {step.description}
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderDivider = (index: number) => {
    const isCompleted = (index + 1) < currentStep;
    const dividerClasses = [
      'responsive-progress-divider',
      isCompleted && 'completed'
    ].filter(Boolean).join(' ');

    return (
      <div 
        key={`divider-${index}`}
        className={dividerClasses}
        style={variant === 'vertical' ? verticalDividerStyles : dividerStyles}
        aria-hidden="true"
      />
    );
  };

  const containerClassNames = [
    'responsive-progress-container',
    variant,
    compact && 'compact',
    className
  ].filter(Boolean).join(' ');

  if (variant === 'vertical') {
    return (
      <div className={containerClassNames} style={verticalContainerStyles}>
        <div style={verticalStepsStyles}>
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {renderStep(step, index)}
              {index < steps.length - 1 && renderDivider(index)}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={containerClassNames}
      style={containerStyles}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={steps.length}
      aria-label={`Step ${currentStep} of ${steps.length}: ${steps[currentStep - 1]?.label}`}
    >
      {/* Progress indicator for mobile */}
      <div className="responsive-progress-indicator" style={progressIndicatorStyles}>
        <span style={progressTextStyles}>
          Step {currentStep} of {steps.length}
        </span>
        <div style={progressBarStyles}>
          <div style={progressFillStyles} />
        </div>
      </div>

      {/* Main stepper */}
      <div 
        ref={stepsRef}
        className={`responsive-progress-steps-container ${isOverflowing ? 'scrollable' : ''}`}
        style={stepsContainerStyles}
      >
        <div className="responsive-progress-steps" style={stepsStyles}>
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {renderStep(step, index)}
              {index < steps.length - 1 && renderDivider(index)}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Scroll indicators for overflow */}
      {isOverflowing && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '8px',
          right: '8px',
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 10
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            backgroundColor: tokens.backgroundSecondary,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            color: tokens.textTertiary
          }}>
            ‹
          </div>
          <div style={{
            width: '20px',
            height: '20px',
            backgroundColor: tokens.backgroundSecondary,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            color: tokens.textTertiary
          }}>
            ›
          </div>
        </div>
      )}
    </div>
  );
}