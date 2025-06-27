import React, { useState, useEffect, useRef } from 'react';
import styles from './ResponsiveProgressSteps.module.css';

const ResponsiveProgressSteps = ({ 
  steps, 
  currentStep, 
  variant = 'horizontal', // 'horizontal', 'vertical', 'adaptive'
  showLabelsOnMobile = false,
  compact = false,
  className 
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(currentStep - 1);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef(null);
  const stepsRef = useRef(null);

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
        activeElement.scrollIntoView({
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

  const renderStep = (step, index) => {
    const stepNumber = index + 1;
    const isCompleted = stepNumber < currentStep;
    const isActive = stepNumber === currentStep;
    
    return (
      <div 
        key={step.id}
        className={`${styles.step} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
        onClick={() => setActiveStepIndex(index)}
      >
        <div className={styles.stepCircle}>
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
            <span className={styles.stepNumber}>{stepNumber}</span>
          )}
        </div>
        
        <div className={styles.stepContent}>
          <span className={styles.stepLabel}>
            {step.label}
          </span>
          {step.description && (
            <span className={styles.stepDescription}>
              {step.description}
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderDivider = (index) => {
    const isCompleted = (index + 1) < currentStep;
    return (
      <div 
        key={`divider-${index}`}
        className={`${styles.divider} ${isCompleted ? styles.completedDivider : ''}`}
        aria-hidden="true"
      />
    );
  };

  if (variant === 'vertical') {
    return (
      <div className={`${styles.container} ${styles.vertical} ${compact ? styles.compact : ''} ${className || ''}`}>
        <div className={styles.verticalSteps}>
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {renderStep(step, index)}
              {index < steps.length - 1 && (
                <div className={`${styles.verticalDivider} ${(index + 1) < currentStep ? styles.completedDivider : ''}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`${styles.container} ${styles.horizontal} ${compact ? styles.compact : ''} ${className || ''}`}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={steps.length}
      aria-label={`Step ${currentStep} of ${steps.length}: ${steps[currentStep - 1]?.label}`}
    >
      {/* Progress indicator for mobile */}
      <div className={styles.progressIndicator}>
        <span className={styles.progressText}>
          Step {currentStep} of {steps.length}
        </span>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main stepper */}
      <div 
        ref={stepsRef}
        className={`${styles.stepsContainer} ${isOverflowing ? styles.scrollable : ''}`}
      >
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {renderStep(step, index)}
              {index < steps.length - 1 && renderDivider(index)}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Scroll indicators */}
      {isOverflowing && (
        <div className={styles.scrollHints}>
          <div className={styles.scrollHint} aria-hidden="true">
            <i className="fas fa-chevron-left"></i>
          </div>
          <div className={styles.scrollHint} aria-hidden="true">
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveProgressSteps;