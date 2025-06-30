import React from 'react';
import styles from './ProgressSteps.module.css';

const ProgressSteps = ({ steps, currentStep }) => {
  return (
    <div className={styles.container}>
      <div className={styles.progressSteps}>
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          
          return (
            <React.Fragment key={step.id}>
              <div className={styles.step}>
                <div className={`${styles.stepCircle} ${isCompleted ? styles.completed : ''} ${isActive ? styles.active : ''}`}>
                  {isCompleted ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>
                <span className={`${styles.stepLabel} ${isActive ? styles.activeLabel : ''}`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`${styles.divider} ${isCompleted ? styles.completedDivider : ''}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;