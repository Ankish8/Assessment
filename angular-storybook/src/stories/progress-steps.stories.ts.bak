import type { Meta, StoryObj } from '@storybook/angular';
import { ProgressStepsComponent } from '../app/components/progress-steps/progress-steps.component';
import { StepConfig } from '../app/components/progress-steps/progress-steps.types';

const meta: Meta<ProgressStepsComponent> = {
  title: 'Components/ProgressSteps',
  component: ProgressStepsComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible progress indicator component for multi-step processes with navigation capabilities, state management, and responsive design.'
      }
    }
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical']
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'minimal']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    allowNavigation: {
      control: { type: 'boolean' }
    },
    showLabels: {
      control: { type: 'boolean' }
    },
    showDescriptions: {
      control: { type: 'boolean' }
    },
    responsive: {
      control: { type: 'boolean' }
    },
    currentStep: {
      control: { type: 'number', min: 0, max: 10 }
    }
  }
};

export default meta;
type Story = StoryObj<ProgressStepsComponent>;

const defaultSteps: StepConfig[] = [
  { 
    id: '1', 
    label: 'Personal Info', 
    description: 'Enter your basic information' 
  },
  { 
    id: '2', 
    label: 'Address', 
    description: 'Provide your address details', 
    completed: true 
  },
  { 
    id: '3', 
    label: 'Payment', 
    description: 'Payment and billing information' 
  },
  { 
    id: '4', 
    label: 'Review', 
    description: 'Review and confirm your details', 
    optional: true 
  }
];

const workflowSteps: StepConfig[] = [
  { id: '1', label: 'Start', description: 'Begin the process', completed: true },
  { id: '2', label: 'Configure', description: 'Set up your preferences', completed: true },
  { id: '3', label: 'Review', description: 'Check your settings' },
  { id: '4', label: 'Deploy', description: 'Deploy your application' },
  { id: '5', label: 'Monitor', description: 'Monitor the deployment' }
];

const errorSteps: StepConfig[] = [
  { id: '1', label: 'Validation', description: 'Validate input data', completed: true },
  { id: '2', label: 'Processing', description: 'Process the data', error: true },
  { id: '3', label: 'Finalization', description: 'Finalize the process' },
  { id: '4', label: 'Cleanup', description: 'Clean up resources', disabled: true }
];

const complexSteps: StepConfig[] = [
  { id: '1', label: 'Account Setup', description: 'Create your account', completed: true },
  { id: '2', label: 'Profile', description: 'Complete your profile', completed: true },
  { id: '3', label: 'Verification', description: 'Verify your identity', error: true },
  { id: '4', label: 'Preferences', description: 'Set your preferences', optional: true },
  { id: '5', label: 'Integration', description: 'Connect external services', disabled: true },
  { id: '6', label: 'Welcome', description: 'Welcome to the platform' }
];

export const Default: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 2,
    allowNavigation: true,
    showLabels: true,
    showDescriptions: true,
    orientation: 'horizontal',
    variant: 'default',
    size: 'medium',
    responsive: true
  }
};

export const WithoutNavigation: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    allowNavigation: false,
    showLabels: true,
    showDescriptions: true,
    orientation: 'horizontal',
    variant: 'default',
    size: 'medium',
    responsive: true
  }
};

export const CompactHorizontal: Story = {
  args: {
    steps: workflowSteps,
    currentStep: 2,
    allowNavigation: true,
    showLabels: false,
    showDescriptions: false,
    orientation: 'horizontal',
    variant: 'compact',
    size: 'medium',
    responsive: true
  }
};

export const VerticalLayout: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    allowNavigation: true,
    showLabels: true,
    showDescriptions: true,
    orientation: 'vertical',
    variant: 'default',
    size: 'medium',
    responsive: false
  }
};

export const SmallSize: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 0,
    allowNavigation: true,
    showLabels: true,
    showDescriptions: false,
    orientation: 'horizontal',
    variant: 'default',
    size: 'small',
    responsive: true
  }
};

export const LargeSize: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    allowNavigation: true,
    showLabels: true,
    showDescriptions: true,
    orientation: 'horizontal',
    variant: 'default',
    size: 'large',
    responsive: true
  }
};

export const MinimalVariant: Story = {
  args: {
    steps: workflowSteps,
    currentStep: 2,
    allowNavigation: true,
    showLabels: true,
    showDescriptions: false,
    orientation: 'horizontal',
    variant: 'minimal',
    size: 'medium',
    responsive: true
  }
};

export const WithErrors: Story = {
  args: {
    steps: errorSteps,
    currentStep: 1,
    allowNavigation: true,
    showLabels: true,
    showDescriptions: true,
    orientation: 'horizontal',
    variant: 'default',
    size: 'medium',
    responsive: true
  }
};

export const ComplexWorkflow: Story = {
  args: {
    steps: complexSteps,
    currentStep: 2,
    allowNavigation: true,
    showLabels: true,
    showDescriptions: true,
    orientation: 'horizontal',
    variant: 'default',
    size: 'medium',
    responsive: true
  }
};

export const MobileResponsive: Story = {
  args: {
    steps: workflowSteps,
    currentStep: 2,
    allowNavigation: true,
    showLabels: true,
    showDescriptions: false,
    orientation: 'horizontal',
    variant: 'default',
    size: 'small',
    responsive: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

export const Interactive: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 0,
    allowNavigation: true,
    showLabels: true,
    showDescriptions: true,
    orientation: 'horizontal',
    variant: 'default',
    size: 'medium',
    responsive: true
  },
  render: (args) => ({
    props: {
      ...args,
      onStepClick: (event: any) => {
        console.log('Step clicked:', event);
        args.currentStep = event.index;
      },
      onStepChange: (stepIndex: number) => {
        console.log('Step changed to:', stepIndex);
        args.currentStep = stepIndex;
      },
      onComplete: () => {
        console.log('All steps completed!');
      }
    },
    template: `
      <app-progress-steps
        [steps]="steps"
        [currentStep]="currentStep"
        [allowNavigation]="allowNavigation"
        [showLabels]="showLabels"
        [showDescriptions]="showDescriptions"
        [orientation]="orientation"
        [variant]="variant"
        [size]="size"
        [responsive]="responsive"
        (stepClick)="onStepClick($event)"
        (stepChange)="onStepChange($event)"
        (complete)="onComplete()">
      </app-progress-steps>
      
      <div style="margin-top: 20px; padding: 16px; background: #f8f6fa; border-radius: 8px;">
        <h4 style="margin: 0 0 12px 0; color: #2a1f35;">Current Step: {{ currentStep + 1 }}</h4>
        <p style="margin: 0; color: #6b5671; font-size: 14px;">
          Click on any step to navigate (when navigation is enabled)
        </p>
      </div>
    `
  })
};

// Additional stories for specific use cases
export const OnboardingFlow: Story = {
  args: {
    steps: [
      { id: '1', label: 'Welcome', description: 'Welcome to our platform', completed: true },
      { id: '2', label: 'Profile Setup', description: 'Complete your profile', completed: true },
      { id: '3', label: 'Verification', description: 'Verify your email address' },
      { id: '4', label: 'Preferences', description: 'Set your preferences', optional: true },
      { id: '5', label: 'Get Started', description: 'You\'re ready to begin!' }
    ],
    currentStep: 2,
    allowNavigation: false,
    showLabels: true,
    showDescriptions: true,
    orientation: 'horizontal',
    variant: 'default',
    size: 'medium',
    responsive: true
  }
};

export const CheckoutProcess: Story = {
  args: {
    steps: [
      { id: '1', label: 'Cart', description: 'Review your items', completed: true },
      { id: '2', label: 'Shipping', description: 'Shipping information', completed: true },
      { id: '3', label: 'Payment', description: 'Payment details' },
      { id: '4', label: 'Confirmation', description: 'Order confirmation' }
    ],
    currentStep: 2,
    allowNavigation: true,
    showLabels: true,
    showDescriptions: true,
    orientation: 'horizontal',
    variant: 'default',
    size: 'medium',
    responsive: true
  }
};

export const FormWizard: Story = {
  args: {
    steps: [
      { id: '1', label: 'Basic Info', description: 'Name and contact', completed: true },
      { id: '2', label: 'Address', description: 'Location details', completed: true },
      { id: '3', label: 'Employment', description: 'Work information', error: true },
      { id: '4', label: 'Documents', description: 'Upload documents', optional: true },
      { id: '5', label: 'Review', description: 'Final review' },
      { id: '6', label: 'Submit', description: 'Submit application' }
    ],
    currentStep: 2,
    allowNavigation: true,
    showLabels: true,
    showDescriptions: true,
    orientation: 'horizontal',
    variant: 'default',
    size: 'medium',
    responsive: true
  }
};