import React from 'react';
import { useNavigate } from 'react-router-dom';
import StepperPage from '../../../components/common/StepperPage/StepperPage';
import { 
  BOT_INTERVIEW_STEPS, 
  BOT_INTERVIEW_STEP_NUMBERS
} from '../shared/constants';

const BotInterviewQuestionStatement = () => {
  const navigate = useNavigate();

  const handleSaveAndContinue = () => {
    // Navigate to next step
    navigate('/bot-interview/area-skills');
  };

  const handlePrevious = () => {
    navigate('/');
  };

  return (
    <StepperPage
      title="Bot Interview"
      icon="fas fa-robot"
      steps={BOT_INTERVIEW_STEPS}
      currentStep={BOT_INTERVIEW_STEP_NUMBERS.QUESTION_STATEMENT}
      onPrevious={handlePrevious}
      onNext={handleSaveAndContinue}
      previousLabel="Cancel"
      nextLabel="Save & Continue"
    >
      {/* Content area - empty for now */}
    </StepperPage>
  );
};

export default BotInterviewQuestionStatement;