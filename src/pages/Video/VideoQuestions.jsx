import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import styles from './VideoQuestions.module.css';

const VideoQuestions = () => {
  const navigate = useNavigate();

  const handleSaveAndContinue = () => {
    // Navigate to next step - Media & Resources
    navigate('/video/media-resources');
  };

  return (
    <div className={styles.container}>
      {/* Compact Header - Same as Step 1 */}
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
              <i className="fas fa-video"></i>
              <span>Video Assessment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Progress Steps - Same as Step 1 but step 2 active */}
      <div className={styles.compactProgress}>
        <div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.completed}`}>
              <i className="fas fa-check"></i>
            </div>
            <span className={styles.stepLabel}>Add Job Description</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={`${styles.progressStep} ${styles.current}`}>
            <div className={`${styles.stepIndicator} ${styles.active}`}>
              <span>2</span>
            </div>
            <span className={styles.stepLabel}>Questions</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>3</div>
            <span className={styles.stepLabel}>Media & Resources</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>4</div>
            <span className={styles.stepLabel}>Question Details</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={`${styles.progressStep} ${styles.lastStep}`}>
            <div className={styles.stepIndicator}>5</div>
            <span className={styles.stepLabel}>Evaluation Parameters</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <Card variant="elevated" padding="none" className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <div className={styles.titleSection}>
              <h2 className={styles.sectionTitle}>Questions - Coming Soon</h2>
            </div>
          </div>

          {/* Content area left empty for now */}
          <div className={styles.emptyContent}>
            <h3>🚧 NEW CLEAN VERSION 🚧</h3>
            <p>Content will be added here...</p>
            <p>This is the fresh, rebuilt component with no old data.</p>
          </div>
        </Card>

        {/* Bottom Actions - Same as Step 1 */}
        <div className={styles.bottomActions}>
          <div className={styles.leftActions}>
            <Button 
              variant="secondary" 
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
          
          <div className={styles.rightActions}>
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

export default VideoQuestions;