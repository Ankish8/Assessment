import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Card from '../../components/common/Card/Card';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import FloatingFooter from '../../components/common/FloatingFooter/FloatingFooter';
import ResponsiveProgressSteps from '../../components/common/ResponsiveProgressSteps/ResponsiveProgressSteps';
import { 
  UI_FRAMEWORK_PROGRESS_STEPS, 
  UI_FRAMEWORK_STEP_NUMBERS,
  getNextRoute,
  getPreviousRoute 
} from '../../constants/uiFrameworkProgressSteps';
import styles from './UIFrameworkEvaluationParameters.module.css';
import '../../styles/utilities.css';

const UIFrameworkEvaluationParameters = () => {
  const navigate = useNavigate();
  const [autoEvaluationEnabled, setAutoEvaluationEnabled] = useState(false);
  const [manualEvaluationEnabled, setManualEvaluationEnabled] = useState(true);
  const [testCaseCode, setTestCaseCode] = useState('');
  const [criteria, setCriteria] = useState([]);
  const [errors, setErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const defaultTestCase = `// Example: Test if component renders correctly
describe('UI Component Tests', () => {
  test('should render component with correct props', () => {
    const element = document.querySelector('.my-component');
    expect(element).toBeTruthy();
    expect(element.textContent).toContain('Expected Text');
  });
  
  test('should handle user interactions', () => {
    const button = document.querySelector('.action-button');
    button.click();
    expect(document.querySelector('.result')).toBeTruthy();
  });
});`;

  const defaultCriteria = [
    { id: '1', title: 'Component Structure', weightage: 25, description: 'Proper HTML structure and semantic elements' },
    { id: '2', title: 'CSS Styling', weightage: 30, description: 'Visual design, layout, and responsive behavior' },
    { id: '3', title: 'JavaScript Functionality', weightage: 25, description: 'Interactive features and event handling' },
    { id: '4', title: 'Code Quality', weightage: 20, description: 'Clean, readable, and maintainable code' }
  ];

  // Calculate total weightage
  const totalWeightage = criteria.reduce((sum, criterion) => sum + (parseInt(criterion.weightage) || 0), 0);
  const isValidWeightage = totalWeightage === 100;

  // Initialize with default criteria if manual evaluation is enabled
  useEffect(() => {
    if (manualEvaluationEnabled && criteria.length === 0) {
      setCriteria(defaultCriteria);
    }
  }, [manualEvaluationEnabled, criteria.length]);

  // Validation
  useEffect(() => {
    const newErrors = {};
    
    if (autoEvaluationEnabled && !testCaseCode.trim()) {
      newErrors.testCase = 'Test case code is required when auto evaluation is enabled';
    }
    
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
          newErrors.totalWeightage = `Total weightage must equal 100% (currently ${totalWeightage}%)`;
        }
      }
    }

    setErrors(newErrors);
  }, [autoEvaluationEnabled, testCaseCode, manualEvaluationEnabled, criteria, totalWeightage]);

  const handleToggleAutoEvaluation = (enabled) => {
    setAutoEvaluationEnabled(enabled);
    if (enabled && !testCaseCode.trim()) {
      setTestCaseCode(defaultTestCase);
    }
  };

  const handleToggleManualEvaluation = (enabled) => {
    setManualEvaluationEnabled(enabled);
    if (enabled && criteria.length === 0) {
      setCriteria(defaultCriteria);
    }
  };

  const updateCriterion = (id, field, value) => {
    setCriteria(prev => prev.map(criterion => 
      criterion.id === id ? { ...criterion, [field]: value } : criterion
    ));
  };

  const addCriterion = () => {
    const newId = Date.now().toString();
    setCriteria(prev => [...prev, {
      id: newId,
      title: '',
      weightage: 0,
      description: ''
    }]);
  };

  const deleteCriterion = (id) => {
    setCriteria(prev => prev.filter(criterion => criterion.id !== id));
  };

  const handleSaveAndContinue = () => {
    setHasAttemptedSubmit(true);
    if (isValid) {
      navigate(getNextRoute(UI_FRAMEWORK_STEP_NUMBERS.EVALUATION_PARAMETERS));
    }
  };

  const handlePrevious = () => {
    navigate(getPreviousRoute(UI_FRAMEWORK_STEP_NUMBERS.EVALUATION_PARAMETERS));
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <div className={styles.container}>
      <Header title="UI Framework - Evaluation Parameters" />
      
      <div className={styles.progressContainer}>
        <ResponsiveProgressSteps 
          steps={UI_FRAMEWORK_PROGRESS_STEPS} 
          currentStep={UI_FRAMEWORK_STEP_NUMBERS.EVALUATION_PARAMETERS} 
        />
      </div>

      <div className={`${styles.content} floating-footer-spacing`}>
        <div className={styles.evaluationGrid}>
          {/* Left Column - Auto Evaluation */}
          <div className={styles.leftColumn}>
            <Card variant="elevated" padding="md" className={styles.evaluationCard}>
              <div className={styles.compactHeader}>
                <div className={styles.headerLeft}>
                  <h3 className={styles.sectionTitle}>
                    <i className="fas fa-robot"></i>
                    Auto Evaluation
                  </h3>
                  <p className={styles.sectionDescription}>
                    Automated testing with JavaScript
                  </p>
                </div>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={autoEvaluationEnabled}
                    onChange={(e) => handleToggleAutoEvaluation(e.target.checked)}
                  />
                  <span className={styles.toggleSlider}></span>
                </label>
              </div>

              {autoEvaluationEnabled ? (
                <div className={styles.evaluationContent}>
                  <div className={styles.compactCodeEditor}>
                    <div className={styles.editorLabel}>
                      <span>Test Cases</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(testCaseCode);
                          } catch (err) {
                            console.error('Failed to copy:', err);
                          }
                        }}
                        className={styles.copyButton}
                      >
                        <i className="fas fa-copy"></i>
                      </Button>
                    </div>
                    <textarea
                      value={testCaseCode}
                      onChange={(e) => setTestCaseCode(e.target.value)}
                      className={styles.compactEditor}
                      placeholder="Write JavaScript test cases..."
                      spellCheck={false}
                    />
                  </div>
                  {errors.testCase && (
                    <div className={styles.errorMessage}>
                      <i className="fas fa-exclamation-triangle"></i>
                      {errors.testCase}
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.disabledInfo}>
                  <div className={styles.infoBox}>
                    <i className="fas fa-info-circle"></i>
                    <span>Enable for automated testing</span>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Manual Evaluation */}
          <div className={styles.rightColumn}>
            <Card variant="elevated" padding="md" className={styles.evaluationCard}>
              <div className={styles.compactHeader}>
                <div className={styles.headerLeft}>
                  <h3 className={styles.sectionTitle}>
                    <i className="fas fa-user-graduate"></i>
                    Manual Evaluation
                  </h3>
                  <p className={styles.sectionDescription}>
                    Custom criteria for human review
                  </p>
                </div>
                <div className={styles.headerRight}>
                  {manualEvaluationEnabled && (
                    <span className={`${styles.totalWeightage} ${isValidWeightage ? styles.valid : styles.invalid}`}>
                      {totalWeightage}%
                    </span>
                  )}
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

              {manualEvaluationEnabled ? (
                <div className={styles.evaluationContent}>
                  <div className={styles.criteriaList}>
                    {criteria.map((criterion, index) => (
                      <div key={criterion.id} className={styles.compactCriterion}>
                        <div className={styles.criterionRow}>
                          <span className={styles.criterionNumber}>{index + 1}</span>
                          <Input
                            value={criterion.title}
                            onChange={(e) => updateCriterion(criterion.id, 'title', e.target.value)}
                            placeholder="Criterion title"
                            className={styles.criterionInput}
                            error={errors[`criterion_${index}_title`]}
                          />
                          <div className={styles.weightageInput}>
                            <Input
                              type="number"
                              value={criterion.weightage}
                              onChange={(e) => updateCriterion(criterion.id, 'weightage', parseInt(e.target.value) || 0)}
                              placeholder="0"
                              className={styles.weightageField}
                              error={errors[`criterion_${index}_weightage`]}
                            />
                            <span className={styles.percentSymbol}>%</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteCriterion(criterion.id)}
                            className={styles.deleteButton}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={addCriterion}
                    className={styles.addButton}
                    size="sm"
                  >
                    <i className="fas fa-plus"></i>
                    Add Criterion
                  </Button>
                  
                  {errors.totalWeightage && (
                    <div className={styles.errorMessage}>
                      <i className="fas fa-exclamation-triangle"></i>
                      {errors.totalWeightage}
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.disabledInfo}>
                  <div className={styles.infoBox}>
                    <i className="fas fa-info-circle"></i>
                    <span>Enable for manual review</span>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

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
  );
};

export default UIFrameworkEvaluationParameters;