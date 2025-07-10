import React from 'react';
import CustomFooter from './CustomFooter';
import Button from '../Button/Button';

export default {
  title: 'Components/Common/CustomFooter',
  component: CustomFooter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Custom Footer

A container-aligned footer component with validation alerts and unified design system.

## Features

- **Unified Shadow**: \`0 1px 3px rgba(0, 0, 0, 0.08)\` for consistency
- **Container Integration**: Designed to work within content containers
- **Validation Alerts**: Error messages with proper styling
- **Flexible Actions**: Support for multiple action buttons
- **Responsive Design**: Mobile-optimized with stacked buttons

## Design System

- **Shadow**: Consistent with header and content components
- **Border Radius**: \`var(--radius-lg)\` for cohesive appearance
- **Padding**: \`var(--spacing-4)\` with mobile adjustments
- **Colors**: Semantic error colors for validation alerts

## Usage

Perfect for forms and assessment pages where you need validation feedback and action buttons within the content container.
        `,
      },
    },
  },
  argTypes: {
    children: {
      control: false,
      description: 'Action buttons or elements',
    },
    showValidationAlert: {
      control: 'boolean',
      description: 'Whether to show validation alert',
    },
    validationMessage: {
      control: 'text',
      description: 'Validation message to display',
    },
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    children: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save & Continue</Button>
      </>
    ),
    showValidationAlert: false,
    validationMessage: '',
  },
};

export const WithValidationAlert = {
  args: {
    children: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary" disabled>Save & Continue</Button>
      </>
    ),
    showValidationAlert: true,
    validationMessage: 'Please enter speaking content to continue',
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer with validation alert shown when form is invalid.',
      },
    },
  },
};

export const SingleAction = {
  args: {
    children: (
      <Button variant="primary">Continue</Button>
    ),
    showValidationAlert: false,
    validationMessage: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer with single action button.',
      },
    },
  },
};

export const MultipleActions = {
  args: {
    children: (
      <>
        <Button variant="secondary">Back</Button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="secondary">Save Draft</Button>
          <Button variant="primary">Publish</Button>
        </div>
      </>
    ),
    showValidationAlert: false,
    validationMessage: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer with multiple action buttons on both sides.',
      },
    },
  },
};

export const SpeakingAssessmentUsage = {
  args: {
    children: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save & Continue</Button>
      </>
    ),
    showValidationAlert: true,
    validationMessage: 'Please enter speaking content to continue',
  },
  parameters: {
    docs: {
      description: {
        story: 'The exact CustomFooter usage from the Speaking Assessment page.',
      },
    },
  },
};

export const MobileView = {
  args: {
    children: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save & Continue</Button>
      </>
    ),
    showValidationAlert: true,
    validationMessage: 'Please complete all required fields',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile responsive view with stacked buttons and validation alert.',
      },
    },
  },
};

export const LongValidationMessage = {
  args: {
    children: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary" disabled>Save & Continue</Button>
      </>
    ),
    showValidationAlert: true,
    validationMessage: 'Please enter speaking content to continue. The text should be clear, concise, and appropriate for the target audience level.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer with longer validation message to test text wrapping.',
      },
    },
  },
};

export const UnifiedDesignSystem = {
  args: {
    children: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save & Continue</Button>
      </>
    ),
    showValidationAlert: false,
    validationMessage: '',
  },
  parameters: {
    docs: {
      description: {
        story: `
## Unified Design System Features

This story demonstrates the unified design system implementation:

- **Consistent Shadow**: \`0 1px 3px rgba(0, 0, 0, 0.08)\`
- **Container Integration**: Designed to work within content containers
- **Unified Radius**: \`var(--radius-lg)\` for cohesive appearance
- **Design Tokens**: Consistent spacing, colors, and typography
- **Responsive**: Mobile-optimized with stacked buttons

Perfect for use with CompactHeader and CompactProgressSteps components.
        `,
      },
    },
  },
};