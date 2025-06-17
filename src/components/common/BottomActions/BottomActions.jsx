import React from 'react';
import Button from '../Button';
import styles from './BottomActions.module.css';

const BottomActions = ({ 
  onPrevious, 
  onNext, 
  previousLabel = 'Previous', 
  nextLabel = 'Save & Continue',
  showPrevious = true,
  previousDisabled = false,
  nextDisabled = false,
  shortcuts = true
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        {showPrevious && (
          <Button 
            variant="secondary" 
            onClick={onPrevious}
            disabled={previousDisabled}
          >
            {previousLabel}
            {shortcuts && <span className={styles.shortcut}>Alt + ←</span>}
          </Button>
        )}
        <Button 
          variant="primary" 
          onClick={onNext}
          disabled={nextDisabled}
        >
          {nextLabel}
          {shortcuts && <span className={styles.shortcut}>Alt + →</span>}
        </Button>
      </div>
    </div>
  );
};

export default BottomActions;