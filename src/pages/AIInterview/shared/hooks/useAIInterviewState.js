import { useState, useEffect } from 'react';
import { INTERVIEW_STATES } from '../constants';

export const useAIInterviewState = () => {
  // Core interview data
  const [interviewData, setInterviewData] = useState({
    // Step 1: Job Profile
    interviewState: INTERVIEW_STATES.READY,
    selectedJobProfile: '',
    
    // Step 2: Job Description
    jobDescription: '',
    
    // Step 3: Skills/Questions Details  
    selectedSkills: [],
    questionDetails: '',
    
    // Step 4: Interview Details
    interviewDuration: 30,
    difficultyLevel: 'intermediate',
    
    // Step 5: Interview Preferences
    adaptiveQuestions: true,
    questionGenerationStyle: 'balanced'
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Validation logic - fixed trim error
  useEffect(() => {
    const newErrors = {};

    // Job Profile validation - ensure string and check trim
    const jobProfile = String(interviewData.selectedJobProfile || '');
    if (!jobProfile.trim()) {
      newErrors.jobProfile = 'Please add job profile title for this interview process';
    }

    // Job Description validation (when on step 2)
    if (interviewData.jobDescription !== undefined && (!interviewData.jobDescription || !interviewData.jobDescription.trim())) {
      newErrors.jobDescription = 'Job description is required';
    }

    // Skills validation (when on step 3)
    if (interviewData.selectedSkills.length === 0 && interviewData.questionDetails !== undefined) {
      newErrors.skills = 'Please select at least one skill';
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [interviewData]);

  // Update specific fields
  const updateField = (field, value) => {
    setInterviewData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Update multiple fields at once
  const updateFields = (fields) => {
    setInterviewData(prev => ({
      ...prev,
      ...fields
    }));
  };

  // Reset to initial state
  const resetState = () => {
    setInterviewData({
      interviewState: INTERVIEW_STATES.READY,
      selectedJobProfile: '',
      jobDescription: '',
      selectedSkills: [],
      questionDetails: '',
      interviewDuration: 30,
      difficultyLevel: 'intermediate',
      adaptiveQuestions: true,
      questionGenerationStyle: 'balanced'
    });
    setErrors({});
  };

  // Validate specific step
  const validateStep = (stepNumber) => {
    const stepErrors = {};

    switch (stepNumber) {
      case 1: // Job Profile
        const jobProfile = String(interviewData.selectedJobProfile || '');
        if (!jobProfile.trim()) {
          stepErrors.jobProfile = 'Please add job profile title for this interview process';
        }
        break;
      case 2: // Job Description
        if (!interviewData.jobDescription || !interviewData.jobDescription.trim()) {
          stepErrors.jobDescription = 'Job description is required';
        }
        break;
      case 3: // Skills/Questions
        if (interviewData.selectedSkills.length === 0) {
          stepErrors.skills = 'Please select at least one skill';
        }
        break;
      case 4: // Interview Details
        if (interviewData.interviewDuration < 10 || interviewData.interviewDuration > 120) {
          stepErrors.duration = 'Interview duration must be between 10 and 120 minutes';
        }
        break;
      case 5: // Interview Preferences
        // No specific validation for preferences step
        break;
      default:
        break;
    }

    return {
      isValid: Object.keys(stepErrors).length === 0,
      errors: stepErrors
    };
  };

  return {
    interviewData,
    errors,
    isValid,
    updateField,
    updateFields,
    resetState,
    validateStep
  };
};