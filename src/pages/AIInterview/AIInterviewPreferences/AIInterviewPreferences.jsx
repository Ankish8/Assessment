import React from 'react';
import { useNavigate } from 'react-router-dom';
import CompactHeader from '../../../components/common/CompactHeader/CompactHeader';
import Card from '../../../components/common/Card/Card';
import Button from '../../../components/common/Button/Button';
import FloatingFooter from '../../../components/common/FloatingFooter/FloatingFooter';
import CompactProgressSteps from '../../../components/common/CompactProgressSteps/CompactProgressSteps';
import { AI_INTERVIEW_STEPS, AI_INTERVIEW_STEP_NUMBERS } from '../shared/constants';

const AIInterviewPreferences = () => {
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate('/ai-interview/interview-details');
  };

  const handleComplete = () => {
    // For now, just show an alert. Later this would save the interview
    alert('AI Interview configuration completed successfully!');
    navigate('/');
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
          currentStep={AI_INTERVIEW_STEP_NUMBERS.INTERVIEW_PREFERENCES} 
        />
      </div>

      <div style={{ marginBottom: '120px' }}>
        <Card variant="elevated" padding="lg">
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
            Interview Preferences
          </h2>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            This is the final step to configure your AI interview preferences.
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
              Interview preferences configuration will be implemented here
            </p>
          </div>
        </Card>
      </div>

      <FloatingFooter>
        <Button variant="secondary" onClick={handlePrevious}>
          Previous
        </Button>
        <Button variant="primary" onClick={handleComplete}>
          Complete Setup
        </Button>
      </FloatingFooter>
    </div>
  );
};

export default AIInterviewPreferences;