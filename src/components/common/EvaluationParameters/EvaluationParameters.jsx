import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Card from '../Card/Card';
import Input from '../Input/Input';
import Button from '../Button/Button';
import FloatingFooter from '../FloatingFooter/FloatingFooter';
import ResponsiveProgressSteps from '../ResponsiveProgressSteps/ResponsiveProgressSteps';
import { useCriteriaManagement } from '../../../hooks/useCriteriaManagement';
import { useEvaluationValidation } from '../../../hooks/useEvaluationValidation';
import { 
  getDefaultCriteria, 
  getAutomatedOptions, 
  getValidationRules, 
  getUIConfig 
} from '../../../config/evaluationDefaults';
import styles from './EvaluationParameters.module.css';
import '../../../styles/utilities.css';

const EvaluationParameters = ({ 
  questionType = 'coding',
  progressSteps = [],
  currentStep = 1,
  onPrevious,
  onSaveAndContinue,
  className = ''
}) => {
  const navigate = useNavigate();
  const [manualEvaluationEnabled, setManualEvaluationEnabled] = useState(false);
  const [automatedOptions, setAutomatedOptions] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Get configuration for this question type
  const defaultCriteria = getDefaultCriteria(questionType);
  const availableAutomatedOptions = getAutomatedOptions(questionType);
  const validationRules = getValidationRules(questionType);
  const uiConfig = getUIConfig(questionType);

  // Use custom hooks
  const {
    criteria,
    totalWeightage,
    isValidWeightage,
    addCriterion,
    removeCriterion,
    updateCriterion,
    loadDefaultCriteria,
    resetCriteria
  } = useCriteriaManagement([]);

  const { errors, isValid } = useEvaluationValidation(
    manualEvaluationEnabled,
    criteria,
    totalWeightage,
    validationRules
  );

  // Initialize automated options based on question type
  useEffect(() => {
    const initialOptions = {};
    availableAutomatedOptions.forEach(option => {
      switch (option) {
        case 'caseSensitive':
          initialOptions[option] = false;
          break;
        case 'allowPartialMatches':
        case 'acceptableVariations':
          initialOptions[option] = true;
          break;
        default:
          initialOptions[option] = false;
      }
    });
    setAutomatedOptions(initialOptions);
  }, [questionType, availableAutomatedOptions]);

  const handleToggleManualEvaluation = (enabled) => {
    setManualEvaluationEnabled(enabled);
    if (enabled && criteria.length === 0) {
      loadDefaultCriteria(defaultCriteria);
    } else if (!enabled) {
      resetCriteria();
    }
  };

  const handleAutomatedOptionChange = (option, value) => {
    setAutomatedOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const handleSaveAndContinueClick = () => {
    setHasAttemptedSubmit(true);
    if (manualEvaluationEnabled && !isValid) return;
    
    if (onSaveAndContinue) {
      onSaveAndContinue();
    } else {
      // Default behavior - could be customized per question type
      alert(`${questionType} question creation complete! This would typically navigate to a success page or questions dashboard.`);
    }
  };

  const handlePreviousClick = () => {
    if (onPrevious) {
      onPrevious();
    } else {
      // Default navigation based on question type
      navigate(-1);
    }
  };

  // Render automated options based on question type
  const renderAutomatedOptions = () => {
    if (questionType === 'fillInBlanks') {
      return (
        <div className={styles.automatedOptions}>
          <h4 className={styles.optionsTitle}>
            <i className="fas fa-cog"></i>
            Automated Evaluation Settings
          </h4>
          
          <div className={styles.optionsList}>
            <div className={styles.option}>
              <label className={styles.optionCheckbox}>
                <input
                  type="checkbox"
                  checked={automatedOptions.caseSensitive || false}
                  onChange={(e) => handleAutomatedOptionChange('caseSensitive', e.target.checked)}
                />
                <span className={styles.checkmark}></span>
                <div className={styles.optionContent}>
                  <span className={styles.optionLabel}>Case Sensitive Matching</span>
                  <span className={styles.optionDescription}>Require exact case matching for answers</span>
                </div>
              </label>
            </div>
            
            <div className={styles.option}>
              <label className={styles.optionCheckbox}>
                <input
                  type="checkbox"
                  checked={automatedOptions.allowPartialMatches || false}
                  onChange={(e) => handleAutomatedOptionChange('allowPartialMatches', e.target.checked)}
                />
                <span className={styles.checkmark}></span>
                <div className={styles.optionContent}>
                  <span className={styles.optionLabel}>Allow Partial Credit</span>
                  <span className={styles.optionDescription}>Give partial points for partially correct answers</span>
                </div>
              </label>
            </div>
            
            <div className={styles.option}>
              <label className={styles.optionCheckbox}>
                <input
                  type="checkbox"
                  checked={automatedOptions.acceptableVariations || false}
                  onChange={(e) => handleAutomatedOptionChange('acceptableVariations', e.target.checked)}
                />
                <span className={styles.checkmark}></span>
                <div className={styles.optionContent}>
                  <span className={styles.optionLabel}>Accept Acceptable Variations</span>
                  <span className={styles.optionDescription}>Accept synonyms and equivalent answers</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <Header title={uiConfig.title || 'Evaluation Parameters'} />
      
      {progressSteps.length > 0 && (
        <div className={styles.progressContainer}>
          <ResponsiveProgressSteps steps={progressSteps} currentStep={currentStep} />
        </div>
      )}

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
                  {questionType === 'fillInBlanks' 
                    ? 'Choose how this fill-in-the-blanks question will be evaluated and graded'
                    : 'Choose how this question will be evaluated and graded'
                  }
                </p>
              </div>

              <div className={styles.evaluationOptions}>
                <div className={styles.evaluationOption}>
                  <div className={styles.optionIcon}>
                    <i className="fas fa-robot"></i>
                  </div>
                  <div className={styles.optionContent}>
                    <h3 className={styles.optionTitle}>{uiConfig.automatedTitle}</h3>
                    <p className={styles.optionDescription}>
                      {uiConfig.automatedDescription}
                    </p>
                    <ul className={styles.optionFeatures}>
                      {uiConfig.features?.map((feature, index) => (
                        <li key={index}><i className="fas fa-check"></i> {feature}</li>
                      ))}
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
                    <h3 className={styles.optionTitle}>{uiConfig.manualTitle}</h3>
                    <p className={styles.optionDescription}>
                      {uiConfig.manualDescription}
                    </p>
                    <ul className={styles.optionFeatures}>
                      {uiConfig.manualFeatures?.map((feature, index) => (
                        <li key={index}><i className="fas fa-check"></i> {feature}</li>
                      ))}
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

              {/* Render automated options for specific question types */}
              {renderAutomatedOptions()}

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
                    {questionType === 'fillInBlanks' 
                      ? 'Define specific criteria and their weights for manual evaluation of text-based answers'
                      : 'Define specific criteria and their weights for manual evaluation'
                    }
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
                        onClick={() => loadDefaultCriteria(defaultCriteria)}
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
            onClick={handlePreviousClick}
            className={styles.previousButton}
          >
            <i className="fas fa-arrow-left"></i>
            Previous
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveAndContinueClick}
            disabled={manualEvaluationEnabled && !isValid}
            className={styles.saveButton}
          >
            {questionType === 'fillInBlanks' ? 'Complete Question' : 'Save & Continue'}
            <i className={`fas ${questionType === 'fillInBlanks' ? 'fa-check' : 'fa-arrow-right'}`}></i>
          </Button>
        </FloatingFooter>
      </div>
    </div>
  );
};

export default EvaluationParameters;