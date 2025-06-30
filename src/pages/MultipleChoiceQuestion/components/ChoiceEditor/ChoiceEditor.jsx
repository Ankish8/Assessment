import React, { useState } from 'react';
import { Button, Input } from '../../../../components';
import styles from './ChoiceEditor.module.css';

const ChoiceEditor = ({ 
  choice, 
  index, 
  enablePartialMarks, 
  canRemove, 
  error, 
  onUpdate, 
  onRemove 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localText, setLocalText] = useState(choice.text);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setLocalText(newText);
    onUpdate({ text: newText });
  };

  const handleCorrectToggle = () => {
    const newIsCorrect = !choice.isCorrect;
    onUpdate({ 
      isCorrect: newIsCorrect,
      // Auto-set partial marks if enabling correct answer
      ...(enablePartialMarks && newIsCorrect && choice.partialMarks === 0 ? { partialMarks: 10 } : {})
    });
  };

  const handlePartialMarksChange = (e) => {
    const value = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
    onUpdate({ partialMarks: value });
  };

  const optionLabel = String.fromCharCode(65 + index); // A, B, C, D...

  return (
    <div className={`${styles.container} ${choice.isCorrect ? styles.correct : ''} ${error ? styles.hasError : ''}`}>
      <div className={styles.header}>
        <div className={styles.optionLabel}>
          <span className={styles.letter}>{optionLabel}</span>
          {choice.isCorrect && (
            <span className={styles.correctBadge}>
              ✓ Correct
            </span>
          )}
        </div>
        
        <div className={styles.actions}>
          {enablePartialMarks && (
            <div className={styles.partialMarks}>
              <label className={styles.partialMarksLabel}>
                Marks:
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={choice.partialMarks || 0}
                  onChange={handlePartialMarksChange}
                  className={styles.partialMarksInput}
                  disabled={!choice.isCorrect}
                />
              </label>
            </div>
          )}
          
          <button
            type="button"
            onClick={handleCorrectToggle}
            className={`${styles.correctToggle} ${choice.isCorrect ? styles.active : ''}`}
            title={choice.isCorrect ? 'Mark as incorrect' : 'Mark as correct'}
          >
            {choice.isCorrect ? '✓' : '○'}
          </button>
          
          {canRemove && (
            <button
              type="button"
              onClick={onRemove}
              className={styles.removeButton}
              title="Remove this option"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.textEditor}>
          <textarea
            value={localText}
            onChange={handleTextChange}
            placeholder={`Enter option ${optionLabel} text...`}
            className={styles.textarea}
            rows={isExpanded ? 6 : 3}
          />
          
          <div className={styles.editorFooter}>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className={styles.expandToggle}
            >
              {isExpanded ? '↑ Collapse' : '↓ Expand'}
            </button>
            
            <div className={styles.characterCount}>
              {localText.length} characters
            </div>
          </div>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>⚠️</span>
            {error}
          </div>
        )}
      </div>

      {/* Rich text formatting buttons (optional) */}
      {isExpanded && (
        <div className={styles.formatting}>
          <div className={styles.formatGroup}>
            <button type="button" className={styles.formatButton} title="Bold">
              <strong>B</strong>
            </button>
            <button type="button" className={styles.formatButton} title="Italic">
              <em>I</em>
            </button>
            <button type="button" className={styles.formatButton} title="Underline">
              <u>U</u>
            </button>
          </div>
          <div className={styles.formatGroup}>
            <button type="button" className={styles.formatButton} title="Code">
              &lt;/&gt;
            </button>
            <button type="button" className={styles.formatButton} title="Math">
              ∑
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoiceEditor;