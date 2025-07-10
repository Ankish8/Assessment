import { useState, useEffect } from 'react';
import { getSubmissionOptions, getValidationRules } from '../config/mediaResourcesDefaults';

export const useSubmissionOptions = (questionType) => {
  const submissionOptionsConfig = getSubmissionOptions(questionType);
  const validationRules = getValidationRules(questionType);

  // Initialize with default enabled options
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const initialOptions = {};
    submissionOptionsConfig.forEach(option => {
      initialOptions[option.id] = option.defaultEnabled || false;
    });
    return initialOptions;
  });

  const [errors, setErrors] = useState({});

  // Validation logic
  useEffect(() => {
    const newErrors = {};

    if (validationRules.requiresAtLeastOneOption) {
      const hasSelectedOption = Object.values(selectedOptions).some(Boolean);
      if (!hasSelectedOption) {
        newErrors.submissionOptions = 'Please select at least one submission option';
      }
    }

    if (validationRules.requiredOptions) {
      const missingRequired = validationRules.requiredOptions.filter(
        optionId => !selectedOptions[optionId]
      );
      if (missingRequired.length > 0) {
        newErrors.requiredOptions = `The following options are required: ${missingRequired.join(', ')}`;
      }
    }

    setErrors(newErrors);
  }, [selectedOptions, validationRules]);

  const toggleOption = (optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: !prev[optionId]
    }));
  };

  const setOption = (optionId, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: value
    }));
  };

  const resetOptions = () => {
    const initialOptions = {};
    submissionOptionsConfig.forEach(option => {
      initialOptions[option.id] = option.defaultEnabled || false;
    });
    setSelectedOptions(initialOptions);
    setErrors({});
  };

  const isValid = Object.keys(errors).length === 0;

  return {
    selectedOptions,
    submissionOptionsConfig,
    errors,
    isValid,
    toggleOption,
    setOption,
    resetOptions
  };
};