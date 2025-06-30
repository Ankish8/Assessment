import { useState, useEffect } from 'react';
import { getDefaultValues, getValidationRules } from '../config/questionDetailsDefaults';

export const useQuestionDetailsForm = (questionType) => {
  const defaultValues = getDefaultValues(questionType);
  const validationRules = getValidationRules(questionType);

  const [formData, setFormData] = useState({
    marks: defaultValues.marks || 50,
    level: defaultValues.level || 'intermediate',
    language: defaultValues.language || 'PYTHON',
    selectedSkills: [],
    provider: '',
    author: ''
  });

  const [errors, setErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Validation logic
  useEffect(() => {
    const newErrors = {};

    // Marks validation
    if (!formData.marks || formData.marks < validationRules.minMarks || formData.marks > validationRules.maxMarks) {
      newErrors.marks = `Marks must be between ${validationRules.minMarks} and ${validationRules.maxMarks}`;
    }

    // Level validation
    if (!formData.level) {
      newErrors.level = 'Difficulty level is required';
    }

    // Skills validation
    if (formData.selectedSkills.length < validationRules.minSkills) {
      newErrors.selectedSkills = `Please select at least ${validationRules.minSkills} skill(s)`;
    }

    // Provider validation
    if (!formData.provider.trim()) {
      newErrors.provider = 'Provider is required';
    }

    // Author validation
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    setErrors(newErrors);
  }, [formData, validationRules]);

  const isValid = Object.keys(errors).length === 0;

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const setAttemptedSubmit = (attempted) => {
    setHasAttemptedSubmit(attempted);
  };

  const resetForm = () => {
    setFormData({
      marks: defaultValues.marks || 50,
      level: defaultValues.level || 'intermediate', 
      language: defaultValues.language || 'PYTHON',
      selectedSkills: [],
      provider: '',
      author: ''
    });
    setErrors({});
    setHasAttemptedSubmit(false);
  };

  return {
    formData,
    errors,
    isValid,
    hasAttemptedSubmit,
    updateField,
    setAttemptedSubmit,
    resetForm,
    setFormData
  };
};