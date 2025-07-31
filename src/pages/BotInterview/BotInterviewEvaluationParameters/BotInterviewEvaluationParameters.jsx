import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button/Button';
import { 
  BOT_INTERVIEW_STEPS, 
  BOT_INTERVIEW_STEP_NUMBERS
} from '../shared/constants';
import styles from './BotInterviewEvaluationParameters.module.css';
import '../../../styles/utilities.css';

const BotInterviewEvaluationParameters = () => {
  const navigate = useNavigate();

  const handleSaveAndContinue = () => {
    // Navigate to next step
    navigate('/bot-interview/solution-details');
  };

  const handlePrevious = () => {
    navigate('/bot-interview/question-details');
  };

  return (
    <div className={styles.container}>
      {/* Compact Header */}
      <div className={styles.compactHeader}>
        <div>
          <div className={styles.headerLeft}>
            <button 
              className={styles.backButton}
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <div className={styles.headerTitle}>
              <i className="fas fa-robot"></i>
              <span>Bot Interview</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Progress Steps */}
      <div className={styles.compactProgress}>
        <div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>
              <i className="fas fa-check"></i>
            </div>
            <span className={styles.stepLabel}>Question Statement</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>
              <i className="fas fa-check"></i>
            </div>
            <span className={styles.stepLabel}>Area/Skills</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>
              <i className="fas fa-check"></i>
            </div>
            <span className={styles.stepLabel}>Question Details</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.current}`}>4</div>
            <span className={styles.stepLabel}>Evaluation Parameters</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={`${styles.progressStep} ${styles.lastStep}`}>
            <div className={styles.stepIndicator}>5</div>
            <span className={styles.stepLabel}>Solution Details</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {/* Content area - empty for now */}

        {/* Bottom Actions */}
        <div className={styles.bottomActions}>
          <div className={styles.actionButtons}>
            <Button 
              variant="secondary" 
              onClick={handlePrevious}
            >
              Previous
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSaveAndContinue}
            >
              Save & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotInterviewEvaluationParameters;