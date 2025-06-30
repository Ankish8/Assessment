import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Card from '../../components/common/Card/Card';
import ResponsiveProgressSteps from '../../components/common/ResponsiveProgressSteps/ResponsiveProgressSteps';
import BottomActions from '../../components/common/BottomActions/BottomActions';
import { FILL_IN_THE_BLANKS_PROGRESS_STEPS, FILL_IN_THE_BLANKS_STEP_NUMBERS, getNextRoute } from '../../constants/fillInTheBlanksProgressSteps';
import styles from './FillInTheBlanks.module.css';
import '../../styles/utilities.css';

const FillInTheBlanks = () => {
  const navigate = useNavigate();
  const [questionText, setQuestionText] = useState('');
  const [blanks, setBlanks] = useState([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [errors, setErrors] = useState({});
  const [showInstructions, setShowInstructions] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [activeBlankId, setActiveBlankId] = useState(null);
  const [saveStatus, setSaveStatus] = useState({}); // Track save status per blank
  const [savingBlankId, setSavingBlankId] = useState(null);
  const [showNudge, setShowNudge] = useState({}); // Track nudge visibility per blank
  const [dismissedNudges, setDismissedNudges] = useState(new Set()); // Track dismissed nudges
  const textareaRef = useRef(null);
  const previewRef = useRef(null);
  
  // Track cursor position
  const handleCursorChange = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      setCursorPosition(textarea.selectionStart);
    }
  };

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (previewRef.current && !previewRef.current.contains(event.target)) {
        setActiveBlankId(null);
      }
    };

    if (activeBlankId) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [activeBlankId]);

  const handleTextChange = (e) => {
    setQuestionText(e.target.value);
    updateBlanksFromText(e.target.value);
  };

  const updateBlanksFromText = (text) => {
    const blankMatches = text.match(/\[blank\d+\]/g) || [];
    const newBlanks = blankMatches.map((match, index) => {
      const existingBlank = blanks.find(blank => blank.placeholder === match);
      return existingBlank || {
        id: index + 1,
        placeholder: match,
        correctAnswer: '',
        alternativeAnswers: []
      };
    });
    setBlanks(newBlanks);
  };

  const createBlank = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const currentPos = textarea.selectionStart;
    const nextBlankNumber = blanks.length + 1;
    const blankPlaceholder = `[blank${nextBlankNumber}]`;
    
    // Insert blank at cursor position
    const newText = questionText.substring(0, currentPos) + blankPlaceholder + questionText.substring(currentPos);
    setQuestionText(newText);
    
    // Add to blanks array
    const newBlank = {
      id: nextBlankNumber,
      placeholder: blankPlaceholder,
      correctAnswer: '',
      alternativeAnswers: []
    };
    
    setBlanks([...blanks, newBlank]);
    
    // Show nudge after 2 seconds if blank is still empty and not dismissed
    setTimeout(() => {
      // Check if blank is still empty and not dismissed
      const currentBlank = blanks.find(b => b.id === nextBlankNumber) || newBlank;
      if (!currentBlank.correctAnswer && !dismissedNudges.has(nextBlankNumber)) {
        setShowNudge(prev => ({ ...prev, [nextBlankNumber]: true }));
      }
    }, 2000);
    
    // Move cursor after the blank
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(currentPos + blankPlaceholder.length, currentPos + blankPlaceholder.length);
    }, 0);
    
    // Auto-hide instructions after first blank
    if (isFirstTime) {
      setIsFirstTime(false);
      setTimeout(() => setShowInstructions(false), 2000);
    }
  };

  const handleBlankAnswerChange = (blankId, field, value) => {
    setBlanks(prev => prev.map(blank => 
      blank.id === blankId ? { ...blank, [field]: value } : blank
    ));
  };

  const saveBlankAnswer = (blankId) => {
    const blank = blanks.find(b => b.id === blankId);
    if (!blank || !blank.correctAnswer.trim()) {
      return;
    }

    setSavingBlankId(blankId);
    
    // Hide nudge when answer is saved
    setShowNudge(prev => ({ ...prev, [blankId]: false }));
    setDismissedNudges(prev => new Set([...prev, blankId]));
    
    // Simulate save delay for user feedback
    setTimeout(() => {
      setSaveStatus(prev => ({ ...prev, [blankId]: 'saved' }));
      setSavingBlankId(null);
      setActiveBlankId(null); // Close popup after saving
      
      // Clear saved status after 2 seconds
      setTimeout(() => {
        setSaveStatus(prev => ({ ...prev, [blankId]: null }));
      }, 2000);
    }, 300);
  };

  const dismissNudge = (blankId) => {
    setShowNudge(prev => ({ ...prev, [blankId]: false }));
    setDismissedNudges(prev => new Set([...prev, blankId]));
  };

  const handleBlankClick = (blankId) => {
    setActiveBlankId(activeBlankId === blankId ? null : blankId);
    
    // Hide nudge when blank is clicked
    if (showNudge[blankId]) {
      dismissNudge(blankId);
    }
  };

  const addAlternativeAnswer = (blankId) => {
    setBlanks(prev => prev.map(blank => 
      blank.id === blankId 
        ? { ...blank, alternativeAnswers: [...blank.alternativeAnswers, ''] }
        : blank
    ));
  };

  const removeAlternativeAnswer = (blankId, index) => {
    setBlanks(prev => prev.map(blank => 
      blank.id === blankId 
        ? { 
            ...blank, 
            alternativeAnswers: blank.alternativeAnswers.filter((_, i) => i !== index) 
          }
        : blank
    ));
  };

  const updateAlternativeAnswer = (blankId, index, value) => {
    setBlanks(prev => prev.map(blank => 
      blank.id === blankId 
        ? { 
            ...blank, 
            alternativeAnswers: blank.alternativeAnswers.map((answer, i) => 
              i === index ? value : answer
            )
          }
        : blank
    ));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!questionText.trim()) {
      newErrors.questionText = 'Question statement is required';
    }
    
    if (blanks.length === 0) {
      newErrors.blanks = 'Please add at least one blank to the question';
    }
    
    blanks.forEach(blank => {
      if (!blank.correctAnswer.trim()) {
        newErrors[`blank-${blank.id}`] = 'Correct answer is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAndContinue = () => {
    if (validateForm()) {
      console.log('Saving fill-in-the-blanks data:', { questionText, blanks });
      navigate('/fill-in-the-blanks/media-resources');
    }
  };

  const PreviewInput = ({ answer, blankNumber, placeholder, blankId }) => {
    const isActive = activeBlankId === blankId;
    const isSaving = savingBlankId === blankId;
    const isSaved = saveStatus[blankId] === 'saved';
    const shouldShowNudge = showNudge[blankId] && !answer && !isActive;
    
    return (
      <div className={styles.previewInputContainer}>
        <div className={styles.blankWrapper}>
          <input
            type="text"
            value={answer || ''}
            placeholder={answer ? '' : `[blank${blankNumber}]`}
            className={`${styles.previewInput} ${!answer ? styles.previewInputEmpty : ''} ${isActive ? styles.previewInputActive : ''} ${isSaved ? styles.previewInputSaved : ''}`}
            onClick={() => handleBlankClick(blankId)}
            data-blank={placeholder}
            title={`Click to configure blank ${blankNumber}`}
            style={{
              width: answer ? `${Math.max(answer.length * 8 + 16, 60)}px` : '120px',
              minWidth: '60px',
              cursor: 'pointer'
            }}
            readOnly
          />
          
          {/* Nudge Tooltip */}
          {shouldShowNudge && (
            <div className={styles.nudgeTooltip}>
              <div className={styles.nudgeContent}>
                <span>👆 Click here to add answer</span>
                <button 
                  className={styles.nudgeDismiss}
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissNudge(blankId);
                  }}
                  title="Dismiss"
                >
                  ×
                </button>
              </div>
              <div className={styles.nudgeArrow}></div>
            </div>
          )}
          
          {/* Simple Status Icon */}
          {!answer && !isSaving && !isSaved && (
            <div className={styles.blankEditIcon} title="Click to add answer">
              <i className="fas fa-edit"></i>
            </div>
          )}
          
          {isSaving && (
            <div className={styles.blankSavingIcon} title="Saving...">
              <i className="fas fa-spinner fa-spin"></i>
            </div>
          )}
          
          {isSaved && (
            <div className={styles.blankSavedIcon} title="Saved!">
              <i className="fas fa-check-circle"></i>
            </div>
          )}
        </div>
        {isActive && (
          <div className={styles.blankConfigPopup}>
            <div className={styles.popupHeader}>
              <span className={styles.popupTitle}>Configure Blank {blankNumber}</span>
              <button 
                onClick={() => setActiveBlankId(null)}
                className={styles.closePopup}
              >
                ×
              </button>
            </div>
            <div className={styles.popupContent}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Correct Answer*</label>
                <div className={styles.inputWithButton}>
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => handleBlankAnswerChange(blankId, 'correctAnswer', e.target.value)}
                    className={styles.configInput}
                    placeholder="Enter the correct answer"
                    autoFocus
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && answer.trim()) {
                        saveBlankAnswer(blankId);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => saveBlankAnswer(blankId)}
                    disabled={!answer.trim() || savingBlankId === blankId}
                    className={styles.saveTickButton}
                    title="Save answer"
                  >
                    {savingBlankId === blankId ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      <i className="fas fa-check"></i>
                    )}
                  </button>
                </div>
              </div>
              
              {blanks.find(b => b.id === blankId)?.alternativeAnswers?.map((altAnswer, index) => (
                <div key={index} className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Alternative Answer {index + 1}</label>
                  <div className={styles.alternativeAnswerRow}>
                    <input
                      type="text"
                      value={altAnswer}
                      onChange={(e) => updateAlternativeAnswer(blankId, index, e.target.value)}
                      className={styles.configInput}
                      placeholder={`Alternative answer ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeAlternativeAnswer(blankId, index)}
                      className={styles.removeAltButton}
                      title="Remove alternative answer"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addAlternativeAnswer(blankId)}
                className={styles.addAlternativeButton}
              >
                + Add Alternative Answer
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const getPreviewContent = () => {
    if (!questionText.trim()) {
      return <span className={styles.previewPlaceholder}>Preview will appear here as you type...</span>;
    }
    
    let content = questionText;
    const components = [];
    let lastIndex = 0;
    
    blanks.forEach((blank, index) => {
      const blankIndex = content.indexOf(blank.placeholder, lastIndex);
      if (blankIndex !== -1) {
        // Add text before the blank
        if (blankIndex > lastIndex) {
          components.push(content.substring(lastIndex, blankIndex));
        }
        
        // Add the preview input component
        components.push(
          <PreviewInput 
            key={`blank-${blank.id}`} 
            answer={blank.correctAnswer} 
            blankNumber={blank.id}
            placeholder={blank.placeholder}
            blankId={blank.id}
          />
        );
        
        lastIndex = blankIndex + blank.placeholder.length;
      }
    });
    
    // Add remaining text
    if (lastIndex < content.length) {
      components.push(content.substring(lastIndex));
    }
    
    return (
      <div className={styles.previewText} ref={previewRef}>
        {components.map((component, index) => (
          <React.Fragment key={index}>{component}</React.Fragment>
        ))}
      </div>
    );
  };


  return (
    <div className={styles.container}>
      <Header title="Fill In The Blanks" />
      
      <div className={styles.progressContainer}>
        <ResponsiveProgressSteps 
          steps={FILL_IN_THE_BLANKS_PROGRESS_STEPS}
          currentStep={FILL_IN_THE_BLANKS_STEP_NUMBERS.QUESTION_STATEMENT}
          variant="horizontal"
        />
      </div>

      <div className={styles.content}>
        <Card variant="elevated" padding="lg" className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <div className={styles.titleSection}>
              <h2 className={styles.sectionTitle}>Add Question</h2>
              <div className={styles.headerActions}>
                {blanks.length > 0 && (
                  <div className={styles.blankCounter}>
                    <span className={styles.blankCount}>{blanks.length}</span>
                    <span className={styles.blankLabel}>blank{blanks.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
                <button 
                  className={styles.helpButton}
                  onClick={() => setShowInstructions(!showInstructions)}
                  title={showInstructions ? "Hide help" : "Show help"}
                >
                  <i className="fas fa-question-circle"></i>
                </button>
              </div>
            </div>
            
            {/* Instructions */}
            {showInstructions && (
              <div className={styles.instructions}>
                <div className={styles.instructionHeader}>
                  <div className={styles.instructionText}>
                    <strong>How to create blanks:</strong> Type your question and click "Create Blank" to insert a blank at your cursor position.
                  </div>
                  <button 
                    className={styles.dismissButton}
                    onClick={() => setShowInstructions(false)}
                    title="Hide instructions"
                  >
                    ×
                  </button>
                </div>
                {blanks.length === 0 ? (
                  <div className={styles.exampleText}>
                    <strong>Example:</strong> Type "The capital of France is" → click "Create Blank" → result: "The capital of France is [blank1]"
                  </div>
                ) : (
                  <div className={styles.configureText}>
                    <strong>💡 Tip:</strong> Click on any blank in the preview panel (right side) to configure its correct answer and alternatives.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles.questionEditor}>
            <div className={styles.fieldLabel}>Question Statement*</div>
            
            <div className={styles.editorContainer}>
              <div className={styles.toolbar}>
                <div className={styles.toolbarGroup}>
                  <button type="button" className={styles.toolButton} title="Bold">
                    <strong>B</strong>
                  </button>
                  <button type="button" className={styles.toolButton} title="Italic">
                    <em>I</em>
                  </button>
                  <button type="button" className={styles.toolButton} title="Link">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6.5 8.5L9.5 5.5M6.5 8.5C7.5 9.5 9 9.5 10 8.5L12.5 6C13.5 5 13.5 3.5 12.5 2.5C11.5 1.5 10 1.5 9 2.5L8.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <button type="button" className={styles.toolButton} title="Bulleted List">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="3" cy="4" r="1" fill="currentColor"/>
                      <circle cx="3" cy="8" r="1" fill="currentColor"/>
                      <circle cx="3" cy="12" r="1" fill="currentColor"/>
                      <line x1="6" y1="4" x2="13" y2="4" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="6" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="6" y1="12" x2="13" y2="12" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </button>
                  <button type="button" className={styles.toolButton} title="Numbered List">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <text x="1" y="6" fontSize="8" fill="currentColor">1.</text>
                      <text x="1" y="10" fontSize="8" fill="currentColor">2.</text>
                      <text x="1" y="14" fontSize="8" fill="currentColor">3.</text>
                      <line x1="6" y1="4" x2="13" y2="4" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="6" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="6" y1="12" x2="13" y2="12" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </button>
                </div>
                
                <div className={styles.toolbarGroupRight}>
                  <button 
                    type="button" 
                    className={styles.createBlankBtn}
                    onClick={createBlank}
                    title="Insert a blank at cursor position"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="11" width="7" height="2" rx="1" fill="currentColor"/>
                      <rect x="14" y="11" width="7" height="2" rx="1" fill="currentColor"/>
                      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M12 8v3M12 13v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M9 12h3M13 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Create Blank
                  </button>
                </div>
              </div>

              <div className={styles.editorBody}>
                <div className={styles.editorPanel}>
                  <div className={styles.lineNumbers}>1</div>
                  <div className={styles.textAreaContainer}>
                    <textarea
                      ref={textareaRef}
                      value={questionText}
                      onChange={handleTextChange}
                      onSelect={handleCursorChange}
                      onKeyUp={handleCursorChange}
                      onClick={handleCursorChange}
                      className={styles.textArea}
                      placeholder="Type your question here..."
                      rows={15}
                    />
                  </div>
                </div>
                
                <div className={styles.previewPanel}>
                  <div className={styles.previewHeader}>
                    <span>Preview</span>
                  </div>
                  <div className={styles.previewContent}>
                    {getPreviewContent()}
                  </div>
                </div>
              </div>
            </div>
            
            {errors.questionText && (
              <div className={styles.errorMessage}>
                {errors.questionText}
              </div>
            )}
            
            {/* Smart Status Indicator with Scroll to Configure */}
            <div className={styles.statusIndicator}>
              {questionText.length === 0 ? (
                <div className={styles.statusEmpty}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M6 8h4M8 6v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Start typing your question
                </div>
              ) : blanks.length === 0 ? (
                <div className={styles.statusNeedsBlanks}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M6 7h4M6 9h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Click "Create Blank" button to insert blanks
                </div>
              ) : blanks.some(blank => !blank.correctAnswer.trim()) ? (
                <div className={styles.statusNeedsAnswers}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M8 4v4m0 4h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>Complete blank configurations to continue</span>
                </div>
              ) : (
                <div className={styles.statusReady}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M6 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Perfect! All {blanks.length} blank{blanks.length !== 1 ? 's' : ''} configured. Ready to continue.
                </div>
              )}
            </div>
          </div>


          {errors.blanks && (
            <div className={styles.errorMessage}>
              {errors.blanks}
            </div>
          )}
        </Card>
        
      </div>

      <BottomActions
        onNext={handleSaveAndContinue}
        nextLabel="Save & Continue"
        nextDisabled={blanks.length === 0 || blanks.some(blank => !blank.correctAnswer.trim())}
        showPrevious={false}
        shortcuts={false}
      />
    </div>
  );
};

export default FillInTheBlanks;