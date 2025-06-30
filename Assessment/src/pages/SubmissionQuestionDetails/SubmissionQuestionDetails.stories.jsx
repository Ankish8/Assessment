import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import SubmissionQuestionDetails from './SubmissionQuestionDetails';

export default {
  title: 'Pages/SubmissionQuestionDetails',
  component: SubmissionQuestionDetails,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Submission Question Details Page

The Question Details step in the Submission Questions flow, featuring:

## Key Features
- **Card-based Layout**: Organized sections for better visual hierarchy
- **Real-time Validation**: Contextual error messages and success indicators
- **Enhanced Skills Selection**: Interactive skill tags with add/remove functionality
- **Responsive Design**: Mobile-friendly layout with proper spacing
- **FontAwesome Icons**: Consistent iconography throughout
- **Form Validation**: Required field validation with helpful error messages

## UX Improvements
- **Visual Grouping**: Related fields grouped into logical cards
- **Contextual Feedback**: Validation messages appear near relevant fields
- **Progressive Disclosure**: Helper text and guidance where needed
- **Better Input Design**: Proper labels, placeholders, and units
- **Skills Management**: Visual chips for selected skills with remove functionality

## Components Used
- **Card**: For visual grouping and elevated sections
- **Input**: With error states, helper text, and icons
- **Selector**: For difficulty level selection
- **Button**: For navigation and actions
- **ProgressSteps**: For multi-step flow indication

## Design System Integration
- Uses design tokens for consistent spacing, colors, and typography
- Follows established component patterns from Storybook
- FontAwesome icons for visual consistency
- Responsive breakpoints for mobile optimization
        `,
      },
    },
  },
};

// Default story
export const Default = {
  name: 'Default State',
  parameters: {
    docs: {
      description: {
        story: 'The default state of the Question Details page with empty form fields.',
      },
    },
  },
};

// With validation errors
export const WithValidationErrors = {
  name: 'With Validation Errors',
  render: () => {
    // This would show the validation state when user tries to submit without filling required fields
    return <SubmissionQuestionDetails />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the page with validation errors when required fields are not filled.',
      },
    },
  },
};

// Mobile view
export const Mobile = {
  name: 'Mobile View',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile responsive layout with single column design and adjusted spacing.',
      },
    },
  },
};

// Tablet view
export const Tablet = {
  name: 'Tablet View',
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Tablet layout with optimized grid spacing for medium screens.',
      },
    },
  },
};

// Filled state (would require state management in real implementation)
export const FilledState = {
  name: 'Completed State',
  render: () => <SubmissionQuestionDetails />,
  parameters: {
    docs: {
      description: {
        story: 'Shows the page when all required fields are properly filled and validated.',
      },
    },
  },
};