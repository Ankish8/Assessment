import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import FloatingFooter from '../../components/common/FloatingFooter/FloatingFooter';
import ProgressSteps from '../../components/common/ProgressSteps/ProgressSteps';
import styles from './MultipleChoiceQuestion.module.css';
import '../../styles/utilities.css';

const MultipleChoiceQuestion = () => {
  const navigate = useNavigate();
  const [choices, setChoices] = useState([
    { id: 1, text: '', isCorrect: false, partialMarks: 0 },
    { id: 2, text: '', isCorrect: false, partialMarks: 0 }
  ]);
  
  const [shuffleOptions, setShuffleOptions] = useState(false);
  const [useOptionTranslation, setUseOptionTranslation] = useState(false);
  const [enablePartialMarks, setEnablePartialMarks] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const steps = [
    { id: 'statement', label: 'Question Statement' },
    { id: 'choices', label: 'Choices' },
    { id: 'details', label: 'Question Details' },
    { id: 'solution', label: 'Solution Details' }
  ];

  // Calculate totals
  const totalPartialMarks = choices.reduce((sum, choice) => sum + (choice.partialMarks || 0), 0);
  const correctAnswersCount = choices.filter(choice => choice.isCorrect).length;

  // Validation
  useEffect(() => {
    const newErrors = {};
    
    // Check for empty choices
    choices.forEach((choice, index) => {
      if (!choice.text.trim()) {
        newErrors[`choice_${choice.id}`] = `Option #${index + 1} is blank`;
      }
    });

    // Check for at least one correct answer
    if (correctAnswersCount === 0) {
      newErrors.correctAnswer = 'Please select at least one correct answer';
    }

    // Check partial marks total if enabled
    if (enablePartialMarks && totalPartialMarks !== 100) {
      newErrors.partialMarks = `Please add atleast one option with 100 as partial marks weightage`;
    }

    setErrors(newErrors);
  }, [choices, enablePartialMarks, correctAnswersCount, totalPartialMarks]);

  const addChoice = () => {
    const newId = Math.max(...choices.map(c => c.id)) + 1;
    setChoices([...choices, { 
      id: newId, 
      text: '', 
      isCorrect: false, 
      partialMarks: enablePartialMarks ? 25 : 0 // Default marks when enabled
    }]);
  };

  const removeChoice = (id) => {
    if (choices.length > 2) {
      setChoices(choices.filter(choice => choice.id !== id));
    }
  };

  const updateChoice = (id, field, value) => {
    setChoices(choices.map(choice => 
      choice.id === id ? { ...choice, [field]: value } : choice
    ));
  };

  const handlePartialMarksToggle = (enabled) => {
    setEnablePartialMarks(enabled);
    if (enabled) {
      // When enabling, set default marks for correct answers
      setChoices(choices.map(choice => ({
        ...choice,
        partialMarks: choice.isCorrect ? 25 : 0
      })));
    } else {
      // When disabling, reset all marks
      setChoices(choices.map(choice => ({ ...choice, partialMarks: 0 })));
    }
  };

  const handleCorrectToggle = (id, isCorrect) => {
    setChoices(choices.map(choice => {
      if (choice.id === id) {
        return {
          ...choice,
          isCorrect,
          partialMarks: choice.partialMarks // Keep existing marks when toggling
        };
      }
      return choice;
    }));
  };

  const handleSaveAndContinue = () => {
    setHasAttemptedSubmit(true);
    if (Object.keys(errors).length === 0 && choices.length >= 2) {
      navigate('/question-details');
    }
  };

  const isValid = Object.keys(errors).length === 0 && choices.length >= 2;
  const optionLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return (
    <div className={styles.container}>
      <Header title="Multiple Choice Question" />
      
      <div className={styles.progressContainer}>
        <ProgressSteps steps={steps} currentStep={2} />
      </div>

      <div className={`${styles.content} floating-footer-spacing`}>
        <Card variant="elevated" padding="lg" className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.sectionTitle}>Add Choices</h2>
            <p className={styles.instruction}>
              <i className="fas fa-info-circle" aria-hidden="true"></i>
              Click on any option to mark it as a correct answer. You can select multiple correct answers.
            </p>
          </div>

          {/* Options Section */}
          <div className={styles.optionsSection}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={shuffleOptions}
                onChange={(e) => setShuffleOptions(e.target.checked)}
                className={styles.checkbox}
              />
              <i className="fas fa-random" aria-hidden="true"></i>
              <span className={styles.checkboxText}>Shuffle options</span>
            </label>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={useOptionTranslation}
                onChange={(e) => setUseOptionTranslation(e.target.checked)}
                className={styles.checkbox}
              />
              <i className="fas fa-globe" aria-hidden="true"></i>
              <span className={styles.checkboxText}>Use option translation</span>
            </label>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={enablePartialMarks}
                onChange={(e) => handlePartialMarksToggle(e.target.checked)}
                className={styles.checkbox}
              />
              <i className="fas fa-chart-bar" aria-hidden="true"></i>
              <span className={styles.checkboxText}>Partial Marks</span>
            </label>
          </div>

          {/* Global Error Messages */}
          {hasAttemptedSubmit && (errors.correctAnswer || errors.partialMarks) && (
            <div className={styles.globalErrors}>
              {errors.correctAnswer && (
                <div className={styles.errorMessage}>
                  <i className="fas fa-exclamation-triangle" aria-hidden="true"></i>
                  {errors.correctAnswer}
                </div>
              )}
              {errors.partialMarks && (
                <div className={styles.errorMessage}>
                  <i className="fas fa-exclamation-triangle" aria-hidden="true"></i>
                  {errors.partialMarks}
                </div>
              )}
            </div>
          )}

          {/* Choices List */}
          <div className={styles.choicesList}>
            {choices.map((choice, index) => (
              <div key={choice.id} className={styles.choiceItem}>
                {/* Choice Header with Correct Answer Selection */}
                <div className={`${styles.choiceHeader} ${choice.isCorrect ? styles.correctChoice : ''}`}>
                  <div 
                    className={styles.choiceInfo}
                    onClick={() => handleCorrectToggle(choice.id, !choice.isCorrect)}
                  >
                    <div className={styles.optionSelector}>
                      <input
                        type="checkbox"
                        checked={choice.isCorrect}
                        onChange={(e) => handleCorrectToggle(choice.id, e.target.checked)}
                        className={styles.correctCheckbox}
                      />
                    </div>
                    <span className={styles.optionLetter}>{optionLetters[index]}</span>
                    {choice.isCorrect && (
                      <span className={styles.correctBadge}>
                        <i className="fas fa-check-circle" aria-hidden="true"></i>
                        Correct Answer
                      </span>
                    )}
                  </div>
                  
                  <div className={styles.choiceActions}>
                    {enablePartialMarks && (
                      <div className={styles.partialMarksInput}>
                        <label className={styles.marksLabel}>
                          Marks:
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={choice.partialMarks || ''}
                            onChange={(e) => updateChoice(choice.id, 'partialMarks', parseInt(e.target.value) || 0)}
                            className={styles.marksField}
                            disabled={false}
                            placeholder="0"
                          />
                        </label>
                      </div>
                    )}
                    
                    {choices.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeChoice(choice.id)}
                        className={styles.removeButton}
                        title="Remove this option"
                      >
                        <i className="fas fa-times" aria-hidden="true"></i>
                      </button>
                    )}
                  </div>
                </div>

                {/* Text Editor */}
                <div className={styles.textEditorContainer}>
                  <div className={styles.editorToolbar}>
                    <div className={styles.toolbarGroup}>
                      <button type="button" className={styles.toolbarButton} title="Source">
                        <i className="fas fa-code" aria-hidden="true"></i>
                      </button>
                      <button type="button" className={styles.toolbarButton} title="Format">
                        <i className="fas fa-file-alt" aria-hidden="true"></i>
                      </button>
                      <button type="button" className={styles.toolbarButton} title="Undo">
                        <i className="fas fa-undo" aria-hidden="true"></i>
                      </button>
                      <button type="button" className={styles.toolbarButton} title="Redo">
                        <i className="fas fa-redo" aria-hidden="true"></i>
                      </button>
                      <button type="button" className={styles.toolbarButton} title="Find">
                        <i className="fas fa-search" aria-hidden="true"></i>
                      </button>
                      <button type="button" className={styles.toolbarButton} title="Settings">
                        <i className="fas fa-cog" aria-hidden="true"></i>
                      </button>
                    </div>
                    
                    <div className={styles.toolbarDivider}></div>
                    
                    <div className={styles.toolbarGroup}>
                      <button type="button" className={styles.toolbarButton} title="Bold">
                        <i className="fas fa-bold" aria-hidden="true"></i>
                      </button>
                      <button type="button" className={styles.toolbarButton} title="Italic">
                        <i className="fas fa-italic" aria-hidden="true"></i>
                      </button>
                      <button type="button" className={styles.toolbarButton} title="Underline">
                        <i className="fas fa-underline" aria-hidden="true"></i>
                      </button>
                      <button type="button" className={styles.toolbarButton} title="Strikethrough">
                        <i className="fas fa-strikethrough" aria-hidden="true"></i>
                      </button>
                      <button type="button" className={styles.toolbarButton} title="Superscript">
                        <i className="fas fa-superscript" aria-hidden="true"></i>
                      </button>
                      <button type="button" className={styles.toolbarButton} title="Subscript">
                        <i className="fas fa-subscript" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={choice.text}
                    onChange={(e) => updateChoice(choice.id, 'text', e.target.value)}
                    placeholder={`Enter option ${optionLetters[index]} text...`}
                    className={`${styles.textEditor} ${hasAttemptedSubmit && errors[`choice_${choice.id}`] ? styles.editorError : ''}`}
                    rows={4}
                  />

                  {hasAttemptedSubmit && errors[`choice_${choice.id}`] && (
                    <div className={styles.choiceError}>
                      <i className="fas fa-exclamation-triangle" aria-hidden="true"></i>
                      {errors[`choice_${choice.id}`]}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add New Option Button */}
          <div className={styles.addOptionContainer}>
            <Button
              variant="outline"
              onClick={addChoice}
              className={styles.addButton}
            >
              <i className="fas fa-plus" aria-hidden="true"></i>
              Add New
            </Button>
          </div>
        </Card>

        {/* Bottom Actions */}
        <FloatingFooter>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className={styles.cancelButton}
          >
            Previous
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveAndContinue}
            disabled={!isValid}
            className={styles.saveButton}
          >
            Save & Continue
          </Button>
        </FloatingFooter>
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;