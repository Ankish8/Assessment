import React from 'react';
import { ProgressSteps } from './progress-steps';

const testSteps = [
  { id: 1, label: 'Step One' },
  { id: 2, label: 'Step Two' },
  { id: 3, label: 'Step Three' }
];

// Basic component validation tests for ProgressSteps
export const TestProgressStepsComponent = () => {
  return (
    <ProgressSteps 
      steps={testSteps} 
      currentStep={2} 
    />
  );
};

export const TestFirstStep = () => {
  return (
    <ProgressSteps 
      steps={testSteps} 
      currentStep={1} 
    />
  );
};

export const TestLastStep = () => {
  return (
    <ProgressSteps 
      steps={testSteps} 
      currentStep={3} 
    />
  );
};

export const TestAllCompleted = () => {
  return (
    <ProgressSteps 
      steps={testSteps} 
      currentStep={4} 
    />
  );
};

export const TestSingleStep = () => {
  const singleStep = [{ id: 1, label: 'Only Step' }];
  
  return (
    <ProgressSteps 
      steps={singleStep} 
      currentStep={1} 
    />
  );
};

export const TestManySteps = () => {
  const manySteps = [
    { id: 1, label: 'Step 1' },
    { id: 2, label: 'Step 2' },
    { id: 3, label: 'Step 3' },
    { id: 4, label: 'Step 4' },
    { id: 5, label: 'Step 5' },
    { id: 6, label: 'Step 6' },
    { id: 7, label: 'Step 7' }
  ];
  
  return (
    <ProgressSteps 
      steps={manySteps} 
      currentStep={4} 
    />
  );
};

export const TestLongLabels = () => {
  const longLabelSteps = [
    { id: 1, label: 'Very Long Step Label That Might Wrap' },
    { id: 2, label: 'Another Very Long Step Label' },
    { id: 3, label: 'Final Long Step Label Text' }
  ];
  
  return (
    <ProgressSteps 
      steps={longLabelSteps} 
      currentStep={2} 
    />
  );
};

export const TestCustomClassName = () => {
  return (
    <ProgressSteps 
      steps={testSteps} 
      currentStep={2}
      className="custom-progress-class"
    />
  );
};

export const TestStringIds = () => {
  const stringIdSteps = [
    { id: 'first', label: 'First Step' },
    { id: 'second', label: 'Second Step' },
    { id: 'third', label: 'Third Step' }
  ];
  
  return (
    <ProgressSteps 
      steps={stringIdSteps} 
      currentStep={2} 
    />
  );
};

export const TestProgressFlow = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  
  const flowSteps = [
    { id: 1, label: 'Start' },
    { id: 2, label: 'Middle' },
    { id: 3, label: 'End' }
  ];

  const nextStep = () => {
    if (currentStep < flowSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <ProgressSteps 
        steps={flowSteps} 
        currentStep={currentStep} 
      />
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginTop: '20px',
        justifyContent: 'center'
      }}>
        <button 
          onClick={prevStep}
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
          onClick={nextStep}
          disabled={currentStep === flowSteps.length}
          style={{
            padding: '8px 16px',
            backgroundColor: currentStep === flowSteps.length ? '#f0f0f0' : '#611F69',
            color: currentStep === flowSteps.length ? '#999' : 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: currentStep === flowSteps.length ? 'not-allowed' : 'pointer',
          }}
        >
          Next
        </button>
      </div>
      <p style={{ textAlign: 'center', marginTop: '12px', color: '#6b5671' }}>
        Step {currentStep} of {flowSteps.length}
      </p>
    </div>
  );
};