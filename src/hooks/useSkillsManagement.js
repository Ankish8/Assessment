import { useState, useMemo } from 'react';
import { getSkillsForType } from '../config/questionDetailsDefaults';

export const useSkillsManagement = (questionType, selectedSkills = [], onSkillsChange) => {
  const [skillsSearch, setSkillsSearch] = useState('');
  const [showAllSkills, setShowAllSkills] = useState(false);

  const skillsConfig = getSkillsForType(questionType);

  // Filter skills based on search
  const filteredSkills = useMemo(() => {
    const searchLower = skillsSearch.toLowerCase();
    const popularFiltered = skillsConfig.popular.filter(skill => 
      skill.toLowerCase().includes(searchLower)
    );
    const additionalFiltered = skillsConfig.additional.filter(skill => 
      skill.toLowerCase().includes(searchLower)
    );

    return {
      popular: popularFiltered,
      additional: additionalFiltered
    };
  }, [skillsSearch, skillsConfig]);

  // Get skills to display based on showAllSkills state
  const displayedSkills = useMemo(() => {
    if (showAllSkills) {
      return [...filteredSkills.popular, ...filteredSkills.additional];
    }
    return filteredSkills.popular;
  }, [filteredSkills, showAllSkills]);

  // Get available skills (not already selected)
  const availableSkills = useMemo(() => {
    return displayedSkills.filter(skill => !selectedSkills.includes(skill));
  }, [displayedSkills, selectedSkills]);

  const handleSkillToggle = (skill) => {
    let newSelectedSkills;
    if (selectedSkills.includes(skill)) {
      newSelectedSkills = selectedSkills.filter(s => s !== skill);
    } else {
      newSelectedSkills = [...selectedSkills, skill];
    }
    
    if (onSkillsChange) {
      onSkillsChange(newSelectedSkills);
    }
  };

  const removeSkill = (skillToRemove) => {
    const newSelectedSkills = selectedSkills.filter(skill => skill !== skillToRemove);
    if (onSkillsChange) {
      onSkillsChange(newSelectedSkills);
    }
  };

  const clearSearch = () => {
    setSkillsSearch('');
  };

  const toggleShowAllSkills = () => {
    setShowAllSkills(prev => !prev);
  };

  return {
    skillsSearch,
    setSkillsSearch,
    showAllSkills,
    setShowAllSkills,
    filteredSkills,
    displayedSkills,
    availableSkills,
    handleSkillToggle,
    removeSkill,
    clearSearch,
    toggleShowAllSkills,
    skillsConfig
  };
};