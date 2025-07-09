import React from 'react';
import CompactHeader from './CompactHeader';
import Button from '../Button/Button';

export default {
  title: 'Components/Common/CompactHeader',
  component: CompactHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Compact Header

A unified header component with consistent styling and unified design system.

## Features

- **Unified Shadow**: \`0 1px 3px rgba(0, 0, 0, 0.08)\` for consistency
- **Container Alignment**: Max-width with consistent padding alignment
- **Rounded Corners**: \`var(--radius-lg)\` top corners for cohesive appearance
- **Responsive Design**: Mobile-optimized with hidden text labels
- **Flexible Actions**: Support for custom action buttons
- **Icon Support**: FontAwesome icon integration

## Design System

- **Shadow**: Consistent with main content and footer components
- **Padding**: \`var(--spacing-6)\` desktop, \`var(--spacing-4)\` mobile
- **Colors**: Primary color for icons, semantic colors for text
- **Typography**: \`var(--font-size-lg)\` with semibold weight

## Usage

Used across assessment pages to provide consistent header experience with unified design system.
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Header title text',
    },
    icon: {
      control: 'text',
      description: 'FontAwesome icon class',
    },
    showBackButton: {
      control: 'boolean',
      description: 'Whether to show back button',
    },
    onBack: {
      action: 'back clicked',
      description: 'Custom back button handler',
    },
    actions: {
      control: false,
      description: 'Action buttons or elements',
    },
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    title: 'Assessment Page',
    icon: 'fas fa-clipboard-check',
    showBackButton: true,
  },
};

export const WithActions = {
  args: {
    title: 'Speaking Assessment',
    icon: 'fas fa-microphone',
    showBackButton: true,
    actions: (
      <Button variant="primary" size="sm">
        <i className="fas fa-save"></i>
        Save
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with action buttons in the right section.',
      },
    },
  },
};

export const WithMultipleActions = {
  args: {
    title: 'Question Editor',
    icon: 'fas fa-edit',
    showBackButton: true,
    actions: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="secondary" size="sm">
          <i className="fas fa-eye"></i>
          Preview
        </Button>
        <Button variant="primary" size="sm">
          <i className="fas fa-save"></i>
          Save
        </Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with multiple action buttons showing flexible layout.',
      },
    },
  },
};

export const WithoutBackButton = {
  args: {
    title: 'Dashboard',
    icon: 'fas fa-tachometer-alt',
    showBackButton: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header without back button for root pages.',
      },
    },
  },
};

export const WithoutIcon = {
  args: {
    title: 'Simple Header',
    showBackButton: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header without icon for simple use cases.',
      },
    },
  },
};

export const MobileView = {
  args: {
    title: 'Mobile Assessment',
    icon: 'fas fa-mobile-alt',
    showBackButton: true,
    actions: (
      <Button variant="primary" size="sm">
        <i className="fas fa-save"></i>
      </Button>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile responsive view with hidden text labels and compact actions.',
      },
    },
  },
};

export const UnifiedDesignSystem = {
  args: {
    title: 'Unified Design System',
    icon: 'fas fa-palette',
    showBackButton: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
## Unified Design System Features

This story demonstrates the unified design system implementation:

- **Consistent Shadow**: \`0 1px 3px rgba(0, 0, 0, 0.08)\`
- **Container Alignment**: Max-width matches content and footer
- **Rounded Corners**: \`var(--radius-lg)\` top corners only
- **Design Tokens**: Consistent spacing and colors
- **Responsive**: Mobile-optimized interactions

Perfect for use with CompactProgressSteps and CustomFooter components.
        `,
      },
    },
  },
};