import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Card from '../../components/common/Card/Card';
import ResponsiveProgressSteps from '../../components/common/ResponsiveProgressSteps/ResponsiveProgressSteps';
import BottomActions from '../../components/common/BottomActions/BottomActions';
import { FILL_IN_THE_BLANKS_PROGRESS_STEPS, FILL_IN_THE_BLANKS_STEP_NUMBERS, getPreviousRoute } from '../../constants/fillInTheBlanksProgressSteps';
import styles from '../EvaluationParameters/EvaluationParameters.module.css';
import '../../styles/utilities.css';

const FillInTheBlanksEvaluationParameters = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    timeLimit: {
      enabled: true,
      duration: 10,
      unit: 'minutes'
    },
    attempts: {
      unlimited: false,
      maxAttempts: 3,
      showPreviousAttempts: true
    },
    feedback: {
      immediate: true,
      showCorrectAnswers: true,
      showExplanations: false,
      detailedFeedback: true
    },
    accessibility: {
      screenReaderSupport: true,
      keyboardNavigation: true,
      highContrast: false,
      fontSize: 'medium'
    },
    grading: {
      autoGrade: true,
      passingScore: 70,
      weightedScoring: false,
      showScoreBreakdown: true
    },
    security: {
      randomizeOrder: false,
      preventCopy: false,
      lockdownBrowser: false,
      plagiarismDetection: false
    }
  });

  const [errors, setErrors] = useState({});

  const timeUnits = [
    { value: 'minutes', label: 'Minutes' },
    { value: 'hours', label: 'Hours' }
  ];

  const fontSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'extra-large', label: 'Extra Large' }
  ];

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.timeLimit.enabled && (!formData.timeLimit.duration || formData.timeLimit.duration <= 0)) {
      newErrors.timeLimit = 'Time limit duration must be greater than 0';
    }

    if (!formData.attempts.unlimited && (!formData.attempts.maxAttempts || formData.attempts.maxAttempts <= 0)) {
      newErrors.attempts = 'Maximum attempts must be greater than 0';
    }

    if (formData.grading.passingScore < 0 || formData.grading.passingScore > 100) {
      newErrors.passingScore = 'Passing score must be between 0 and 100';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinish = () => {
    if (validateForm()) {
      console.log('Finishing fill-in-the-blanks creation with evaluation parameters:', formData);
      // Here you would typically save all the data and redirect to a success page
      alert('Fill-in-the-blanks question created successfully!');
      navigate('/');
    }
  };

  const handleBack = () => {
    navigate(getPreviousRoute(FILL_IN_THE_BLANKS_STEP_NUMBERS.EVALUATION_PARAMETERS));
  };

  const ToggleCard = ({ title, description, enabled, onChange, children }) => (
    <Card variant="outlined" padding="md" className={`${styles.toggleCard} ${enabled ? styles.enabled : ''}`}>
      <div className={styles.toggleHeader}>
        <div className={styles.toggleInfo}>
          <h4 className={styles.toggleTitle}>{title}</h4>
          <p className={styles.toggleDescription}>{description}</p>
        </div>
        <label className={styles.toggleSwitch}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
      {enabled && children && (
        <div className={styles.toggleContent}>
          {children}
        </div>
      )}
    </Card>
  );

  return (
    <div className={styles.container}>
      <Header title="Fill In The Blanks - Evaluation Parameters" />
      
      <div className={styles.progressContainer}>
        <ResponsiveProgressSteps 
          steps={FILL_IN_THE_BLANKS_PROGRESS_STEPS}
          currentStep={FILL_IN_THE_BLANKS_STEP_NUMBERS.EVALUATION_PARAMETERS}
          variant="horizontal"
        />
      </div>

      <div className={styles.content}>
        <Card variant="elevated" padding="lg" className={styles.introCard}>
          <div className={styles.cardHeader}>
            <h2 className="sectionTitle">Evaluation Parameters</h2>
            <p className="sectionDescription">
              Configure how your fill-in-the-blanks question will be administered and evaluated. 
              These settings control timing, attempts, feedback, and accessibility options.
            </p>
          </div>
        </Card>

        {/* Time Limits */}
        <ToggleCard
          title="Time Limits"
          description="Set time constraints for completing the question"
          enabled={formData.timeLimit.enabled}
          onChange={(enabled) => handleInputChange('timeLimit', 'enabled', enabled)}
        >
          <div className={styles.timeSettings}>
            <div className={styles.inputGroup}>
              <label className="fieldLabel">Duration</label>
              <div className={styles.durationInput}>
                <input
                  type="number"
                  min="1"
                  value={formData.timeLimit.duration}
                  onChange={(e) => handleInputChange('timeLimit', 'duration', parseInt(e.target.value) || 1)}
                  className={styles.numberInput}
                />
                <select
                  value={formData.timeLimit.unit}
                  onChange={(e) => handleInputChange('timeLimit', 'unit', e.target.value)}
                  className={styles.select}
                >
                  {timeUnits.map(unit => (
                    <option key={unit.value} value={unit.value}>{unit.label}</option>
                  ))}
                </select>
              </div>
            </div>
            {errors.timeLimit && (
              <div className={styles.errorMessage}>{errors.timeLimit}</div>
            )}
          </div>
        </ToggleCard>

        {/* Attempt Settings */}
        <Card variant="outlined" padding="md" className={styles.attemptsCard}>
          <h3 className={styles.sectionSubtitle}>Attempt Settings</h3>
          <div className={styles.attemptsConfig}>
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="attemptType"
                  checked={formData.attempts.unlimited}
                  onChange={() => handleInputChange('attempts', 'unlimited', true)}
                />
                <span className={styles.radioLabel}>
                  <strong>Unlimited Attempts</strong>
                  <span>Students can retry as many times as needed</span>
                </span>
              </label>
              
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="attemptType"
                  checked={!formData.attempts.unlimited}
                  onChange={() => handleInputChange('attempts', 'unlimited', false)}
                />
                <span className={styles.radioLabel}>
                  <strong>Limited Attempts</strong>
                  <span>Restrict the number of attempts allowed</span>
                </span>
              </label>
            </div>

            {!formData.attempts.unlimited && (
              <div className={styles.maxAttemptsInput}>
                <label className="fieldLabel">Maximum Attempts</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.attempts.maxAttempts}
                  onChange={(e) => handleInputChange('attempts', 'maxAttempts', parseInt(e.target.value) || 1)}
                  className={styles.numberInput}
                />
                {errors.attempts && (
                  <div className={styles.errorMessage}>{errors.attempts}</div>
                )}
              </div>
            )}

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="showPreviousAttempts"
                checked={formData.attempts.showPreviousAttempts}
                onChange={(e) => handleInputChange('attempts', 'showPreviousAttempts', e.target.checked)}
              />
              <label htmlFor="showPreviousAttempts" className={styles.checkboxLabel}>
                Show previous attempt results to students
              </label>
            </div>
          </div>
        </Card>

        {/* Feedback Settings */}
        <Card variant="outlined" padding="md" className={styles.feedbackCard}>
          <h3 className={styles.sectionSubtitle}>Feedback & Results</h3>
          <div className={styles.feedbackGrid}>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="immediate"
                checked={formData.feedback.immediate}
                onChange={(e) => handleInputChange('feedback', 'immediate', e.target.checked)}
              />
              <label htmlFor="immediate" className={styles.checkboxLabel}>
                <strong>Immediate Feedback</strong>
                <span>Show results right after submission</span>
              </label>
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="showCorrectAnswers"
                checked={formData.feedback.showCorrectAnswers}
                onChange={(e) => handleInputChange('feedback', 'showCorrectAnswers', e.target.checked)}
              />
              <label htmlFor="showCorrectAnswers" className={styles.checkboxLabel}>
                <strong>Show Correct Answers</strong>
                <span>Display the right answers after submission</span>
              </label>
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="detailedFeedback"
                checked={formData.feedback.detailedFeedback}
                onChange={(e) => handleInputChange('feedback', 'detailedFeedback', e.target.checked)}
              />
              <label htmlFor="detailedFeedback" className={styles.checkboxLabel}>
                <strong>Detailed Feedback</strong>
                <span>Provide explanations for each answer</span>
              </label>
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="showScoreBreakdown"
                checked={formData.grading.showScoreBreakdown}
                onChange={(e) => handleInputChange('grading', 'showScoreBreakdown', e.target.checked)}
              />
              <label htmlFor="showScoreBreakdown" className={styles.checkboxLabel}>
                <strong>Score Breakdown</strong>
                <span>Show points for each blank</span>
              </label>
            </div>
          </div>
        </Card>

        {/* Grading Settings */}
        <Card variant="outlined" padding="md" className={styles.gradingCard}>
          <h3 className={styles.sectionSubtitle}>Grading Configuration</h3>
          <div className={styles.gradingGrid}>
            <div className={styles.fieldGroup}>
              <label className="fieldLabel">Passing Score (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.grading.passingScore}
                onChange={(e) => handleInputChange('grading', 'passingScore', parseInt(e.target.value) || 70)}
                className={styles.numberInput}
              />
              {errors.passingScore && (
                <div className={styles.errorMessage}>{errors.passingScore}</div>
              )}
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="autoGrade"
                checked={formData.grading.autoGrade}
                onChange={(e) => handleInputChange('grading', 'autoGrade', e.target.checked)}
              />
              <label htmlFor="autoGrade" className={styles.checkboxLabel}>
                <strong>Automatic Grading</strong>
                <span>Grade answers automatically using the provided solutions</span>
              </label>
            </div>
          </div>
        </Card>

        {/* Accessibility Settings */}
        <Card variant="outlined" padding="md" className={styles.accessibilityCard}>
          <h3 className={styles.sectionSubtitle}>Accessibility Options</h3>
          <div className={styles.accessibilityGrid}>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="screenReaderSupport"
                checked={formData.accessibility.screenReaderSupport}
                onChange={(e) => handleInputChange('accessibility', 'screenReaderSupport', e.target.checked)}
              />
              <label htmlFor="screenReaderSupport" className={styles.checkboxLabel}>
                <strong>Screen Reader Support</strong>
                <span>Optimize for assistive technologies</span>
              </label>
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="keyboardNavigation"
                checked={formData.accessibility.keyboardNavigation}
                onChange={(e) => handleInputChange('accessibility', 'keyboardNavigation', e.target.checked)}
              />
              <label htmlFor="keyboardNavigation" className={styles.checkboxLabel}>
                <strong>Keyboard Navigation</strong>
                <span>Enable full keyboard accessibility</span>
              </label>
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="highContrast"
                checked={formData.accessibility.highContrast}
                onChange={(e) => handleInputChange('accessibility', 'highContrast', e.target.checked)}
              />
              <label htmlFor="highContrast" className={styles.checkboxLabel}>
                <strong>High Contrast Mode</strong>
                <span>Improve visibility for users with visual impairments</span>
              </label>
            </div>

            <div className={styles.fieldGroup}>
              <label className="fieldLabel">Font Size</label>
              <select
                value={formData.accessibility.fontSize}
                onChange={(e) => handleInputChange('accessibility', 'fontSize', e.target.value)}
                className={styles.select}
              >
                {fontSizes.map(size => (
                  <option key={size.value} value={size.value}>{size.label}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Summary Card */}
        <Card variant="elevated" padding="lg" className={styles.summaryCard}>
          <h3 className={styles.summaryTitle}>Configuration Summary</h3>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Time Limit:</span>
              <span className={styles.summaryValue}>
                {formData.timeLimit.enabled 
                  ? `${formData.timeLimit.duration} ${formData.timeLimit.unit}`
                  : 'No limit'
                }
              </span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Attempts:</span>
              <span className={styles.summaryValue}>
                {formData.attempts.unlimited ? 'Unlimited' : `Max ${formData.attempts.maxAttempts}`}
              </span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Feedback:</span>
              <span className={styles.summaryValue}>
                {formData.feedback.immediate ? 'Immediate' : 'Delayed'}
              </span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Passing Score:</span>
              <span className={styles.summaryValue}>{formData.grading.passingScore}%</span>
            </div>
          </div>
        </Card>
      </div>

      <BottomActions
        onNext={handleFinish}
        onPrevious={handleBack}
        nextLabel="Create Question"
        previousLabel="Back to Details"
        showPrevious={true}
        nextVariant="primary"
        shortcuts={true}
      />
    </div>
  );
};

export default FillInTheBlanksEvaluationParameters;