import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { SPEAKING_PROGRESS_STEPS, SPEAKING_STEP_NUMBERS } from '../../constants/speakingProgressSteps';
import styles from './SpeakingEvaluationParameters.module.css';
import '../../styles/utilities.css';

const SpeakingEvaluationParameters = () => {
  const navigate = useNavigate();
  const [manualEvaluationEnabled, setManualEvaluationEnabled] = useState(false);
  const [criteria, setCriteria] = useState([]);
  const [errors, setErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Speaking-specific default criteria
  const defaultCriteria = [
    { id: '1', title: 'Fluency & Pronunciation', weightage: 30, description: 'Clear speech, proper pronunciation, and natural flow' },
    { id: '2', title: 'Content & Structure', weightage: 40, description: 'Logical organization, relevant content, and clear messaging' },
    { id: '3', title: 'Communication Skills', weightage: 30, description: 'Engagement, confidence, and effective delivery' }
  ];

  // Calculate total weightage
  const totalWeightage = criteria.reduce((sum, criterion) => sum + (parseInt(criterion.weightage) || 0), 0);
  const isValidWeightage = totalWeightage === 100;

  // Validation
  useEffect(() => {
    const newErrors = {};
    
    if (manualEvaluationEnabled) {
      if (criteria.length === 0) {
        newErrors.criteria = 'Please add at least one evaluation criterion';
      } else {
        criteria.forEach((criterion, index) => {
          if (!criterion.title.trim()) {
            newErrors[`criterion_${index}_title`] = 'Title is required';
          }
          if (!criterion.weightage || criterion.weightage <= 0) {
            newErrors[`criterion_${index}_weightage`] = 'Weightage must be greater than 0';
          }
        });
        
        if (totalWeightage !== 100) {
          newErrors.totalWeightage = 'Total weightage must equal 100%';
        }
      }
    }

    setErrors(newErrors);
  }, [manualEvaluationEnabled, criteria, totalWeightage]);

  const handleToggleManualEvaluation = (enabled) => {
    setManualEvaluationEnabled(enabled);
    if (enabled && criteria.length === 0) {
      // Auto-populate with default criteria when first enabled
      setCriteria(defaultCriteria);
    } else if (!enabled) {
      setCriteria([]);
    }
  };

  const addCriterion = () => {
    const newCriterion = {
      id: Date.now().toString(),
      title: '',
      weightage: '',
      description: ''
    };
    setCriteria([...criteria, newCriterion]);
  };

  const removeCriterion = (id) => {
    setCriteria(criteria.filter(c => c.id !== id));
  };

  const updateCriterion = (id, field, value) => {
    setCriteria(criteria.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const loadDefaultCriteria = () => {
    setCriteria(defaultCriteria);
  };

  const handleSaveAndContinue = () => {
    setHasAttemptedSubmit(true);
    if (manualEvaluationEnabled && Object.keys(errors).length > 0) return;
    // Navigate to next step - Solution Details
    navigate('/speaking/solution-details');
  };

  const handlePrevious = () => {
    navigate('/speaking/question-details');
  };

  const isValid = !manualEvaluationEnabled || (Object.keys(errors).length === 0);

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
              <i className="fas fa-microphone"></i>
              <span>Speaking Assessment</span>
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
            <span className={styles.stepLabel}>Media & Resources</span>
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
            <div className={`${styles.stepIndicator} ${styles.current}`}>
              <i className="fas fa-check"></i>
            </div>
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
        {/* Automatic Evaluation Section */}
        <Card variant="elevated" padding="lg" className={styles.automaticCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-clipboard-check"></i>
              Add Evaluation Parameters
              <span className={styles.optionalTag}>(Optional)</span>
            </h2>
            <p className={styles.sectionDescription}>
              Configure how this speaking assessment will be evaluated and graded
            </p>
          </div>

          <div className={styles.automaticEvaluation}>
            <div className={styles.evaluationMethod}>
              <div className={styles.methodIcon}>
                <i className="fas fa-robot"></i>
              </div>
              <div className={styles.methodContent}>
                <h3 className={styles.methodTitle}>Automated Evaluation</h3>
                <p className={styles.methodDescription}>
                  Audio recordings are automatically analyzed for speech quality, pronunciation, fluency, and content structure using AI-powered assessment tools.
                </p>
                <div className={styles.methodFeatures}>
                  <div className={styles.feature}>
                    <i className="fas fa-check"></i>
                    <span>Instant feedback and scoring</span>
                  </div>
                  <div className={styles.feature}>
                    <i className="fas fa-check"></i>
                    <span>Consistent and objective evaluation</span>
                  </div>
                  <div className={styles.feature}>
                    <i className="fas fa-check"></i>
                    <span>Scalable for large groups</span>
                  </div>
                  <div className={styles.feature}>
                    <i className="fas fa-check"></i>
                    <span>Speech analysis and pronunciation scoring</span>
                  </div>
                </div>
              </div>
              <div className={styles.methodStatus}>
                <div className={styles.statusBadge}>
                  <i className="fas fa-check-circle"></i>
                  <span>Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Manual Evaluation Toggle Section */}
        <Card variant="elevated" padding="lg" className={styles.manualToggleCard}>
          <div className={styles.manualToggleSection}>
            <div className={styles.toggleContent}>
              <div className={styles.toggleIcon}>
                <i className="fas fa-user-graduate"></i>
              </div>
              <div className={styles.toggleInfo}>
                <h3 className={styles.toggleTitle}>Manual Evaluation</h3>
                <p className={styles.toggleDescription}>
                  Add human review with custom criteria for detailed assessment of speech quality, content, and delivery
                </p>
              </div>
            </div>
            <div className={styles.toggleControl}>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={manualEvaluationEnabled}
                  onChange={(e) => handleToggleManualEvaluation(e.target.checked)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
          </div>

          {manualEvaluationEnabled && (
            <div className={styles.enabledInfo}>
              <div className={styles.infoBox}>
                <i className="fas fa-info-circle"></i>
                <div>
                  <strong>Manual evaluation enabled</strong>
                  <p>Configure custom evaluation criteria below. Total weightage must equal 100%.</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Criteria Configuration - Only show when manual evaluation is enabled */}
        {manualEvaluationEnabled && (
          <Card variant="elevated" padding="lg" className={styles.criteriaCard}>
            <div className={styles.cardHeader}>
              <div className={styles.titleRow}>
                <h2 className={styles.sectionTitle}>
                  <i className="fas fa-list-ol"></i>
                  Evaluation Criteria
                </h2>
                <div className={styles.weightageIndicator}>
                  <span className={`${styles.totalWeightage} ${isValidWeightage ? styles.valid : styles.invalid}`}>
                    Total Weightage: {totalWeightage}%
                  </span>
                </div>
              </div>
              <p className={styles.sectionDescription}>
                Define specific criteria and their weights for manual evaluation
              </p>
            </div>

            <div className={styles.criteriaSection}>
              {criteria.length > 0 ? (
                <div className={styles.criteriaList}>
                  {criteria.map((criterion, index) => (
                    <div key={criterion.id} className={styles.criterionItem}>
                      <div className={styles.criterionHeader}>
                        <span className={styles.criterionNumber}>{index + 1}</span>
                        <div className={styles.criterionInputs}>
                          <Input
                            placeholder="Evaluation criterion title"
                            value={criterion.title}
                            onChange={(e) => updateCriterion(criterion.id, 'title', e.target.value)}
                            error={errors[`criterion_${index}_title`]}
                            size="sm"
                          />
                          <div className={styles.weightageInput}>
                            <Input
                              type="number"
                              placeholder="Weight %"
                              value={criterion.weightage}
                              onChange={(e) => updateCriterion(criterion.id, 'weightage', e.target.value)}
                              error={errors[`criterion_${index}_weightage`]}
                              min="1"
                              max="100"
                              size="sm"
                              endIcon={<span>%</span>}
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => removeCriterion(criterion.id)}
                          className={styles.removeCriterion}
                          title="Remove criterion"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                      <Input
                        placeholder="Optional description of what this criterion evaluates"
                        value={criterion.description}
                        onChange={(e) => updateCriterion(criterion.id, 'description', e.target.value)}
                        size="sm"
                        className={styles.descriptionInput}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyCriteria}>
                  <i className="fas fa-clipboard-list"></i>
                  <h3>No evaluation criteria yet</h3>
                  <p>Add criteria to define how speaking submissions will be manually evaluated</p>
                </div>
              )}

              <div className={styles.criteriaActions}>
                <Button
                  variant="ghost"
                  onClick={addCriterion}
                  className={styles.addCriterion}
                >
                  <i className="fas fa-plus"></i>
                  Add Criterion
                </Button>
                
                {criteria.length === 0 && (
                  <Button
                    variant="secondary"
                    onClick={loadDefaultCriteria}
                    className={styles.loadDefaults}
                  >
                    <i className="fas fa-magic"></i>
                    Use Default Criteria
                  </Button>
                )}
              </div>

              {errors.criteria && (
                <div className={styles.errorMessage}>
                  <i className="fas fa-exclamation-triangle"></i>
                  {errors.criteria}
                </div>
              )}
              
              {errors.totalWeightage && (
                <div className={styles.errorMessage}>
                  <i className="fas fa-exclamation-triangle"></i>
                  {errors.totalWeightage}
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Bottom Actions */}
        <div className={styles.bottomActions}>
          {!isValid && hasAttemptedSubmit && (
            <div className={styles.validationAlert}>
              <i className="fas fa-exclamation-triangle"></i>
              Please fix the validation errors to continue
            </div>
          )}
          
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
              disabled={!isValid}
            >
              Save & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakingEvaluationParameters;