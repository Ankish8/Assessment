import React from 'react';
import { useNavigate } from 'react-router-dom';
import CompactHeader from '../../../components/common/CompactHeader/CompactHeader';
import Card from '../../../components/common/Card/Card';
import Button from '../../../components/common/Button/Button';
import FloatingFooter from '../../../components/common/FloatingFooter/FloatingFooter';
import CompactProgressSteps from '../../../components/common/CompactProgressSteps/CompactProgressSteps';
import { AI_INTERVIEW_STEPS, AI_INTERVIEW_STEP_NUMBERS } from '../shared/constants';

const AIInterviewJobDescription = () => {
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate('/ai-interview/job-profile');
  };

  const handleContinue = () => {
    navigate('/ai-interview/skills-questions');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px', minHeight: '100vh', background: '#f8fafc' }}>
      <CompactHeader 
        title="AI Interview" 
        onBack={handlePrevious}
      />
      
      <div style={{ marginBottom: '24px' }}>
        <CompactProgressSteps 
          steps={AI_INTERVIEW_STEPS} 
          currentStep={AI_INTERVIEW_STEP_NUMBERS.JOB_DESCRIPTION} 
        />
      </div>

      <div style={{ marginBottom: '120px' }}>
        <Card variant="elevated" padding="lg">
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
            Job Description
          </h2>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            This step will allow you to configure the job description for the AI interview.
          </p>
          <div style={{ 
            padding: '48px', 
            textAlign: 'center', 
            border: '2px dashed #cbd5e1', 
            borderRadius: '8px',
            background: '#f1f5f9'
          }}>
            <p style={{ color: '#64748b', fontSize: '18px' }}>
              🚧 Coming Soon
            </p>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px' }}>
              Job description configuration will be implemented here
            </p>
          </div>
        </Card>
      </div>

      <FloatingFooter>
        <Button variant="secondary" onClick={handlePrevious}>
          Previous
        </Button>
        <Button variant="primary" onClick={handleContinue}>
          Save & Continue
        </Button>
      </FloatingFooter>
    </div>
  );
};

export default AIInterviewJobDescription;