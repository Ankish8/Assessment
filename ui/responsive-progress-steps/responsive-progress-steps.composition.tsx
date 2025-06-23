import React, { useState } from 'react';
import { ResponsiveProgressSteps } from './responsive-progress-steps';

const sampleSteps = [
  { id: 1, label: 'Basic Info', description: 'Enter your details' },
  { id: 2, label: 'Preferences', description: 'Choose your settings' },
  { id: 3, label: 'Review', description: 'Check everything' },
  { id: 4, label: 'Complete', description: 'All done!' }
];

const wizardSteps = [
  { id: 'setup', label: 'Project Setup', description: 'Initialize your project' },
  { id: 'config', label: 'Configuration', description: 'Set up your preferences' },
  { id: 'deploy', label: 'Deployment', description: 'Deploy to production' },
  { id: 'monitor', label: 'Monitoring', description: 'Track performance' },
  { id: 'optimize', label: 'Optimization', description: 'Fine-tune settings' }
];

const longSteps = [
  { id: 1, label: 'Account Creation', description: 'Set up your account' },
  { id: 2, label: 'Profile Information', description: 'Add personal details' },
  { id: 3, label: 'Verification Process', description: 'Verify your identity' },
  { id: 4, label: 'Payment Setup', description: 'Configure billing' },
  { id: 5, label: 'Team Invitation', description: 'Invite team members' },
  { id: 6, label: 'Project Configuration', description: 'Set up your workspace' },
  { id: 7, label: 'Final Review', description: 'Review all settings' },
  { id: 8, label: 'Launch', description: 'Go live!' }
];

export const HorizontalStep1 = () => {
  return (
    <ResponsiveProgressSteps 
      steps={sampleSteps} 
      currentStep={1} 
      variant="horizontal"
    />
  );
};

export const HorizontalStep2 = () => {
  return (
    <ResponsiveProgressSteps 
      steps={sampleSteps} 
      currentStep={2} 
      variant="horizontal"
    />
  );
};

export const HorizontalStep3 = () => {
  return (
    <ResponsiveProgressSteps 
      steps={sampleSteps} 
      currentStep={3} 
      variant="horizontal"
    />
  );
};

export const HorizontalCompleted = () => {
  return (
    <ResponsiveProgressSteps 
      steps={sampleSteps} 
      currentStep={4} 
      variant="horizontal"
    />
  );
};

export const VerticalLayout = () => {
  return (
    <ResponsiveProgressSteps 
      steps={sampleSteps} 
      currentStep={2} 
      variant="vertical"
    />
  );
};

export const CompactHorizontal = () => {
  return (
    <ResponsiveProgressSteps 
      steps={sampleSteps} 
      currentStep={2} 
      variant="horizontal"
      compact={true}
    />
  );
};

export const CompactVertical = () => {
  return (
    <ResponsiveProgressSteps 
      steps={sampleSteps} 
      currentStep={3} 
      variant="vertical"
      compact={true}
    />
  );
};

export const ManyStepsHorizontal = () => {
  return (
    <ResponsiveProgressSteps 
      steps={longSteps} 
      currentStep={4} 
      variant="horizontal"
    />
  );
};

export const ManyStepsVertical = () => {
  return (
    <ResponsiveProgressSteps 
      steps={longSteps} 
      currentStep={5} 
      variant="vertical"
    />
  );
};

export const WizardFlow = () => {
  return (
    <ResponsiveProgressSteps 
      steps={wizardSteps} 
      currentStep={3} 
      variant="horizontal"
    />
  );
};

export const WithMobileLabels = () => {
  return (
    <ResponsiveProgressSteps 
      steps={sampleSteps} 
      currentStep={2} 
      variant="horizontal"
      showLabelsOnMobile={true}
    />
  );
};

export const WithoutDescriptions = () => {
  const simpleSteps = [
    { id: 1, label: 'Start' },
    { id: 2, label: 'Process' },
    { id: 3, label: 'Complete' }
  ];

  return (
    <ResponsiveProgressSteps 
      steps={simpleSteps} 
      currentStep={2} 
      variant="horizontal"
    />
  );
};

export const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const handleNext = () => {
    if (currentStep < sampleSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
  };

  return (
    <div>
      <ResponsiveProgressSteps 
        steps={sampleSteps} 
        currentStep={currentStep} 
        variant="horizontal"
      />
      
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginTop: '20px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={handlePrevious}
          disabled={currentStep === 1}
          style={{
            padding: '8px 16px',
            backgroundColor: currentStep === 1 ? '#f0f0f0' : '#611F69',
            color: currentStep === 1 ? '#999' : 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Previous
        </button>
        
        <button 
          onClick={handleNext}
          disabled={currentStep === sampleSteps.length}
          style={{
            padding: '8px 16px',
            backgroundColor: currentStep === sampleSteps.length ? '#f0f0f0' : '#611F69',
            color: currentStep === sampleSteps.length ? '#999' : 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: currentStep === sampleSteps.length ? 'not-allowed' : 'pointer',
          }}
        >
          Next
        </button>
        
        <button 
          onClick={handleReset}
          style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: '#611F69',
            border: '1px solid #611F69',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '16px',
        padding: '12px',
        backgroundColor: '#f8f6fa',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <strong>Current Step:</strong> {currentStep} - {sampleSteps[currentStep - 1]?.label}
      </div>
    </div>
  );
};

export const VerticalInteractive = () => {
  const [currentStep, setCurrentStep] = useState(2);
  
  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex + 1);
  };

  return (
    <div>
      <div style={{ 
        padding: '12px 16px', 
        backgroundColor: '#f8f6fa', 
        borderRadius: '8px', 
        marginBottom: '16px',
        fontSize: '14px'
      }}>
        <strong>Click on any step to navigate:</strong> Currently on step {currentStep}
      </div>
      
      <ResponsiveProgressSteps 
        steps={sampleSteps} 
        currentStep={currentStep} 
        variant="vertical"
      />
    </div>
  );
};

export const ResponsiveComparison = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
          Horizontal Layout
        </h3>
        <ResponsiveProgressSteps 
          steps={sampleSteps} 
          currentStep={2} 
          variant="horizontal"
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
          Vertical Layout
        </h3>
        <ResponsiveProgressSteps 
          steps={sampleSteps} 
          currentStep={2} 
          variant="vertical"
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
          Compact Horizontal
        </h3>
        <ResponsiveProgressSteps 
          steps={sampleSteps} 
          currentStep={2} 
          variant="horizontal"
          compact={true}
        />
      </div>
    </div>
  );
};