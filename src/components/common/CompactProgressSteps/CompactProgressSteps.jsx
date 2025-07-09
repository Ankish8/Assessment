import React from 'react';
import PropTypes from 'prop-types';
import styles from './CompactProgressSteps.module.css';

/**
 * CompactProgressSteps - Modern horizontal progress stepper component
 * 
 * A unified design system component for displaying multi-step workflow progress.
 * Optimized for responsive design with consistent shadows, spacing, and typography.
 * 
 * @component
 * @example
 * const steps = [
 *   { id: 'step-1', label: 'Question Statement' },
 *   { id: 'step-2', label: 'Media & Resources' },
 *   { id: 'step-3', label: 'Question Details' },
 * ];
 * 
 * return (
 *   <CompactProgressSteps 
 *     steps={steps} 
 *     currentStep={1} 
 *   />
 * );
 */
const CompactProgressSteps = ({ 
  steps, 
  currentStep, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`${styles.compactProgress} ${className}`} {...props}>
      <div className={styles.container}>
        {steps.map((step, index) => (
          <div 
            key={step.id || index}
            className={`${styles.progressStep} ${
              index === steps.length - 1 ? styles.lastStep : ''
            }`}
          >
            <div className={`${styles.stepIndicator} ${
              index === currentStep ? styles.current : ''
            } ${index < currentStep ? styles.completed : ''}`}>
              {index < currentStep ? (
                <i className="fas fa-check"></i>
              ) : (
                index + 1
              )}
            </div>
            <span className={styles.stepLabel}>{step.label}</span>
            {index < steps.length - 1 && (
              <i className="fas fa-chevron-right"></i>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

CompactProgressSteps.propTypes = {
  /** 
   * Array of step objects defining the workflow progression.
   * Each step should contain a label and optionally an id for tracking.
   * 
   * @example
   * [
   *   { id: 'step-1', label: 'Question Statement' },
   *   { id: 'step-2', label: 'Media & Resources' },
   *   { id: 'step-3', label: 'Question Details' },
   * ]
   */
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      /** Optional unique identifier for the step */
      id: PropTypes.string,
      /** Display label for the step (required) */
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  
  /** 
   * Current active step index (0-based).
   * Steps before this index will show as completed with checkmarks.
   * Steps after this index will show as pending with number indicators.
   * 
   * @example
   * currentStep={0} // First step active
   * currentStep={2} // Third step active, first two completed
   */
  currentStep: PropTypes.number.isRequired,
  
  /** 
   * Additional CSS class names to apply to the container.
   * Useful for custom styling or theming.
   */
  className: PropTypes.string,
};

CompactProgressSteps.defaultProps = {
  className: '',
};

/**
 * Display name for debugging and React DevTools
 */
CompactProgressSteps.displayName = 'CompactProgressSteps';

export default CompactProgressSteps;