import React, { useState, useRef, useEffect } from 'react';
import Input from '../../../../components/common/Input/Input';
import styles from './SkillAutocompleteInput.module.css';

const SkillAutocompleteInput = ({ selectedSkills, onAddSkill, onRemoveSkill, skillType = 'general' }) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Predefined skill suggestions based on type
  const skillSuggestions = {
    management: [
      'Leadership', 'Communication', 'Problem Solving', 'Team Management', 'Project Management',
      'Conflict Resolution', 'Decision Making', 'Strategic Planning', 'Delegation',
      'Time Management', 'Mentoring', 'Coaching', 'Negotiation', 'Public Speaking',
      'Emotional Intelligence', 'Critical Thinking', 'Adaptability', 'Collaboration'
    ],
    professional: [
      'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'TypeScript', 'HTML', 'CSS',
      'Database Design', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'Git',
      'REST API', 'GraphQL', 'Microservices', 'DevOps', 'CI/CD', 'Testing',
      'Agile', 'Scrum', 'Machine Learning', 'Data Analysis', 'UI/UX Design'
    ],
    general: [
      'Communication', 'Problem Solving', 'Leadership', 'JavaScript', 'React', 'Python',
      'Team Management', 'Project Management', 'Database Design', 'Strategic Planning'
    ]
  };

  const suggestions = skillSuggestions[skillType] || skillSuggestions.general;

  useEffect(() => {
    if (inputValue.length > 0) {
      const filtered = suggestions.filter(skill => 
        skill.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedSkills.includes(skill)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setActiveSuggestionIndex(-1);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  }, [inputValue, selectedSkills, suggestions]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => 
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeSuggestionIndex >= 0) {
        addSkill(filteredSuggestions[activeSuggestionIndex]);
      } else if (inputValue.trim()) {
        addSkill(inputValue.trim());
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  };

  const addSkill = (skill) => {
    if (skill && !selectedSkills.includes(skill)) {
      onAddSkill(skill);
      setInputValue('');
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  };

  const handleSuggestionClick = (skill) => {
    addSkill(skill);
  };

  const handleAddButtonClick = () => {
    if (inputValue.trim()) {
      addSkill(inputValue.trim());
    }
  };

  const getPlaceholderText = () => {
    if (selectedSkills.length > 0) {
      return `${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} selected`;
    }
    return skillType === 'management' ? 'Add management skills...' : 'Add technical skills...';
  };

  return (
    <div className={styles.skillAutocompleteContainer}>
      <div className={styles.skillInputWrapper}>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={selectedSkills.length > 0 ? 'Add another skill...' : getPlaceholderText()}
          className={styles.skillInput}
          endIcon={
            <button
              type="button"
              className={styles.addButton}
              onClick={handleAddButtonClick}
              disabled={!inputValue.trim()}
            >
              <i className="fas fa-plus"></i>
            </button>
          }
        />
        
        {showSuggestions && (
          <div ref={suggestionsRef} className={styles.suggestionsContainer}>
            {filteredSuggestions.map((skill, index) => (
              <div
                key={skill}
                className={`${styles.suggestionItem} ${
                  index === activeSuggestionIndex ? styles.active : ''
                }`}
                onClick={() => handleSuggestionClick(skill)}
              >
                <i className="fas fa-tag"></i>
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {selectedSkills.length > 0 && (
        <div className={styles.selectedSkills}>
          {selectedSkills.map((skill) => (
            <span key={skill} className={styles.skillChip}>
              {skill}
              <button
                type="button"
                className={styles.skillChipRemove}
                onClick={() => onRemoveSkill(skill)}
                title={`Remove ${skill}`}
              >
                <i className="fas fa-times"></i>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillAutocompleteInput;