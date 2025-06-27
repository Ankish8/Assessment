import React, { useState, useEffect } from 'react';
import styles from './SkillsModal.module.css';

const availableSkills = [
  'Arrays', 'Strings', 'Hash Maps', 'Two Pointers', 'Binary Search', 'Sorting',
  'Recursion', 'Dynamic Programming', 'Graphs', 'Trees', 'Linked Lists', 'Stacks',
  'Queues', 'Heaps', 'Greedy', 'Backtracking', 'Bit Manipulation', 'Mathematics'
];

const SkillsModal = ({ selectedSkills, onClose, onSkillsChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalSkills, setModalSkills] = useState([...selectedSkills]);

  const filteredSkills = availableSkills.filter(skill =>
    skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSkillToggle = (skill) => {
    if (modalSkills.includes(skill)) {
      setModalSkills(modalSkills.filter(s => s !== skill));
    } else {
      setModalSkills([...modalSkills, skill]);
    }
  };

  const handleClose = () => {
    onSkillsChange(modalSkills);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [modalSkills]);

  return (
    <div className={`${styles.skillsModal} ${styles.show}`} onClick={handleBackdropClick}>
      <div className={styles.skillsModalContent}>
        <div className={styles.skillsModalHeader}>
          <h3 className={styles.skillsModalTitle}>Add Skills</h3>
          <button className={styles.skillsModalClose} onClick={handleClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path 
                d="M12 4L4 12M4 4L12 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        
        <input
          type="text"
          className={styles.skillsSearch}
          placeholder="Search skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <div className={styles.skillsGrid}>
          {filteredSkills.map((skill) => (
            <div
              key={skill}
              className={`${styles.skillItem} ${
                modalSkills.includes(skill) ? styles.selected : ''
              }`}
              onClick={() => handleSkillToggle(skill)}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsModal;