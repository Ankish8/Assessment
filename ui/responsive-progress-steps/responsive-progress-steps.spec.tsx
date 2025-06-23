import React from 'react';
import { ResponsiveProgressSteps } from './responsive-progress-steps';

const testSteps = [
  { id: 1, label: 'Step 1', description: 'First step' },
  { id: 2, label: 'Step 2', description: 'Second step' },
  { id: 3, label: 'Step 3', description: 'Third step' }
];

// Basic component validation tests for ResponsiveProgressSteps
export const TestBasicComponent = () => {
  return (
    <ResponsiveProgressSteps 
      steps={testSteps} 
      currentStep={2} 
    />
  );
};

export const TestHorizontalVariant = () => {
  return (
    <ResponsiveProgressSteps 
      steps={testSteps} 
      currentStep={2} 
      variant="horizontal"
    />
  );
};

export const TestVerticalVariant = () => {
  return (
    <ResponsiveProgressSteps 
      steps={testSteps} 
      currentStep={2} 
      variant="vertical"
    />
  );
};

export const TestCompactMode = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3>Regular Horizontal</h3>
        <ResponsiveProgressSteps 
          steps={testSteps} 
          currentStep={2} 
          variant="horizontal"
        />
      </div>
      
      <div>
        <h3>Compact Horizontal</h3>
        <ResponsiveProgressSteps 
          steps={testSteps} 
          currentStep={2} 
          variant="horizontal"
          compact={true}
        />
      </div>
      
      <div>
        <h3>Compact Vertical</h3>
        <ResponsiveProgressSteps 
          steps={testSteps} 
          currentStep={2} 
          variant="vertical"
          compact={true}
        />
      </div>
    </div>
  );
};

export const TestMobileLabels = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3>Without Mobile Labels</h3>
        <ResponsiveProgressSteps 
          steps={testSteps} 
          currentStep={2} 
          showLabelsOnMobile={false}
        />
      </div>
      
      <div>
        <h3>With Mobile Labels</h3>
        <ResponsiveProgressSteps 
          steps={testSteps} 
          currentStep={2} 
          showLabelsOnMobile={true}
        />
      </div>
    </div>
  );
};

export const TestDifferentSteps = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3>Step 1 Active</h3>
        <ResponsiveProgressSteps 
          steps={testSteps} 
          currentStep={1} 
        />
      </div>
      
      <div>
        <h3>Step 2 Active</h3>
        <ResponsiveProgressSteps 
          steps={testSteps} 
          currentStep={2} 
        />
      </div>
      
      <div>
        <h3>Step 3 Active (Completed)</h3>
        <ResponsiveProgressSteps 
          steps={testSteps} 
          currentStep={3} 
        />
      </div>
    </div>
  );
};

export const TestManySteps = () => {
  const manySteps = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    label: `Step ${i + 1}`,
    description: `Description for step ${i + 1}`
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3>Many Steps - Horizontal (Tests overflow)</h3>
        <ResponsiveProgressSteps 
          steps={manySteps} 
          currentStep={4} 
          variant="horizontal"
        />
      </div>
      
      <div>
        <h3>Many Steps - Vertical</h3>
        <ResponsiveProgressSteps 
          steps={manySteps} 
          currentStep={4} 
          variant="vertical"
        />
      </div>
    </div>
  );
};

export const TestWithoutDescriptions = () => {
  const simpleSteps = [
    { id: 1, label: 'Start' },
    { id: 2, label: 'Process' },
    { id: 3, label: 'Finish' }
  ];

  return (
    <ResponsiveProgressSteps 
      steps={simpleSteps} 
      currentStep={2} 
    />
  );
};

export const TestSingleStep = () => {
  const singleStep = [
    { id: 1, label: 'Only Step', description: 'This is the only step' }
  ];

  return (
    <ResponsiveProgressSteps 
      steps={singleStep} 
      currentStep={1} 
    />
  );
};

export const TestEmptySteps = () => {
  return (
    <ResponsiveProgressSteps 
      steps={[]} 
      currentStep={1} 
    />
  );
};

export const TestLongLabels = () => {
  const longSteps = [
    { 
      id: 1, 
      label: 'Very Long Step Label That Might Wrap', 
      description: 'This is a very long description that should test how the component handles lengthy text content' 
    },
    { 
      id: 2, 
      label: 'Another Very Long Step Label', 
      description: 'Another long description to test text wrapping and layout behavior' 
    },
    { 
      id: 3, 
      label: 'Final Long Step Label Text', 
      description: 'Final step with lengthy text to complete the test' 
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3>Long Labels - Horizontal</h3>
        <ResponsiveProgressSteps 
          steps={longSteps} 
          currentStep={2} 
          variant="horizontal"
        />
      </div>
      
      <div>
        <h3>Long Labels - Vertical</h3>
        <ResponsiveProgressSteps 
          steps={longSteps} 
          currentStep={2} 
          variant="vertical"
        />
      </div>
    </div>
  );
};

export const TestInteractiveState = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  
  const handleNext = () => {
    if (currentStep < testSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <ResponsiveProgressSteps 
        steps={testSteps} 
        currentStep={currentStep} 
        variant="horizontal"
      />
      
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginTop: '16px',
        justifyContent: 'center'
      }}>
        <button 
          onClick={handlePrev}
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
          disabled={currentStep === testSteps.length}
          style={{
            padding: '8px 16px',
            backgroundColor: currentStep === testSteps.length ? '#f0f0f0' : '#611F69',
            color: currentStep === testSteps.length ? '#999' : 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: currentStep === testSteps.length ? 'not-allowed' : 'pointer',
          }}
        >
          Next
        </button>
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '12px',
        padding: '8px',
        backgroundColor: '#f8f6fa',
        borderRadius: '6px',
        fontSize: '14px'
      }}>
        Current: Step {currentStep} of {testSteps.length}
      </div>
    </div>
  );
};

export const TestCustomClassName = () => {
  return (
    <ResponsiveProgressSteps 
      steps={testSteps} 
      currentStep={2} 
      className="custom-progress-class"
    />
  );
};