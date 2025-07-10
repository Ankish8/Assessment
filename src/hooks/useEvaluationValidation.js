import { useState, useEffect } from 'react';

export const useEvaluationValidation = (
  manualEvaluationEnabled, 
  criteria, 
  totalWeightage, 
  validationRules = {}
) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newErrors = {};
    
    if (manualEvaluationEnabled) {
      // Check if criteria exist
      if (criteria.length === 0) {
        newErrors.criteria = 'Please add at least one evaluation criterion';
      } else {
        // Validate individual criteria
        criteria.forEach((criterion, index) => {
          if (!criterion.title.trim()) {
            newErrors[`criterion_${index}_title`] = 'Title is required';
          }
          if (!criterion.weightage || criterion.weightage <= 0) {
            newErrors[`criterion_${index}_weightage`] = 'Weightage must be greater than 0';
          }
        });
        
        // Check total weightage
        if (validationRules.maxWeight && totalWeightage !== validationRules.maxWeight) {
          newErrors.totalWeightage = `Total weightage must equal ${validationRules.maxWeight}%`;
        }
      }
    }

    setErrors(newErrors);
  }, [manualEvaluationEnabled, criteria, totalWeightage, validationRules]);

  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    isValid,
    setErrors
  };
};