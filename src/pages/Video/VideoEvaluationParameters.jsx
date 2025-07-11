import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import styles from './VideoEvaluationParameters.module.css';

const VideoEvaluationParameters = () => {
  const navigate = useNavigate();
  const [evaluationType, setEvaluationType] = useState('manual');
  const [criteria, setCriteria] = useState([
    { id: 'presentation', name: 'Presentation Skills', weight: 30, enabled: true },
    { id: 'communication', name: 'Communication', weight: 25, enabled: true },
    { id: 'body-language', name: 'Body Language', weight: 20, enabled: true },
    { id: 'confidence', name: 'Confidence', weight: 15, enabled: true },
    { id: 'engagement', name: 'Audience Engagement', weight: 10, enabled: true }
  ]);

  const handleSaveAndFinish = () => {
    // Complete the assessment creation process
    navigate('/assessments'); // or wherever you want to redirect
  };

  const handleCriteriaToggle = (id) => {
    setCriteria(prev => prev.map(criterion =>
      criterion.id === id ? { ...criterion, enabled: !criterion.enabled } : criterion
    ));
  };

  const handleWeightChange = (id, newWeight) => {
    setCriteria(prev => prev.map(criterion =>
      criterion.id === id ? { ...criterion, weight: parseInt(newWeight) } : criterion
    ));
  };

  const totalWeight = criteria.filter(c => c.enabled).reduce((sum, c) => sum + c.weight, 0);
  const isValidWeights = totalWeight === 100;

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
              <i className="fas fa-video"></i>
              <span>Video Assessment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className={styles.compactProgress}>
        <div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.completed}`}>
              <i className="fas fa-check"></i>
            </div>
            <span className={styles.stepLabel}>Add Job Description</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.completed}`}>
              <i className="fas fa-check"></i>
            </div>
            <span className={styles.stepLabel}>Management Questions</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.completed}`}>
              <i className="fas fa-check"></i>
            </div>
            <span className={styles.stepLabel}>Professional Questions</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.completed}`}>
              <i className="fas fa-check"></i>
            </div>
            <span className={styles.stepLabel}>Media & Resources</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.completed}`}>
              <i className="fas fa-check"></i>
            </div>
            <span className={styles.stepLabel}>Question Details</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={`${styles.progressStep} ${styles.lastStep}`}>
            <div className={`${styles.stepIndicator} ${styles.current}`}>
              <span>6</span>
            </div>
            <span className={styles.stepLabel}>Evaluation Parameters</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <Card variant="elevated" padding="lg" className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.sectionTitle}>Evaluation Parameters</h2>
            <p className={styles.sectionDescription}>
              Configure how video presentations will be evaluated and scored
            </p>
          </div>

          {/* Evaluation Type */}
          <div className={styles.section}>
            <h3 className={styles.subsectionTitle}>Evaluation Method</h3>
            
            <div className={styles.methodOptions}>
              <div 
                className={`${styles.methodCard} ${evaluationType === 'manual' ? styles.selected : ''}`}
                onClick={() => setEvaluationType('manual')}
              >
                <div className={styles.methodHeader}>
                  <input
                    type="radio"
                    name="evaluationType"
                    value="manual"
                    checked={evaluationType === 'manual'}
                    onChange={() => setEvaluationType('manual')}
                    className={styles.methodRadio}
                  />
                  <div className={styles.methodInfo}>
                    <h4 className={styles.methodTitle}>Manual Evaluation</h4>
                    <p className={styles.methodDescription}>
                      Human evaluators score the presentation based on defined criteria
                    </p>
                  </div>
                </div>
                <div className={styles.methodFeatures}>
                  <span className={styles.feature}>✓ Detailed feedback</span>
                  <span className={styles.feature}>✓ Nuanced scoring</span>
                  <span className={styles.feature}>✓ Subjective assessment</span>
                </div>
              </div>

              <div 
                className={`${styles.methodCard} ${evaluationType === 'ai' ? styles.selected : ''}`}
                onClick={() => setEvaluationType('ai')}
              >
                <div className={styles.methodHeader}>
                  <input
                    type="radio"
                    name="evaluationType"
                    value="ai"
                    checked={evaluationType === 'ai'}
                    onChange={() => setEvaluationType('ai')}
                    className={styles.methodRadio}
                  />
                  <div className={styles.methodInfo}>
                    <h4 className={styles.methodTitle}>AI-Assisted Evaluation</h4>
                    <p className={styles.methodDescription}>
                      AI analyzes speech patterns, body language, and presentation structure
                    </p>
                  </div>
                </div>
                <div className={styles.methodFeatures}>
                  <span className={styles.feature}>✓ Consistent scoring</span>
                  <span className={styles.feature}>✓ Instant results</span>
                  <span className={styles.feature}>✓ Speech analysis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Evaluation Criteria */}
          <div className={styles.section}>
            <h3 className={styles.subsectionTitle}>Evaluation Criteria</h3>
            <p className={styles.criteriaDescription}>
              Define the criteria and their weights for evaluating video presentations. 
              Total weight must equal 100%.
            </p>
            
            <div className={styles.criteriaList}>
              {criteria.map(criterion => (
                <div key={criterion.id} className={styles.criterionCard}>
                  <div className={styles.criterionHeader}>
                    <input
                      type="checkbox"
                      checked={criterion.enabled}
                      onChange={() => handleCriteriaToggle(criterion.id)}
                      className={styles.criterionCheckbox}
                    />
                    <span className={styles.criterionName}>{criterion.name}</span>
                  </div>
                  
                  {criterion.enabled && (
                    <div className={styles.criterionWeight}>
                      <label className={styles.weightLabel}>Weight:</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={criterion.weight}
                        onChange={(e) => handleWeightChange(criterion.id, e.target.value)}
                        className={styles.weightInput}
                      />
                      <span className={styles.weightUnit}>%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={`${styles.weightSummary} ${!isValidWeights ? styles.error : styles.valid}`}>
              <span className={styles.weightTotal}>
                Total Weight: {totalWeight}%
              </span>
              {!isValidWeights && (
                <span className={styles.weightError}>
                  <i className="fas fa-exclamation-triangle"></i>
                  Total weight must equal 100%
                </span>
              )}
              {isValidWeights && (
                <span className={styles.weightValid}>
                  <i className="fas fa-check"></i>
                  Weight distribution is valid
                </span>
              )}
            </div>
          </div>
        </Card>

        {/* Bottom Actions */}
        <div className={styles.bottomActions}>
          {!isValidWeights && (
            <div className={styles.validationAlert}>
              <i className="fas fa-exclamation-triangle"></i>
              Please adjust the weights so they total 100%
            </div>
          )}
          
          <div className={styles.actionButtons}>
            <Button 
              variant="secondary" 
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSaveAndFinish}
              disabled={!isValidWeights}
            >
              Save & Finish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoEvaluationParameters;