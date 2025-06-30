import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import QuestionTypeSelector from './QuestionTypeSelector';

export default {
  title: 'Pages/QuestionTypeSelector',
  component: QuestionTypeSelector,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive question type selection interface featuring a clean tabbed design with assessment and interview question types. Built with the Untitled UI design system for professional assessment creation workflows.'
      }
    }
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
          <Story />
        </div>
      </BrowserRouter>
    )
  ],
  tags: ['autodocs'],
};

export const Default = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Complete question type selector with tabbed interface showing Assessment Types (7 options) and Interview Types (2 options). Features professional card design, smooth animations, and full accessibility support.'
      }
    }
  }
};

export const SubmissionTypeTab = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Focused view of the Submission Type tab showing various assessment options including General Submission, Fill in the Blanks, Frontend Development, React Development, Speaking Assessment, Reading Comprehension, and Video Presentation.'
      }
    }
  }
};

export const InterviewTypeTab = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Interview Type tab showing Structured Bot Interview and Adaptive AI Interview options. Each card includes detailed descriptions and feature lists to help users make informed decisions.'
      }
    }
  }
};

export const InteractiveDemo = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Interactive demonstration showing hover effects, selection states, tab switching, and card animations. Try switching between tabs and hovering over different cards to see the enhanced interactions.'
      }
    }
  }
};

export const MobileView = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile-responsive view showing how the interface adapts to smaller screens with single-column card layout and optimized tab navigation.'
      }
    }
  }
};

export const TabletView = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'Tablet view showing the two-column grid layout for medium-sized screens with maintained visual hierarchy and spacing.'
      }
    }
  }
};

export const DesktopView = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    },
    docs: {
      description: {
        story: 'Desktop view showing the full three-column grid layout with optimal spacing, proper visual hierarchy, and smooth animations.'
      }
    }
  }
};

export const AccessibilityFeatures = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'This component includes comprehensive accessibility features: keyboard navigation (Tab, Enter, Space, Arrow keys), ARIA labels, screen reader support, focus management, and proper color contrast ratios.'
      }
    }
  }
};

export const DesignSystem = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Built with the Untitled UI design system featuring consistent spacing, typography, colors, shadows, and animations. Uses CSS modules with design tokens for maintainable and scalable styling.'
      }
    }
  }
};