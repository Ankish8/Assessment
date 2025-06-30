import React from 'react';
import styles from './SkillsInput.module.css';

const SkillsInput = ({ selectedSkills, onOpenModal, onRemoveSkill }) => {
  const getPlaceholderText = () => {
    if (selectedSkills.length > 0) {
      return `${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} selected`;
    }
    return 'Add skills';
  };

  return (
    <div>
      <div className={styles.skillsInputWrapper}>
        <input
          type="text"
          className={`${styles.formInput} ${styles.skillsInput}`}
          placeholder={getPlaceholderText()}
          readOnly
          onClick={onOpenModal}
        />
        <button className={styles.addSkillBtn} onClick={onOpenModal}>
          Add
        </button>
      </div>
      
      {selectedSkills.length > 0 && (
        <div className={styles.selectedSkills}>
          {selectedSkills.map((skill) => (
            <span key={skill} className={styles.skillChip}>
              {skill}
              <button
                className={styles.skillChipRemove}
                onClick={() => onRemoveSkill(skill)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsInput;