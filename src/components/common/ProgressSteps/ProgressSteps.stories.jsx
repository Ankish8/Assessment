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

A comprehensive progress indicator system for multi-step workflows with two variants optimized for different use cases.

## Component Variants

### 1. ProgressSteps (Legacy)
Traditional vertical progress steps component with basic styling.

**Use Cases:**
- Legacy implementations requiring vertical layout
- Simple step indicators without complex UI requirements

### 2. CompactProgressSteps (Recommended)
Modern horizontal progress stepper aligned with the unified design system.

**Use Cases:**
- New implementations and page designs
- Mobile-responsive applications
- Complex question flow interfaces
- Assessment creation workflows

## Key Features

### Design System Compliance
- **Consistent Shadow**: \`0 1px 3px rgba(0, 0, 0, 0.08)\` following design tokens
- **Container Alignment**: Max-width matches header and footer components
- **Typography**: Uses design system font sizes and weights
- **Spacing**: Consistent 32px desktop, 24px mobile spacing between steps

### Responsive Design
- **Mobile Optimization**: Hidden labels on small screens for space efficiency
- **Touch Targets**: Optimized for mobile interaction
- **Breakpoint Handling**: Seamless adaptation across screen sizes

### Accessibility
- **Keyboard Navigation**: Full keyboard support for navigation
- **Screen Reader Support**: Proper ARIA attributes and labels
- **Focus Management**: Clear focus indicators and logical tab order
- **High Contrast**: Meets WCAG 2.1 AA contrast requirements

### State Management
- **Current Step**: Visual indication of active step
- **Completed Steps**: Checkmark icons for completed states
- **Pending Steps**: Number indicators for future steps
- **Progress Flow**: Clear visual progression through workflow

## Migration Guide

### For New Implementations
Use \`CompactProgressSteps\` for all new pages and components:

\`\`\`jsx
import CompactProgressSteps from './CompactProgressSteps';

const steps = [
  { id: 'step-1', label: 'Question Statement' },
  { id: 'step-2', label: 'Media & Resources' },
  { id: 'step-3', label: 'Question Details' },
  { id: 'step-4', label: 'Evaluation Parameters' },
  { id: 'step-5', label: 'Solution Details' },
];

<CompactProgressSteps steps={steps} currentStep={2} />
\`\`\`

### For Legacy Updates
Gradually migrate existing \`ProgressSteps\` implementations to \`CompactProgressSteps\`.

## Props Documentation

### CompactProgressSteps Props
- **steps** (required): Array of step objects with \`id\` and \`label\`
- **currentStep** (required): Current active step index (0-based)
- **className** (optional): Additional CSS classes for customization

### ProgressSteps Props
- **steps** (required): Array of step objects with \`id\` and \`label\`
- **currentStep** (required): Current active step number (1-based)
        `,
      },
    },
  },
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Current step number (1-based for legacy ProgressSteps)',
    },
  },
};

export const Step1 = {
  args: {
    steps,
    currentStep: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Initial step - Question Details. Shows the first step as active with all other steps pending.',
      },
    },
  },
};

export const Step2 = {
  args: {
    steps,
    currentStep: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Second step - Default Codes. Shows progression with Step 1 completed and Step 2 active.',
      },
    },
  },
};

export const Step3 = {
  args: {
    steps,
    currentStep: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Third step - Test Cases. Shows progression with Steps 1-2 completed and Step 3 active.',
      },
    },
  },
};

export const Step4 = {
  args: {
    steps,
    currentStep: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Fourth step - Question Preview. Shows progression with Steps 1-3 completed and Step 4 active.',
      },
    },
  },
};

export const Step5 = {
  args: {
    steps,
    currentStep: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Final step - Settings. Shows progression with Steps 1-4 completed and Step 5 active.',
      },
    },
  },
};

export const UnifiedDesignSystem = {
  render: (args) => (
    <div style={{ background: 'var(--color-background-secondary)', padding: '24px 0' }}>
      <CompactProgressSteps 
        steps={compactSteps}
        currentStep={args.currentStep}
      />
    </div>
  ),
  args: {
    currentStep: 4, // Show step 5 (0-based index)
  },
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 0, max: 4 },
      description: 'Current step (0-based index)',
    },
  },
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

**Interactive Controls**: Use the controls below to change the current step.
        `,
      },
    },
  },
};

// Unified Design System Variants (Recommended for New Implementations)
export const CompactStep1 = {
  render: () => (
    <div style={{ background: 'var(--color-background-secondary)', padding: '24px 0' }}>
      <CompactProgressSteps steps={compactSteps} currentStep={0} />
    </div>
  ),
  parameters: { 
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
**Step 1: Question Statement** - Initial step in the unified design system flow.

This demonstrates the CompactProgressSteps component at the beginning of the workflow:
- Current step highlighted with primary color
- All other steps shown as pending with number indicators
- Horizontal layout optimized for all screen sizes
- Consistent shadow and spacing aligned with design system
        `,
      },
    },
  },
};

export const CompactStep2 = {
  render: () => (
    <div style={{ background: 'var(--color-background-secondary)', padding: '24px 0' }}>
      <CompactProgressSteps steps={compactSteps} currentStep={1} />
    </div>
  ),
  parameters: { 
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
**Step 2: Media & Resources** - Second step with first step completed.

Shows progression state:
- Step 1 completed with checkmark icon
- Step 2 active with highlight
- Steps 3-5 pending with number indicators
- Chevron arrows indicating flow direction
        `,
      },
    },
  },
};

export const CompactStep3 = {
  render: () => (
    <div style={{ background: 'var(--color-background-secondary)', padding: '24px 0' }}>
      <CompactProgressSteps steps={compactSteps} currentStep={2} />
    </div>
  ),
  parameters: { 
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
**Step 3: Question Details** - Middle step showing balanced progression.

Mid-workflow state:
- Steps 1-2 completed with checkmarks
- Step 3 active with primary color highlight
- Steps 4-5 pending with number indicators
- Visual balance with completed and pending steps
        `,
      },
    },
  },
};

export const CompactStep4 = {
  render: () => (
    <div style={{ background: 'var(--color-background-secondary)', padding: '24px 0' }}>
      <CompactProgressSteps steps={compactSteps} currentStep={3} />
    </div>
  ),
  parameters: { 
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
**Step 4: Evaluation Parameters** - Near completion with most steps done.

Advanced progression state:
- Steps 1-3 completed with checkmarks
- Step 4 active with highlight
- Only Step 5 remaining as pending
- Visual emphasis on nearing completion
        `,
      },
    },
  },
};

export const CompactStep5 = {
  render: () => (
    <div style={{ background: 'var(--color-background-secondary)', padding: '24px 0' }}>
      <CompactProgressSteps steps={compactSteps} currentStep={4} />
    </div>
  ),
  parameters: { 
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
**Step 5: Solution Details** - Final step in the workflow.

Completion state:
- Steps 1-4 completed with checkmarks
- Step 5 active as the final step
- All previous steps show progression history
- Visual indication of workflow completion
- Ready for final submission or review
        `,
      },
    },
  },
};