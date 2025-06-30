import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UIFrameworkEvaluationParameters from './UIFrameworkEvaluationParameters';

export default {
  title: 'Pages/UIFramework/UIFrameworkEvaluationParameters',
  component: UIFrameworkEvaluationParameters,
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
        component: 'UI Framework Evaluation Parameters page with both Auto and Manual evaluation features.',
      },
    },
  },
};

const Template = (args) => <UIFrameworkEvaluationParameters {...args} />;

export const Default = Template.bind({});
Default.storyName = 'Default State';
Default.parameters = {
  docs: {
    description: {
      story: 'The default state of the UI Framework Evaluation Parameters page with both toggles disabled.',
    },
  },
};

export const AutoEvaluationEnabled = Template.bind({});
AutoEvaluationEnabled.storyName = 'Auto Evaluation Enabled';
AutoEvaluationEnabled.parameters = {
  docs: {
    description: {
      story: 'Page with Auto Evaluation enabled, showing the JavaScript test case editor.',
    },
  },
};

export const ManualEvaluationEnabled = Template.bind({});
ManualEvaluationEnabled.storyName = 'Manual Evaluation Enabled';
ManualEvaluationEnabled.parameters = {
  docs: {
    description: {
      story: 'Page with Manual Evaluation enabled, showing the criteria management interface.',
    },
  },
};

export const BothEvaluationsEnabled = Template.bind({});
BothEvaluationsEnabled.storyName = 'Both Evaluations Enabled';
BothEvaluationsEnabled.parameters = {
  docs: {
    description: {
      story: 'Page with both Auto and Manual evaluation features enabled simultaneously.',
    },
  },
};

export const ValidationErrors = Template.bind({});
ValidationErrors.storyName = 'With Validation Errors';
ValidationErrors.parameters = {
  docs: {
    description: {
      story: 'Page showing validation errors when required fields are missing.',
    },
  },
};