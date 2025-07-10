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
  const [automaticEvaluationEnabled, setAutomaticEvaluationEnabled] = useState(true);
  const [manualEvaluationEnabled, setManualEvaluationEnabled] = useState(false);
  const [criteria, setCriteria] = useState([]);
  const [errors, setErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  
  // Automatic evaluation criteria with toggleable options
  const [automaticCriteria, setAutomaticCriteria] = useState([
    { id: 'fluency', name: 'Fluency', enabled: true, beta: true },
    { id: 'lexical', name: 'Lexical Resource (Vocabulary)', enabled: true, beta: false },
    { id: 'grammar', name: 'Grammar Range & Accuracy', enabled: true, beta: false },
    { id: 'pronunciation', name: 'Pronunciation', enabled: true, beta: true }
  ]);

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

  const handleToggleAutomaticEvaluation = (enabled) => {
    setAutomaticEvaluationEnabled(enabled);
    if (enabled) {
      setManualEvaluationEnabled(false);
      setCriteria([]);
    } else {
      setManualEvaluationEnabled(true);
      if (criteria.length === 0) {
        setCriteria(defaultCriteria);
      }
    }
  };

  const toggleAutomaticCriterion = (criterionId) => {
    setAutomaticCriteria(prev => 
      prev.map(criterion => 
        criterion.id === criterionId 
          ? { ...criterion, enabled: !criterion.enabled }
          : criterion
      )
    );
  };

  const handleToggleManualEvaluation = (enabled) => {
    setManualEvaluationEnabled(enabled);
    if (enabled) {
      setAutomaticEvaluationEnabled(false);
      if (criteria.length === 0) {
        setCriteria(defaultCriteria);
      }
    } else {
      setAutomaticEvaluationEnabled(true);
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
    navigate('/speaking/solution-details');
  };

  const handlePrevious = () => {
    navigate('/speaking/question-details');
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
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

      {/* Progress Steps */}
      <div className={styles.progress}>
        <div className={styles.progressContent}>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>
              <i className="fas fa-check"></i>
            </div>
            <span>Question Statement</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>
              <i className="fas fa-check"></i>
            </div>
            <span>Media & Resources</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>
              <i className="fas fa-check"></i>
            </div>
            <span>Question Details</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.current}`}>
              <i className="fas fa-check"></i>
            </div>
            <span>Evaluation Parameters</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>5</div>
            <span>Solution Details</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.main}>
        {/* Page Title */}
        <div className={styles.titleCard}>
          <h1>Add Evaluation Parameters</h1>
          <p>Configure how this speaking assessment will be evaluated and graded. Choose between automatic AI-powered evaluation or manual human review.</p>
        </div>

        {/* Evaluation Options */}
        <div className={styles.evaluationOptions}>
          {/* Automatic Evaluation */}
          <div className={styles.option}>
            <div className={styles.optionHeader}>
              <div className={styles.optionInfo}>
                <div className={styles.optionIcon}>
                  <i className="fas fa-robot"></i>
                </div>
                <div>
                  <h3>Automatic Evaluation</h3>
                  <p>AI-powered speech analysis and scoring</p>
                </div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={automaticEvaluationEnabled}
                  onChange={(e) => handleToggleAutomaticEvaluation(e.target.checked)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
            
            {automaticEvaluationEnabled && (
              <div className={styles.optionContent}>
                <ul className={styles.features}>
                  <li><i className="fas fa-check"></i> Instant feedback and scoring</li>
                  <li><i className="fas fa-check"></i> Speech analysis and pronunciation scoring</li>
                  <li><i className="fas fa-check"></i> Consistent and objective evaluation</li>
                </ul>
                
                <div className={styles.criteriaCustomization}>
                  <h4>Evaluation Criteria</h4>
                  <ul className={styles.features}>
                    {automaticCriteria.map(criterion => (
                      <li key={criterion.id} className={styles.criterionToggle}>
                        <i className={criterion.enabled ? "fas fa-check" : "far fa-square"}></i>
                        <span onClick={() => toggleAutomaticCriterion(criterion.id)} className={styles.criterionName}>
                          {criterion.name}
                          {criterion.beta && (
                            <div className={styles.tooltipContainer}>
                              <i className={`fas fa-info-circle ${styles.accuracyInfo}`}></i>
                              <div className={styles.tooltip}>
                                AI accuracy for this criterion is still improving
                              </div>
                            </div>
                          )}
                        </span>
                        <label className={styles.miniToggle}>
                          <input
                            type="checkbox"
                            checked={criterion.enabled}
                            onChange={() => toggleAutomaticCriterion(criterion.id)}
                          />
                          <span className={styles.miniToggleSlider}></span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Manual Evaluation */}
          {!automaticEvaluationEnabled && (
            <div className={styles.option}>
              <div className={styles.optionHeader}>
                <div className={styles.optionInfo}>
                  <div className={styles.optionIcon}>
                    <i className="fas fa-user-graduate"></i>
                  </div>
                  <div>
                    <h3>Manual Evaluation</h3>
                    <p>Create custom evaluation criteria with specific weightings. Evaluators will score each criterion individually, and the final grade will be calculated based on your defined weightings.</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.optionContent}>
                <div className={styles.infoBox}>
                  <i className="fas fa-info-circle"></i>
                  <div>
                    <strong>Manual evaluation enabled</strong>
                    <p>Configure custom evaluation criteria below. Total weightage must equal 100%.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Criteria Configuration */}
        {manualEvaluationEnabled && (
          <div className={styles.criteriaSection}>
            <div className={styles.criteriaHeader}>
              <h2>Evaluation Criteria</h2>
              <span className={`${styles.totalWeightage} ${isValidWeightage ? styles.valid : styles.invalid}`}>
                Total: {totalWeightage}%
              </span>
            </div>
            
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
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.criteriaActions}>
              <Button variant="ghost" onClick={addCriterion}>
                <i className="fas fa-plus"></i>
                Add Criterion
              </Button>
              {criteria.length === 0 && (
                <Button variant="secondary" onClick={loadDefaultCriteria}>
                  <i className="fas fa-magic"></i>
                  Use Default Criteria
                </Button>
              )}
            </div>

            {errors.criteria && (
              <div className={styles.error}>
                <i className="fas fa-exclamation-triangle"></i>
                {errors.criteria}
              </div>
            )}
            
            {errors.totalWeightage && (
              <div className={styles.error}>
                <i className="fas fa-exclamation-triangle"></i>
                {errors.totalWeightage}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className={styles.bottomActions}>
        {!isValid && hasAttemptedSubmit && (
          <div className={styles.validationAlert}>
            <i className="fas fa-exclamation-triangle"></i>
            Please fix the validation errors to continue
          </div>
        )}
        
        <div className={styles.actionButtons}>
          <Button variant="secondary" onClick={handlePrevious}>
            Previous
          </Button>
          <Button variant="primary" onClick={handleSaveAndContinue} disabled={!isValid}>
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpeakingEvaluationParameters;