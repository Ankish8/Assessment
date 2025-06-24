import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Card from '../../components/common/Card/Card';
import ResponsiveProgressSteps from '../../components/common/ResponsiveProgressSteps/ResponsiveProgressSteps';
import BottomActions from '../../components/common/BottomActions/BottomActions';
import { FILL_IN_THE_BLANKS_PROGRESS_STEPS, FILL_IN_THE_BLANKS_STEP_NUMBERS, getNextRoute, getPreviousRoute } from '../../constants/fillInTheBlanksProgressSteps';
import styles from '../QuestionDetails/QuestionDetails.module.css';
import '../../styles/utilities.css';

const FillInTheBlanksQuestionDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Medium',
    estimatedTime: '10',
    topics: [],
    skills: [],
    hints: [],
    scoring: {
      partialCredit: true,
      pointsPerBlank: 1,
      penaltyForWrong: 0,
      caseSensitive: false,
      exactMatch: false
    }
  });
  const [errors, setErrors] = useState({});
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [newHint, setNewHint] = useState('');

  const difficultyOptions = [
    { value: 'Easy', label: 'Easy', color: '#10B981', description: 'Basic level questions' },
    { value: 'Medium', label: 'Medium', color: '#F59E0B', description: 'Intermediate difficulty' },
    { value: 'Hard', label: 'Hard', color: '#EF4444', description: 'Advanced level questions' }
  ];

  const timeOptions = [
    { value: '5', label: '5 minutes' },
    { value: '10', label: '10 minutes' },
    { value: '15', label: '15 minutes' },
    { value: '20', label: '20 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' }
  ];

  const commonTopics = [
    'Programming Fundamentals', 'Data Structures', 'Algorithms', 'Object-Oriented Programming',
    'Database Design', 'Web Development', 'Software Engineering', 'System Design',
    'Machine Learning', 'Mathematics', 'Statistics', 'Computer Networks'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleScoringChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      scoring: {
        ...prev.scoring,
        [field]: value
      }
    }));
  };

  const addTopic = (topic) => {
    if (!formData.topics.includes(topic)) {
      setFormData(prev => ({
        ...prev,
        topics: [...prev.topics, topic]
      }));
    }
  };

  const removeTopic = (topicToRemove) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.filter(topic => topic !== topicToRemove)
    }));
  };

  const addHint = () => {
    if (newHint.trim() && formData.hints.length < 3) {
      setFormData(prev => ({
        ...prev,
        hints: [...prev.hints, newHint.trim()]
      }));
      setNewHint('');
    }
  };

  const removeHint = (index) => {
    setFormData(prev => ({
      ...prev,
      hints: prev.hints.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Question title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Question description is required';
    }

    if (formData.topics.length === 0) {
      newErrors.topics = 'Please select at least one topic';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAndContinue = () => {
    if (validateForm()) {
      console.log('Saving fill-in-the-blanks question details:', formData);
      navigate(getNextRoute(FILL_IN_THE_BLANKS_STEP_NUMBERS.QUESTION_DETAILS));
    }
  };

  const handleBack = () => {
    navigate(getPreviousRoute(FILL_IN_THE_BLANKS_STEP_NUMBERS.QUESTION_DETAILS));
  };

  return (
    <div className={styles.container}>
      <Header title="Fill In The Blanks - Question Details" />
      
      <div className={styles.progressContainer}>
        <ResponsiveProgressSteps 
          steps={FILL_IN_THE_BLANKS_PROGRESS_STEPS}
          currentStep={FILL_IN_THE_BLANKS_STEP_NUMBERS.QUESTION_DETAILS}
          variant="horizontal"
        />
      </div>

      <div className={styles.content}>
        {/* Basic Information */}
        <Card variant="elevated" padding="lg" className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <h2 className="sectionTitle">Question Information</h2>
            <p className="sectionDescription">
              Provide details about your fill-in-the-blanks question to help students understand the context and difficulty level.
            </p>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.fieldGroup}>
              <label className="fieldLabel">Question Title*</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={styles.input}
                placeholder="Enter a descriptive title for your question"
              />
              {errors.title && (
                <div className={styles.errorMessage}>{errors.title}</div>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className="fieldLabel">Description*</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={styles.textarea}
                placeholder="Provide context or instructions for the fill-in-the-blanks question"
                rows={4}
              />
              {errors.description && (
                <div className={styles.errorMessage}>{errors.description}</div>
              )}
            </div>

            <div className={styles.rowGroup}>
              <div className={styles.fieldGroup}>
                <label className="fieldLabel">Difficulty Level</label>
                <div className={styles.difficultySelector}>
                  {difficultyOptions.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleInputChange('difficulty', option.value)}
                      className={`${styles.difficultyOption} ${formData.difficulty === option.value ? styles.selected : ''}`}
                      style={{ '--difficulty-color': option.color }}
                    >
                      <div className={styles.difficultyLabel}>{option.label}</div>
                      <div className={styles.difficultyDescription}>{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className="fieldLabel">Estimated Time</label>
                <select
                  value={formData.estimatedTime}
                  onChange={(e) => handleInputChange('estimatedTime', e.target.value)}
                  className={styles.select}
                >
                  {timeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Topics and Skills */}
        <Card variant="elevated" padding="lg" className={styles.topicsCard}>
          <div className={styles.cardHeader}>
            <h3 className="sectionTitle">Topics & Skills</h3>
            <p className="sectionDescription">
              Tag your question with relevant topics to help organize and filter questions.
            </p>
          </div>

          <div className={styles.fieldGroup}>
            <label className="fieldLabel">Topics* (Select relevant topics)</label>
            <div className={styles.topicsGrid}>
              {commonTopics.map(topic => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => formData.topics.includes(topic) ? removeTopic(topic) : addTopic(topic)}
                  className={`${styles.topicButton} ${formData.topics.includes(topic) ? styles.selected : ''}`}
                >
                  {topic}
                  {formData.topics.includes(topic) && (
                    <span className={styles.selectedIcon}>✓</span>
                  )}
                </button>
              ))}
            </div>
            {errors.topics && (
              <div className={styles.errorMessage}>{errors.topics}</div>
            )}
          </div>

          {formData.topics.length > 0 && (
            <div className={styles.selectedTopics}>
              <h4 className={styles.selectedTitle}>Selected Topics ({formData.topics.length})</h4>
              <div className={styles.tagsList}>
                {formData.topics.map(topic => (
                  <span key={topic} className={styles.tag}>
                    {topic}
                    <button 
                      type="button"
                      onClick={() => removeTopic(topic)}
                      className={styles.removeTag}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Scoring Configuration */}
        <Card variant="elevated" padding="lg" className={styles.scoringCard}>
          <div className={styles.cardHeader}>
            <h3 className="sectionTitle">Scoring Configuration</h3>
            <p className="sectionDescription">
              Configure how the fill-in-the-blanks question should be scored.
            </p>
          </div>

          <div className={styles.scoringGrid}>
            <div className={styles.scoringOption}>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="partialCredit"
                  checked={formData.scoring.partialCredit}
                  onChange={(e) => handleScoringChange('partialCredit', e.target.checked)}
                  className={styles.checkbox}
                />
                <label htmlFor="partialCredit" className={styles.checkboxLabel}>
                  <strong>Allow Partial Credit</strong>
                  <span>Students get points for each correct blank</span>
                </label>
              </div>
            </div>

            <div className={styles.scoringOption}>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="caseSensitive"
                  checked={formData.scoring.caseSensitive}
                  onChange={(e) => handleScoringChange('caseSensitive', e.target.checked)}
                  className={styles.checkbox}
                />
                <label htmlFor="caseSensitive" className={styles.checkboxLabel}>
                  <strong>Case Sensitive</strong>
                  <span>Answers must match exact capitalization</span>
                </label>
              </div>
            </div>

            <div className={styles.scoringInput}>
              <label className="fieldLabel">Points per Blank</label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.scoring.pointsPerBlank}
                onChange={(e) => handleScoringChange('pointsPerBlank', parseInt(e.target.value) || 1)}
                className={styles.input}
              />
            </div>

            <div className={styles.scoringInput}>
              <label className="fieldLabel">Penalty for Wrong Answer</label>
              <input
                type="number"
                min="0"
                max="5"
                value={formData.scoring.penaltyForWrong}
                onChange={(e) => handleScoringChange('penaltyForWrong', parseInt(e.target.value) || 0)}
                className={styles.input}
              />
            </div>
          </div>
        </Card>

        {/* Hints */}
        <Card variant="outlined" padding="md" className={styles.hintsCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.hintsTitle}>Hints (Optional)</h3>
            <p className="sectionDescription">
              Add up to 3 hints to help guide students. Hints are revealed progressively.
            </p>
          </div>

          <div className={styles.hintsSection}>
            {formData.hints.map((hint, index) => (
              <div key={index} className={styles.hintItem}>
                <div className={styles.hintNumber}>Hint {index + 1}</div>
                <div className={styles.hintText}>{hint}</div>
                <button
                  type="button"
                  onClick={() => removeHint(index)}
                  className={styles.removeHint}
                  title="Remove hint"
                >
                  ×
                </button>
              </div>
            ))}

            {formData.hints.length < 3 && (
              <div className={styles.addHintSection}>
                <input
                  type="text"
                  value={newHint}
                  onChange={(e) => setNewHint(e.target.value)}
                  placeholder={`Enter hint ${formData.hints.length + 1}...`}
                  className={styles.input}
                  onKeyPress={(e) => e.key === 'Enter' && addHint()}
                />
                <button
                  type="button"
                  onClick={addHint}
                  disabled={!newHint.trim()}
                  className={styles.addHintButton}
                >
                  Add Hint
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>

      <BottomActions
        onNext={handleSaveAndContinue}
        onPrevious={handleBack}
        nextLabel="Save & Continue"
        previousLabel="Back to Media"
        showPrevious={true}
        shortcuts={true}
      />
    </div>
  );
};

export default FillInTheBlanksQuestionDetails;