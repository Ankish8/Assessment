import SpeakingQuestionStatement from './SpeakingQuestionStatement';

export default {
  title: 'Pages/Speaking/SpeakingQuestionStatement',
  component: SpeakingQuestionStatement,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Speaking Assessment Question Statement

A comprehensive page for creating speaking assessment prompts with unified design system.

## Features

- **Compact Header**: Unified header with back button and title
- **Progress Stepper**: Horizontal progress indicator with 5 steps
- **Info Text**: Purple-tinted information section with icon
- **Rich Text Editor**: Full-featured editor with toolbar
- **Custom Footer**: Integrated validation alerts and action buttons
- **Unified Shadows**: Consistent shadow system across all components
- **Responsive Design**: Mobile-optimized layout and interactions

## Design System

- **Container**: Max-width with consistent padding alignment
- **Shadows**: \`0 1px 3px rgba(0, 0, 0, 0.08)\` for all components
- **Radius**: \`var(--radius-lg)\` for cohesive container appearance
- **Spacing**: Design token-based spacing throughout
- **Colors**: Primary color scheme with purple info highlights

## Usage

This page is used in the Speaking Assessment flow as the first step where evaluators create the text content that candidates will read aloud during assessment.
        `,
      },
    },
  },
  argTypes: {
    // This is a page component, so no args needed
  },
  tags: ['autodocs'],
};

export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'The default Speaking Question Statement page with empty content and unified design system.',
      },
    },
  },
};

export const UnifiedDesignSystem = {
  parameters: {
    docs: {
      description: {
        story: `
## Unified Design System Features

This story showcases the unified design system implementation:

- **Consistent Shadows**: All components use \`0 1px 3px rgba(0, 0, 0, 0.08)\`
- **Aligned Containers**: Header, content, and footer share same max-width
- **Unified Radius**: \`var(--radius-lg)\` creates cohesive appearance
- **Design Tokens**: Consistent spacing, colors, and typography
- **Info Text**: Purple background with primary color icon
- **Progress Steps**: Improved spacing (32px desktop, 24px mobile)
        `,
      },
    },
  },
};

export const MobileResponsive = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: `
## Mobile Responsive Design

Optimized for mobile devices with:

- **Compact Header**: Reduced padding and hidden text labels
- **Progress Steps**: Hidden labels, reduced spacing
- **Info Text**: Smaller padding and font sizes
- **Editor**: Reduced height and toolbar spacing
- **Footer**: Stacked buttons and reduced padding
        `,
      },
    },
  },
};

export const TabletView = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Tablet responsive view showing intermediate breakpoint behavior.',
      },
    },
  },
};

export const DesktopLarge = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Desktop view with full feature set and optimal spacing.',
      },
    },
  },
};