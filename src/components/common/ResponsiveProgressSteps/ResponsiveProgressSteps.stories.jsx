import ResponsiveProgressSteps from './ResponsiveProgressSteps';

const submissionSteps = [
  { id: 'statement', label: 'Question Statement', description: 'Define the problem' },
  { id: 'media', label: 'Media & Resources', description: 'Add supporting materials' },
  { id: 'details', label: 'Question Details', description: 'Configure settings' },
  { id: 'evaluation', label: 'Evaluation Parameters', description: 'Set scoring criteria' },
  { id: 'solution', label: 'Solution Details', description: 'Provide answers' }
];

const shortSteps = [
  { id: 1, label: 'Basic Info' },
  { id: 2, label: 'Details' },
  { id: 3, label: 'Review' },
];

const longSteps = [
  { id: 1, label: 'Project Information and Initial Setup', description: 'Gather all project requirements' },
  { id: 2, label: 'Technical Architecture Design', description: 'Design system architecture' },
  { id: 3, label: 'Development Environment Configuration', description: 'Set up dev environment' },
  { id: 4, label: 'Implementation and Code Development', description: 'Write the actual code' },
  { id: 5, label: 'Testing and Quality Assurance', description: 'Test thoroughly' },
  { id: 6, label: 'Deployment and Production Release', description: 'Deploy to production' },
  { id: 7, label: 'Monitoring and Maintenance', description: 'Monitor and maintain' }
];

export default {
  title: 'Components/ResponsiveProgressSteps',
  component: ResponsiveProgressSteps,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A responsive progress stepper that adapts to different screen sizes with overflow handling, accessibility features, and multiple layout variants.'
      }
    }
  },
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 1, max: 7 },
      description: 'The current active step (1-based index)'
    },
    variant: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical', 'adaptive'],
      description: 'Layout variant of the stepper'
    },
    showLabelsOnMobile: {
      control: { type: 'boolean' },
      description: 'Whether to show step labels on mobile devices'
    },
    compact: {
      control: { type: 'boolean' },
      description: 'Use compact spacing and sizing'
    }
  },
};

// Default horizontal stepper
export const Default = {
  args: {
    steps: submissionSteps,
    currentStep: 3,
    variant: 'horizontal'
  },
};

// All steps showing progression
export const Step1 = {
  args: {
    steps: submissionSteps,
    currentStep: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'First step - no completed steps yet'
      }
    }
  }
};

export const Step2 = {
  args: {
    steps: submissionSteps,
    currentStep: 2,
  },
};

export const Step3 = {
  args: {
    steps: submissionSteps,
    currentStep: 3,
  },
};

export const Step4 = {
  args: {
    steps: submissionSteps,
    currentStep: 4,
  },
};

export const Step5 = {
  args: {
    steps: submissionSteps,
    currentStep: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Final step - all previous steps completed'
      }
    }
  }
};

// Vertical layout
export const Vertical = {
  args: {
    steps: submissionSteps,
    currentStep: 3,
    variant: 'vertical'
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical layout variant - useful for sidebars or mobile layouts'
      }
    }
  }
};

// Compact variant
export const Compact = {
  args: {
    steps: submissionSteps,
    currentStep: 3,
    compact: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact variant with reduced spacing and sizing'
      }
    }
  }
};

// Short process (3 steps)
export const ShortProcess = {
  args: {
    steps: shortSteps,
    currentStep: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with fewer steps - fits comfortably on most screens'
      }
    }
  }
};

// Long process that will overflow
export const LongProcess = {
  args: {
    steps: longSteps,
    currentStep: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with many steps that will trigger horizontal scrolling with scroll indicators'
      }
    }
  }
};

// Long process vertical to handle overflow
export const LongProcessVertical = {
  args: {
    steps: longSteps,
    currentStep: 4,
    variant: 'vertical'
  },
  parameters: {
    docs: {
      description: {
        story: 'Long process in vertical layout - better for handling many steps'
      }
    }
  }
};

// Mobile simulation
export const MobileView = {
  args: {
    steps: submissionSteps,
    currentStep: 3,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'How the stepper appears on mobile devices with progress indicator and responsive design'
      }
    }
  }
};

// Very small screen simulation  
export const VerySmallScreen = {
  args: {
    steps: submissionSteps,
    currentStep: 3,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    },
    docs: {
      description: {
        story: 'On very small screens, only step numbers are shown to prevent overcrowding'
      }
    }
  }
};

// Accessibility focused
export const AccessibilityDemo = {
  args: {
    steps: submissionSteps,
    currentStep: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Includes proper ARIA attributes, keyboard navigation, and screen reader support'
      }
    }
  }
};

// Interactive demo
export const Interactive = {
  args: {
    steps: submissionSteps,
    currentStep: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive version - try changing the current step to see transitions'
      }
    }
  }
};