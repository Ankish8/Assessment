import React from 'react';
import styles from './ProgressSteps.module.css';

const steps = [
  { number: 1, label: 'Question Statement' },
  { number: 2, label: 'Test Cases' },
  { number: 3, label: 'Default Codes' },
  { number: 4, label: 'Question Details' },
  { number: 5, label: 'Solution Details' }
];

const ProgressSteps = ({ currentStep }) => {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressSteps}>
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div 
              className={`${styles.step} ${
                step.number < currentStep ? styles.completed : 
                step.number === currentStep ? styles.active : 
                styles.inactive
              }`}
            >
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepLabel}>{step.label}</div>
            </div>
            {index < steps.length - 1 && (
              <div className={styles.stepDivider}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;