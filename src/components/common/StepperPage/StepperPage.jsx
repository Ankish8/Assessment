import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import styles from './StepperPage.module.css';
import '../../../styles/utilities.css';

/**
 * StepperPage - Reusable page layout component for multi-step workflows
 * 
 * A unified component that provides consistent header, progress stepper, content area,
 * and footer layout for any multi-step process like interviews, assessments, forms, etc.
 * 
 * @component
 * @example
 * const steps = [
 *   { id: 'step-1', label: 'Question Statement' },
 *   { id: 'step-2', label: 'Area/Skills' },
 *   { id: 'step-3', label: 'Question Details' }
 * ];
 * 
 * return (
 *   <StepperPage
 *     title="Bot Interview"
 *     icon="fas fa-robot"
 *     steps={steps}
 *     currentStep={0}
 *     onPrevious={() => navigate('/previous')}
 *     onNext={() => navigate('/next')}
 *     nextLabel="Save & Continue"
 *   >
 *     <div>Your page content here</div>
 *   </StepperPage>
 * );
 */
const StepperPage = ({
  title,
  icon,
  steps,
  currentStep,
  children,
  onPrevious,
  onNext,
  onBack,
  previousLabel = 'Previous',
  nextLabel = 'Save & Continue',
  showPreviousButton = true,
  showNextButton = true,
  previousDisabled = false,
  nextDisabled = false,
  className = '',
  ...props
}) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (onPrevious) {
      onPrevious();
    }
  };

  return (
    <div className={`${styles.container} ${className}`} {...props}>
      {/* Compact Header */}
      <div className={styles.compactHeader}>
        <div>
          <div className={styles.headerLeft}>
            <button 
              className={styles.backButton}
              onClick={handleBack}
              aria-label="Go back"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <div className={styles.headerTitle}>
              {icon && <i className={icon}></i>}
              <span>{title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Progress Steps */}
      <div className={styles.compactProgress}>
        <div>
          {steps.map((step, index) => (
            <div 
              key={step.id || index}
              className={`${styles.progressStep} ${
                index === steps.length - 1 ? styles.lastStep : ''
              }`}
            >
              <div className={`${styles.stepIndicator} ${
                index === currentStep ? styles.current : ''
              }`}>
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

      {/* Content Area */}
      <div className={styles.content}>
        {children}

        {/* Bottom Actions */}
        <div className={styles.bottomActions}>
          <div className={styles.actionButtons}>
            {showPreviousButton && (
              <Button 
                variant="secondary" 
                onClick={onPrevious}
                disabled={previousDisabled}
              >
                {previousLabel}
              </Button>
            )}
            {showNextButton && (
              <Button 
                variant="primary" 
                onClick={onNext}
                disabled={nextDisabled}
              >
                {nextLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

StepperPage.propTypes = {
  /** 
   * Page title displayed in the header
   */
  title: PropTypes.string.isRequired,
  
  /** 
   * FontAwesome icon class for the header (e.g., 'fas fa-robot')
   */
  icon: PropTypes.string,
  
  /** 
   * Array of step objects defining the workflow progression.
   * Each step should contain a label and optionally an id.
   * 
   * @example
   * [
   *   { id: 'step-1', label: 'Question Statement' },
   *   { id: 'step-2', label: 'Area/Skills' },
   *   { id: 'step-3', label: 'Question Details' }
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
   */
  currentStep: PropTypes.number.isRequired,
  
  /** 
   * Content to display in the main content area
   */
  children: PropTypes.node,
  
  /** 
   * Handler function called when Previous button is clicked
   */
  onPrevious: PropTypes.func,
  
  /** 
   * Handler function called when Next/Continue button is clicked
   */
  onNext: PropTypes.func,
  
  /** 
   * Handler function called when back arrow button is clicked.
   * If not provided, will use onPrevious as fallback.
   */
  onBack: PropTypes.func,
  
  /** 
   * Label text for the previous button
   */
  previousLabel: PropTypes.string,
  
  /** 
   * Label text for the next/continue button
   */
  nextLabel: PropTypes.string,
  
  /** 
   * Whether to show the previous button
   */
  showPreviousButton: PropTypes.bool,
  
  /** 
   * Whether to show the next button
   */
  showNextButton: PropTypes.bool,
  
  /** 
   * Whether the previous button is disabled
   */
  previousDisabled: PropTypes.bool,
  
  /** 
   * Whether the next button is disabled
   */
  nextDisabled: PropTypes.bool,
  
  /** 
   * Additional CSS class names to apply to the container
   */
  className: PropTypes.string,
};

StepperPage.defaultProps = {
  previousLabel: 'Previous',
  nextLabel: 'Save & Continue',
  showPreviousButton: true,
  showNextButton: true,
  previousDisabled: false,
  nextDisabled: false,
  className: '',
};

/**
 * Display name for debugging and React DevTools
 */
StepperPage.displayName = 'StepperPage';

export default StepperPage;