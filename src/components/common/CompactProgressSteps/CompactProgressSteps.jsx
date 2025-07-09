import React from 'react';
import PropTypes from 'prop-types';
import styles from './CompactProgressSteps.module.css';

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
  /** Array of step objects with label and optional id */
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  /** Current active step index (0-based) */
  currentStep: PropTypes.number.isRequired,
  /** Additional CSS class */
  className: PropTypes.string,
};

export default CompactProgressSteps;