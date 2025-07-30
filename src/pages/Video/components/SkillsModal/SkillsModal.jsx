import React, { useState, useEffect } from 'react';
import Button from '../../../../components/common/Button/Button';
import Input from '../../../../components/common/Input/Input';
import styles from './SkillsModal.module.css';

// Interpersonal skills for video assessments
const availableSkills = [
  // Management Skills
  'Active listening',
  'Communication',
  'Leadership',
  'Delegation',
  'Team building',
  'Conflict resolution',
  'Decision making',
  'Strategic thinking',
  'Change management',
  'Performance management',
  'Stakeholder management and collaboration',
  'Project management',
  
  // Professional Skills  
  'Problem solving',
  'Critical thinking',
  'Time management',
  'Adaptability',
  'Creativity',
  'Innovation',
  'Customer service',
  'Negotiation',
  'Presentation skills',
  'Analytical thinking',
  'Attention to detail',
  'Multitasking',
  'Stress management',
  'Systems thinking',
  'Emotional intelligence',
  'Cultural awareness',
  'Mentoring',
  'Coaching'
];

const SkillsModal = ({ selectedSkills = [], onClose, onSkillsChange, isOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalSkills, setModalSkills] = useState([...selectedSkills]);

  useEffect(() => {
    setModalSkills([...selectedSkills]);
  }, [selectedSkills]);

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

  const handleSave = () => {
    onSkillsChange(modalSkills);
    onClose();
  };

  const handleCancel = () => {
    setModalSkills([...selectedSkills]); // Reset to original
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  const handleSelectAll = () => {
    setModalSkills([...filteredSkills]);
  };

  const handleClearAll = () => {
    setModalSkills([]);
  };

  // Close modal on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.skillsModalOverlay} onClick={handleBackdropClick}>
      <div className={styles.skillsModal}>
        <div className={styles.skillsModalHeader}>
          <h3 className={styles.modalTitle}>
            <i className="fas fa-users"></i>
            Select Interpersonal Skills
          </h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleCancel}
            className={styles.closeButton}
          >
            <i className="fas fa-times"></i>
          </Button>
        </div>

        <div className={styles.skillsModalBody}>
          {/* Search Input */}
          <div className={styles.searchSection}>
            <Input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Bulk Actions */}
          <div className={styles.bulkActions}>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleSelectAll}
              disabled={filteredSkills.length === 0}
            >
              Select All ({filteredSkills.length})
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleClearAll}
              disabled={modalSkills.length === 0}
            >
              Clear All
            </Button>
            <div className={styles.selectedCount}>
              {modalSkills.length} selected
            </div>
          </div>

          {/* Skills Grid */}
          <div className={styles.skillsGrid}>
            {filteredSkills.length > 0 ? (
              filteredSkills.map(skill => (
                <button
                  key={skill}
                  className={`${styles.skillOption} ${modalSkills.includes(skill) ? styles.selected : ''}`}
                  onClick={() => handleSkillToggle(skill)}
                >
                  <div className={styles.skillCheckbox}>
                    {modalSkills.includes(skill) && (
                      <i className="fas fa-check"></i>
                    )}
                  </div>
                  <span className={styles.skillLabel}>{skill}</span>
                </button>
              ))
            ) : (
              <div className={styles.noResults}>
                <i className="fas fa-search"></i>
                <p>No skills found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.skillsModalFooter}>
          <div className={styles.footerLeft}>
            <span className={styles.selectionSummary}>
              {modalSkills.length} of {availableSkills.length} skills selected
            </span>
          </div>
          <div className={styles.footerActions}>
            <Button 
              variant="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              variant="primary"
              onClick={handleSave}
            >
              Save Selection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsModal;