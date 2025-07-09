import ProgressSteps from './ProgressSteps';
import CompactProgressSteps from '../CompactProgressSteps/CompactProgressSteps';

const steps = [
  { id: 1, label: 'Question Details' },
  { id: 2, label: 'Default Codes' },
  { id: 3, label: 'Test Cases' },
  { id: 4, label: 'Question Preview' },
  { id: 5, label: 'Settings' },
];

const compactSteps = [
  { id: 'step-1', label: 'Question Statement' },
  { id: 'step-2', label: 'Media & Resources' },
  { id: 'step-3', label: 'Question Details' },
  { id: 'step-4', label: 'Evaluation Parameters' },
  { id: 'step-5', label: 'Solution Details' },
];

export default {
  title: 'Components/ProgressSteps',
  component: ProgressSteps,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Progress Steps Components

Traditional progress steps component with updated unified design system variant.

## Available Variants

- **Default ProgressSteps**: Original vertical progress steps
- **CompactProgressSteps**: New unified design system horizontal stepper with consistent shadows and alignment

## Migration Note

New pages should use \`CompactProgressSteps\` for unified design system compliance.
        `,
      },
    },
  },
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 1, max: 5 },
    },
  },
};

export const Step1 = {
  args: {
    steps,
    currentStep: 1,
  },
};

export const Step2 = {
  args: {
    steps,
    currentStep: 2,
  },
};

export const Step3 = {
  args: {
    steps,
    currentStep: 3,
  },
};

export const Step4 = {
  args: {
    steps,
    currentStep: 4,
  },
};

export const Step5 = {
  args: {
    steps,
    currentStep: 5,
  },
};

export const UnifiedDesignSystem = {
  render: () => (
    <div style={{ background: 'var(--color-background-secondary)', padding: '24px 0' }}>
      <CompactProgressSteps 
        steps={compactSteps}
        currentStep={1}
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
## Unified Design System Progress Steps

This story demonstrates the new \`CompactProgressSteps\` component with unified design system features:

- **Consistent Shadow**: \`0 1px 3px rgba(0, 0, 0, 0.08)\`
- **Container Alignment**: Max-width matches header and footer
- **Horizontal Layout**: Space-efficient horizontal stepper
- **Improved Spacing**: 32px desktop, 24px mobile between steps
- **Design Tokens**: Consistent spacing, colors, and typography
- **Responsive**: Hidden labels on mobile, optimized touch targets

Use \`CompactProgressSteps\` for new pages to maintain design system consistency.
        `,
      },
    },
  },
};