import React from 'react';
import styles from './DifficultySelector.module.css';

const DifficultySelector = ({ selectedDifficulty, onDifficultyChange }) => {
  const difficulties = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Intermediate' },
    { value: 'hard', label: 'Hard' }
  ];

  return (
    <div className={`${styles.difficultySelector} ${styles[selectedDifficulty]}`}>
      {difficulties.map((difficulty) => (
        <div
          key={difficulty.value}
          className={`${styles.difficultyOption} ${
            selectedDifficulty === difficulty.value ? styles.selected : ''
          }`}
          onClick={() => onDifficultyChange(difficulty.value)}
        >
          <div className={styles.difficultyLabel}>{difficulty.label}</div>
        </div>
      ))}
    </div>
  );
};

export default DifficultySelector;