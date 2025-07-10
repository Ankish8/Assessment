import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Card from '../../components/common/Card/Card';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import FloatingFooter from '../../components/common/FloatingFooter/FloatingFooter';
import ResponsiveProgressSteps from '../../components/common/ResponsiveProgressSteps/ResponsiveProgressSteps';
import { PROGRESS_STEPS, STEP_NUMBERS } from '../../constants/progressSteps';
import styles from './EvaluationParameters.module.css';
import '../../styles/utilities.css';

const EvaluationParameters = () => {
  const navigate = useNavigate();
  const [manualEvaluationEnabled, setManualEvaluationEnabled] = useState(false);
  const [criteria, setCriteria] = useState([]);
  const [errors, setErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);


  const defaultCriteria = [
    { id: '1', title: 'Code Quality', weightage: 30, description: 'Clean, readable, and well-structured code' },
    { id: '2', title: 'Problem Solving', weightage: 40, description: 'Logical approach and algorithm efficiency' },
    { id: '3', title: 'Best Practices', weightage: 30, description: 'Following coding standards and conventions' }
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
    // Flow complete - navigate to success page or back to questions list
    alert('Question creation complete! This would typically navigate to a success page or questions dashboard.');
  };

  const handlePrevious = () => {
    navigate('/question-details');
  };

  const isValid = !manualEvaluationEnabled || (Object.keys(errors).length === 0);

  return (
    <div className={styles.container}>
      <Header title="Submission Questions" />
      
      <div className={styles.progressContainer}>
        <ResponsiveProgressSteps steps={PROGRESS_STEPS} currentStep={STEP_NUMBERS.EVALUATION_PARAMETERS} />
      </div>

      <div className={`${styles.content} floating-footer-spacing`}>
        <div className={styles.mainGrid}>
          {/* Left Column - Manual Evaluation Toggle */}
          <div className={styles.leftColumn}>
            <Card variant="elevated" padding="lg" className={styles.toggleCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.sectionTitle}>
                  <i className="fas fa-clipboard-check"></i>
                  Evaluation Method
                </h2>
                <p className={styles.sectionDescription}>
                  Choose how this question will be evaluated and graded
                </p>
              </div>

              <div className={styles.evaluationOptions}>
                <div className={styles.evaluationOption}>
                  <div className={styles.optionIcon}>
                    <i className="fas fa-robot"></i>
                  </div>
                  <div className={styles.optionContent}>
                    <h3 className={styles.optionTitle}>Automated Evaluation</h3>
                    <p className={styles.optionDescription}>
                      Questions are automatically graded based on test case results and code execution
                    </p>
                    <ul className={styles.optionFeatures}>
                      <li><i className="fas fa-check"></i> Instant feedback</li>
                      <li><i className="fas fa-check"></i> Consistent scoring</li>
                      <li><i className="fas fa-check"></i> Scalable for large groups</li>
                    </ul>
                  </div>
                  <div className={styles.optionToggle}>
                    <span className={styles.toggleLabel}>Active</span>
                  </div>
                </div>

                <div className={`${styles.evaluationOption} ${styles.toggleOption}`}>
                  <div className={styles.optionIcon}>
                    <i className="fas fa-user-graduate"></i>
                  </div>
                  <div className={styles.optionContent}>
                    <h3 className={styles.optionTitle}>Manual Evaluation</h3>
                    <p className={styles.optionDescription}>
                      Add human review with custom criteria for code quality, approach, and best practices
                    </p>
                    <ul className={styles.optionFeatures}>
                      <li><i className="fas fa-check"></i> Custom evaluation criteria</li>
                      <li><i className="fas fa-check"></i> Qualitative assessment</li>
                      <li><i className="fas fa-check"></i> Detailed feedback</li>
                    </ul>
                  </div>
                  <div className={styles.optionToggle}>
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
              </div>

              {manualEvaluationEnabled && (
                <div className={styles.enabledInfo}>
                  <div className={styles.infoBox}>
                    <i className="fas fa-info-circle"></i>
                    <div>
                      <strong>Manual evaluation enabled</strong>
                      <p>Configure evaluation criteria in the panel on the right. Total weightage must equal 100%.</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Criteria Configuration */}
          <div className={styles.rightColumn}>
            {manualEvaluationEnabled ? (
              <Card variant="elevated" padding="lg" className={styles.criteriaCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.titleRow}>
                    <h2 className={styles.sectionTitle}>
                      <i className="fas fa-list-ol"></i>
                      Evaluation Criteria
                    </h2>
                    <div className={styles.weightageIndicator}>
                      <span className={`${styles.totalWeightage} ${isValidWeightage ? styles.valid : styles.invalid}`}>
                        Total: {totalWeightage}%
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
                      <p>Add criteria to define how submissions will be manually evaluated</p>
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
            ) : (
              <Card variant="elevated" padding="lg" className={styles.placeholderCard}>
                <div className={styles.placeholderContent}>
                  <i className="fas fa-toggle-off"></i>
                  <h3>Manual Evaluation Disabled</h3>
                  <p>Enable manual evaluation to configure custom criteria and weightings for human review of submissions.</p>
                  <div className={styles.previewFeatures}>
                    <h4>When enabled, you can:</h4>
                    <ul>
                      <li>Define custom evaluation criteria</li>
                      <li>Set weightage for each criterion</li>
                      <li>Add detailed descriptions for reviewers</li>
                      <li>Combine with automated testing</li>
                    </ul>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Fixed Bottom Actions */}
        <FloatingFooter
          hasValidationAlert={true}
          validationMessage="Please fix the validation errors to continue"
          showAlert={!isValid && hasAttemptedSubmit}
        >
          <Button
            variant="ghost"
            onClick={handlePrevious}
            className={styles.previousButton}
          >
            <i className="fas fa-arrow-left"></i>
            Previous
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveAndContinue}
            disabled={!isValid}
            className={styles.saveButton}
          >
            Save & Continue
            <i className="fas fa-arrow-right"></i>
          </Button>
        </FloatingFooter>
      </div>
    </div>
  );
};

export default EvaluationParameters;