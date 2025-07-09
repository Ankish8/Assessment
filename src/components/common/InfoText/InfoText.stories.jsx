import React from 'react';
import InfoText from './InfoText';

export default {
  title: 'Components/Common/InfoText',
  component: InfoText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Info Text

A flexible information text component with icon support and multiple variants.

## Features

- **Icon Support**: FontAwesome icon integration with proper alignment
- **Multiple Variants**: Default, info, warning, success, error states
- **Purple Default**: Special purple background for Speaking Assessment
- **Responsive Design**: Mobile-optimized padding and typography
- **Flexible Content**: Supports any React content, not just text

## Design System

- **Border Radius**: \`var(--radius-md)\` for consistent appearance
- **Padding**: \`var(--spacing-4) var(--spacing-6)\` with mobile adjustments
- **Colors**: Semantic color system with custom purple default
- **Typography**: \`var(--font-size-sm)\` with relaxed line height

## Usage

Perfect for providing contextual information, instructions, or status messages in forms and assessment pages.
        `,
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display',
    },
    icon: {
      control: 'text',
      description: 'FontAwesome icon class',
    },
    variant: {
      control: 'select',
      options: ['default', 'info', 'warning', 'success', 'error'],
      description: 'Visual variant',
    },
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    children: (
      <p>
        Enter the text that candidates will read aloud for speaking assessment. 
        This content will be displayed to candidates during the assessment.
      </p>
    ),
    icon: 'fas fa-info-circle',
    variant: 'default',
  },
};

export const Info = {
  args: {
    children: (
      <p>
        This is an informational message with blue styling. Use this for 
        general information and tips.
      </p>
    ),
    icon: 'fas fa-info-circle',
    variant: 'info',
  },
};

export const Warning = {
  args: {
    children: (
      <p>
        This is a warning message. Use this to alert users about potential 
        issues or important considerations.
      </p>
    ),
    icon: 'fas fa-exclamation-triangle',
    variant: 'warning',
  },
};

export const Success = {
  args: {
    children: (
      <p>
        This is a success message. Use this to confirm completed actions 
        or positive outcomes.
      </p>
    ),
    icon: 'fas fa-check-circle',
    variant: 'success',
  },
};

export const Error = {
  args: {
    children: (
      <p>
        This is an error message. Use this to indicate problems or 
        validation failures that need attention.
      </p>
    ),
    icon: 'fas fa-exclamation-circle',
    variant: 'error',
  },
};

export const WithoutIcon = {
  args: {
    children: (
      <p>
        This info text has no icon. Use this when you want a simple 
        highlighted text box without visual indicators.
      </p>
    ),
    icon: null,
    variant: 'info',
  },
};

export const WithComplexContent = {
  args: {
    children: (
      <div>
        <p><strong>Speaking Assessment Instructions:</strong></p>
        <ul>
          <li>Enter clear, concise text for candidates to read</li>
          <li>Avoid complex vocabulary or technical terms</li>
          <li>Consider the difficulty level of your target audience</li>
          <li>Test the content for pronunciation challenges</li>
        </ul>
      </div>
    ),
    icon: 'fas fa-microphone',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'InfoText with complex content including lists and formatted text.',
      },
    },
  },
};

export const SpeakingAssessmentUsage = {
  args: {
    children: (
      <p>
        Enter the text that candidates will read aloud for speaking assessment. 
        This content will be displayed to candidates during the assessment.
      </p>
    ),
    icon: 'fas fa-info-circle',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'The exact InfoText usage from the Speaking Assessment page with purple background.',
      },
    },
  },
};

export const MobileView = {
  args: {
    children: (
      <p>
        Mobile responsive view with reduced padding and smaller typography 
        for optimal mobile experience.
      </p>
    ),
    icon: 'fas fa-mobile-alt',
    variant: 'info',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile responsive view with optimized spacing and typography.',
      },
    },
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '500px' }}>
      <InfoText variant="default" icon="fas fa-info-circle">
        <p>Default purple variant for Speaking Assessment</p>
      </InfoText>
      <InfoText variant="info" icon="fas fa-info-circle">
        <p>Info variant with blue styling</p>
      </InfoText>
      <InfoText variant="warning" icon="fas fa-exclamation-triangle">
        <p>Warning variant with yellow styling</p>
      </InfoText>
      <InfoText variant="success" icon="fas fa-check-circle">
        <p>Success variant with green styling</p>
      </InfoText>
      <InfoText variant="error" icon="fas fa-exclamation-circle">
        <p>Error variant with red styling</p>
      </InfoText>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available variants displayed together for comparison.',
      },
    },
  },
};