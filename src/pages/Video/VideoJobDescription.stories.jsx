import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import VideoJobDescription from './VideoJobDescription';

export default {
  title: 'Pages/Video/VideoJobDescription',
  component: VideoJobDescription,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Video Assessment job description selection page with improved UX - no modal, direct display of jobs with search and filtering capabilities.'
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
        story: 'Default video assessment job description page showing public jobs by default. Features search, Private/Public/Both tabs, job cards grid, and improved UX without modal popups.'
      }
    }
  }
};

export const WithSearch = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the search functionality that filters jobs by title, company, type, or skills in real-time.'
      }
    }
  }
};

export const TabSwitching = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Shows the Private/Public/Both tab switching functionality that filters job descriptions based on visibility.'
      }
    }
  }
};

export const JobSelection = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates job selection interaction with visual feedback and state management. Selected jobs show primary button and highlighted card border.'
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
        story: 'Mobile-responsive view showing single-column job grid and adapted navigation elements.'
      }
    }
  }
};