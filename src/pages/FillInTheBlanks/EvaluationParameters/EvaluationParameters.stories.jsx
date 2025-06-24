import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import FillInTheBlanksEvaluationParameters from './EvaluationParameters';

export default {
  title: 'Pages/FillInTheBlanks/EvaluationParameters',
  component: FillInTheBlanksEvaluationParameters,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Evaluation parameters page for fill-in-the-blanks questions, adapted for text-based evaluation criteria.',
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template = (args) => <FillInTheBlanksEvaluationParameters {...args} />;

export const Default = Template.bind({});
Default.storyName = 'Fill-in-the-Blanks Evaluation Parameters';
Default.parameters = {
  docs: {
    description: {
      story: 'The evaluation parameters page for fill-in-the-blanks questions with automated text matching options and manual evaluation criteria.',
    },
  },
};

export const AutomatedEvaluationOnly = Template.bind({});
AutomatedEvaluationOnly.storyName = 'Automated Evaluation Only';
AutomatedEvaluationOnly.parameters = {
  docs: {
    description: {
      story: 'Shows the page with automated evaluation enabled and various text matching options.',
    },
  },
};

export const WithManualEvaluation = {
  render: () => {
    const Component = () => {
      const [mounted, setMounted] = React.useState(false);
      
      React.useEffect(() => {
        setMounted(true);
      }, []);

      if (!mounted) return <FillInTheBlanksEvaluationParameters />;

      // Simulate manual evaluation enabled state
      return (
        <div style={{ '--initial-manual-evaluation': 'true' }}>
          <FillInTheBlanksEvaluationParameters />
        </div>
      );
    };
    
    return (
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    );
  },
  name: 'With Manual Evaluation',
  parameters: {
    docs: {
      description: {
        story: 'Shows the page with manual evaluation enabled, displaying custom criteria for text-based assessment.',
      },
    },
  },
};

export const ProgressStepDemo = Template.bind({});
ProgressStepDemo.storyName = 'Progress Step Demo';
ProgressStepDemo.parameters = {
  docs: {
    description: {
      story: 'Demonstrates the progress indicator showing this as Step 4 of 4 in the fill-in-the-blanks creation flow.',
    },
  },
};