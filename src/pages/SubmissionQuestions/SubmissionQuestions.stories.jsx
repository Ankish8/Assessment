import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SubmissionQuestions from './SubmissionQuestions';

export default {
  title: 'Pages/SubmissionQuestions',
  component: SubmissionQuestions,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A modern, redesigned submission questions page with advanced text editor and enhanced UI.'
      }
    }
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
          <Story />
        </div>
      </BrowserRouter>
    )
  ]
};

const Template = (args) => <SubmissionQuestions {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithInitialContent = Template.bind({});
WithInitialContent.parameters = {
  docs: {
    description: {
      story: 'Submission questions page with some initial question content.'
    }
  }
};

export const MobileView = Template.bind({});
MobileView.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  },
  docs: {
    description: {
      story: 'Mobile responsive view of the submission questions page.'
    }
  }
};