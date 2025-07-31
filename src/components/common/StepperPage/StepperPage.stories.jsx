import StepperPage from './StepperPage';

export default {
  title: 'Common/StepperPage',
  component: StepperPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
StepperPage is a reusable layout component for multi-step workflows like interviews, assessments, and forms. 

**Key Features:**
- **Consistent Layout**: Header, progress stepper, content area, and footer
- **Progress Tracking**: Visual progress indicators with checkmarks for completed steps
- **Flexible Content**: Any content can be placed in the main content area
- **Responsive Design**: Mobile-optimized with adaptive layouts
- **Accessibility**: Keyboard navigation and screen reader support
- **Customizable**: Configurable buttons, labels, and step configurations

**Use Cases:**
- Interview flows (Bot Interview, AI Interview, etc.)
- Assessment creation workflows
- Multi-step forms and wizards
- Onboarding processes
- Data collection workflows

**Design System Integration:**
- Uses established typography standards
- Consistent with existing component styling
- Follows mobile-first responsive approach
        `
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Page title displayed in the header'
    },
    icon: {
      control: 'text',
      description: 'FontAwesome icon class (e.g., "fas fa-robot")'
    },
    currentStep: {
      control: { type: 'number', min: 0, max: 4, step: 1 },
      description: 'Current active step index (0-based)'
    },
    previousLabel: {
      control: 'text',
      description: 'Label for the previous button'
    },
    nextLabel: {
      control: 'text',
      description: 'Label for the next button'
    },
    showPreviousButton: {
      control: 'boolean',
      description: 'Whether to show the previous button'
    },
    showNextButton: {
      control: 'boolean',
      description: 'Whether to show the next button'
    },
    previousDisabled: {
      control: 'boolean',
      description: 'Whether the previous button is disabled'
    },
    nextDisabled: {
      control: 'boolean',
      description: 'Whether the next button is disabled'
    },
    onPrevious: { action: 'previous clicked' },
    onNext: { action: 'next clicked' },
    onBack: { action: 'back clicked' }
  }
};

// Sample step configurations for different workflows
const botInterviewSteps = [
  { id: 'step-1', label: 'Question Statement' },
  { id: 'step-2', label: 'Area/Skills' },
  { id: 'step-3', label: 'Question Details' },
  { id: 'step-4', label: 'Evaluation Parameters' },
  { id: 'step-5', label: 'Solution Details' }
];

const assessmentSteps = [
  { id: 'step-1', label: 'Question Statement' },
  { id: 'step-2', label: 'Media & Resources' },
  { id: 'step-3', label: 'Question Details' },
  { id: 'step-4', label: 'Evaluation Parameters' },
  { id: 'step-5', label: 'Solution Details' }
];

const onboardingSteps = [
  { id: 'step-1', label: 'Welcome' },
  { id: 'step-2', label: 'Profile Setup' },
  { id: 'step-3', label: 'Preferences' },
  { id: 'step-4', label: 'Verification' },
  { id: 'step-5', label: 'Complete' }
];

const Template = (args) => (
  <StepperPage {...args}>
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center', 
      background: 'white', 
      borderRadius: '8px', 
      border: '1px solid #e9ecef',
      margin: '1rem 0'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#212529' }}>
        Step {args.currentStep + 1}: {args.steps[args.currentStep]?.label}
      </h3>
      <p style={{ margin: 0, color: '#6c757d' }}>
        Your page content goes here. This could be forms, editors, media uploads, 
        configuration options, or any other step-specific content.
      </p>
    </div>
  </StepperPage>
);

// Default Bot Interview Story
export const BotInterview = Template.bind({});
BotInterview.args = {
  title: 'Bot Interview',
  icon: 'fas fa-robot',
  steps: botInterviewSteps,
  currentStep: 0,
  previousLabel: 'Previous',
  nextLabel: 'Save & Continue',
  showPreviousButton: true,
  showNextButton: true,
  previousDisabled: false,
  nextDisabled: false
};
BotInterview.parameters = {
  docs: {
    description: {
      story: 'Bot Interview workflow with 5 steps for creating structured interview questions.'
    }
  }
};

// Speaking Assessment Story
export const SpeakingAssessment = Template.bind({});
SpeakingAssessment.args = {
  ...BotInterview.args,
  title: 'Speaking Assessment',
  icon: 'fas fa-microphone',
  steps: assessmentSteps,
  currentStep: 1
};
SpeakingAssessment.parameters = {
  docs: {
    description: {
      story: 'Speaking Assessment workflow showing step 2 as current with step 1 completed.'
    }
  }
};

// AI Interview Story
export const AIInterview = Template.bind({});
AIInterview.args = {
  ...BotInterview.args,
  title: 'AI Interview',
  icon: 'fas fa-brain',
  steps: botInterviewSteps,
  currentStep: 2
};
AIInterview.parameters = {
  docs: {
    description: {
      story: 'AI Interview workflow showing step 3 as current with steps 1-2 completed.'
    }
  }
};

// Onboarding Flow Story
export const OnboardingFlow = Template.bind({});
OnboardingFlow.args = {
  ...BotInterview.args,
  title: 'User Onboarding',
  icon: 'fas fa-user-plus',
  steps: onboardingSteps,
  currentStep: 3,
  nextLabel: 'Continue'
};
OnboardingFlow.parameters = {
  docs: {
    description: {
      story: 'User onboarding process showing step 4 as current with different step labels.'
    }
  }
};

// Final Step Story
export const FinalStep = Template.bind({});
FinalStep.args = {
  ...BotInterview.args,
  title: 'Bot Interview',
  icon: 'fas fa-robot',
  steps: botInterviewSteps,
  currentStep: 4,
  nextLabel: 'Complete',
  previousLabel: 'Back'
};
FinalStep.parameters = {
  docs: {
    description: {
      story: 'Final step of the workflow with "Complete" button instead of "Save & Continue".'
    }
  }
};

// Single Button Story
export const SingleButton = Template.bind({});
SingleButton.args = {
  ...BotInterview.args,
  title: 'Welcome',
  icon: 'fas fa-star',
  steps: [{ id: 'step-1', label: 'Getting Started' }],
  currentStep: 0,
  showPreviousButton: false,
  nextLabel: 'Get Started'
};
SingleButton.parameters = {
  docs: {
    description: {
      story: 'Single step workflow with only a next button, useful for welcome/intro pages.'
    }
  }
};

// Disabled State Story
export const DisabledState = Template.bind({});
DisabledState.args = {
  ...BotInterview.args,
  title: 'Form Validation',
  icon: 'fas fa-exclamation-triangle',
  steps: assessmentSteps,
  currentStep: 1,
  nextDisabled: true,
  nextLabel: 'Please Complete Form'
};
DisabledState.parameters = {
  docs: {
    description: {
      story: 'Shows disabled next button state, useful for form validation scenarios.'
    }
  }
};

// Interactive Playground
export const Playground = Template.bind({});
Playground.args = {
  title: 'Interactive Demo',
  icon: 'fas fa-cogs',
  steps: botInterviewSteps,
  currentStep: 2,
  previousLabel: 'Previous',
  nextLabel: 'Save & Continue',
  showPreviousButton: true,
  showNextButton: true,
  previousDisabled: false,
  nextDisabled: false
};
Playground.parameters = {
  docs: {
    description: {
      story: 'Interactive playground - use the controls panel to experiment with different configurations.'
    }
  }
};