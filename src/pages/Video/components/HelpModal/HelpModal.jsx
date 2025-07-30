import React from 'react';
import Button from '../../../../components/common/Button/Button';
import styles from './HelpModal.module.css';

const HelpModal = ({ isOpen, onClose, questionType }) => {
  if (!isOpen) return null;

  const getHelpContent = () => {
    if (questionType === 'management') {
      return {
        title: 'Management Questions',
        points: [
          'Communication and teamwork skills',
          'Conflict resolution and decision-making',
          'Emotional intelligence and people management',
          'Adaptability and team problem-solving'
        ]
      };
    } else {
      return {
        title: 'Professional Questions',
        points: [
          'Technical skills relevant to the role',
          'Problem-solving and analytical thinking',
          'Knowledge application in real scenarios',
          'Task performance capabilities'
        ]
      };
    }
  };

  const helpContent = getHelpContent();

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>{helpContent.title}</h3>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        <ul className={styles.list}>
          {helpContent.points.map((point, index) => (
            <li key={index} className={styles.item}>{point}</li>
          ))}
        </ul>
        <div className={styles.footer}>
          <Button variant="primary" size="small" onClick={onClose}>
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;