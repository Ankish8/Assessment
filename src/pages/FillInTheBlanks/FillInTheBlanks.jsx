import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Card from '../../components/common/Card/Card';
import ResponsiveProgressSteps from '../../components/common/ResponsiveProgressSteps/ResponsiveProgressSteps';
import FloatingFooter from '../../components/common/FloatingFooter/FloatingFooter';
import Button from '../../components/common/Button/Button';
import styles from './FillInTheBlanks.module.css';
import '../../styles/utilities.css';

const FILL_BLANKS_STEPS = [
  { id: 'statement', label: 'Question Statement' },
  { id: 'media', label: 'Media & Resources' },
  { id: 'details', label: 'Question Details' },
  { id: 'evaluation', label: 'Evaluation Parameters' },
  { id: 'solution', label: 'Solution Details' }
];

const FillInTheBlanks = () => {
  const navigate = useNavigate();
  const [questionText, setQuestionText] = useState('');
  const [blanks, setBlanks] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [hasSelection, setHasSelection] = useState(false);
  const [errors, setErrors] = useState({});
  const [showInstructions, setShowInstructions] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const textareaRef = useRef(null);
  
  // Add robust selection detection
  useEffect(() => {
    const handleDocumentSelectionChange = () => {
      if (document.activeElement === textareaRef.current) {
        handleTextSelection();
      }
    };
    
    document.addEventListener('selectionchange', handleDocumentSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleDocumentSelectionChange);
    };
  }, []);

  const handleTextChange = (e) => {
    setQuestionText(e.target.value);
    updateBlanksFromText(e.target.value);
  };

  const updateBlanksFromText = (text) => {
    const blankMatches = text.match(/___\w*___/g) || [];
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

  const handleTextSelection = () => {
    // Add delay to ensure selection is properly registered
    setTimeout(() => {
      const textarea = textareaRef.current;
      if (!textarea) {
        setHasSelection(false);
        setShowTooltip(false);
        setSelectedText('');
        return;
      }

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      if (start !== end && start !== undefined && end !== undefined && start >= 0 && end >= 0) {
        const selected = questionText.substring(start, end).trim();
        if (selected.length > 0) {
          setSelectedText(selected);
          setHasSelection(true);
          
          // Calculate tooltip position
          const rect = textarea.getBoundingClientRect();
          setTooltipPosition({
            x: rect.left + (rect.width / 2),
            y: rect.top - 10
          });
          setShowTooltip(true);
          return;
        }
      }
      
      setHasSelection(false);
      setShowTooltip(false);
      setSelectedText('');
    }, 50);
  };

  const createBlankFromSelection = () => {
    if (!selectedText || !hasSelection) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const blankPlaceholder = `___${selectedText.replace(/\s+/g, '_')}___`;
    const newText = questionText.substring(0, start) + blankPlaceholder + questionText.substring(end);
    
    setQuestionText(newText);
    
    // Add to blanks array
    const newBlank = {
      id: blanks.length + 1,
      placeholder: blankPlaceholder,
      correctAnswer: selectedText,
      alternativeAnswers: []
    };
    
    setBlanks([...blanks, newBlank]);
    setShowTooltip(false);
    setHasSelection(false);
    setSelectedText('');
    
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
      navigate('/media-resources');
    }
  };

  const getPreviewText = () => {
    let preview = questionText;
    blanks.forEach(blank => {
      preview = preview.replace(blank.placeholder, `[${blank.correctAnswer || '_____'}]`);
    });
    return preview;
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (showTooltip) {
        setShowTooltip(false);
        setHasSelection(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showTooltip]);

  return (
    <div className={styles.container}>
      <Header title="Fill In The Blanks" />
      
      <div className={styles.progressContainer}>
        <ResponsiveProgressSteps 
          steps={FILL_BLANKS_STEPS}
          currentStep={1}
          variant="horizontal"
        />
      </div>

      <div className={`${styles.content} floating-footer-spacing`}>
        <Card variant="elevated" padding="lg" className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <div className={styles.titleSection}>
              <h2 className={styles.sectionTitle}>Add Question</h2>
              <div className={styles.statsAndHelp}>
                {blanks.length > 0 && (
                  <div className={styles.blankCounter}>
                    <span className={styles.blankCount}>{blanks.length}</span>
                    <span className={styles.blankLabel}>blank{blanks.length !== 1 ? 's' : ''} created</span>
                  </div>
                )}
                <div className={styles.helpIcon} title="How to create blanks">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M6.5 6.5C6.5 5.5 7.5 4.5 8.5 4.5C9.5 4.5 10.5 5.5 10.5 6.5C10.5 7.5 9.5 8.5 8.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="8.5" cy="11.5" r="0.5" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Instructions */}
            {showInstructions && (
              <div className={styles.instructions}>
                <div className={styles.instructionHeader}>
                  <div className={styles.instructionText}>
                    <strong>How to create blanks:</strong> Type your question, then select any text and click "Create Blank".
                  </div>
                  <button 
                    className={styles.dismissButton}
                    onClick={() => setShowInstructions(false)}
                    title="Hide instructions"
                  >
                    ×
                  </button>
                </div>
                {blanks.length === 0 && (
                  <div className={styles.exampleText}>
                    <strong>Example:</strong> "The capital of France is Paris" → select "Paris" → click "Create Blank"
                  </div>
                )}
              </div>
            )}
            
            {!showInstructions && blanks.length === 0 && (
              <button 
                className={styles.showInstructionsBtn}
                onClick={() => setShowInstructions(true)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M6.5 6.5C6.5 5.5 7.5 4.5 8.5 4.5C9.5 4.5 10.5 5.5 10.5 6.5C10.5 7.5 9.5 8.5 8.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="8.5" cy="11.5" r="0.5" fill="currentColor"/>
                </svg>
                Show instructions
              </button>
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
                
                <div className={styles.toolbarGroup}>
                  <button 
                    type="button" 
                    className={`${styles.createBlankBtn} ${!hasSelection ? styles.disabled : ''}`}
                    onClick={hasSelection ? createBlankFromSelection : () => console.log('No text selected', { hasSelection, selectedText })}
                    title={hasSelection ? "Create blank from selected text" : "Select text first to create a blank"}
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
                      onSelect={handleTextSelection}
                      onMouseUp={handleTextSelection}
                      onKeyUp={handleTextSelection}
                      onClick={handleTextSelection}
                      className={styles.textArea}
                      placeholder="Enter your question text here. Example: 'The capital of France is Paris' - then select 'Paris' and click 'Create Blank'. Or type ___word___ to create blanks manually."
                      rows={15}
                    />
                    
                    {showTooltip && hasSelection && (
                      <div 
                        className={styles.selectionTooltip} 
                        style={{ 
                          left: tooltipPosition.x, 
                          top: tooltipPosition.y,
                          position: 'fixed',
                          zIndex: 1000
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button 
                          onClick={createBlankFromSelection}
                          className={styles.createBlankButton}
                        >
                          Create Blank
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className={styles.previewPanel}>
                  <div className={styles.previewHeader}>Preview</div>
                  <div className={styles.previewContent}>
                    {getPreviewText()}
                  </div>
                </div>
              </div>
            </div>
            
            {errors.questionText && (
              <div className={styles.errorMessage}>
                {errors.questionText}
              </div>
            )}
            
            {/* Smart Status Indicator */}
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
                  Select text and click "Create Blank" to add blanks
                </div>
              ) : (
                <div className={styles.statusReady}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M6 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Great! {blanks.length} blank{blanks.length !== 1 ? 's' : ''} created. Ready to continue.
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
        
        {/* Blanks Configuration */}
        {blanks.length > 0 && (
          <Card variant="elevated" padding="lg" className={styles.blanksCard}>
            <div className={styles.blanksHeader}>
              <h3 className={styles.sectionSubtitle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.configIcon}>
                  <rect x="3" y="11" width="7" height="2" rx="1" fill="currentColor"/>
                  <rect x="14" y="11" width="7" height="2" rx="1" fill="currentColor"/>
                  <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
                Configure Blanks ({blanks.length})
              </h3>
              <div className={styles.blanksStats}>
                Ready to continue once all blanks have answers
              </div>
            </div>
            
            <div className={styles.blanksGrid}>
              {blanks.map(blank => (
                <div key={blank.id} className={styles.blankConfig}>
                  <div className={styles.blankHeader}>
                    <div className={styles.blankLabel}>
                      <span className={styles.blankNumber}>#{blank.id}</span>
                      <span className={styles.blankText}>{blank.placeholder}</span>
                    </div>
                  </div>
                  
                  <div className={styles.blankFields}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Correct Answer*</label>
                      <input
                        type="text"
                        value={blank.correctAnswer}
                        onChange={(e) => handleBlankAnswerChange(blank.id, 'correctAnswer', e.target.value)}
                        className={styles.input}
                        placeholder="Enter the correct answer"
                      />
                      {errors[`blank-${blank.id}`] && (
                        <div className={styles.errorMessage}>
                          {errors[`blank-${blank.id}`]}
                        </div>
                      )}
                    </div>
                    
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Alternative Answers (Optional)</label>
                      {blank.alternativeAnswers.map((answer, index) => (
                        <div key={index} className={styles.alternativeAnswerRow}>
                          <input
                            type="text"
                            value={answer}
                            onChange={(e) => updateAlternativeAnswer(blank.id, index, e.target.value)}
                            className={styles.input}
                            placeholder={`Alternative answer ${index + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeAlternativeAnswer(blank.id, index)}
                            className={styles.removeButton}
                            title="Remove alternative answer"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addAlternativeAnswer(blank.id)}
                        className={styles.addAlternativeButton}
                      >
                        + Add Alternative Answer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <FloatingFooter>
        <div className={styles.footerActions}>
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleSaveAndContinue}
            disabled={blanks.length === 0}
            className={styles.saveButton}
          >
            Save & Continue
          </Button>
        </div>
      </FloatingFooter>
    </div>
  );
};

export default FillInTheBlanks;