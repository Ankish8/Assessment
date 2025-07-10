import React from 'react';
import CompactProgressSteps from './CompactProgressSteps';

const sampleSteps = [
  { id: 'step-1', label: 'Question Statement' },
  { id: 'step-2', label: 'Media & Resources' },
  { id: 'step-3', label: 'Question Details' },
  { id: 'step-4', label: 'Evaluation Parameters' },
  { id: 'step-5', label: 'Solution Details' },
];

const shortSteps = [
  { id: 'step-1', label: 'Setup' },
  { id: 'step-2', label: 'Configure' },
  { id: 'step-3', label: 'Review' },
];

const longSteps = [
  { id: 'step-1', label: 'Initial Assessment Setup' },
  { id: 'step-2', label: 'Question Content Creation' },
  { id: 'step-3', label: 'Media Resource Management' },
  { id: 'step-4', label: 'Detailed Question Configuration' },
  { id: 'step-5', label: 'Evaluation Parameters Setup' },
  { id: 'step-6', label: 'Solution Details & Testing' },
  { id: 'step-7', label: 'Final Review & Submission' },
];

export default {
  title: 'Components/Common/CompactProgressSteps',
  component: CompactProgressSteps,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Compact Progress Steps

A horizontal progress stepper component with unified design system.

## Features

- **Unified Shadow**: \`0 1px 3px rgba(0, 0, 0, 0.08)\` for consistency
- **Container Alignment**: Max-width with consistent padding alignment
- **Responsive Design**: Hidden labels on mobile, optimized spacing
- **Step States**: Current, completed, and pending states
- **Flexible Content**: Supports variable number of steps
- **Horizontal Scroll**: Overflow handling for many steps

## Design System

- **Shadow**: Consistent with header and footer components
- **Spacing**: 32px desktop, 24px mobile between steps
- **Colors**: Primary for current, success for completed
- **Typography**: \`var(--font-size-sm)\` with medium weight

## Usage

Used across assessment flows to show progress through multi-step forms with unified design system.
        `,
      },
    },
  },
  argTypes: {
    steps: {
      control: 'object',
      description: 'Array of step objects with label and optional id',
    },
    currentStep: {
      control: { type: 'number', min: 0, max: 6 },
      description: 'Current active step index (0-based)',
    },
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    steps: sampleSteps,
    currentStep: 0,
  },
};

export const CurrentStepMiddle = {
  args: {
    steps: sampleSteps,
    currentStep: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress stepper with current step in the middle, showing completed and pending states.',
      },
    },
  },
};

export const CurrentStepLast = {
  args: {
    steps: sampleSteps,
    currentStep: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress stepper with current step at the end, showing all previous steps as completed.',
      },
    },
  },
};

export const ThreeSteps = {
  args: {
    steps: shortSteps,
    currentStep: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shorter progress stepper with 3 steps for simpler workflows.',
      },
    },
  },
};

export const ManySteps = {
  args: {
    steps: longSteps,
    currentStep: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress stepper with many steps, demonstrating horizontal scroll behavior.',
      },
    },
  },
};

export const MobileView = {
  args: {
    steps: sampleSteps,
    currentStep: 1,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile responsive view with hidden labels and compact spacing.',
      },
    },
  },
};

export const SpeakingAssessmentFlow = {
  args: {
    steps: [
      { id: 'statement', label: 'Question Statement' },
      { id: 'media', label: 'Media & Resources' },
      { id: 'details', label: 'Question Details' },
      { id: 'evaluation', label: 'Evaluation Parameters' },
      { id: 'solution', label: 'Solution Details' },
    ],
    currentStep: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Speaking Assessment specific flow showing the exact steps used in the Speaking Assessment page.',
      },
    },
  },
};

export const UnifiedDesignSystem = {
  args: {
    steps: sampleSteps,
    currentStep: 1,
  },
  parameters: {
    docs: {
      description: {
        story: `
## Unified Design System Features

This story demonstrates the unified design system implementation:

- **Consistent Shadow**: \`0 1px 3px rgba(0, 0, 0, 0.08)\`
- **Container Alignment**: Max-width matches header and footer
- **Improved Spacing**: 32px desktop, 24px mobile between steps
- **Design Tokens**: Consistent spacing, colors, and typography
- **Step States**: Primary for current, success for completed

Perfect for use with CompactHeader and CustomFooter components.
        `,
      },
    },
  },
};