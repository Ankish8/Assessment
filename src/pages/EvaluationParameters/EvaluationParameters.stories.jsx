import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import EvaluationParameters from './EvaluationParameters';

export default {
  title: 'Pages/EvaluationParameters',
  component: EvaluationParameters,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Evaluation Parameters page allows users to configure manual evaluation criteria for submissions. Features automated vs manual evaluation options, dynamic criteria management, and real-time validation.',
      },
    },
  },
};

export const Default = {
  name: 'Default State',
  parameters: {
    docs: {
      description: {
        story: 'Default state showing automated evaluation active and manual evaluation disabled with preview information.',
      },
    },
  },
};

export const ManualEvaluationEnabled = {
  name: 'Manual Evaluation Enabled',
  parameters: {
    docs: {
      description: {
        story: 'Manual evaluation enabled with default criteria loaded, showing weightage distribution and validation.',
      },
    },
  },
  render: () => {
    // This would need to be controlled by state in a real implementation
    return <EvaluationParameters />;
  },
};

export const EmptyCriteria = {
  name: 'Empty Criteria State',
  parameters: {
    docs: {
      description: {
        story: 'Manual evaluation enabled but no criteria added yet, showing empty state and action buttons.',
      },
    },
  },
};

export const ValidationErrors = {
  name: 'With Validation Errors',
  parameters: {
    docs: {
      description: {
        story: 'Shows validation states when criteria have errors or weightage doesn\'t total 100%.',
      },
    },
  },
};

// Responsive viewport tests
export const Mobile = {
  ...Default,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile responsive view with stacked layout and touch-friendly interactions.',
      },
    },
  },
};

export const Tablet = {
  ...Default,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Tablet responsive view with adjusted grid layout.',
      },
    },
  },
};