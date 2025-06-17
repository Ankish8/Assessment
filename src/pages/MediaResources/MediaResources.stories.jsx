import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MediaResources from './MediaResources';

export default {
  title: 'Pages/MediaResources',
  component: MediaResources,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A redesigned Media & Resources page with improved UX, drag & drop upload, and card-based selection interface.'
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

const Template = (args) => <MediaResources {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  docs: {
    description: {
      story: 'Default state of the Media & Resources page with drag & drop upload and submission options.'
    }
  }
};

export const WithFileUploads = Template.bind({});
WithFileUploads.parameters = {
  docs: {
    description: {
      story: 'Media & Resources page showing uploaded files and selected submission options.'
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
      story: 'Mobile responsive view of the Media & Resources page with stacked layout.'
    }
  }
};

export const ValidationError = Template.bind({});
ValidationError.parameters = {
  docs: {
    description: {
      story: 'Shows validation error when no submission options are selected.'
    }
  }
};